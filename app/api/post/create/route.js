import { requireAdmin } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Post from '@/app/models/Post';

export async function POST(request) {
  try {
    await requireAdmin();
    await dbConnect();
    
    const data = await request.json();
    
    // Create new post
    const post = new Post(data);
    await post.save();
    
    return Response.json({
      success: true,
      postId: post._id,
      slug: post.slug
    });
    
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return Response.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }
    
    // Handle duplicate key error (slug)
    if (error.code === 11000) {
      return Response.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }
    
    console.error('Error creating post:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}