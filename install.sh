#!/bin/bash

echo "🚀 Instalando Frontend Login Funcional..."
echo "=========================================="

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 16.0.0 o superior."
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js versión $NODE_VERSION detectada. Se requiere versión 16.0.0 o superior."
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Crear archivo .env si no existe
if [ ! -f .env ]; then
    echo "🔧 Creando archivo .env..."
    cp env.example .env
    echo "✅ Archivo .env creado. Por favor revisa y configura las variables de entorno."
else
    echo "✅ Archivo .env ya existe"
fi

echo ""
echo "🎉 Instalación completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Asegúrate de que el backend esté ejecutándose en http://localhost:4000"
echo "2. Revisar y configurar el archivo .env si es necesario"
echo "3. Ejecutar: npm start"
echo ""
echo "🔗 La aplicación estará disponible en: http://localhost:3000"
echo "📚 Consulta el README.md para más información"
