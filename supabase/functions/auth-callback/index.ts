import { serve } from 'https://deno.fresh.dev/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const PLATFORM_CONFIGS = {
  // ... other platforms remain the same ...
  instagram: {
    tokenUrl: 'https://api.instagram.com/oauth/access_token',
    clientId: Deno.env.get('INSTAGRAM_CLIENT_ID')!,
    clientSecret: Deno.env.get('INSTAGRAM_CLIENT_SECRET')!,
    longLivedTokenUrl: 'https://graph.instagram.com/access_token',
  },
  // ... other platforms remain the same ...
}

serve(async (req) => {
  try {
    const url = new URL(req.url)
    const platform = url.pathname.split('/').pop()
    const { code } = await req.json()

    if (!platform || !PLATFORM_CONFIGS[platform]) {
      return new Response(
        JSON.stringify({ error: 'Invalid platform' }),
        { status: 400 }
      )
    }

    const config = PLATFORM_CONFIGS[platform]
    
    let tokens;
    
    if (platform === 'instagram') {
      // Special handling for Instagram's two-step token exchange
      const shortLivedTokenResponse = await fetch(config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: config.clientId,
          client_secret: config.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: `${url.origin}/auth/callback/instagram`,
          code,
        }),
      })

      if (!shortLivedTokenResponse.ok) {
        throw new Error('Failed to exchange code for short-lived token')
      }

      const shortLivedToken = await shortLivedTokenResponse.json()

      // Exchange short-lived token for long-lived token
      const longLivedTokenResponse = await fetch(`${config.longLivedTokenUrl}?grant_type=ig_exchange_token&client_secret=${config.clientSecret}&access_token=${shortLivedToken.access_token}`)

      if (!longLivedTokenResponse.ok) {
        throw new Error('Failed to exchange for long-lived token')
      }

      tokens = await longLivedTokenResponse.json()
      tokens.expires_in = 5184000 // 60 days in seconds
    } else {
      // Handle other platforms as before
      const tokenResponse = await fetch(config.tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          client_id: config.clientId,
          client_secret: config.clientSecret,
          redirect_uri: `${url.origin}/auth/callback/${platform}`,
        }),
      })

      if (!tokenResponse.ok) {
        throw new Error('Failed to exchange code for token')
      }

      tokens = await tokenResponse.json()
    }

    // Store tokens in Supabase
    const { data: socialAccount, error } = await supabase
      .from('social_accounts')
      .upsert({
        platform,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
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