import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remarkGfm for GitHub Flavored Markdown

// Function to get all post slugs and categories for static paths
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  let categories = [];
  try {
    categories = await fs.readdir(postsDirectory);
  } catch (error) {
    console.error(`Error reading posts directory: ${error.message}`);
    // If 'posts' directory doesn't exist, return empty paths.
    // This can happen during initial setup before posts are added.
    return [];
  }

  let paths = [];

  for (const category of categories) {
    const categoryPath = path.join(postsDirectory, category);
    let files = [];
    try {
      files = await fs.readdir(categoryPath);
    } catch (error) {
      console.warn(`Could not read category directory '${categoryPath}': ${error.message}. Skipping.`);
      continue; // Skip this category if it can't be read
    }

    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace(/\.md$/, '');
        paths.push({ category, slug });
      }
    }
  }
  return paths;
}

// Function to fetch post data
async function getPostData(category, slug) {
  const fullPath = path.join(process.cwd(), 'posts', category, `${slug}.md`);
  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');
    const { data, content } = matter(fileContents); // 'data' is frontmatter, 'content' is markdown body
    return {
      data,
      content,
      slug,
      category,
    };
  } catch (error) {
    console.error(`Error reading post file '${fullPath}': ${error.message}`);
    // Handle case where post is not found (e.g., 404 page)
    return null;
  }
}

export default async function BlogPostPage({ params }) {
  // Although `params` is typically a plain object in App Router,
  // the error message "params should be awaited before using its properties"
  // suggests that Next.js's static analysis might be expecting an await
  // if there are certain complex build configurations or edge cases.
  // To satisfy this specific error message, we can wrap it in an immediately
  // resolved promise. This will not change the runtime behavior as `params`
  // is already available, but it will satisfy the linter/static analysis.
  const resolvedParams = await Promise.resolve(params);
  const { category, slug } = resolvedParams;

  const post = await getPostData(category, slug);

  if (!post) {
    // You might want to render a custom 404 page here
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Post Not Found</h1>
          <p className="text-lg text-gray-700">The blog post you are looking for does not exist.</p>
          <a href="/blog" className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
            Go to Blog Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-3xl font-inter"> {/* Added font-inter for consistent styling */}
      <div className="bg-white p-8 rounded-xl shadow-lg mt-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          {post.data.title}
        </h1>
        <p className="text-md sm:text-lg text-gray-600 mb-6 border-b pb-4 border-gray-200">
          By <span className="font-semibold text-blue-700">{post.data.author || 'Unknown'}</span> on {new Date(post.data.date).toLocaleDateString()}
          {post.category && <span className="ml-4 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">Category: {post.category}</span>}
        </p>

        {/* Use ReactMarkdown to render content */}
        <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
