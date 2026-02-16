/**
 * Seed data for task templates
 * Run: npx tsx prisma/seed-tasks.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const taskTemplates = [
  // LEGAL - Wettelijke verplichtingen
  {
    title: 'Overlijden melden bij huisarts of arts',
    description: 'De behandelend arts moet het overlijden vaststellen en een verklaring van overlijden afgeven.',
    category: 'LEGAL',
    daysBeforeCeremony: null,
    isRequired: true,
    isLegal: true,
    sortOrder: 1,
  },
  {
    title: 'Overlijdensakte ophalen bij gemeente',
    description: 'Ga met de verklaring van overlijden naar de gemeente om de officiële overlijdensakte te krijgen. Dit moet binnen 5 werkdagen.',
    category: 'LEGAL',
    daysBeforeCeremony: null,
    isRequired: true,
    isLegal: true,
    sortOrder: 2,
  },
  {
    title: 'Verlof tot begraven of cremeren aanvragen',
    description: 'De gemeente geeft toestemming voor begraving of crematie. Zonder dit verlof mag de uitvaart niet plaatsvinden.',
    category: 'LEGAL',
    daysBeforeCeremony: null,
    isRequired: true,
    isLegal: true,
    sortOrder: 3,
  },
  {
    title: 'Wilsbeschikking/testament controleren',
    description: 'Check of de overledene wensen heeft vastgelegd over de uitvaart (begraven/cremeren, locatie, etc.).',
    category: 'LEGAL',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 4,
  },
  
  // PLANNING - Planning & organisatie
  {
    title: 'Datum en tijd uitvaart bepalen',
    description: 'Kies een datum voor de uitvaart. Let op: begraving of crematie moet plaatsvinden op zijn vroegst 36 uur en uiterlijk 6 werkdagen na overlijden.',
    category: 'PLANNING',
    daysBeforeCeremony: null,
    isRequired: true,
    isLegal: true,
    sortOrder: 10,
  },
  {
    title: 'Type uitvaart kiezen',
    description: 'Kies tussen begraving, crematie, of een alternatieve vorm zoals natuurbegraving.',
    category: 'PLANNING',
    daysBeforeCeremony: null,
    isRequired: true,
    isLegal: false,
    sortOrder: 11,
  },
  {
    title: 'Draaiboek maken voor de dag',
    description: 'Maak een tijdschema voor de uitvaartdag: ontvangst, ceremonie, condoleance, etc.',
    category: 'PLANNING',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 12,
  },
  
  // LOCATION - Locatie & faciliteiten
  {
    title: 'Uitvaartlocatie boeken',
    description: 'Boek een aula, kerk, of andere locatie voor de ceremonie.',
    category: 'LOCATION',
    daysBeforeCeremony: 3,
    isRequired: false,
    isLegal: false,
    sortOrder: 20,
  },
  {
    title: 'Begraafplaats of crematorium regelen',
    description: 'Regel een graf of crematie. Vraag naar beschikbaarheid en kosten.',
    category: 'LOCATION',
    daysBeforeCeremony: 3,
    isRequired: true,
    isLegal: false,
    sortOrder: 21,
  },
  {
    title: 'Locatie voor condoleance boeken',
    description: 'Regel een locatie waar gasten na de ceremonie kunnen samenkomen (restaurant, zalencentrum, of thuis).',
    category: 'LOCATION',
    daysBeforeCeremony: 3,
    isRequired: false,
    isLegal: false,
    sortOrder: 22,
  },
  
  // CEREMONY - De ceremonie
  {
    title: 'Spreker of voorganger regelen',
    description: 'Kies iemand die de ceremonie leidt: een spreker, dominee, priester, of familielid.',
    category: 'CEREMONY',
    daysBeforeCeremony: 3,
    isRequired: false,
    isLegal: false,
    sortOrder: 30,
  },
  {
    title: 'Speeches en teksten voorbereiden',
    description: 'Vraag familieleden of vrienden om een toespraak te houden. Verzamel teksten, gedichten of anekdotes.',
    category: 'CEREMONY',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 31,
  },
  {
    title: 'Muziek uitkiezen',
    description: 'Kies muziek voor de ceremonie: inloop, tijdens de dienst, en uitloop.',
    category: 'CEREMONY',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 32,
  },
  {
    title: 'Foto\'s en video\'s verzamelen',
    description: 'Verzamel foto\'s voor een slideshow of fotoboek. Vraag familie om digitale bestanden.',
    category: 'CEREMONY',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 33,
  },
  
  // CATERING - Eten & drinken
  {
    title: 'Catering regelen voor condoleance',
    description: 'Bestel hapjes, broodjes, koffie en thee voor na de ceremonie.',
    category: 'CATERING',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 40,
  },
  {
    title: 'Aantal gasten inschatten',
    description: 'Maak een inschatting van het aantal gasten voor catering en locatie.',
    category: 'CATERING',
    daysBeforeCeremony: 3,
    isRequired: false,
    isLegal: false,
    sortOrder: 41,
  },
  
  // FLOWERS - Bloemen & decoratie
  {
    title: 'Bloemstuk voor op kist bestellen',
    description: 'Bestel een rouwstuk voor op de kist of bij de urn.',
    category: 'FLOWERS',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 50,
  },
  {
    title: 'Extra bloemdecoratie regelen',
    description: 'Bestel eventueel extra bloemen voor de locatie.',
    category: 'FLOWERS',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 51,
  },
  
  // TRANSPORT - Vervoer
  {
    title: 'Rouwvervoer regelen',
    description: 'Regel vervoer voor de overledene: rouwauto of alternatief (bijv. eigen auto met kist).',
    category: 'TRANSPORT',
    daysBeforeCeremony: 2,
    isRequired: true,
    isLegal: false,
    sortOrder: 60,
  },
  {
    title: 'Vervoer voor familie regelen',
    description: 'Denk na over vervoer voor familieleden die niet zelf kunnen rijden.',
    category: 'TRANSPORT',
    daysBeforeCeremony: 1,
    isRequired: false,
    isLegal: false,
    sortOrder: 61,
  },
  
  // PRINTING - Drukwerk
  {
    title: 'Rouwkaarten ontwerpen en versturen',
    description: 'Maak rouwkaarten met datum, tijd en locatie. Verstuur of mail naar familie en vrienden.',
    category: 'PRINTING',
    daysBeforeCeremony: 3,
    isRequired: false,
    isLegal: false,
    sortOrder: 70,
  },
  {
    title: 'Liturgie/programma drukken',
    description: 'Maak een programmaboekje voor de ceremonie met teksten, liedjes en foto\'s.',
    category: 'PRINTING',
    daysBeforeCeremony: 1,
    isRequired: false,
    isLegal: false,
    sortOrder: 71,
  },
  {
    title: 'Bedankkaartjes bestellen',
    description: 'Bestel kaartjes om mensen na de uitvaart te bedanken.',
    category: 'PRINTING',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 72,
  },
  
  // COMMUNICATION - Communicatie
  {
    title: 'Naaste familie informeren',
    description: 'Breng direct familie op de hoogte van het overlijden.',
    category: 'COMMUNICATION',
    daysBeforeCeremony: null,
    isRequired: true,
    isLegal: false,
    sortOrder: 80,
  },
  {
    title: 'Werkgever informeren',
    description: 'Informeer de werkgever van de overledene (en eventueel je eigen werkgever voor verlof).',
    category: 'COMMUNICATION',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 81,
  },
  {
    title: 'Advertentie in krant plaatsen',
    description: 'Plaats eventueel een overlijdensadvertentie in de lokale of landelijke krant.',
    category: 'COMMUNICATION',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 82,
  },
  {
    title: 'Social media bericht plaatsen',
    description: 'Overweeg een bericht op social media van de overledene of eigen pagina.',
    category: 'COMMUNICATION',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 83,
  },
  
  // COFFIN - Kist of urn
  {
    title: 'Kist of urn uitkiezen',
    description: 'Kies een kist (voor begraving of crematie) of urn (na crematie).',
    category: 'OTHER',
    daysBeforeCeremony: 3,
    isRequired: true,
    isLegal: false,
    sortOrder: 90,
  },
  {
    title: 'Kleding voor overledene kiezen',
    description: 'Kies kleding waarin de overledene opgebaard en begraven/gecremeerd wordt.',
    category: 'OTHER',
    daysBeforeCeremony: 2,
    isRequired: false,
    isLegal: false,
    sortOrder: 91,
  },
  
  // FINANCIAL - Financieel
  {
    title: 'Uitvaartverzekering controleren',
    description: 'Check of de overledene een uitvaartverzekering had en claim deze.',
    category: 'FINANCIAL',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 100,
  },
  {
    title: 'Bankzaken regelen',
    description: 'Informeer de bank over het overlijden. Vraag naar de procedure voor de rekening.',
    category: 'FINANCIAL',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 101,
  },
  {
    title: 'Erfenis en notaris',
    description: 'Neem contact op met een notaris als er een testament is of als de erfenis moet worden afgehandeld.',
    category: 'FINANCIAL',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 102,
  },
  
  // AFTERCARE - Na de uitvaart
  {
    title: 'Abonnementen opzeggen',
    description: 'Zeg abonnementen, lidmaatschappen en contracten op naam van de overledene op.',
    category: 'AFTERCARE',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 110,
  },
  {
    title: 'Huur of hypotheek regelen',
    description: 'Informeer verhuurder of hypotheekverstrekker over het overlijden.',
    category: 'AFTERCARE',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 111,
  },
  {
    title: 'Belastingaangifte erfenis',
    description: 'Doe aangifte erfbelasting bij de Belastingdienst indien nodig.',
    category: 'AFTERCARE',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 112,
  },
  {
    title: 'Digitale nalatenschap beheren',
    description: 'Beheer social media accounts, email, en andere online accounts van de overledene.',
    category: 'AFTERCARE',
    daysBeforeCeremony: null,
    isRequired: false,
    isLegal: false,
    sortOrder: 113,
  },
]

async function main() {
  console.log('Seeding task templates...')
  
  for (const template of taskTemplates) {
    await prisma.taskTemplate.create({
      data: template,
    })
  }
  
  console.log(`✅ Created ${taskTemplates.length} task templates`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
