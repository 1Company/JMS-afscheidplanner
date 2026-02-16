'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Heart, ArrowLeft, ArrowRight, Check } from 'lucide-react'

type CeremonyType = 'BURIAL' | 'CREMATION' | 'NATURAL_BURIAL' | 'OTHER'

interface FormData {
  // Stap 1: Over de overledene
  deceasedName: string
  deceasedDeathDate: string
  
  // Stap 2: Type uitvaart
  ceremonyType: CeremonyType | ''
  
  // Stap 3: Planning
  ceremonyDate: string
  
  // Stap 4: Jouw gegevens
  userName: string
  userEmail: string
  userPhone: string
}

const initialFormData: FormData = {
  deceasedName: '',
  deceasedDeathDate: '',
  ceremonyType: '',
  ceremonyDate: '',
  userName: '',
  userEmail: '',
  userPhone: '',
}

export default function StartPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const totalSteps = 4

  const updateForm = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError('')
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.deceasedName.trim() && formData.deceasedDeathDate
      case 2:
        return formData.ceremonyType !== ''
      case 3:
        return true // Datum is optioneel
      case 4:
        return formData.userName.trim() && formData.userEmail.includes('@')
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/ceremonies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Er ging iets mis')
      }

      // Redirect naar dashboard met ceremony ID
      router.push(`/dashboard/${data.ceremonyId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis')
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (step < totalSteps && canProceed()) {
      setStep(step + 1)
    } else if (step === totalSteps) {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-slate-700" />
            <span className="font-semibold text-xl text-slate-800">AfscheidPlanner</span>
          </Link>
        </div>
      </header>

      {/* Progress */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s < step ? 'bg-green-600 text-white' :
                  s === step ? 'bg-slate-900 text-white' :
                  'bg-slate-200 text-slate-500'
                }`}>
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 ${
                    s < step ? 'bg-green-600' : 'bg-slate-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>Overledene</span>
            <span>Type</span>
            <span>Datum</span>
            <span>Account</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-xl mx-auto">
          <CardContent className="pt-6">
            {/* Step 1: Over de overledene */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Over de overledene
                  </h2>
                  <p className="text-slate-600">
                    We beginnen met de basisgegevens.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="deceasedName">Naam van de overledene</Label>
                    <Input
                      id="deceasedName"
                      value={formData.deceasedName}
                      onChange={(e) => updateForm('deceasedName', e.target.value)}
                      placeholder="Volledige naam"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="deceasedDeathDate">Datum van overlijden</Label>
                    <Input
                      id="deceasedDeathDate"
                      type="date"
                      value={formData.deceasedDeathDate}
                      onChange={(e) => updateForm('deceasedDeathDate', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Type uitvaart */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Type uitvaart
                  </h2>
                  <p className="text-slate-600">
                    Welke vorm van afscheid heeft de voorkeur?
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    { value: 'BURIAL', label: 'Begraving', desc: 'Traditionele begrafenis op een begraafplaats' },
                    { value: 'CREMATION', label: 'Crematie', desc: 'Crematie met mogelijkheid tot asbestemming' },
                    { value: 'NATURAL_BURIAL', label: 'Natuurbegraving', desc: 'Begraving op een natuurbegraafplaats' },
                    { value: 'OTHER', label: 'Anders / weet nog niet', desc: 'Andere vorm of nog in overleg' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => updateForm('ceremonyType', option.value)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        formData.ceremonyType === option.value
                          ? 'border-slate-900 bg-slate-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-medium text-slate-900">{option.label}</div>
                      <div className="text-sm text-slate-500">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Datum */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Wanneer is de uitvaart?
                  </h2>
                  <p className="text-slate-600">
                    Als je dit al weet, vul het hier in. Anders kun je dit later aanpassen.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ceremonyDate">Geplande datum (optioneel)</Label>
                    <Input
                      id="ceremonyDate"
                      type="date"
                      value={formData.ceremonyDate}
                      onChange={(e) => updateForm('ceremonyDate', e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-sm text-slate-500 mt-2">
                      Let op: de uitvaart moet plaatsvinden tussen 36 uur en 6 werkdagen na overlijden.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Account */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">
                    Jouw gegevens
                  </h2>
                  <p className="text-slate-600">
                    Zodat je later kunt inloggen en helpers kunt uitnodigen.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userName">Je naam</Label>
                    <Input
                      id="userName"
                      value={formData.userName}
                      onChange={(e) => updateForm('userName', e.target.value)}
                      placeholder="Je volledige naam"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="userEmail">E-mailadres</Label>
                    <Input
                      id="userEmail"
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) => updateForm('userEmail', e.target.value)}
                      placeholder="naam@voorbeeld.nl"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="userPhone">Telefoonnummer (optioneel)</Label>
                    <Input
                      id="userPhone"
                      type="tel"
                      value={formData.userPhone}
                      onChange={(e) => updateForm('userPhone', e.target.value)}
                      placeholder="06-12345678"
                      className="mt-1"
                    />
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="ghost"
                onClick={prevStep}
                disabled={step === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Vorige
              </Button>

              <Button
                onClick={nextStep}
                disabled={!canProceed() || isSubmitting}
              >
                {isSubmitting ? (
                  'Even geduld...'
                ) : step === totalSteps ? (
                  <>
                    Start plannen
                    <Check className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    Volgende
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust */}
        <p className="text-center text-sm text-slate-500 mt-6">
          🔒 Je gegevens zijn veilig en worden nooit gedeeld met derden.
        </p>
      </div>
    </div>
  )
}
