export interface ClientInfo {
  nombre: string
  telefono: string
  email: string
}

export interface CarPhotos {
  frente: string // base64
  ladoIzquierdo: string
  ladoDerecho: string
  trasera: string
  interiorDelantero: string
  interiorTrasero: string
}

export interface CarDetails {
  modelo: string
  vin: string
  numeroDeFacturas: number
  numeroDeDuenos: number
  kilometraje: number
}

export interface MarketData {
  precioPromedio: number
  precioMinimo: number
  precioMaximo: number
  cantidadAnuncios: number
  demandaAlta: boolean
}

export interface Offer {
  _id?: string
  clientInfo: ClientInfo
  carPhotos: CarPhotos
  carDetails: CarDetails
  marketData: MarketData
  precioOferta: number
  margen: number
  aceptada: boolean | null // null = pendiente, true = aceptada, false = rechazada
  rechazada: boolean
  mensajeRechazo?: string
  fechaCreacion: Date
  fechaActualizacion: Date
  compraFinalizada: boolean
}

export interface MonthlyMetrics {
  mes: string
  totalClientes: number
  ofertasAceptadas: number
  ofertasRechazadas: number
  comprasFinalizadas: number
  tasaAceptacion: number
  valorTotalOfertas: number
  valorTotalCompras: number
}
