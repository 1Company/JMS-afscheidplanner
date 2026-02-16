import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HeroSlider } from '@/components/HeroSlider'
import { 
  CheckCircle2, 
  Users, 
  ClipboardList, 
  Euro,
  Heart,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-slate-700" />
            <span className="font-semibold text-xl text-slate-800">AfscheidPlanner</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#hoe-werkt-het" className="text-slate-600 hover:text-slate-900">
              Hoe werkt het
            </Link>
            <Link href="#prijzen" className="text-slate-600 hover:text-slate-900">
              Prijzen
            </Link>
            <Link href="#faq" className="text-slate-600 hover:text-slate-900">
              Veelgestelde vragen
            </Link>
          </nav>
          <Button asChild>
            <Link href="/start">Start nu</Link>
          </Button>
        </div>
      </header>

      {/* Hero with Background Slider */}
      <HeroSlider>
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Zelf een uitvaart organiseren,{' '}
            <span className="text-slate-600">met ondersteuning</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            AfscheidPlanner helpt je stap voor stap bij het organiseren van een 
            persoonlijk afscheid. Duidelijke taken, transparante kosten, en hulp 
            van familie en vrienden.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/start">
                Begin met plannen
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/80 hover:bg-white" asChild>
              <Link href="#hoe-werkt-het">
                Bekijk hoe het werkt
              </Link>
            </Button>
          </div>
        </div>
      </HeroSlider>

      {/* Trust indicators */}
      <section className="border-y bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-slate-600">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>100% privacy</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>Direct beginnen</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Geen verborgen kosten</span>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="hoe-werkt-het" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
          Waarom zelf organiseren?
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Steeds meer mensen kiezen ervoor om zelf de uitvaart te regelen. 
          Het is persoonlijker, voordeliger, en geeft rust in een moeilijke tijd.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <ClipboardList className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                Stap-voor-stap begeleiding
              </h3>
              <p className="text-slate-600">
                Een complete checklist met alle taken, van wettelijke verplichtingen 
                tot praktische zaken. Je weet precies wat je moet doen.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                Samen met familie
              </h3>
              <p className="text-slate-600">
                Nodig familie en vrienden uit om te helpen. Verdeel taken en houd 
                iedereen op de hoogte via één overzichtelijk platform.
              </p>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                <Euro className="h-6 w-6 text-slate-700" />
              </div>
              <h3 className="font-semibold text-lg text-slate-900 mb-2">
                Transparante kosten
              </h3>
              <p className="text-slate-600">
                Houd alle uitgaven bij en vergelijk prijzen van leveranciers. 
                Geen verrassingen, maar controle over je budget.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Hoe werkt AfscheidPlanner?
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: '1',
                  title: 'Maak een account',
                  description: 'Vul de basisgegevens in en krijg direct toegang tot je persoonlijke checklist.'
                },
                {
                  step: '2',
                  title: 'Doorloop de taken',
                  description: 'Werk de taken één voor één af. Van wettelijke verplichtingen tot het regelen van bloemen.'
                },
                {
                  step: '3',
                  title: 'Betrek je naasten',
                  description: 'Nodig familie en vrienden uit om te helpen. Wijs taken toe en werk samen.'
                },
                {
                  step: '4',
                  title: 'Houd kosten bij',
                  description: 'Registreer alle uitgaven en houd overzicht over je budget.'
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="prijzen" className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
          Eenvoudige, eerlijke prijzen
        </h2>
        <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
          Eenmalige betaling, geen abonnement. Je krijgt toegang tot alles wat je nodig hebt.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Basis */}
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Basis</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">€49</div>
                <div className="text-slate-500 text-sm">eenmalig</div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Complete takenlijst (80+ taken)',
                  'Budget tracker',
                  'Tot 3 helpers uitnodigen',
                  'Leveranciers directory',
                  'Email notificaties'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/start?plan=basic">Kies Basis</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Standaard */}
          <Card className="border-slate-900 border-2 relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded-full text-sm">
              Meest gekozen
            </div>
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Standaard</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">€99</div>
                <div className="text-slate-500 text-sm">eenmalig</div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Alles van Basis, plus:',
                  'Onbeperkt helpers',
                  'Leveranciers vergelijken',
                  'Documenten opslaan',
                  'Prioriteit support'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" asChild>
                <Link href="/start?plan=standard">Kies Standaard</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium */}
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg text-slate-900 mb-2">Premium</h3>
                <div className="text-4xl font-bold text-slate-900 mb-1">€199</div>
                <div className="text-slate-500 text-sm">eenmalig</div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Alles van Standaard, plus:',
                  'Digitale herdenkingspagina',
                  'Foto\'s verzamelen van gasten',
                  'Condoleanceregister',
                  '1 jaar online (verlengbaar)'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-600">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/start?plan=premium">Kies Premium</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Veelgestelde vragen
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'Mag ik zelf een uitvaart organiseren?',
                a: 'Ja, in Nederland mag je zelf de uitvaart van een naaste organiseren. Je bent niet verplicht om een uitvaartondernemer in te schakelen. Wel zijn er wettelijke regels waar je je aan moet houden, zoals de termijn van begraven of cremeren.'
              },
              {
                q: 'Hoeveel kan ik besparen?',
                a: 'Een gemiddelde uitvaart via een uitvaartondernemer kost €7.000 tot €10.000. Door zelf te organiseren kun je vaak 30-50% besparen, afhankelijk van je keuzes. AfscheidPlanner helpt je om overzicht te houden over alle kosten.'
              },
              {
                q: 'Wat als ik vastloop?',
                a: 'Bij elk pakket krijg je toegang tot uitgebreide hulpartikelen die uitleggen hoe je elke taak uitvoert. Bij het Standaard en Premium pakket kun je ook contact opnemen met onze support.'
              },
              {
                q: 'Kunnen familie en vrienden meekijken?',
                a: 'Ja! Je kunt helpers uitnodigen via email. Zij krijgen toegang tot het plan en kunnen taken op zich nemen. Zo verdeel je de last en werk je samen aan een mooi afscheid.'
              },
              {
                q: 'Hoe zit het met mijn privacy?',
                a: 'We nemen privacy zeer serieus. Alle gegevens worden versleuteld opgeslagen en we delen nooit informatie met derden. Je kunt je account en alle gegevens op elk moment verwijderen.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Klaar om te beginnen?
          </h2>
          <p className="text-slate-600 mb-8">
            AfscheidPlanner helpt je door deze moeilijke tijd. Stap voor stap, 
            met duidelijke taken en de steun van je naasten.
          </p>
          <Button size="lg" asChild>
            <Link href="/start">
              Begin met plannen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-slate-700" />
              <span className="font-semibold text-slate-800">AfscheidPlanner</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-600">
              <Link href="/privacy" className="hover:text-slate-900">Privacy</Link>
              <Link href="/voorwaarden" className="hover:text-slate-900">Voorwaarden</Link>
              <Link href="/contact" className="hover:text-slate-900">Contact</Link>
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
