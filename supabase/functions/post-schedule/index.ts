import { serve } from 'https://deno.fresh.dev/std/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  try {
    const url = new URL(req.url)
    const platform = url.pathname.split('/').pop()
    const { content, scheduledDate, mediaUrl } = await req.json()

    // Get the user's access token
    const { data: socialAccount, error: accountError } = await supabase
      .from('social_accounts')
      .select('access_token')
      .eq('platform', platform)
      .single()

    if (accountError) throw accountError

    // Store the scheduled post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        platform,
        content,
        scheduled_date: scheduledDate,
        media_url: mediaUrl,
        status: 'scheduled',
      })
      .select()
      .single()

    if (postError) throw postError

    return new Response(
      JSON.stringify({ postId: post.id }),
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