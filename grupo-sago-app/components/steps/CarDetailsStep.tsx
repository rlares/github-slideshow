'use client'

import { useState } from 'react'
import { CarDetails } from '@/types'
import { FaCarSide } from 'react-icons/fa'

interface Props {
  data: CarDetails
  onNext: (data: CarDetails) => void
  onBack: () => void
}

export default function CarDetailsStep({ data, onNext, onBack }: Props) {
  const [formData, setFormData] = useState<CarDetails>(data)
  const [errors, setErrors] = useState<Partial<Record<keyof CarDetails, string>>>({})

  const validate = () => {
    const newErrors: Partial<Record<keyof CarDetails, string>> = {}

    if (!formData.modelo.trim()) {
      newErrors.modelo = 'El modelo es requerido (ej: Honda Civic 2020)'
    }

    if (!formData.vin.trim()) {
      newErrors.vin = 'El VIN es requerido'
    } else if (formData.vin.length !== 17) {
      newErrors.vin = 'El VIN debe tener 17 caracteres'
    }

    if (formData.numeroDeFacturas < 0) {
      newErrors.numeroDeFacturas = 'Ingresa un número válido'
    }

    if (formData.numeroDeDuenos < 1) {
      newErrors.numeroDeDuenos = 'Debe tener al menos 1 dueño'
    }

    if (formData.kilometraje < 0) {
      newErrors.kilometraje = 'Ingresa un kilometraje válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onNext(formData)
    }
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <FaCarSide className="text-5xl text-grupo-sago-primary mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-grupo-sago-primary mb-2">
          Detalles del vehículo
        </h2>
        <p className="text-gray-600">
          Completa la información para obtener tu oferta
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Modelo del vehículo *
          </label>
          <input
            type="text"
            className={`input-field ${errors.modelo ? 'border-red-500' : ''}`}
            value={formData.modelo}
            onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
            placeholder="Ej: Honda Civic 2020, Nissan Versa 2019"
          />
          {errors.modelo && (
            <p className="text-red-500 text-sm mt-1">{errors.modelo}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Incluye marca, modelo y año
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Número VIN *
          </label>
          <input
            type="text"
            className={`input-field ${errors.vin ? 'border-red-500' : ''}`}
            value={formData.vin}
            onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
            placeholder="1HGCM82633A123456"
            maxLength={17}
          />
          {errors.vin && (
            <p className="text-red-500 text-sm mt-1">{errors.vin}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            17 caracteres - Encuéntralo en la tarjeta de circulación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de dueños *
            </label>
            <input
              type="number"
              className={`input-field ${errors.numeroDeDuenos ? 'border-red-500' : ''}`}
              value={formData.numeroDeDuenos}
              onChange={(e) => setFormData({ ...formData, numeroDeDuenos: parseInt(e.target.value) || 1 })}
              min="1"
            />
            {errors.numeroDeDuenos && (
              <p className="text-red-500 text-sm mt-1">{errors.numeroDeDuenos}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Número de facturas *
            </label>
            <input
              type="number"
              className={`input-field ${errors.numeroDeFacturas ? 'border-red-500' : ''}`}
              value={formData.numeroDeFacturas}
              onChange={(e) => setFormData({ ...formData, numeroDeFacturas: parseInt(e.target.value) || 0 })}
              min="0"
            />
            {errors.numeroDeFacturas && (
              <p className="text-red-500 text-sm mt-1">{errors.numeroDeFacturas}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kilometraje *
          </label>
          <div className="relative">
            <input
              type="number"
              className={`input-field ${errors.kilometraje ? 'border-red-500' : ''}`}
              value={formData.kilometraje}
              onChange={(e) => setFormData({ ...formData, kilometraje: parseInt(e.target.value) || 0 })}
              placeholder="50000"
              min="0"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500">
              KM
            </span>
          </div>
          {errors.kilometraje && (
            <p className="text-red-500 text-sm mt-1">{errors.kilometraje}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4">
          <button type="button" onClick={onBack} className="btn-secondary flex-1">
            Regresar
          </button>
          <button type="submit" className="btn-primary flex-1">
            Generar oferta
          </button>
        </div>
      </form>
    </div>
  )
}
