import Link from 'next/link'
import { Heart, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { neon } from '@neondatabase/serverless'

async function getArticles() {
  const sql = neon(process.env.DATABASE_URL!)
  const articles = await sql`
    SELECT id, slug, title, excerpt, "publishedAt"
    FROM "Article"
    WHERE "isPublished" = true
    ORDER BY "publishedAt" DESC
    LIMIT 20
  `
  return articles
}

export default async function BlogPage() {
  const articles = await getArticles()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-slate-700" />
            <span className="font-semibold text-xl text-slate-800">AfscheidPlanner</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#hoe-werkt-het" className="text-slate-600 hover:text-slate-900">
              Hoe werkt het
            </Link>
            <Link href="/#prijzen" className="text-slate-600 hover:text-slate-900">
              Prijzen
            </Link>
            <Link href="/blog" className="text-slate-900 font-medium">
              Blog
            </Link>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Artikelen & Hulp
          </h1>
          <p className="text-xl text-slate-600 mb-12">
            Praktische informatie en persoonlijke verhalen over het organiseren van een uitvaart.
          </p>

          {articles.length === 0 ? (
            <p className="text-slate-500 text-center py-12">
              Er zijn nog geen artikelen gepubliceerd.
            </p>
          ) : (
            <div className="space-y-6">
              {articles.map((article: any) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <Card className="hover:border-slate-300 transition-colors cursor-pointer">
                    <CardContent className="py-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-xl font-semibold text-slate-900 mb-2">
                            {article.title}
                          </h2>
                          {article.excerpt && (
                            <p className="text-slate-600 line-clamp-2">
                              {article.excerpt}
                            </p>
                          )}
                          <p className="text-sm text-slate-400 mt-3">
                            {new Date(article.publishedAt).toLocaleDateString('nl-NL', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-slate-700" />
              <span className="font-semibold text-slate-800">AfscheidPlanner</span>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} AfscheidPlanner
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
