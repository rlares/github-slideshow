import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    const client = await clientPromise
    const db = client.db('grupo-sago')

    const updateData: any = {
      fechaActualizacion: new Date()
    }

    if (body.aceptada !== undefined) {
      updateData.aceptada = body.aceptada
    }

    if (body.compraFinalizada !== undefined) {
      updateData.compraFinalizada = body.compraFinalizada
    }

    if (body.carDetails) {
      updateData.carDetails = body.carDetails
    }

    if (body.precioOferta) {
      updateData.precioOferta = body.precioOferta
    }

    const result = await db.collection('offers').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: 'Oferta no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating offer:', error)
    return NextResponse.json(
      { success: false, error: 'Error al actualizar la oferta' },
      { status: 500 }
    )
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const client = await clientPromise
    const db = client.db('grupo-sago')

    const offer = await db.collection('offers').findOne({ _id: new ObjectId(id) })

    if (!offer) {
      return NextResponse.json(
        { success: false, error: 'Oferta no encontrada' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, offer })
  } catch (error) {
    console.error('Error fetching offer:', error)
    return NextResponse.json(
      { success: false, error: 'Error al obtener la oferta' },
      { status: 500 }
    )
  }
}
