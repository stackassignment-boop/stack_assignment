import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const db = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./db/custom.db',
    },
  },
})

async function exportBlogs() {
  try {
    const blogs = await db.blog.findMany({
      include: {
        author: true,
      },
    })

    console.log(`Found ${blogs.length} blogs in local database`)
    
    if (blogs.length === 0) {
      console.log('No blogs found in local database')
      return
    }

    const exportData = blogs.map(blog => ({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      featuredImage: blog.featuredImage,
      category: blog.category,
      tags: blog.tags,
      isPublished: blog.isPublished,
      publishedAt: blog.publishedAt,
      authorEmail: blog.author?.email,
    }))

    fs.writeFileSync(
      './blogs-export.json',
      JSON.stringify(exportData, null, 2)
    )
    
    console.log('✅ Blogs exported to blogs-export.json')
    console.log('\nBlog slugs:')
    exportData.forEach((blog, i) => {
      console.log(`${i + 1}. ${blog.slug} (${blog.isPublished ? 'published' : 'draft'})`)
    })
  } catch (error) {
    console.error('Error exporting blogs:', error)
  } finally {
    await db.$disconnect()
  }
}

exportBlogs()
