'use client'

import { MonthlyMetrics } from '@/types'
import { formatPesos, formatPercentage } from '@/lib/formatters'
import { FaUsers, FaCheckCircle, FaTimesCircle, FaShoppingCart, FaChartLine } from 'react-icons/fa'

interface Props {
  metrics: MonthlyMetrics
}

export default function MetricsDashboard({ metrics }: Props) {
  const statCards = [
    {
      title: 'Total de Clientes',
      value: metrics.totalClientes,
      icon: FaUsers,
      color: 'bg-blue-500',
      description: 'Clientes que han solicitado valuación'
    },
    {
      title: 'Ofertas Aceptadas',
      value: metrics.ofertasAceptadas,
      icon: FaCheckCircle,
      color: 'bg-green-500',
      description: 'Clientes interesados en la oferta'
    },
    {
      title: 'Ofertas Rechazadas',
      value: metrics.ofertasRechazadas,
      icon: FaTimesCircle,
      color: 'bg-red-500',
      description: 'Ofertas declinadas o vehículos no aceptados'
    },
    {
      title: 'Compras Finalizadas',
      value: metrics.comprasFinalizadas,
      icon: FaShoppingCart,
      color: 'bg-purple-500',
      description: 'Vehículos efectivamente comprados'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Métricas del mes: {metrics.mes}
        </h2>
        <p className="text-gray-600">
          Resumen de rendimiento y estadísticas
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                <stat.icon className="text-2xl" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-1">
              {stat.value}
            </h3>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              {stat.title}
            </p>
            <p className="text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Conversion Rate */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-grupo-sago-primary text-2xl mr-3" />
            <h3 className="text-xl font-bold text-gray-800">
              Tasa de Aceptación
            </h3>
          </div>
          <div className="mb-4">
            <div className="text-5xl font-bold text-grupo-sago-primary mb-2">
              {formatPercentage(metrics.tasaAceptacion)}
            </div>
            <p className="text-sm text-gray-600">
              De {metrics.totalClientes} clientes, {metrics.ofertasAceptadas} aceptaron la oferta
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-grupo-sago-primary h-3 rounded-full transition-all"
              style={{ width: `${metrics.tasaAceptacion}%` }}
            />
          </div>
        </div>

        {/* Conversion to Purchase */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <FaShoppingCart className="text-green-500 text-2xl mr-3" />
            <h3 className="text-xl font-bold text-gray-800">
              Conversión a Compra
            </h3>
          </div>
          <div className="mb-4">
            <div className="text-5xl font-bold text-green-500 mb-2">
              {metrics.ofertasAceptadas > 0
                ? formatPercentage((metrics.comprasFinalizadas / metrics.ofertasAceptadas) * 100)
                : '0%'}
            </div>
            <p className="text-sm text-gray-600">
              De {metrics.ofertasAceptadas} ofertas aceptadas, {metrics.comprasFinalizadas} se concretaron
            </p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{
                width: `${metrics.ofertasAceptadas > 0
                  ? (metrics.comprasFinalizadas / metrics.ofertasAceptadas) * 100
                  : 0}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Resumen Financiero
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Valor Total de Ofertas</p>
            <p className="text-3xl font-bold text-grupo-sago-primary">
              {formatPesos(metrics.valorTotalOfertas)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Suma de todas las ofertas realizadas
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Valor Total de Compras</p>
            <p className="text-3xl font-bold text-green-600">
              {formatPesos(metrics.valorTotalCompras)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Suma de compras finalizadas
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
