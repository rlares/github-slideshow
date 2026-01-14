'use client'

import { useEffect, useState } from 'react'
import { ClientInfo, CarPhotos, CarDetails, Offer } from '@/types'
import { FaSpinner, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'

interface Props {
  clientInfo: ClientInfo
  carPhotos: CarPhotos
  carDetails: CarDetails
  onComplete: (offer: Offer) => void
}

export default function ProcessingStep({ clientInfo, carPhotos, carDetails, onComplete }: Props) {
  const [status, setStatus] = useState('Analizando información del vehículo...')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    processOffer()
  }, [])

  const processOffer = async () => {
    try {
      // Simulate progress updates
      setProgress(10)
      setStatus('Analizando información del vehículo...')
      await delay(1000)

      setProgress(30)
      setStatus('Investigando precios en el mercado...')
      await delay(1500)

      setProgress(50)
      setStatus('Consultando Mercado Libre y otros sitios...')
      await delay(2000)

      setProgress(70)
      setStatus('Evaluando demanda del modelo...')
      await delay(1000)

      setProgress(85)
      setStatus('Calculando oferta...')

      // Make API call
      const response = await axios.post('/api/offers', {
        clientInfo,
        carPhotos,
        carDetails
      })

      setProgress(100)
      setStatus('¡Oferta generada!')

      await delay(800)

      if (response.data.success) {
        onComplete(response.data.offer)
      } else {
        throw new Error('Error al generar la oferta')
      }
    } catch (error) {
      console.error('Error processing offer:', error)
      setStatus('Error al procesar la oferta. Por favor intenta de nuevo.')
    }
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  return (
    <div className="card max-w-2xl mx-auto text-center">
      <div className="mb-8">
        {progress < 100 ? (
          <FaSpinner className="text-6xl text-grupo-sago-primary mx-auto mb-4 animate-spin" />
        ) : (
          <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        )}

        <h2 className="text-3xl font-bold text-grupo-sago-primary mb-4">
          {progress < 100 ? 'Procesando tu solicitud' : '¡Listo!'}
        </h2>

        <p className="text-gray-600 mb-6">{status}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-grupo-sago-primary h-4 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-gray-500">{progress}%</p>
      </div>

      <div className="bg-grupo-sago-light p-6 rounded-lg">
        <p className="text-sm text-gray-700">
          Estamos analizando tu vehículo y comparando con miles de anuncios en el mercado
          para ofrecerte el mejor precio.
        </p>
      </div>
    </div>
  )
}
