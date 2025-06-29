import dbConnect from '@/lib/db';
import Post from '@/models/Post';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { slug } = params;
    
    // Find the post by slug
    const post = await Post.findBySlug(slug);
    
    if (!post) {
      return Response.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }
    
    // Don't return drafts unless it's an admin request
    if (post.status !== 'published') {
      try {
        await requireAdmin();
      } catch {
        return Response.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
    }
    
    // Prepare response headers
    const headers = {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=1800'
    };
    
    if (post.status === 'published') {
      headers['X-Robots-Tag'] = 'index, follow';
    } else {
      headers['X-Robots-Tag'] = 'noindex, nofollow';
    }
    
    return Response.json(post, { headers });
    
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}