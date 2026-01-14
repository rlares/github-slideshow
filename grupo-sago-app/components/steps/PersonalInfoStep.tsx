'use client'

import { useState } from 'react'
import { ClientInfo } from '@/types'

interface Props {
  data: ClientInfo
  onNext: (data: ClientInfo) => void
}

export default function PersonalInfoStep({ data, onNext }: Props) {
  const [formData, setFormData] = useState<ClientInfo>(data)
  const [errors, setErrors] = useState<Partial<ClientInfo>>({})

  const validate = () => {
    const newErrors: Partial<ClientInfo> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Ingresa un teléfono válido de 10 dígitos'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo válido'
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
        <h2 className="text-3xl font-bold text-grupo-sago-primary mb-2">
          ¡Bienvenido a GRUPO SAGO!
        </h2>
        <p className="text-gray-600">
          Obtén una oferta instantánea por tu vehículo. Comencemos con tu información personal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            className={`input-field ${errors.nombre ? 'border-red-500' : ''}`}
            value={formData.nombre}
            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            placeholder="Juan Pérez García"
          />
          {errors.nombre && (
            <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            className={`input-field ${errors.telefono ? 'border-red-500' : ''}`}
            value={formData.telefono}
            onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            placeholder="55 1234 5678"
          />
          {errors.telefono && (
            <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Correo electrónico *
          </label>
          <input
            type="email"
            className={`input-field ${errors.email ? 'border-red-500' : ''}`}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="juan.perez@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Continuar
        </button>
      </form>
    </div>
  )
}
