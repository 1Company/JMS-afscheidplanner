# AfscheidPlanner

> Zelf een uitvaart organiseren, met ondersteuning.

AfscheidPlanner helpt nabestaanden stap voor stap bij het organiseren van een persoonlijk afscheid. Met duidelijke taken, transparante kosten, en de mogelijkheid om familie en vrienden in te schakelen.

## 🎯 Features

- **Stap-voor-stap begeleiding** - Complete checklist met 80+ taken
- **Taakbeheer** - Wijs taken toe aan helpers
- **Budget tracker** - Houd alle kosten bij
- **Leveranciers directory** - Vind en vergelijk leveranciers
- **Herinneringen** (Premium) - Digitale herdenkingspagina

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Neon) + Prisma
- **Auth:** Clerk
- **Payments:** Stripe
- **Hosting:** Vercel

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/1Company/JMS-afscheidplanner.git
cd JMS-afscheidplanner

# Install dependencies
npm install

# Copy env file
cp .env.example .env
# Fill in your environment variables

# Run database migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

## 📦 Project Structure

```
src/
├── app/
│   ├── (auth)/         # Auth pages (sign-in, sign-up)
│   ├── (dashboard)/    # Protected dashboard pages
│   ├── api/            # API routes
│   └── page.tsx        # Landing page
├── components/
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── lib/
│   ├── db.ts           # Database client
│   └── utils.ts        # Utility functions
└── ...
```

## 💰 Pricing

| Plan | Price | Features |
|------|-------|----------|
| Basis | €49 | Checklist, 3 helpers, budget tracker |
| Standaard | €99 | + Unlimited helpers, suppliers |
| Premium | €199 | + Memorial page, photos |

## 📝 License

MIT
