'use client'

import { Offer } from '@/types'
import { formatPesos } from '@/lib/formatters'
import { FaCheckCircle, FaTimesCircle, FaEnvelope } from 'react-icons/fa'

interface Props {
  offer: Offer
}

export default function OfferStep({ offer }: Props) {
  if (offer.rechazada) {
    return (
      <div className="card max-w-2xl mx-auto text-center">
        <FaTimesCircle className="text-6xl text-orange-500 mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Lo sentimos
        </h2>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
          <p className="text-gray-700 mb-4">
            {offer.mensajeRechazo}
          </p>
        </div>

        <div className="bg-grupo-sago-light p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-3">Detalles de tu vehículo</h3>
          <div className="text-left space-y-2">
            <p><strong>Modelo:</strong> {offer.carDetails.modelo}</p>
            <p><strong>VIN:</strong> {offer.carDetails.vin}</p>
            <p><strong>Kilometraje:</strong> {offer.carDetails.kilometraje.toLocaleString('es-MX')} KM</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <FaEnvelope className="inline text-blue-600 mr-2" />
          <span className="text-sm text-gray-700">
            Hemos enviado esta información a tu correo: <strong>{offer.clientInfo.email}</strong>
          </span>
        </div>

        <p className="text-gray-600">
          Gracias por tu interés en GRUPO SAGO.
        </p>
      </div>
    )
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-grupo-sago-primary mb-2">
          ¡Tenemos una oferta para ti!
        </h2>

        <p className="text-gray-600">
          Hemos evaluado tu vehículo y aquí está nuestra propuesta
        </p>
      </div>

      {/* Offer Box */}
      <div className="bg-gradient-to-br from-grupo-sago-primary to-grupo-sago-secondary text-white p-8 rounded-xl mb-6 text-center">
        <p className="text-lg mb-2 opacity-90">Nuestra oferta</p>
        <p className="text-5xl font-bold mb-2">{formatPesos(offer.precioOferta)}</p>
        <p className="text-sm opacity-75">MXN</p>
      </div>

      {/* Vehicle Details */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Detalles de tu vehículo</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Modelo</p>
            <p className="font-semibold">{offer.carDetails.modelo}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kilometraje</p>
            <p className="font-semibold">{offer.carDetails.kilometraje.toLocaleString('es-MX')} KM</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Número de dueños</p>
            <p className="font-semibold">{offer.carDetails.numeroDeDuenos}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Facturas</p>
            <p className="font-semibold">{offer.carDetails.numeroDeFacturas}</p>
          </div>
        </div>
      </div>

      {/* Market Info */}
      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800">Información del mercado</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Precio promedio de mercado:</span>
            <span className="font-semibold">{formatPesos(offer.marketData.precioPromedio)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Anuncios encontrados:</span>
            <span className="font-semibold">{offer.marketData.cantidadAnuncios}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Rango de precios:</span>
            <span className="font-semibold">
              {formatPesos(offer.marketData.precioMinimo)} - {formatPesos(offer.marketData.precioMaximo)}
            </span>
          </div>
        </div>
      </div>

      {/* Email Confirmation */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <FaEnvelope className="inline text-green-600 mr-2" />
        <span className="text-sm text-gray-700">
          Hemos enviado esta oferta a tu correo: <strong>{offer.clientInfo.email}</strong>
        </span>
      </div>

      {/* Next Steps */}
      <div className="bg-grupo-sago-accent bg-opacity-10 border border-grupo-sago-accent rounded-lg p-6">
        <h3 className="font-semibold text-lg mb-3 text-gray-800">Próximos pasos</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Nuestro equipo de Seminuevos se pondrá en contacto contigo</li>
          <li>Revisaremos físicamente tu vehículo</li>
          <li>Si todo está en orden, ¡concretamos la compra!</li>
        </ol>
        <p className="mt-4 text-sm text-gray-600">
          Esta oferta es válida por <strong>7 días</strong>
        </p>
      </div>

      <div className="text-center mt-8">
        <p className="text-2xl mb-2">🎉</p>
        <p className="text-gray-600">
          ¡Gracias por confiar en GRUPO SAGO!
        </p>
      </div>
    </div>
  )
}
