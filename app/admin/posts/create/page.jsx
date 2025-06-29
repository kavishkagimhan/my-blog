'use client'
import React, { useState, useRef } from 'react';
import { Bold, Italic, Underline, Link, List, ListOrdered, Quote, Code, Image, Eye, Save, Send } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function CreatePost() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft'
  });

  const [isPreview, setIsPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contentRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleContentChange = (e) => {
    setFormData(prev => ({
      ...prev,
      content: e.target.innerHTML
    }));
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    contentRef.current.focus();
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      formatText('insertImage', url);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    if (!formData.title || formData.title.trim().length < 5) {
      errors.push('Title must be at least 5 characters');
    }
    
    if (!formData.content || formData.content.trim().length < 100) {
      errors.push('Content must be at least 100 characters');
    }
    
    if (formData.slug && !/^[a-z0-9-]+$/.test(formData.slug)) {
      errors.push('Slug can only contain lowercase letters, numbers, and hyphens');
    }
    
    if (formData.featuredImage && !/^https?:\/\/.+\..+/.test(formData.featuredImage)) {
      errors.push('Please provide a valid image URL');
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convert tags string to array
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const loadingToast = toast.loading(
        formData.status === 'published' ? 'Publishing post...' : 'Saving draft...'
      );
  
      const response = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        toast.dismiss(loadingToast);
        if (result.details) {
          result.details.forEach(detail => toast.error(detail));
        } else {
          toast.error(result.error || 'Failed to save post');
        }
        return;
      }
  
      toast.dismiss(loadingToast);
      toast.success(
        formData.status === 'published' 
          ? 'Post published successfully!' 
          : 'Draft saved successfully!',
        {
          duration: 2000
        }
      );
      
      if (formData.status === 'published') {
        setTimeout(() => {
          window.location.href = `/blog/${result.slug}`;
        }, 2000);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    'Technology', 'Design', 'Development', 'Marketing', 'Business', 'Lifestyle', 'Travel', 'Food'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-2">
      {/* Toast Notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            maxWidth: '500px'
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: 'white',
            },
          },
          error: {
            duration: 4000
          }
        }}
      />

      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-900">Create New Post</h1>
            <p className="text-gray-600 mt-1">Share your thoughts with the world</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Post Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter your post title..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    required
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      /blog/
                    </span>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="post-url-slug"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Brief description of your post..."
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Content Editor */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Content *
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsPreview(!isPreview)}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Eye size={16} />
                      {isPreview ? 'Edit' : 'Preview'}
                    </button>
                  </div>

                  {!isPreview ? (
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      {/* Toolbar */}
                      <div className="border-b border-gray-200 p-2 bg-gray-50 flex flex-wrap gap-1">
                        <button
                          type="button"
                          onClick={() => formatText('bold')}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Bold"
                        >
                          <Bold size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText('italic')}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Italic"
                        >
                          <Italic size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText('underline')}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Underline"
                        >
                          <Underline size={16} />
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                        <button
                          type="button"
                          onClick={insertLink}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Insert Link"
                        >
                          <Link size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={insertImage}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Insert Image"
                        >
                          <Image size={16} />
                        </button>
                        <div className="w-px h-6 bg-gray-300 mx-1 self-center"></div>
                        <button
                          type="button"
                          onClick={() => formatText('insertUnorderedList')}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Bullet List"
                        >
                          <List size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText('insertOrderedList')}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Numbered List"
                        >
                          <ListOrdered size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText('formatBlock', 'blockquote')}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Quote"
                        >
                          <Quote size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => formatText('formatBlock', 'pre')}
                          className="p-2 hover:bg-gray-200 rounded"
                          title="Code Block"
                        >
                          <Code size={16} />
                        </button>
                      </div>

                      {/* Editor */}
                      <div
                        ref={contentRef}
                        contentEditable
                        onInput={handleContentChange}
                        className="min-h-96 p-4 focus:outline-none text-gray-800 leading-relaxed"
                        style={{ wordBreak: 'break-word' }}
                        suppressContentEditableWarning={true}
                      >
                        <p className="text-gray-400">Start writing your post content here...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg p-4 min-h-96 bg-gray-50">
                      <div className="prose max-w-none">
                        <h1 className="text-2xl font-bold mb-4">{formData.title || 'Your Post Title'}</h1>
                        {formData.excerpt && (
                          <p className="text-gray-600 italic mb-6">{formData.excerpt}</p>
                        )}
                        <div 
                          dangerouslySetInnerHTML={{ 
                            __html: formData.content || '<p class="text-gray-400">Your content will appear here...</p>' 
                          }} 
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Publish Settings */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Publish Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, status: 'draft' }));
                          handleSubmit();
                        }}
                        disabled={isSubmitting}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg transition-colors ${
                          isSubmitting ? 'bg-gray-100 cursor-not-allowed' : 'hover:bg-gray-50'
                        }`}
                      >
                        <Save size={16} />
                        Save Draft
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, status: 'published' }));
                          handleSubmit();
                        }}
                        disabled={isSubmitting}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
                          isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                      >
                        <Send size={16} />
                        Publish
                      </button>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Category</h3>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Tags</h3>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>

                {/* Featured Image */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Featured Image</h3>
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.featuredImage && (
                    <div className="mt-2">
                      <img
                        src={formData.featuredImage}
                        alt="Featured"
                        className="w-full h-32 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          toast.error('Failed to load featured image');
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;