import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { performMarketResearch, calculateOffer } from '@/lib/marketResearch'
import { sendOfferEmail } from '@/lib/email'
import { Offer } from '@/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { clientInfo, carPhotos, carDetails } = body

    // Perform market research
    const marketData = await performMarketResearch(carDetails.modelo, carDetails.kilometraje)

    // Check if we should make an offer
    const shouldOffer = marketData.cantidadAnuncios >= 15 && marketData.demandaAlta

    let offer: Offer

    if (!shouldOffer) {
      // Reject the offer
      offer = {
        clientInfo,
        carPhotos,
        carDetails,
        marketData,
        precioOferta: 0,
        margen: 0,
        aceptada: null,
        rechazada: true,
        mensajeRechazo: 'Lo sentimos, en este momento no podemos hacer una oferta por tu vehículo. Por favor, habla con nuestro Gerente de Seminuevos para ver otras opciones disponibles.',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        compraFinalizada: false
      }
    } else {
      // Calculate offer with 12% margin
      const precioOferta = calculateOffer(marketData, 12)

      offer = {
        clientInfo,
        carPhotos,
        carDetails,
        marketData,
        precioOferta,
        margen: 12,
        aceptada: null,
        rechazada: false,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),
        compraFinalizada: false
      }
    }

    // Save to database
    const client = await clientPromise
    const db = client.db('grupo-sago')
    const result = await db.collection('offers').insertOne(offer)

    offer._id = result.insertedId.toString()

    // Send email
    try {
      await sendOfferEmail(offer)
    } catch (emailError) {
      console.error('Error sending email:', emailError)
      // Continue even if email fails
    }

    return NextResponse.json({ success: true, offer })
  } catch (error) {
    console.error('Error creating offer:', error)
    return NextResponse.json(
      { success: false, error: 'Error al crear la oferta' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = parseInt(searchParams.get('skip') || '0')

    const client = await clientPromise
    const db = client.db('grupo-sago')

    const offers = await db
      .collection('offers')
      .find({})
      .sort({ fechaCreacion: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    const total = await db.collection('offers').countDocuments()

    return NextResponse.json({ success: true, offers, total })
  } catch (error) {
    console.error('Error fetching offers:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener ofertas' },
      { status: 500 }
    )
  }
}
