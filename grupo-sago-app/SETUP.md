# Guía de Configuración Rápida - GRUPO SAGO

## 🚀 Inicio Rápido (5 minutos)

### 1. Instalar dependencias
```bash
cd grupo-sago-app
npm install
```

### 2. Configurar MongoDB

**Opción A: MongoDB Atlas (Recomendado - Sin instalación local)**
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea una cuenta gratuita
3. Crea un cluster gratuito (M0)
4. En "Security" → "Database Access", crea un usuario
5. En "Security" → "Network Access", permite todas las IPs (0.0.0.0/0) o tu IP específica
6. Copia la cadena de conexión y reemplaza `<password>`

**Opción B: MongoDB Local**
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Descarga e instala desde: https://www.mongodb.com/try/download/community
```

### 3. Configurar Gmail para enviar emails

1. Ve a tu cuenta de Google: https://myaccount.google.com/
2. Seguridad → Verificación en dos pasos (actívala si no está)
3. Seguridad → App Passwords
4. Genera una nueva contraseña de aplicación
5. Selecciona "Correo" y "Otro dispositivo"
6. Guarda la contraseña generada (16 caracteres)

### 4. Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# MongoDB (elige una opción)
# Opción A: MongoDB Atlas
MONGODB_URI=mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/grupo-sago?retryWrites=true&w=majority

# Opción B: MongoDB Local
# MONGODB_URI=mongodb://localhost:27017/grupo-sago

# Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-16-caracteres
EMAIL_FROM=noreply@gruposago.com

# URL de la app
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Iniciar la aplicación
```bash
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## 🔍 Verificar que todo funciona

### Probar la app cliente
1. Ve a http://localhost:3000
2. Completa el formulario con datos de prueba
3. Usa fotos de prueba de tu teléfono
4. Verifica que recibes el email con la oferta

### Probar el panel de admin
1. Ve a http://localhost:3000/admin
2. Deberías ver la oferta que acabas de crear
3. Click en "Ver detalles"
4. Prueba editar la información

## 📱 Generar código QR

Una vez que la app funcione:

1. **En desarrollo (local)**:
   - Usa un servicio como https://www.qr-code-generator.com/
   - Genera QR con: `http://TU-IP-LOCAL:3000`
   - Para encontrar tu IP: `ifconfig` (Mac/Linux) o `ipconfig` (Windows)

2. **En producción**:
   - Despliega a Vercel, Railway, o tu servidor
   - Genera QR con tu dominio: `https://valuacion.gruposago.com`

## ⚙️ Personalización básica

### Cambiar colores de marca

Edita `tailwind.config.js`:
```javascript
'grupo-sago': {
  primary: '#TU-COLOR-PRIMARIO',
  secondary: '#TU-COLOR-SECUNDARIO',
  accent: '#TU-COLOR-ACENTO',
}
```

### Agregar tu logo

1. Coloca tu logo en `/public/logo.png`
2. Genera iconos PWA en diferentes tamaños:
   - `icon-192x192.png`
   - `icon-512x512.png`

Usa herramientas como https://realfavicongenerator.net/

## 🐛 Problemas comunes

### "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo: `brew services list` (Mac)
- Si usas Atlas, verifica que permitiste tu IP en Network Access
- Verifica que la contraseña en MONGODB_URI no tenga caracteres especiales sin codificar

### "Error sending email"
- Verifica que usaste una App Password, no tu contraseña de Gmail normal
- Verifica que el email y la app password sean correctos
- Intenta con otro email si persiste el problema

### "Module not found"
```bash
# Borra node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

### La app no carga
```bash
# Detén el servidor (Ctrl+C) y reinicia
npm run dev
```

## 📞 ¿Necesitas ayuda?

Si tienes problemas con la configuración:
1. Revisa los logs en la terminal donde ejecutaste `npm run dev`
2. Busca errores específicos en Google
3. Verifica que todas las variables de entorno estén correctamente configuradas

## ✅ Checklist de configuración

- [ ] Node.js instalado (v18+)
- [ ] MongoDB funcionando (Atlas o local)
- [ ] App Password de Gmail generada
- [ ] Archivo .env.local creado con todas las variables
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run dev` inicia sin errores
- [ ] http://localhost:3000 carga correctamente
- [ ] Formulario completo genera una oferta
- [ ] Email se recibe correctamente
- [ ] Admin dashboard muestra la oferta
- [ ] Puedes editar ofertas en el admin

¡Listo! Tu app está configurada y funcionando. 🎉
