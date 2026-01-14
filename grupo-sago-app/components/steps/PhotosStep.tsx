'use client'

import { useState } from 'react'
import { CarPhotos } from '@/types'
import { FaCar, FaCamera, FaCheck } from 'react-icons/fa'

interface Props {
  data: CarPhotos
  onNext: (data: CarPhotos) => void
  onBack: () => void
}

type PhotoKey = keyof CarPhotos

const photoLabels: Record<PhotoKey, { title: string; description: string; icon: string }> = {
  frente: {
    title: 'Frente del vehículo',
    description: 'Captura la vista frontal completa',
    icon: '🚗'
  },
  ladoIzquierdo: {
    title: 'Lado izquierdo',
    description: 'Vista completa del lado izquierdo',
    icon: '🚙'
  },
  ladoDerecho: {
    title: 'Lado derecho',
    description: 'Vista completa del lado derecho',
    icon: '🚙'
  },
  trasera: {
    title: 'Parte trasera',
    description: 'Vista posterior completa',
    icon: '🚗'
  },
  interiorDelantero: {
    title: 'Interior delantero',
    description: 'Tablero y volante',
    icon: '🎛️'
  },
  interiorTrasero: {
    title: 'Interior trasero',
    description: 'Asientos traseros',
    icon: '💺'
  }
}

export default function PhotosStep({ data, onNext, onBack }: Props) {
  const [photos, setPhotos] = useState<CarPhotos>(data)
  const [error, setError] = useState('')

  const handlePhotoCapture = (key: PhotoKey, file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen es muy grande. Máximo 5MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotos({ ...photos, [key]: reader.result as string })
      setError('')
    }
    reader.readAsDataURL(file)
  }

  const validate = () => {
    const allPhotos = Object.values(photos).every(photo => photo !== '')
    if (!allPhotos) {
      setError('Por favor captura todas las 6 fotos requeridas')
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (validate()) {
      onNext(photos)
    }
  }

  const photoKeys = Object.keys(photoLabels) as PhotoKey[]

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <FaCar className="text-5xl text-grupo-sago-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-grupo-sago-primary mb-2">
          Fotos de tu vehículo
        </h2>
        <p className="text-gray-600">
          Necesitamos 6 fotos claras de tu vehículo para evaluar su condición
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {photoKeys.map((key) => (
          <div key={key} className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-grupo-sago-primary transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{photoLabels[key].icon}</span>
                  <h3 className="font-semibold text-gray-800">
                    {photoLabels[key].title}
                  </h3>
                  {photos[key] && (
                    <FaCheck className="text-green-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {photoLabels[key].description}
                </p>
              </div>
            </div>

            {photos[key] ? (
              <div className="relative">
                <img
                  src={photos[key]}
                  alt={photoLabels[key].title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <label className="absolute bottom-2 right-2 bg-white px-3 py-2 rounded-lg shadow-lg cursor-pointer hover:bg-gray-100 transition-colors">
                  <FaCamera className="inline mr-2" />
                  Cambiar
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handlePhotoCapture(key, file)
                    }}
                  />
                </label>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-48 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <FaCamera className="text-4xl text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">Tomar foto</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handlePhotoCapture(key, file)
                  }}
                />
              </label>
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button onClick={onBack} className="btn-secondary flex-1">
          Regresar
        </button>
        <button onClick={handleSubmit} className="btn-primary flex-1">
          Continuar
        </button>
      </div>
    </div>
  )
}
