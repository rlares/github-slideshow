'use client'

import { useState } from 'react'
import { Offer } from '@/types'
import { formatPesos } from '@/lib/formatters'
import { FaTimes, FaSave, FaEdit, FaEnvelope, FaPhone, FaCar } from 'react-icons/fa'
import axios from 'axios'

interface Props {
  offer: Offer
  onClose: () => void
  onUpdate: () => void
}

export default function OfferDetailsModal({ offer, onClose, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedOffer, setEditedOffer] = useState({ ...offer })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await axios.patch(`/api/offers/${offer._id}`, {
        carDetails: editedOffer.carDetails,
        precioOferta: editedOffer.precioOferta,
        aceptada: editedOffer.aceptada,
        compraFinalizada: editedOffer.compraFinalizada
      })

      alert('Oferta actualizada correctamente')
      setIsEditing(false)
      onUpdate()
    } catch (error) {
      console.error('Error updating offer:', error)
      alert('Error al actualizar la oferta')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-grupo-sago-primary text-white p-6 flex justify-between items-center sticky top-0">
          <div>
            <h2 className="text-2xl font-bold">Detalles de la Oferta</h2>
            <p className="text-sm opacity-90">
              Creada: {new Date(offer.fechaCreacion).toLocaleDateString('es-MX', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="p-6">
          {/* Client Information */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaEnvelope className="mr-2 text-grupo-sago-primary" />
              Información del Cliente
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nombre</p>
                <p className="font-semibold">{offer.clientInfo.nombre}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Teléfono</p>
                <p className="font-semibold">{offer.clientInfo.telefono}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold text-sm break-all">{offer.clientInfo.email}</p>
              </div>
            </div>
          </div>

          {/* Car Photos */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaCar className="mr-2 text-grupo-sago-primary" />
              Fotos del Vehículo
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Frente</p>
                <img src={offer.carPhotos.frente} alt="Frente" className="w-full h-40 object-cover rounded-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Lado izquierdo</p>
                <img src={offer.carPhotos.ladoIzquierdo} alt="Lado izquierdo" className="w-full h-40 object-cover rounded-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Lado derecho</p>
                <img src={offer.carPhotos.ladoDerecho} alt="Lado derecho" className="w-full h-40 object-cover rounded-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Trasera</p>
                <img src={offer.carPhotos.trasera} alt="Trasera" className="w-full h-40 object-cover rounded-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Interior delantero</p>
                <img src={offer.carPhotos.interiorDelantero} alt="Interior delantero" className="w-full h-40 object-cover rounded-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Interior trasero</p>
                <img src={offer.carPhotos.interiorTrasero} alt="Interior trasero" className="w-full h-40 object-cover rounded-lg" />
              </div>
            </div>
          </div>

          {/* Car Details - Editable */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                <FaCar className="mr-2 text-grupo-sago-primary" />
                Detalles del Vehículo
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-grupo-sago-primary hover:text-grupo-sago-secondary font-semibold flex items-center text-sm"
                >
                  <FaEdit className="mr-1" />
                  Editar
                </button>
              )}
            </div>

            {isEditing ? (
              <div className="bg-yellow-50 p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Modelo</label>
                    <input
                      type="text"
                      className="input-field"
                      value={editedOffer.carDetails.modelo}
                      onChange={(e) => setEditedOffer({
                        ...editedOffer,
                        carDetails: { ...editedOffer.carDetails, modelo: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">VIN</label>
                    <input
                      type="text"
                      className="input-field"
                      value={editedOffer.carDetails.vin}
                      onChange={(e) => setEditedOffer({
                        ...editedOffer,
                        carDetails: { ...editedOffer.carDetails, vin: e.target.value }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Kilometraje (KM)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={editedOffer.carDetails.kilometraje}
                      onChange={(e) => setEditedOffer({
                        ...editedOffer,
                        carDetails: { ...editedOffer.carDetails, kilometraje: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Número de dueños</label>
                    <input
                      type="number"
                      className="input-field"
                      value={editedOffer.carDetails.numeroDeDuenos}
                      onChange={(e) => setEditedOffer({
                        ...editedOffer,
                        carDetails: { ...editedOffer.carDetails, numeroDeDuenos: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Número de facturas</label>
                    <input
                      type="number"
                      className="input-field"
                      value={editedOffer.carDetails.numeroDeFacturas}
                      onChange={(e) => setEditedOffer({
                        ...editedOffer,
                        carDetails: { ...editedOffer.carDetails, numeroDeFacturas: parseInt(e.target.value) }
                      })}
                    />
                  </div>
                  {!offer.rechazada && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Precio Oferta (MXN)</label>
                      <input
                        type="number"
                        className="input-field"
                        value={editedOffer.precioOferta}
                        onChange={(e) => setEditedOffer({
                          ...editedOffer,
                          precioOferta: parseInt(e.target.value)
                        })}
                      />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Modelo</p>
                  <p className="font-semibold">{offer.carDetails.modelo}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">VIN</p>
                  <p className="font-semibold">{offer.carDetails.vin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Kilometraje</p>
                  <p className="font-semibold">{offer.carDetails.kilometraje.toLocaleString('es-MX')} KM</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Dueños</p>
                  <p className="font-semibold">{offer.carDetails.numeroDeDuenos}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Facturas</p>
                  <p className="font-semibold">{offer.carDetails.numeroDeFacturas}</p>
                </div>
              </div>
            )}
          </div>

          {/* Offer Information */}
          {!offer.rechazada && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Información de la Oferta</h3>
              <div className="bg-gradient-to-br from-grupo-sago-primary to-grupo-sago-secondary text-white p-6 rounded-lg mb-4">
                <p className="text-sm opacity-90 mb-1">Oferta realizada</p>
                <p className="text-4xl font-bold">{formatPesos(offer.precioOferta)}</p>
                <p className="text-sm opacity-75 mt-1">
                  Margen: {offer.margen}% | Precio de mercado: {formatPesos(offer.marketData.precioPromedio)}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Datos del mercado</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Precio promedio</p>
                    <p className="font-semibold">{formatPesos(offer.marketData.precioPromedio)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Precio mínimo</p>
                    <p className="font-semibold">{formatPesos(offer.marketData.precioMinimo)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Precio máximo</p>
                    <p className="font-semibold">{formatPesos(offer.marketData.precioMaximo)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Anuncios</p>
                    <p className="font-semibold">{offer.marketData.cantidadAnuncios}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Management */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Estado de la Oferta</h3>
            {isEditing ? (
              <div className="bg-yellow-50 p-4 rounded-lg space-y-4">
                {!offer.rechazada && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        ¿El cliente aceptó la oferta?
                      </label>
                      <select
                        className="input-field"
                        value={editedOffer.aceptada === null ? 'pendiente' : editedOffer.aceptada ? 'si' : 'no'}
                        onChange={(e) => {
                          const value = e.target.value
                          setEditedOffer({
                            ...editedOffer,
                            aceptada: value === 'pendiente' ? null : value === 'si'
                          })
                        }}
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                      </select>
                    </div>

                    {editedOffer.aceptada && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          ¿Se finalizó la compra?
                        </label>
                        <select
                          className="input-field"
                          value={editedOffer.compraFinalizada ? 'si' : 'no'}
                          onChange={(e) => setEditedOffer({
                            ...editedOffer,
                            compraFinalizada: e.target.value === 'si'
                          })}
                        >
                          <option value="no">No</option>
                          <option value="si">Sí</option>
                        </select>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg">
                {offer.rechazada ? (
                  <div className="text-center py-4">
                    <p className="text-red-600 font-semibold text-lg mb-2">Oferta Rechazada</p>
                    <p className="text-gray-600">{offer.mensajeRechazo}</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">Estado de aceptación</p>
                      <p className="font-semibold text-lg">
                        {offer.aceptada === null && 'Pendiente de respuesta'}
                        {offer.aceptada === true && '✅ Aceptada por el cliente'}
                        {offer.aceptada === false && '❌ Rechazada por el cliente'}
                      </p>
                    </div>
                    {offer.aceptada && (
                      <div>
                        <p className="text-sm text-gray-600">Compra finalizada</p>
                        <p className="font-semibold text-lg">
                          {offer.compraFinalizada ? '✅ Sí' : '⏳ Pendiente'}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedOffer({ ...offer })
                }}
                className="btn-secondary flex-1"
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="btn-primary flex-1"
                disabled={saving}
              >
                <FaSave className="inline mr-2" />
                {saving ? 'Guardando...' : 'Guardar cambios'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
