import { PrismaClient } from '@prisma/client'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set.')
}

const db = new PrismaClient()

async function checkNeonDatabase() {
  try {
    console.log('🔍 Checking Neon PostgreSQL database...\n')
    
    // Check users
    const users = await db.user.findMany()
    console.log(`👥 Users: ${users.length}`)
    users.forEach((user, i) => {
      console.log(`   ${i + 1}. ${user.email} (${user.role})`)
    })
    
    // Check blogs
    const blogs = await db.blog.findMany()
    console.log(`\n📝 Blogs: ${blogs.length}`)
    blogs.forEach((blog, i) => {
      console.log(`   ${i + 1}. ${blog.slug} - "${blog.title}" (${blog.isPublished ? 'published' : 'draft'})`)
    })
    
    // Check samples
    const samples = await db.sample.findMany()
    console.log(`\n📄 Samples: ${samples.length}`)
    samples.forEach((sample, i) => {
      console.log(`   ${i + 1}. ${sample.slug} - "${sample.title}" (${sample.isPublished ? 'published' : 'draft'})`)
    })
    
    // Check services
    const services = await db.service.findMany()
    console.log(`\n🔧 Services: ${services.length}`)
    services.forEach((service, i) => {
      console.log(`   ${i + 1}. ${service.slug} - "${service.title}" (${service.isActive ? 'active' : 'inactive'})`)
    })
    
    console.log('\n✅ Database check complete')
    
  } catch (error) {
    console.error('❌ Error checking database:', error)
  } finally {
    await db.$disconnect()
  }
}

checkNeonDatabase()
