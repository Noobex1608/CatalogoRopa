import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Camisa {
  id: number
  nombre: string
  precio: number
  precioAnterior?: number
  tallas: string[]
  colores: string[]
  imagen: string
  descripcion: string
  enOferta?: boolean
  esNuevo?: boolean
  estampado?: boolean
  bordado?: boolean
  categoria?: string
}

export const useCatalogoStore = defineStore('catalogo', () => {
  const camisas = ref<Camisa[]>([
    {
      id: 1,
      nombre: 'Camisa Casual Azul Premium',
      precio: 24.99,
      precioAnterior: 39.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Azul', 'Blanco', 'Negro'],
      imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
      descripcion: 'Camisa casual de algodón 100% perfecta para el día a día',
      enOferta: true
    },
    {
      id: 2,
      nombre: 'Camisa Formal Blanca Elegante',
      precio: 34.99,
      precioAnterior: 49.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Blanco', 'Celeste', 'Rosa'],
      imagen: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
      descripcion: 'Camisa formal elegante ideal para ocasiones especiales',
      enOferta: true
    },
    {
      id: 3,
      nombre: 'Camisa Denim Clásica',
      precio: 29.99,
      tallas: ['M', 'L', 'XL'],
      colores: ['Azul Denim', 'Negro Denim'],
      imagen: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop',
      descripcion: 'Camisa de mezclilla resistente y con estilo',
      esNuevo: true
    },
    {
      id: 4,
      nombre: 'Camisa Cuadros Leñador',
      precio: 19.99,
      precioAnterior: 34.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Rojo/Negro', 'Azul/Blanco', 'Verde/Negro'],
      imagen: 'https://images.unsplash.com/photo-1598032895397-b9c259d6e948?w=400&h=500&fit=crop',
      descripcion: 'Camisa a cuadros estilo leñador',
      enOferta: true
    },
    {
      id: 5,
      nombre: 'Camisa Lino Beige Verano',
      precio: 39.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Beige', 'Blanco', 'Gris'],
      imagen: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop',
      descripcion: 'Camisa de lino fresca y ligera para el verano',
      esNuevo: true
    },
    {
      id: 6,
      nombre: 'Camisa Oxford Clásica',
      precio: 27.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Blanco', 'Azul', 'Rosa'],
      imagen: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=500&fit=crop',
      descripcion: 'Camisa Oxford clásica versátil y duradera'
    },
    {
      id: 7,
      nombre: 'Camisa Polo Rayas Marinero',
      precio: 22.99,
      precioAnterior: 35.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Azul/Blanco', 'Rojo/Blanco'],
      imagen: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop',
      descripcion: 'Camisa polo con rayas estilo marinero',
      enOferta: true
    },
    {
      id: 8,
      nombre: 'Camisa Slim Fit Negra',
      precio: 32.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Negro', 'Gris Oscuro'],
      imagen: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=500&fit=crop',
      descripcion: 'Camisa ajustada moderna color negro',
      esNuevo: true
    },
    {
      id: 9,
      nombre: 'Camisa Hawaiana Tropical',
      precio: 26.99,
      tallas: ['M', 'L', 'XL', 'XXL'],
      colores: ['Multicolor'],
      imagen: 'https://images.unsplash.com/photo-1602810316498-ab67cf68c8e1?w=400&h=500&fit=crop',
      descripcion: 'Camisa hawaiana con estampado tropical'
    },
    {
      id: 10,
      nombre: 'Camisa Manga Larga Burgundy',
      precio: 28.99,
      precioAnterior: 44.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Burgundy', 'Verde Olivo', 'Azul Marino'],
      imagen: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?w=400&h=500&fit=crop',
      descripcion: 'Camisa manga larga color burgundy elegante',
      enOferta: true
    }
  ])

  const camisasEstampadas = ref<Camisa[]>([
    {
      id: 11,
      nombre: 'Camisa Estampado Floral Tropical',
      precio: 32.99,
      precioAnterior: 45.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Multicolor', 'Azul/Flores', 'Negro/Flores'],
      imagen: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=500&fit=crop',
      descripcion: 'Camisa con vibrante estampado floral tropical',
      enOferta: true,
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 12,
      nombre: 'Camisa Estampado Geométrico Moderno',
      precio: 29.99,
      tallas: ['M', 'L', 'XL', 'XXL'],
      colores: ['Negro/Blanco', 'Azul/Gris'],
      imagen: 'https://images.unsplash.com/photo-1620799140834-6b8f844fbe29?w=400&h=500&fit=crop',
      descripcion: 'Diseño geométrico contemporáneo y elegante',
      esNuevo: true,
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 13,
      nombre: 'Camisa Estampado Animal Print',
      precio: 34.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Leopardo', 'Zebra', 'Serpiente'],
      imagen: 'https://images.unsplash.com/photo-1622519407650-3df9883f76e6?w=400&h=500&fit=crop',
      descripcion: 'Atrevida camisa con estampado animal',
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 14,
      nombre: 'Camisa Estampado Abstracto Arte',
      precio: 36.99,
      precioAnterior: 52.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Multicolor', 'Azul/Naranja', 'Verde/Rosa'],
      imagen: 'https://images.unsplash.com/photo-1602810316829-91da6c48e3cd?w=400&h=500&fit=crop',
      descripcion: 'Estampado abstracto inspirado en el arte moderno',
      enOferta: true,
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 15,
      nombre: 'Camisa Estampado Rayas Náutico',
      precio: 27.99,
      tallas: ['M', 'L', 'XL'],
      colores: ['Azul/Blanco', 'Rojo/Blanco', 'Negro/Blanco'],
      imagen: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop',
      descripcion: 'Clásico estampado de rayas estilo marinero',
      esNuevo: true,
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 16,
      nombre: 'Camisa Estampado Paisley Oriental',
      precio: 31.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Borgoña/Dorado', 'Azul/Plata', 'Verde/Oro'],
      imagen: 'https://images.unsplash.com/photo-1603252109612-5d8f5b0e1b1e?w=400&h=500&fit=crop',
      descripcion: 'Elegante diseño paisley con detalles orientales',
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 17,
      nombre: 'Camisa Estampado Lunares Retro',
      precio: 25.99,
      precioAnterior: 38.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Negro/Blanco', 'Azul/Blanco', 'Rojo/Blanco'],
      imagen: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=500&fit=crop',
      descripcion: 'Divertido estampado de lunares estilo vintage',
      enOferta: true,
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 18,
      nombre: 'Camisa Estampado Cachemira Premium',
      precio: 38.99,
      tallas: ['M', 'L', 'XL'],
      colores: ['Azul/Dorado', 'Negro/Plata', 'Vino/Oro'],
      imagen: 'https://images.unsplash.com/photo-1598032895397-b9c259d6e948?w=400&h=500&fit=crop',
      descripcion: 'Sofisticado patrón cachemira de alta calidad',
      esNuevo: true,
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 19,
      nombre: 'Camisa Estampado Cuadros Escocés',
      precio: 30.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Rojo/Negro', 'Verde/Azul', 'Gris/Negro'],
      imagen: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
      descripcion: 'Tradicional estampado de cuadros escoceses',
      estampado: true,
      categoria: 'Estampadas'
    },
    {
      id: 20,
      nombre: 'Camisa Estampado Tie-Dye Vintage',
      precio: 28.99,
      precioAnterior: 42.99,
      tallas: ['M', 'L', 'XL'],
      colores: ['Multicolor', 'Azul/Violeta', 'Rosa/Naranja'],
      imagen: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop',
      descripcion: 'Estampado tie-dye retro años 70',
      enOferta: true,
      estampado: true,
      categoria: 'Estampadas'
    }
  ])

  const camisasBordadas = ref<Camisa[]>([
    {
      id: 21,
      nombre: 'Camisa Bordado Floral Delicado',
      precio: 42.99,
      precioAnterior: 59.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Blanco/Flores', 'Beige/Flores', 'Rosa/Flores'],
      imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
      descripcion: 'Elegante bordado floral hecho a mano',
      enOferta: true,
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 22,
      nombre: 'Camisa Bordado Geométrico Étnico',
      precio: 44.99,
      tallas: ['M', 'L', 'XL', 'XXL'],
      colores: ['Negro/Dorado', 'Azul/Plata', 'Vino/Oro'],
      imagen: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=500&fit=crop',
      descripcion: 'Bordado étnico con detalles geométricos',
      esNuevo: true,
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 23,
      nombre: 'Camisa Bordado Cuello y Puños Premium',
      precio: 48.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Blanco/Azul', 'Negro/Plateado', 'Beige/Dorado'],
      imagen: 'https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?w=400&h=500&fit=crop',
      descripcion: 'Bordado refinado en cuello y puños',
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 24,
      nombre: 'Camisa Bordado Mexicano Artesanal',
      precio: 52.99,
      precioAnterior: 69.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Blanco/Multicolor', 'Negro/Multicolor', 'Crema/Colores'],
      imagen: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
      descripcion: 'Auténtico bordado mexicano tradicional',
      enOferta: true,
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 25,
      nombre: 'Camisa Bordado Minimalista Moderno',
      precio: 39.99,
      tallas: ['M', 'L', 'XL'],
      colores: ['Blanco/Negro', 'Gris/Blanco', 'Azul/Blanco'],
      imagen: 'https://images.unsplash.com/photo-1603252109612-5d8f5b0e1b1e?w=400&h=500&fit=crop',
      descripcion: 'Bordado minimalista y contemporáneo',
      esNuevo: true,
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 26,
      nombre: 'Camisa Bordado Oriental Dragón',
      precio: 56.99,
      tallas: ['S', 'M', 'L', 'XL'],
      colores: ['Negro/Dorado', 'Rojo/Dorado', 'Azul/Plata'],
      imagen: 'https://images.unsplash.com/photo-1598032895397-b9c259d6e948?w=400&h=500&fit=crop',
      descripcion: 'Bordado oriental con figura de dragón',
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 27,
      nombre: 'Camisa Bordado Vintage Inglés',
      precio: 46.99,
      precioAnterior: 64.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Blanco/Verde', 'Beige/Café', 'Gris/Azul'],
      imagen: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400&h=500&fit=crop',
      descripcion: 'Bordado vintage estilo inglés clásico',
      enOferta: true,
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 28,
      nombre: 'Camisa Bordado Bohemio Hippie',
      precio: 41.99,
      tallas: ['M', 'L', 'XL'],
      colores: ['Blanco/Multicolor', 'Crema/Colores', 'Beige/Bordado'],
      imagen: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=400&h=500&fit=crop',
      descripcion: 'Bordado bohemio con espíritu libre',
      esNuevo: true,
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 29,
      nombre: 'Camisa Bordado Indio Kashida',
      precio: 54.99,
      tallas: ['S', 'M', 'L', 'XL', 'XXL'],
      colores: ['Blanco/Multicolor', 'Negro/Colores', 'Azul/Bordado'],
      imagen: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop',
      descripcion: 'Técnica tradicional kashida de India',
      bordado: true,
      categoria: 'Bordadas'
    },
    {
      id: 30,
      nombre: 'Camisa Bordado Perlas y Lentejuelas',
      precio: 64.99,
      precioAnterior: 89.99,
      tallas: ['M', 'L', 'XL'],
      colores: ['Blanco/Perlas', 'Negro/Plateado', 'Champagne/Dorado'],
      imagen: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400&h=500&fit=crop',
      descripcion: 'Bordado premium con perlas y lentejuelas',
      enOferta: true,
      bordado: true,
      categoria: 'Bordadas'
    }
  ])

  const camisaSeleccionada = ref<Camisa | null>(null)

  function seleccionarCamisa(camisa: Camisa) {
    camisaSeleccionada.value = camisa
  }

  return {
    camisas,
    camisasEstampadas,
    camisasBordadas,
    camisaSeleccionada,
    seleccionarCamisa
  }
})
