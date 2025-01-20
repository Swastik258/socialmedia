/*
  # Create storage bucket for social media uploads

  1. New Storage Bucket
    - Create 'social-media' bucket for storing post media
  
  2. Security
    - Enable public access for media files
    - Add policies for authenticated users to manage their own media
*/

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('social-media', 'social-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload media
CREATE POLICY "Users can upload media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'social-media' AND
  (storage.foldername(name))[1] = 'media'
);

-- Allow authenticated users to update their own media
CREATE POLICY "Users can update their own media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'social-media' AND
  auth.uid() = owner
);

-- Allow authenticated users to delete their own media
CREATE POLICY "Users can delete their own media"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'social-media' AND
  auth.uid() = owner
);

-- Allow public access to media files
CREATE POLICY "Public can view media"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'social-media'
);