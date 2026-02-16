import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, notes } = body

    // Build update query
    if (status) {
      const completedAt = status === 'COMPLETED' ? 'NOW()' : 'NULL'
      
      await sql`
        UPDATE "Task"
        SET 
          status = ${status}::"TaskStatus",
          "completedAt" = ${status === 'COMPLETED' ? new Date().toISOString() : null}::timestamp,
          "updatedAt" = NOW()
        WHERE id = ${id}
      `
    }

    if (notes !== undefined) {
      await sql`
        UPDATE "Task"
        SET notes = ${notes}, "updatedAt" = NOW()
        WHERE id = ${id}
      `
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    )
  }
}
