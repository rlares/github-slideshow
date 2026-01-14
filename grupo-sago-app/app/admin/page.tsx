'use client'

import { useState, useEffect } from 'react'
import { Offer, MonthlyMetrics } from '@/types'
import axios from 'axios'
import OffersList from '@/components/admin/OffersList'
import MetricsDashboard from '@/components/admin/MetricsDashboard'
import OfferDetailsModal from '@/components/admin/OfferDetailsModal'
import { FaChartBar, FaList } from 'react-icons/fa'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'offers' | 'metrics'>('offers')
  const [offers, setOffers] = useState<Offer[]>([])
  const [metrics, setMetrics] = useState<MonthlyMetrics | null>(null)
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [offersRes, metricsRes] = await Promise.all([
        axios.get('/api/offers'),
        axios.get('/api/metrics')
      ])

      if (offersRes.data.success) {
        setOffers(offersRes.data.offers)
      }

      if (metricsRes.data.success) {
        setMetrics(metricsRes.data.metrics)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleOfferUpdate = async () => {
    await loadData()
    setSelectedOffer(null)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-grupo-sago-primary text-white py-6 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Panel de Administración</h1>
          <p className="text-sm opacity-90">GRUPO SAGO - Sistema de Valuación</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('offers')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === 'offers'
                  ? 'border-grupo-sago-primary text-grupo-sago-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaList className="inline mr-2" />
              Ofertas
            </button>
            <button
              onClick={() => setActiveTab('metrics')}
              className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === 'metrics'
                  ? 'border-grupo-sago-primary text-grupo-sago-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <FaChartBar className="inline mr-2" />
              Métricas
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-grupo-sago-primary"></div>
            <p className="mt-4 text-gray-600">Cargando datos...</p>
          </div>
        ) : (
          <>
            {activeTab === 'offers' && (
              <OffersList
                offers={offers}
                onSelectOffer={setSelectedOffer}
                onRefresh={loadData}
              />
            )}

            {activeTab === 'metrics' && metrics && (
              <MetricsDashboard metrics={metrics} />
            )}
          </>
        )}
      </main>

      {/* Offer Details Modal */}
      {selectedOffer && (
        <OfferDetailsModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
          onUpdate={handleOfferUpdate}
        />
      )}
    </div>
  )
}
