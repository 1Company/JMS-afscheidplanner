import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { neon } from '@neondatabase/serverless'
import { Heart, Calendar, CheckCircle2, Circle, Clock, Users, Euro } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { TaskList } from '@/components/TaskList'

const sql = neon(process.env.DATABASE_URL!)

async function getCeremony(id: string) {
  const ceremonies = await sql`
    SELECT 
      c.*,
      u.name as "userName",
      u.email as "userEmail"
    FROM "Ceremony" c
    JOIN "User" u ON c."userId" = u.id
    WHERE c.id = ${id}
    LIMIT 1
  `
  return ceremonies[0] || null
}

async function getTasks(ceremonyId: string) {
  const tasks = await sql`
    SELECT *
    FROM "Task"
    WHERE "ceremonyId" = ${ceremonyId}
    ORDER BY 
      CASE status 
        WHEN 'TODO' THEN 1 
        WHEN 'IN_PROGRESS' THEN 2 
        WHEN 'WAITING' THEN 3 
        WHEN 'COMPLETED' THEN 4 
        WHEN 'SKIPPED' THEN 5 
      END,
      "dueDate" ASC NULLS LAST,
      "createdAt" ASC
  `
  return tasks
}

async function getHelpers(ceremonyId: string) {
  const helpers = await sql`
    SELECT * FROM "Helper"
    WHERE "ceremonyId" = ${ceremonyId}
  `
  return helpers
}

const categoryLabels: Record<string, string> = {
  LEGAL: 'Wettelijk',
  PLANNING: 'Planning',
  LOCATION: 'Locatie',
  CEREMONY: 'Ceremonie',
  CATERING: 'Catering',
  FLOWERS: 'Bloemen',
  TRANSPORT: 'Vervoer',
  PRINTING: 'Drukwerk',
  COMMUNICATION: 'Communicatie',
  FINANCIAL: 'Financieel',
  AFTERCARE: 'Na de uitvaart',
  OTHER: 'Overig',
}

const categoryColors: Record<string, string> = {
  LEGAL: 'bg-red-100 text-red-800',
  PLANNING: 'bg-blue-100 text-blue-800',
  LOCATION: 'bg-purple-100 text-purple-800',
  CEREMONY: 'bg-pink-100 text-pink-800',
  CATERING: 'bg-orange-100 text-orange-800',
  FLOWERS: 'bg-green-100 text-green-800',
  TRANSPORT: 'bg-yellow-100 text-yellow-800',
  PRINTING: 'bg-indigo-100 text-indigo-800',
  COMMUNICATION: 'bg-cyan-100 text-cyan-800',
  FINANCIAL: 'bg-emerald-100 text-emerald-800',
  AFTERCARE: 'bg-slate-100 text-slate-800',
  OTHER: 'bg-gray-100 text-gray-800',
}

export default async function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // Check session
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('ap_session')
  
  if (!sessionCookie) {
    redirect('/')
  }

  const ceremony = await getCeremony(id)
  
  if (!ceremony) {
    redirect('/')
  }

  const tasks = await getTasks(id)
  const helpers = await getHelpers(id)

  // Calculate progress
  const completedTasks = tasks.filter((t: any) => t.status === 'COMPLETED' || t.status === 'SKIPPED')
  const progress = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0

  // Group tasks by category
  const tasksByCategory = tasks.reduce((acc: any, task: any) => {
    const cat = task.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(task)
    return acc
  }, {})

  // Days until ceremony
  const daysUntil = ceremony.ceremonyDate 
    ? Math.ceil((new Date(ceremony.ceremonyDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-slate-700" />
            <span className="font-semibold text-xl text-slate-800">AfscheidPlanner</span>
          </Link>
          <div className="text-sm text-slate-600">
            {ceremony.userEmail}
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Uitvaart van {ceremony.deceasedName}
            </h1>
            <div className="flex flex-wrap gap-4 text-slate-600">
              {ceremony.ceremonyDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(ceremony.ceremonyDate).toLocaleDateString('nl-NL', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  {daysUntil !== null && daysUntil > 0 && (
                    <Badge variant="secondary">nog {daysUntil} dagen</Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{completedTasks.length}</div>
                    <div className="text-sm text-slate-500">Afgerond</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Circle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{tasks.length - completedTasks.length}</div>
                    <div className="text-sm text-slate-500">Te doen</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{helpers.length}</div>
                    <div className="text-sm text-slate-500">Helpers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{daysUntil ?? '-'}</div>
                    <div className="text-sm text-slate-500">Dagen</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Voortgang</span>
                <span className="text-sm text-slate-500">{progress}% voltooid</span>
              </div>
              <Progress value={progress} className="h-3" />
            </CardContent>
          </Card>

          {/* Tasks by category */}
          <div className="space-y-6">
            {Object.entries(tasksByCategory).map(([category, categoryTasks]: [string, any]) => (
              <Card key={category}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Badge className={categoryColors[category] || 'bg-gray-100'}>
                        {categoryLabels[category] || category}
                      </Badge>
                      <span className="text-sm font-normal text-slate-500">
                        {categoryTasks.filter((t: any) => t.status === 'COMPLETED').length}/{categoryTasks.length}
                      </span>
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <TaskList tasks={categoryTasks} ceremonyId={id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
