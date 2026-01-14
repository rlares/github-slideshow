import axios from 'axios'
import * as cheerio from 'cheerio'
import { MarketData } from '@/types'

export async function performMarketResearch(modelo: string, kilometraje: number): Promise<MarketData> {
  try {
    // Extract brand and model details
    const modeloParts = modelo.toLowerCase().split(' ')
    const marca = modeloParts[0]
    const modeloNombre = modeloParts.slice(1).join(' ')

    // Scrape Mercado Libre Mexico
    const mercadoLibreData = await scrapeMercadoLibre(marca, modeloNombre)

    // Calculate market data
    const precios = mercadoLibreData.precios.filter(p => p > 0)

    if (precios.length === 0) {
      return {
        precioPromedio: 0,
        precioMinimo: 0,
        precioMaximo: 0,
        cantidadAnuncios: 0,
        demandaAlta: false
      }
    }

    // Sort prices
    precios.sort((a, b) => a - b)

    // Calculate average (excluding outliers)
    const q1 = precios[Math.floor(precios.length * 0.25)]
    const q3 = precios[Math.floor(precios.length * 0.75)]
    const iqr = q3 - q1
    const lowerBound = q1 - 1.5 * iqr
    const upperBound = q3 + 1.5 * iqr

    const filteredPrices = precios.filter(p => p >= lowerBound && p <= upperBound)
    const precioPromedio = filteredPrices.reduce((a, b) => a + b, 0) / filteredPrices.length

    // Adjust for mileage (decrease value by 0.5% for every 10,000 km over 50,000)
    let precioAjustado = precioPromedio
    if (kilometraje > 50000) {
      const kmExtra = kilometraje - 50000
      const depreciacion = (kmExtra / 10000) * 0.005
      precioAjustado = precioPromedio * (1 - depreciacion)
    }

    // Determine if demand is high (more than 20 listings)
    const demandaAlta = precios.length >= 20

    return {
      precioPromedio: Math.round(precioAjustado),
      precioMinimo: Math.round(precios[0]),
      precioMaximo: Math.round(precios[precios.length - 1]),
      cantidadAnuncios: precios.length,
      demandaAlta
    }
  } catch (error) {
    console.error('Error en investigación de mercado:', error)
    throw new Error('No se pudo completar la investigación de mercado')
  }
}

async function scrapeMercadoLibre(marca: string, modelo: string): Promise<{ precios: number[] }> {
  try {
    const searchQuery = encodeURIComponent(`${marca} ${modelo}`)
    const url = `https://autos.mercadolibre.com.mx/${marca}/${searchQuery}`

    // In production, you would use a proper scraping service or API
    // For now, we'll simulate with mock data based on common car prices

    // Mock data generator based on model
    const mockPrices = generateMockPrices(marca, modelo)

    return { precios: mockPrices }
  } catch (error) {
    console.error('Error scraping Mercado Libre:', error)
    return { precios: [] }
  }
}

function generateMockPrices(marca: string, modelo: string): number[] {
  // This is a simplified mock. In production, you'd implement actual web scraping
  const basePrice = getBasePriceForBrand(marca)
  const prices: number[] = []

  // Generate 25-40 mock prices with variation
  const numPrices = Math.floor(Math.random() * 15) + 25

  for (let i = 0; i < numPrices; i++) {
    const variation = (Math.random() - 0.5) * 0.3 // ±15% variation
    const price = Math.round(basePrice * (1 + variation))
    prices.push(price)
  }

  return prices
}

function getBasePriceForBrand(marca: string): number {
  const brandPrices: Record<string, number> = {
    'honda': 250000,
    'nissan': 220000,
    'toyota': 280000,
    'mazda': 260000,
    'volkswagen': 240000,
    'chevrolet': 210000,
    'ford': 230000,
    'hyundai': 200000,
    'kia': 210000,
    'seat': 220000,
    'bmw': 450000,
    'mercedes': 500000,
    'audi': 480000,
    'default': 250000
  }

  return brandPrices[marca.toLowerCase()] || brandPrices['default']
}

export function calculateOffer(marketData: MarketData, margenPorcentaje: number = 12): number {
  if (marketData.precioPromedio === 0) {
    return 0
  }

  const margenDecimal = margenPorcentaje / 100
  const oferta = marketData.precioPromedio * (1 - margenDecimal)

  return Math.round(oferta)
}
