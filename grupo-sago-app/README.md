# GRUPO SAGO - Sistema de Valuación de Vehículos

Aplicación web progresiva (PWA) para la valuación instantánea de vehículos seminuevos, diseñada específicamente para concesionarios GRUPO SAGO en México.

## 🚗 Características

### Aplicación Cliente (Acceso vía QR)
- **Formulario simplificado** de información personal (nombre, teléfono, email)
- **Captura de 6 fotos** del vehículo (frente, laterales, trasera, interior delantero y trasero)
- **Detalles del vehículo**: modelo, VIN, número de dueños, facturas, kilometraje
- **Investigación automática de mercado** consultando Mercado Libre y otros sitios
- **Generación de ofertas** con margen del 12% bajo el precio promedio del mercado
- **Verificación de demanda** del modelo antes de hacer la oferta
- **Envío automático de oferta** por correo electrónico
- Optimizada para dispositivos móviles

### Panel de Administración
- **Visualización de todas las ofertas** recibidas con filtros y ordenamiento
- **Edición de información** del vehículo y ofertas
- **Actualización de estados**: aceptada/rechazada, compra finalizada
- **Dashboard de métricas mensuales**:
  - Total de clientes
  - Ofertas aceptadas/rechazadas
  - Compras finalizadas
  - Tasa de conversión
  - Valor total de ofertas y compras

## 🛠️ Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, TypeScript
- **Estilos**: Tailwind CSS
- **Base de datos**: MongoDB
- **Email**: Nodemailer
- **Web scraping**: Axios + Cheerio
- **PWA**: Manifest.json para instalación como app

## 📋 Requisitos previos

- Node.js 18 o superior
- MongoDB (local o Atlas)
- Cuenta de email (Gmail recomendado para Nodemailer)

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   cd grupo-sago-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   Copia el archivo de ejemplo:
   ```bash
   cp .env.local.example .env.local
   ```

   Edita `.env.local` con tus credenciales:
   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/grupo-sago
   # O para MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/grupo-sago

   # Email (Gmail)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=tu-email@gmail.com
   EMAIL_PASS=tu-app-password
   EMAIL_FROM=noreply@gruposago.com

   # App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

   **Nota para Gmail**: Debes generar una "App Password" en tu cuenta de Google:
   1. Ve a tu cuenta de Google → Seguridad
   2. Activa la verificación en dos pasos
   3. En "App Passwords", genera una nueva contraseña
   4. Usa esa contraseña en `EMAIL_PASS`

4. **Configurar MongoDB**

   Si usas MongoDB local:
   ```bash
   # Instalar MongoDB (macOS)
   brew install mongodb-community

   # Iniciar MongoDB
   brew services start mongodb-community
   ```

   O usa MongoDB Atlas (cloud) para no tener que instalar nada localmente.

5. **Iniciar la aplicación**
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en: http://localhost:3000

## 📱 Uso

### Aplicación Cliente

1. **Generar código QR**:
   - Usa cualquier generador de QR apuntando a tu URL (ej: `https://tu-dominio.com`)
   - Imprime o muestra el QR en tu concesionario

2. **Proceso del cliente**:
   - Escanea el QR
   - Completa información personal
   - Toma 6 fotos del vehículo
   - Ingresa detalles del auto
   - Recibe oferta instantánea por email

### Panel de Administración

Accede a: http://localhost:3000/admin

- **Pestaña "Ofertas"**: Ver todas las ofertas recibidas
  - Click en "Ver detalles" para abrir el modal
  - Edita información si es necesario
  - Marca ofertas como aceptadas/rechazadas
  - Actualiza el estado de compra

- **Pestaña "Métricas"**: Dashboard con estadísticas del mes
  - Total de clientes
  - Tasas de aceptación y conversión
  - Valor total de ofertas y compras

## 🎨 Personalización de marca

### Colores GRUPO SAGO

Los colores se configuran en `tailwind.config.js`:

```javascript
colors: {
  'grupo-sago': {
    primary: '#0066CC',    // Azul principal
    secondary: '#003D7A',  // Azul oscuro
    accent: '#FF6B35',     // Naranja/Rojo acento
    light: '#F0F4F8',      // Fondo claro
    dark: '#1A1A1A',       // Texto oscuro
  },
}
```

### Logotipo

Reemplaza los archivos en `/public`:
- `icon-192x192.png` - Icono PWA pequeño
- `icon-512x512.png` - Icono PWA grande
- `logo.png` (opcional) - Logo para header

## 🌐 Despliegue en producción

### Opción 1: Vercel (Recomendado)

1. **Push a GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin tu-repo.git
   git push -u origin main
   ```

2. **Conectar con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Importa tu repositorio de GitHub
   - Configura las variables de entorno
   - Deploy automático

### Opción 2: Docker

```bash
# Construir imagen
docker build -t grupo-sago-app .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env.local grupo-sago-app
```

### Configuración de dominio

1. Compra un dominio (ej: `valuacion.gruposago.com`)
2. Apunta el dominio a tu servidor/Vercel
3. Actualiza `NEXT_PUBLIC_APP_URL` en las variables de entorno
4. Genera nuevo QR con la URL de producción

## 🔒 Seguridad

- **Autenticación para admin**: Considera agregar autenticación (NextAuth.js)
- **HTTPS**: Siempre usa HTTPS en producción
- **Variables de entorno**: Nunca subas `.env.local` a git
- **MongoDB**: Usa credenciales fuertes y restringe IPs

## 📊 Investigación de mercado

El sistema actualmente usa datos simulados para las investigaciones de mercado. Para implementar scraping real:

1. **Mercado Libre API**: Registra tu app en https://developers.mercadolibre.com
2. **Actualiza** `lib/marketResearch.ts` con las llamadas reales a la API
3. **Considera** servicios como ScrapingBee o Bright Data para scraping a escala

## 🐛 Solución de problemas

### Error de conexión a MongoDB
```bash
# Verifica que MongoDB esté corriendo
brew services list

# Reinicia el servicio
brew services restart mongodb-community
```

### Emails no se envían
- Verifica que Gmail tenga "App Passwords" configurado
- Revisa que el firewall no bloquee el puerto 587
- Usa `console.log` en `lib/email.ts` para debug

### PWA no se instala
- Verifica que estés usando HTTPS (requerido para PWA)
- Asegúrate de que `manifest.json` sea accesible
- Los íconos deben existir en `/public`

## 📝 Roadmap

- [ ] Autenticación para panel de admin
- [ ] Notificaciones push cuando llegan nuevas ofertas
- [ ] Integración con CRM del concesionario
- [ ] Análisis de imágenes con IA para detectar daños
- [ ] Multi-sucursal con gestión por concesionario
- [ ] API REST para integraciones externas
- [ ] Exportación de reportes en Excel/PDF

## 👥 Soporte

Para problemas o preguntas, contacta a:
- Email: soporte@gruposago.com
- Tel: +52 55 1234 5678

## 📄 Licencia

© 2026 GRUPO SAGO. Todos los derechos reservados.
