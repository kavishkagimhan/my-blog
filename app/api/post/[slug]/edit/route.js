export async function PUT(request, { params }) {
    try {
      await requireAdmin();
      await dbConnect();
      
      const { slug } = params;
      const data = await request.json();
      
      // Find and update post
      const post = await Post.findOneAndUpdate(
        { slug },
        { ...data, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      
      if (!post) {
        return Response.json(
          { error: 'Post not found' },
          { status: 404 }
        );
      }
      
      return Response.json({
        success: true,
        postId: post._id,
        slug: post.slug
      });
      
    } catch (error) {
      if (error.message === 'Unauthorized') {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }
      
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map(err => err.message);
        return Response.json(
          { error: 'Validation failed', details: errors },
          { status: 400 }
        );
      }
      
      console.error('Error updating post:', error);
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }