import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

// Secret key for cron job authentication
const CRON_SECRET = process.env.CRON_SECRET || 'afscheid-cron-2026'

export async function POST(request: NextRequest) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, slug, content, excerpt, metaDescription } = body

    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, content' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const existing = await sql`SELECT id FROM "Article" WHERE slug = ${slug}`
    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Article with this slug already exists' },
        { status: 409 }
      )
    }

    // Create article
    const result = await sql`
      INSERT INTO "Article" (id, slug, title, content, excerpt, "metaDescription", "isPublished", "publishedAt", "createdAt", "updatedAt")
      VALUES (
        gen_random_uuid()::text,
        ${slug},
        ${title},
        ${content},
        ${excerpt || null},
        ${metaDescription || null},
        true,
        NOW(),
        NOW(),
        NOW()
      )
      RETURNING id, slug, title
    `

    return NextResponse.json({
      success: true,
      article: result[0]
    })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const articles = await sql`
      SELECT id, slug, title, excerpt, "publishedAt", views
      FROM "Article"
      WHERE "isPublished" = true
      ORDER BY "publishedAt" DESC
      LIMIT 50
    `
    
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
