/*
  # Social Media Integration Schema

  1. New Tables
    - social_accounts
      - Stores connected social media accounts and their access tokens
    - posts
      - Stores all scheduled and published posts
    - post_analytics
      - Stores engagement metrics for posts
    - hashtag_performance
      - Tracks performance of hashtags
    - content_calendar
      - Manages content calendar and scheduling
    
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Social Accounts Table
CREATE TABLE IF NOT EXISTS social_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  platform text NOT NULL,
  access_token text NOT NULL,
  refresh_token text,
  expires_at timestamptz,
  profile_data jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own social accounts"
  ON social_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Posts Table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  platform text NOT NULL,
  content text NOT NULL,
  media_url text,
  scheduled_date timestamptz NOT NULL,
  published_date timestamptz,
  status text NOT NULL DEFAULT 'draft',
  tags text[],
  location text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Post Analytics Table
CREATE TABLE IF NOT EXISTS post_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  platform text NOT NULL,
  likes integer DEFAULT 0,
  shares integer DEFAULT 0,
  comments integer DEFAULT 0,
  reach integer DEFAULT 0,
  engagement_rate decimal DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE post_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view analytics for their own posts"
  ON post_analytics
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM posts
    WHERE posts.id = post_analytics.post_id
    AND posts.user_id = auth.uid()
  ));

-- Hashtag Performance Table
CREATE TABLE IF NOT EXISTS hashtag_performance (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  hashtag text NOT NULL,
  platform text NOT NULL,
  usage_count integer DEFAULT 1,
  avg_engagement decimal DEFAULT 0,
  last_used timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, hashtag, platform)
);

ALTER TABLE hashtag_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their hashtag performance"
  ON hashtag_performance
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Content Calendar Table
CREATE TABLE IF NOT EXISTS content_calendar (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  category text,
  status text DEFAULT 'planned',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE content_calendar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their content calendar"
  ON content_calendar
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_user_platform ON posts(user_id, platform);
CREATE INDEX IF NOT EXISTS idx_posts_scheduled_date ON posts(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_post_analytics_post_id ON post_analytics(post_id);
CREATE INDEX IF NOT EXISTS idx_hashtag_performance_user ON hashtag_performance(user_id, platform);
CREATE INDEX IF NOT EXISTS idx_content_calendar_user_dates ON content_calendar(user_id, start_date, end_date);