import nodemailer from 'nodemailer'
import { Offer } from '@/types'
import { formatPesos } from './formatters'

export async function sendOfferEmail(offer: Offer): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const htmlContent = generateEmailHTML(offer)

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: offer.clientInfo.email,
    subject: `Tu oferta de GRUPO SAGO - ${offer.carDetails.modelo}`,
    html: htmlContent,
  })
}

function generateEmailHTML(offer: Offer): string {
  const precioOferta = formatPesos(offer.precioOferta)

  if (offer.rechazada) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0066CC; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 30px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>GRUPO SAGO</h1>
            </div>
            <div class="content">
              <h2>Estimado/a ${offer.clientInfo.nombre},</h2>
              <p>Gracias por tu interés en vender tu vehículo con GRUPO SAGO.</p>
              <p>${offer.mensajeRechazo || 'Lo sentimos, pero en este momento no podemos hacer una oferta por tu vehículo.'}</p>
              <p>Te invitamos a hablar con nuestro <strong>Gerente de Seminuevos</strong> para explorar otras opciones.</p>
              <p><strong>Detalles de tu vehículo:</strong></p>
              <ul>
                <li>Modelo: ${offer.carDetails.modelo}</li>
                <li>VIN: ${offer.carDetails.vin}</li>
                <li>Kilometraje: ${offer.carDetails.kilometraje.toLocaleString('es-MX')} KM</li>
              </ul>
              <p>Para más información, no dudes en contactarnos.</p>
            </div>
            <div class="footer">
              <p>&copy; 2026 GRUPO SAGO. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
      </html>
    `
  }

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0066CC; color: white; padding: 20px; text-align: center; }
          .content { background-color: #f9f9f9; padding: 30px; }
          .offer-box { background-color: #fff; border: 3px solid #FF6B35; padding: 30px; text-align: center; margin: 20px 0; border-radius: 10px; }
          .price { font-size: 36px; color: #FF6B35; font-weight: bold; }
          .details { background-color: #fff; padding: 20px; margin: 20px 0; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>GRUPO SAGO</h1>
            <p>Tu oferta está lista</p>
          </div>
          <div class="content">
            <h2>¡Hola ${offer.clientInfo.nombre}!</h2>
            <p>Hemos evaluado tu vehículo y tenemos una oferta para ti:</p>

            <div class="offer-box">
              <p style="margin: 0; font-size: 18px; color: #666;">Nuestra oferta</p>
              <p class="price">${precioOferta}</p>
              <p style="margin: 0; color: #666;">MXN</p>
            </div>

            <div class="details">
              <h3>Detalles de tu vehículo</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Modelo:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${offer.carDetails.modelo}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>VIN:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${offer.carDetails.vin}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Kilometraje:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${offer.carDetails.kilometraje.toLocaleString('es-MX')} KM</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Número de dueños:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #eee;">${offer.carDetails.numeroDeDuenos}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Facturas:</strong></td>
                  <td style="padding: 8px;">${offer.carDetails.numeroDeFacturas}</td>
                </tr>
              </table>
            </div>

            <div class="details">
              <h3>Información del mercado</h3>
              <p>Precio promedio de mercado: ${formatPesos(offer.marketData.precioPromedio)}</p>
              <p>Anuncios encontrados: ${offer.marketData.cantidadAnuncios}</p>
              <p>Rango de precios: ${formatPesos(offer.marketData.precioMinimo)} - ${formatPesos(offer.marketData.precioMaximo)}</p>
            </div>

            <p style="margin-top: 30px;">Esta oferta es válida por 7 días. Si estás interesado, por favor contacta a nuestro equipo de Seminuevos lo antes posible.</p>

            <p><strong>¿Preguntas?</strong> No dudes en contactarnos.</p>
          </div>
          <div class="footer">
            <p>&copy; 2026 GRUPO SAGO. Todos los derechos reservados.</p>
            <p>Este correo fue enviado a ${offer.clientInfo.email}</p>
          </div>
        </div>
      </body>
    </html>
  `
}
