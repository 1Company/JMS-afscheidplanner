import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'
import { randomBytes } from 'crypto'

const sql = neon(process.env.DATABASE_URL!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      deceasedName,
      deceasedDeathDate,
      ceremonyType,
      ceremonyDate,
      userName,
      userEmail,
      userPhone,
    } = body

    // Validatie
    if (!deceasedName || !deceasedDeathDate || !userName || !userEmail) {
      return NextResponse.json(
        { error: 'Vul alle verplichte velden in' },
        { status: 400 }
      )
    }

    // Check of email al bestaat
    const existingUser = await sql`
      SELECT id FROM "User" WHERE email = ${userEmail}
    `

    let userId: string

    if (existingUser.length > 0) {
      userId = existingUser[0].id
    } else {
      // Maak nieuwe user aan
      const newUser = await sql`
        INSERT INTO "User" (id, email, name, phone, "createdAt", "updatedAt")
        VALUES (
          gen_random_uuid()::text,
          ${userEmail},
          ${userName},
          ${userPhone || null},
          NOW(),
          NOW()
        )
        RETURNING id
      `
      userId = newUser[0].id
    }

    // Maak ceremony aan
    const ceremony = await sql`
      INSERT INTO "Ceremony" (
        id,
        "userId",
        "deceasedName",
        "deceasedDeathDate",
        "ceremonyDate",
        "ceremonyType",
        status,
        package,
        "createdAt",
        "updatedAt"
      )
      VALUES (
        gen_random_uuid()::text,
        ${userId},
        ${deceasedName},
        ${deceasedDeathDate}::timestamp,
        ${ceremonyDate ? `${ceremonyDate}` : null}::timestamp,
        ${ceremonyType || 'BURIAL'}::"CeremonyType",
        'ACTIVE'::"CeremonyStatus",
        'STANDARD'::"PackageType",
        NOW(),
        NOW()
      )
      RETURNING id
    `

    const ceremonyId = ceremony[0].id

    // Kopieer taak templates naar deze ceremony
    const templates = await sql`
      SELECT id, title, description, category, "daysBeforeCeremony", "isRequired"
      FROM "TaskTemplate"
      ORDER BY "sortOrder"
    `

    // Bereken due dates op basis van ceremonyDate
    const ceremonyDateObj = ceremonyDate ? new Date(ceremonyDate) : null

    for (const template of templates) {
      let dueDate = null
      if (ceremonyDateObj && template.daysBeforeCeremony) {
        const due = new Date(ceremonyDateObj)
        due.setDate(due.getDate() - template.daysBeforeCeremony)
        dueDate = due.toISOString()
      }

      await sql`
        INSERT INTO "Task" (
          id,
          "ceremonyId",
          "templateId",
          title,
          description,
          category,
          status,
          "dueDate",
          "createdAt",
          "updatedAt"
        )
        VALUES (
          gen_random_uuid()::text,
          ${ceremonyId},
          ${template.id},
          ${template.title},
          ${template.description},
          ${template.category}::"TaskCategory",
          'TODO'::"TaskStatus",
          ${dueDate}::timestamp,
          NOW(),
          NOW()
        )
      `
    }

    // Genereer een simpele access token voor deze sessie
    const accessToken = randomBytes(32).toString('hex')

    // Sla token op (we gebruiken een cookie in de response)
    const response = NextResponse.json({
      success: true,
      ceremonyId,
      userId,
    })

    // Set cookie voor authenticatie (simpele versie zonder Clerk)
    response.cookies.set('ap_session', JSON.stringify({
      userId,
      ceremonyId,
      email: userEmail,
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 dagen
      path: '/',
    })

    return response
  } catch (error) {
    console.error('Error creating ceremony:', error)
    return NextResponse.json(
      { error: 'Er ging iets mis bij het aanmaken' },
      { status: 500 }
    )
  }
}
