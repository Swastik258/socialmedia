import { serve } from 'https://deno.fresh.dev/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const PLATFORM_CONFIGS = {
  twitter: {
    refreshUrl: 'https://api.twitter.com/2/oauth2/token',
    clientId: Deno.env.get('TWITTER_CLIENT_ID')!,
    clientSecret: Deno.env.get('TWITTER_CLIENT_SECRET')!,
  },
  facebook: {
    refreshUrl: 'https://graph.facebook.com/v18.0/oauth/access_token',
    clientId: Deno.env.get('FACEBOOK_CLIENT_ID')!,
    clientSecret: Deno.env.get('FACEBOOK_CLIENT_SECRET')!,
  },
  instagram: {
    refreshUrl: 'https://api.instagram.com/oauth/access_token',
    clientId: Deno.env.get('INSTAGRAM_CLIENT_ID')!,
    clientSecret: Deno.env.get('INSTAGRAM_CLIENT_SECRET')!,
  },
  linkedin: {
    refreshUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    clientId: Deno.env.get('LINKEDIN_CLIENT_ID')!,
    clientSecret: Deno.env.get('LINKEDIN_CLIENT_SECRET')!,
  },
}

serve(async (req) => {
  try {
    const url = new URL(req.url)
    const platform = url.pathname.split('/').pop()
    const { refreshToken } = await req.json()

    if (!platform || !PLATFORM_CONFIGS[platform]) {
      return new Response(
        JSON.stringify({ error: 'Invalid platform' }),
        { status: 400 }
      )
    }

    const config = PLATFORM_CONFIGS[platform]
    
    // Refresh token
    const tokenResponse = await fetch(config.refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }),
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to refresh token')
    }

    const tokens = await tokenResponse.json()

    // Update tokens in Supabase
    const { error } = await supabase
      .from('social_accounts')
      .update({
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      })
      .eq('platform', platform)

    if (error) throw error

    return new Response(
      JSON.stringify({
        accessToken: tokens.access_token,
        expiresIn: tokens.expires_in,
      }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    )
  }
})