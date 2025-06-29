import { requireAdmin } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Post from '@/app/models/Post';

export async function GET(request) {
    try {
      await dbConnect(); 
      const { searchParams } = new URL(request.url);
      const status = searchParams.get('status') || 'draft';
      const limit = parseInt(searchParams.get('limit')) || 10;
      const page = parseInt(searchParams.get('page')) || 1;
      const category = searchParams.get('category');
      const tag = searchParams.get('tag');
      
      const query = { status };
      
      if (category) {
        query.category = category;
      }
      
      if (tag) {
        query.tags = tag;
      }
      
      // For non-admin requests, only return published posts
    //   try {
    //     await requireAdmin();
    //   } catch {
    //     query.status = 'published';
    //   }
      
      const posts = await Post.find(query)
        .sort({ publishedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
      
      const total = await Post.countDocuments(query);
      
      return Response.json({
        posts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });
      
    } catch (error) {
      console.error('Error fetching posts:', error);
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }