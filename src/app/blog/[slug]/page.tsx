import Link from 'next/link'
import { Heart, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { neon } from '@neondatabase/serverless'
import { notFound } from 'next/navigation'

async function getArticle(slug: string) {
  const sql = neon(process.env.DATABASE_URL!)
  const articles = await sql`
    SELECT id, slug, title, content, excerpt, "metaTitle", "metaDescription", "publishedAt"
    FROM "Article"
    WHERE slug = ${slug} AND "isPublished" = true
    LIMIT 1
  `
  
  if (articles.length === 0) return null
  
  // Update view count
  await sql`UPDATE "Article" SET views = views + 1 WHERE slug = ${slug}`
  
  return articles[0]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    return { title: 'Artikel niet gevonden' }
  }
  
  return {
    title: article.metaTitle || `${article.title} | AfscheidPlanner`,
    description: article.metaDescription || article.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)
  
  if (!article) {
    notFound()
  }

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

      {/* Article */}
      <main className="container mx-auto px-4 py-12">
        <article className="max-w-2xl mx-auto">
          <Link href="/blog" className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Terug naar alle artikelen
          </Link>
          
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {article.title}
            </h1>
            <p className="text-slate-500">
              {new Date(article.publishedAt).toLocaleDateString('nl-NL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </header>
          
          <div 
            className="prose prose-slate prose-lg max-w-none
              prose-headings:text-slate-900
              prose-p:text-slate-700
              prose-a:text-slate-900 prose-a:underline
              prose-strong:text-slate-900
              prose-ul:text-slate-700
              prose-ol:text-slate-700"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />
          
          {/* CTA */}
          <div className="mt-12 p-8 bg-slate-100 rounded-xl text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Hulp nodig bij het organiseren?
            </h3>
            <p className="text-slate-600 mb-6">
              AfscheidPlanner helpt je stap voor stap bij het regelen van een persoonlijk afscheid.
            </p>
            <Button asChild>
              <Link href="/start">Begin met plannen</Link>
            </Button>
          </div>
        </article>
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

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Line breaks to paragraphs
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p)
    .map(p => {
      if (p.startsWith('<h') || p.startsWith('<ul') || p.startsWith('<ol')) {
        return p
      }
      return `<p>${p.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
}
