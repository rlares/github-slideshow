'use client'

import { Offer } from '@/types'
import { formatPesos } from '@/lib/formatters'
import { FaEye, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa'

interface Props {
  offers: Offer[]
  onSelectOffer: (offer: Offer) => void
  onRefresh: () => void
}

export default function OffersList({ offers, onSelectOffer, onRefresh }: Props) {
  const getStatusBadge = (offer: Offer) => {
    if (offer.rechazada) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
          <FaTimesCircle className="mr-1" /> Rechazada
        </span>
      )
    }

    if (offer.compraFinalizada) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
          <FaCheckCircle className="mr-1" /> Compra finalizada
        </span>
      )
    }

    if (offer.aceptada === true) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
          <FaCheckCircle className="mr-1" /> Aceptada
        </span>
      )
    }

    if (offer.aceptada === false) {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
          <FaTimesCircle className="mr-1" /> Rechazada por cliente
        </span>
      )
    }

    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
        <FaClock className="mr-1" /> Pendiente
      </span>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Ofertas recibidas ({offers.length})
        </h2>
        <button
          onClick={onRefresh}
          className="btn-secondary text-sm"
        >
          Actualizar
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Oferta
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {offers.map((offer) => (
                <tr key={offer._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(offer.fechaCreacion).toLocaleDateString('es-MX')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {offer.clientInfo.nombre}
                    </div>
                    <div className="text-sm text-gray-500">
                      {offer.clientInfo.telefono}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {offer.carDetails.modelo}
                    </div>
                    <div className="text-sm text-gray-500">
                      {offer.carDetails.kilometraje.toLocaleString('es-MX')} KM
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {offer.rechazada ? (
                      <span className="text-gray-400">N/A</span>
                    ) : (
                      formatPesos(offer.precioOferta)
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(offer)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onSelectOffer(offer)}
                      className="text-grupo-sago-primary hover:text-grupo-sago-secondary font-semibold flex items-center"
                    >
                      <FaEye className="mr-1" />
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {offers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay ofertas registradas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
