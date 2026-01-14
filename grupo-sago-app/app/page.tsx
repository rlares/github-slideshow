'use client'

import { useState } from 'react'
import PersonalInfoStep from '@/components/steps/PersonalInfoStep'
import PhotosStep from '@/components/steps/PhotosStep'
import CarDetailsStep from '@/components/steps/CarDetailsStep'
import ProcessingStep from '@/components/steps/ProcessingStep'
import OfferStep from '@/components/steps/OfferStep'
import { ClientInfo, CarPhotos, CarDetails, Offer } from '@/types'

export default function Home() {
  const [step, setStep] = useState(1)
  const [clientInfo, setClientInfo] = useState<ClientInfo>({ nombre: '', telefono: '', email: '' })
  const [carPhotos, setCarPhotos] = useState<CarPhotos>({
    frente: '',
    ladoIzquierdo: '',
    ladoDerecho: '',
    trasera: '',
    interiorDelantero: '',
    interiorTrasero: ''
  })
  const [carDetails, setCarDetails] = useState<CarDetails>({
    modelo: '',
    vin: '',
    numeroDeFacturas: 1,
    numeroDeDuenos: 1,
    kilometraje: 0
  })
  const [offer, setOffer] = useState<Offer | null>(null)

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-grupo-sago-light to-white">
      {/* Header */}
      <header className="bg-grupo-sago-primary text-white py-4 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">GRUPO SAGO</h1>
          <p className="text-sm opacity-90">Valuación de Vehículos Seminuevos</p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`flex-1 h-2 mx-1 rounded-full ${
                s <= step ? 'bg-grupo-sago-primary' : 'bg-gray-200'
              }`} />
            ))}
          </div>
          <div className="text-sm text-gray-600 text-center">
            Paso {step} de 4
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {step === 1 && (
          <PersonalInfoStep
            data={clientInfo}
            onNext={(data) => {
              setClientInfo(data)
              handleNextStep()
            }}
          />
        )}

        {step === 2 && (
          <PhotosStep
            data={carPhotos}
            onNext={(data) => {
              setCarPhotos(data)
              handleNextStep()
            }}
            onBack={handlePrevStep}
          />
        )}

        {step === 3 && (
          <CarDetailsStep
            data={carDetails}
            onNext={(data) => {
              setCarDetails(data)
              handleNextStep()
            }}
            onBack={handlePrevStep}
          />
        )}

        {step === 4 && (
          <ProcessingStep
            clientInfo={clientInfo}
            carPhotos={carPhotos}
            carDetails={carDetails}
            onComplete={(offerData) => {
              setOffer(offerData)
              handleNextStep()
            }}
          />
        )}

        {step === 5 && offer && (
          <OfferStep offer={offer} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-grupo-sago-dark text-white py-6 mt-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm">&copy; 2026 GRUPO SAGO. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
