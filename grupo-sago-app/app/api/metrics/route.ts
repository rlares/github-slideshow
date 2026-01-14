import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MonthlyMetrics } from '@/types'
import { startOfMonth, endOfMonth, format } from 'date-fns'
import { es } from 'date-fns/locale'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const month = searchParams.get('month') // Format: 2026-01
    const year = searchParams.get('year')

    const client = await clientPromise
    const db = client.db('grupo-sago')

    let startDate: Date
    let endDate: Date

    if (month) {
      const [yearNum, monthNum] = month.split('-').map(Number)
      startDate = startOfMonth(new Date(yearNum, monthNum - 1))
      endDate = endOfMonth(new Date(yearNum, monthNum - 1))
    } else if (year) {
      startDate = new Date(parseInt(year), 0, 1)
      endDate = new Date(parseInt(year), 11, 31, 23, 59, 59)
    } else {
      // Current month
      startDate = startOfMonth(new Date())
      endDate = endOfMonth(new Date())
    }

    const offers = await db
      .collection('offers')
      .find({
        fechaCreacion: {
          $gte: startDate,
          $lte: endDate
        }
      })
      .toArray()

    const totalClientes = offers.length
    const ofertasAceptadas = offers.filter(o => o.aceptada === true).length
    const ofertasRechazadas = offers.filter(o => o.aceptada === false || o.rechazada === true).length
    const comprasFinalizadas = offers.filter(o => o.compraFinalizada === true).length

    const valorTotalOfertas = offers
      .filter(o => !o.rechazada)
      .reduce((sum, o) => sum + o.precioOferta, 0)

    const valorTotalCompras = offers
      .filter(o => o.compraFinalizada)
      .reduce((sum, o) => sum + o.precioOferta, 0)

    const tasaAceptacion = totalClientes > 0
      ? (ofertasAceptadas / totalClientes) * 100
      : 0

    const metrics: MonthlyMetrics = {
      mes: format(startDate, 'MMMM yyyy', { locale: es }),
      totalClientes,
      ofertasAceptadas,
      ofertasRechazadas,
      comprasFinalizadas,
      tasaAceptacion,
      valorTotalOfertas,
      valorTotalCompras
    }

    return NextResponse.json({ success: true, metrics })
  } catch (error) {
    console.error('Error fetching metrics:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener métricas' },
      { status: 500 }
    )
  }
}
