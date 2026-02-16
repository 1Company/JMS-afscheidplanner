/**
 * Seed data for task templates
 * Run: DATABASE_URL=... npx tsx prisma/seed-tasks.ts
 */

import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Qi7Wp5hArXzl@ep-winter-boat-aiyi9y3i-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require'

const sql = neon(DATABASE_URL)

const taskTemplates = [
  // LEGAL - Wettelijke verplichtingen
  { title: 'Overlijden melden bij huisarts of arts', description: 'De behandelend arts moet het overlijden vaststellen en een verklaring van overlijden afgeven.', category: 'LEGAL', daysBeforeCeremony: null, isRequired: true, isLegal: true, sortOrder: 1 },
  { title: 'Overlijdensakte ophalen bij gemeente', description: 'Ga met de verklaring van overlijden naar de gemeente om de officiële overlijdensakte te krijgen. Dit moet binnen 5 werkdagen.', category: 'LEGAL', daysBeforeCeremony: null, isRequired: true, isLegal: true, sortOrder: 2 },
  { title: 'Verlof tot begraven of cremeren aanvragen', description: 'De gemeente geeft toestemming voor begraving of crematie. Zonder dit verlof mag de uitvaart niet plaatsvinden.', category: 'LEGAL', daysBeforeCeremony: null, isRequired: true, isLegal: true, sortOrder: 3 },
  { title: 'Wilsbeschikking/testament controleren', description: 'Check of de overledene wensen heeft vastgelegd over de uitvaart.', category: 'LEGAL', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 4 },
  
  // PLANNING
  { title: 'Datum en tijd uitvaart bepalen', description: 'Kies een datum voor de uitvaart. Begraving of crematie moet plaatsvinden binnen 6 werkdagen na overlijden.', category: 'PLANNING', daysBeforeCeremony: null, isRequired: true, isLegal: true, sortOrder: 10 },
  { title: 'Type uitvaart kiezen', description: 'Kies tussen begraving, crematie, of natuurbegraving.', category: 'PLANNING', daysBeforeCeremony: null, isRequired: true, isLegal: false, sortOrder: 11 },
  { title: 'Draaiboek maken voor de dag', description: 'Maak een tijdschema voor de uitvaartdag.', category: 'PLANNING', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 12 },
  
  // LOCATION
  { title: 'Uitvaartlocatie boeken', description: 'Boek een aula, kerk, of andere locatie voor de ceremonie.', category: 'LOCATION', daysBeforeCeremony: 3, isRequired: false, isLegal: false, sortOrder: 20 },
  { title: 'Begraafplaats of crematorium regelen', description: 'Regel een graf of crematie.', category: 'LOCATION', daysBeforeCeremony: 3, isRequired: true, isLegal: false, sortOrder: 21 },
  { title: 'Locatie voor condoleance boeken', description: 'Regel een locatie waar gasten na de ceremonie kunnen samenkomen.', category: 'LOCATION', daysBeforeCeremony: 3, isRequired: false, isLegal: false, sortOrder: 22 },
  
  // CEREMONY
  { title: 'Spreker of voorganger regelen', description: 'Kies iemand die de ceremonie leidt.', category: 'CEREMONY', daysBeforeCeremony: 3, isRequired: false, isLegal: false, sortOrder: 30 },
  { title: 'Speeches en teksten voorbereiden', description: 'Vraag familieleden of vrienden om een toespraak te houden.', category: 'CEREMONY', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 31 },
  { title: 'Muziek uitkiezen', description: 'Kies muziek voor de ceremonie.', category: 'CEREMONY', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 32 },
  { title: 'Foto\'s en video\'s verzamelen', description: 'Verzamel foto\'s voor een slideshow of fotoboek.', category: 'CEREMONY', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 33 },
  
  // CATERING
  { title: 'Catering regelen voor condoleance', description: 'Bestel hapjes, broodjes, koffie en thee.', category: 'CATERING', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 40 },
  { title: 'Aantal gasten inschatten', description: 'Maak een inschatting van het aantal gasten.', category: 'CATERING', daysBeforeCeremony: 3, isRequired: false, isLegal: false, sortOrder: 41 },
  
  // FLOWERS
  { title: 'Bloemstuk voor op kist bestellen', description: 'Bestel een rouwstuk voor op de kist of bij de urn.', category: 'FLOWERS', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 50 },
  { title: 'Extra bloemdecoratie regelen', description: 'Bestel eventueel extra bloemen voor de locatie.', category: 'FLOWERS', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 51 },
  
  // TRANSPORT
  { title: 'Rouwvervoer regelen', description: 'Regel vervoer voor de overledene: rouwauto of alternatief.', category: 'TRANSPORT', daysBeforeCeremony: 2, isRequired: true, isLegal: false, sortOrder: 60 },
  { title: 'Vervoer voor familie regelen', description: 'Denk na over vervoer voor familieleden.', category: 'TRANSPORT', daysBeforeCeremony: 1, isRequired: false, isLegal: false, sortOrder: 61 },
  
  // PRINTING
  { title: 'Rouwkaarten ontwerpen en versturen', description: 'Maak rouwkaarten met datum, tijd en locatie.', category: 'PRINTING', daysBeforeCeremony: 3, isRequired: false, isLegal: false, sortOrder: 70 },
  { title: 'Liturgie/programma drukken', description: 'Maak een programmaboekje voor de ceremonie.', category: 'PRINTING', daysBeforeCeremony: 1, isRequired: false, isLegal: false, sortOrder: 71 },
  { title: 'Bedankkaartjes bestellen', description: 'Bestel kaartjes om mensen na de uitvaart te bedanken.', category: 'PRINTING', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 72 },
  
  // COMMUNICATION
  { title: 'Naaste familie informeren', description: 'Breng direct familie op de hoogte van het overlijden.', category: 'COMMUNICATION', daysBeforeCeremony: null, isRequired: true, isLegal: false, sortOrder: 80 },
  { title: 'Werkgever informeren', description: 'Informeer de werkgever van de overledene.', category: 'COMMUNICATION', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 81 },
  { title: 'Advertentie in krant plaatsen', description: 'Plaats eventueel een overlijdensadvertentie.', category: 'COMMUNICATION', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 82 },
  
  // OTHER
  { title: 'Kist of urn uitkiezen', description: 'Kies een kist of urn.', category: 'OTHER', daysBeforeCeremony: 3, isRequired: true, isLegal: false, sortOrder: 90 },
  { title: 'Kleding voor overledene kiezen', description: 'Kies kleding voor de overledene.', category: 'OTHER', daysBeforeCeremony: 2, isRequired: false, isLegal: false, sortOrder: 91 },
  
  // FINANCIAL
  { title: 'Uitvaartverzekering controleren', description: 'Check of de overledene een uitvaartverzekering had.', category: 'FINANCIAL', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 100 },
  { title: 'Bankzaken regelen', description: 'Informeer de bank over het overlijden.', category: 'FINANCIAL', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 101 },
  { title: 'Erfenis en notaris', description: 'Neem contact op met een notaris indien nodig.', category: 'FINANCIAL', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 102 },
  
  // AFTERCARE
  { title: 'Abonnementen opzeggen', description: 'Zeg abonnementen en contracten op.', category: 'AFTERCARE', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 110 },
  { title: 'Huur of hypotheek regelen', description: 'Informeer verhuurder of hypotheekverstrekker.', category: 'AFTERCARE', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 111 },
  { title: 'Belastingaangifte erfenis', description: 'Doe aangifte erfbelasting indien nodig.', category: 'AFTERCARE', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 112 },
  { title: 'Digitale nalatenschap beheren', description: 'Beheer social media en online accounts.', category: 'AFTERCARE', daysBeforeCeremony: null, isRequired: false, isLegal: false, sortOrder: 113 },
]

async function main() {
  console.log('Seeding task templates...')
  
  for (const template of taskTemplates) {
    await sql`
      INSERT INTO "TaskTemplate" (id, title, description, category, "daysBeforeCeremony", "isRequired", "isLegal", "sortOrder", "createdAt")
      VALUES (
        gen_random_uuid()::text,
        ${template.title},
        ${template.description},
        ${template.category}::"TaskCategory",
        ${template.daysBeforeCeremony},
        ${template.isRequired},
        ${template.isLegal},
        ${template.sortOrder},
        NOW()
      )
      ON CONFLICT DO NOTHING
    `
  }
  
  console.log(`✅ Created ${taskTemplates.length} task templates`)
}

main().catch(console.error)
