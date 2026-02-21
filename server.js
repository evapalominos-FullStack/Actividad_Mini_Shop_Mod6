// ============================================
// SERVIDOR MINISHOP - EXPRESS + HANDLEBARS
// Para principiantes - Con explicaciones
// ============================================

// PASO 1: Importar lo que necesitamos
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

// PASO 2: Crear la aplicación Express
const app = express();
const PORT = 3000;

// ============================================
// DATOS DE LA TIENDA
// ============================================

// Nombre y mensaje de la tienda
const nombreTienda = "MiniShop";
const mensajeBienvenida = "Bienvenido a nuestra tienda online. ¡Encuentra los mejores productos!";

// Lista de productos
const productos = [
    {
        nombre: "Camiseta Básica",
        precio: 15,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600"
    },
    {
        nombre: "Pantalón Jeans",
        precio: 30,
        disponible: false,
        imagen: "./public/images/jeans.jpg" // Imagen local
    },
    {
        nombre: "Zapatos Deportivos",
        precio: 50,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1528701800489-20be8c01c1a3?w=600"
    },
    {
        nombre: "Chaqueta de Cuero",
        precio: 80,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600"
    },
    {
        nombre: "Gorra Clásica",
        precio: 12,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-bf2f5f0f3e3a?w=600"
    },
    {
        nombre: "Bolso de Mano",
        precio: 45,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1526170375885-43f5d6d4f00f?w=600"
    },
    {
        nombre: "Reloj Digital",
        precio: 60,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-6c60d6f0f47f?w=600"
    },
    {
        nombre: "Bufanda de Lana",
        precio: 18,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-6b73d6d0f0aa?w=600"
    },
    {
        nombre: "Sudadera Hoodie",
        precio: 35,
        disponible: false,
        imagen: "https://images.unsplash.com/photo-1526170375885-9f25d6f0f077?w=600"
    },
    {
        nombre: "Gafas de Sol",
        precio: 25,
        disponible: true,
        imagen: "https://images.unsplash.com/photo-1526170375885-fc40d6f0f0cc?w=600"
    }
];

// ============================================
// CONFIGURAR HANDLEBARS
// ============================================

// Configurar el motor de plantillas Handlebars
app.engine('handlebars', engine({
    // Carpeta donde están los layouts
    layoutsDir: path.join(__dirname, 'views/layouts'),
    // Carpeta donde están los partials
    partialsDir: path.join(__dirname, 'views/partials'),
    // Layout por defecto
    defaultLayout: 'main',
    // HELPER PERSONALIZADO: Convertir a mayúsculas
    helpers: {
        mayusculas: function(texto) {
            return texto ? texto.toUpperCase() : '';
        }
    }
}));

// Establecer Handlebars como motor de vistas
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// ============================================
// MIDDLEWARE
// ============================================

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Para leer datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ============================================
// RUTAS
// ============================================

// RUTA 1: Página de inicio (Home)
app.get('/', (req, res) => {
    res.render('home', {
        titulo: 'Inicio',
        nombreTienda: nombreTienda,
        mensaje: mensajeBienvenida,
        productos: productos
    });
});

// RUTA 2: Página Acerca de (About)
app.get('/about', (req, res) => {
    res.render('about', {
        titulo: 'Acerca de',
        nombreTienda: nombreTienda
    });
});

// RUTA 3: Página de Contacto (GET - mostrar formulario)
app.get('/contact', (req, res) => {
    res.render('contact', {
        titulo: 'Contacto',
        nombreTienda: nombreTienda
    });
});

// RUTA 4: Procesar formulario de contacto (POST)
app.post('/contact', (req, res) => {
    // Obtener datos del formulario
    const { nombre, email, mensaje } = req.body;
    
    // Validar que todos los campos estén llenos
    if (!nombre || !email || !mensaje) {
        return res.render('contact', {
            titulo: 'Contacto',
            nombreTienda: nombreTienda,
            error: 'Por favor completa todos los campos'
        });
    }
    
    // Mostrar página de éxito
    res.render('success', {
        titulo: 'Mensaje Enviado',
        nombreTienda: nombreTienda,
        nombreUsuario: nombre
    });
});

// ============================================
// MANEJO DE MÉTODOS NO PERMITIDOS
// ============================================

// Capturar cualquier método que no sea GET o POST en rutas existentes
app.all('*', (req, res) => {
    // Si el método no es GET ni POST
    if (req.method !== 'GET' && req.method !== 'POST') {
        return res.status(405).send('Método no permitido. Solo se permiten GET y POST.');
    }
    
    // Si llegó aquí, es una ruta no encontrada
    res.status(404).render('404', {
        titulo: 'Página no encontrada',
        nombreTienda: nombreTienda
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log('\n🛒 MiniShop está corriendo!');
    console.log(`📍 Servidor: http://localhost:${PORT}`);
    console.log('\n📄 Páginas disponibles:');
    console.log(`   🏠 Inicio:    http://localhost:${PORT}/`);
    console.log(`   ℹ️  Acerca de: http://localhost:${PORT}/about`);
    console.log(`   📧 Contacto:  http://localhost:${PORT}/contact`);
    console.log('\n💡 Para detener: Ctrl + C\n');
});
