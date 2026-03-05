import { neon } from '@neondatabase/serverless';
import { notFound } from 'next/navigation';

// 1. Fetch data from Neon DB based on the slug
async function getPost(slug: string) {
  // Ensure DATABASE_URL is set in Vercel Environment Variables
  const sql = neon(process.env.DATABASE_URL!);
  
  // Adjust table name 'posts' and column names if your DB is different
  const result = await sql`
    SELECT id, title, content, slug, updated_at, description 
    FROM posts 
    WHERE slug = ${slug}
    LIMIT 1
  `;
  
  return result[0];
}

// 2. Generate Meta Tags for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  if (!post) return {};

  return {
    title: post.title,
    description: post.description || post.content?.substring(0, 160) || '',
  };
}

// 3. The Page Component
export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  // If slug doesn't exist in DB, show 404
  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto p-6 max-w-3xl min-h-screen">
      <article>
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          {post.title}
        </h1>
        
        {/* Render content. Assuming HTML stored in DB. 
            If Markdown, use 'react-markdown' */}
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
        </div>
      </article>
    </main>
  );
}
