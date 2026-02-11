import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { servicioProductos } from '../services/servicioCatalogo'
import { SUBCATEGORIAS_POR_SLUG } from '../constants/subcategorias'
import type { Producto } from '../types/supabase'

/**
 * Interfaz compatible con los componentes existentes.
 * Mapea los campos de Supabase (snake_case) a camelCase.
 */
export interface Camisa {
  id: string
  nombre: string
  tallas: string[]
  colores: string[]
  imagen: string
  descripcion: string
  enOferta?: boolean
  esNuevo?: boolean
  estampado?: boolean
  bordado?: boolean
  categoria?: string
  subcategorias: string[]
}

/** Subcategorías de cada sección del sidebar */
export interface Subcategoria {
  nombre: string
  cantidad: number
}

/** Convierte un producto de Supabase al formato Camisa del frontend */
function mapearProductoACamisa(producto: Producto): Camisa {
  return {
    id: producto.id,
    nombre: producto.nombre,
    tallas: producto.tallas ?? [],
    colores: producto.colores ?? [],
    imagen: producto.imagen_url,
    descripcion: producto.descripcion ?? '',
    enOferta: producto.en_oferta,
    esNuevo: producto.es_nuevo,
    subcategorias: producto.subcategorias ?? []
  }
}

/** Aplica filtros de tallas, subcategoría, búsqueda y ordenamiento a una lista */
function aplicarFiltros(
  lista: Camisa[],
  tallasSeleccionadas: string[],
  subcategoriaActiva: string,
  terminoBusqueda: string,
  ordenamiento: string
): Camisa[] {
  let resultado = [...lista]

  // Filtrar por subcategoría
  if (subcategoriaActiva) {
    resultado = resultado.filter((c) => c.subcategorias.includes(subcategoriaActiva))
  }

  // Filtrar por tallas
  if (tallasSeleccionadas.length > 0) {
    resultado = resultado.filter((c) =>
      tallasSeleccionadas.some((talla) => c.tallas.includes(talla))
    )
  }

  // Filtrar por término de búsqueda
  if (terminoBusqueda.trim()) {
    const termino = terminoBusqueda.toLowerCase().trim()
    resultado = resultado.filter(
      (c) =>
        c.nombre.toLowerCase().includes(termino) ||
        c.descripcion.toLowerCase().includes(termino) ||
        c.colores.some((color) => color.toLowerCase().includes(termino))
    )
  }

  // Ordenar
  switch (ordenamiento) {
    case 'name-asc':
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre))
      break
    case 'newness':
      resultado.sort((a, b) => {
        if (a.esNuevo && !b.esNuevo) return -1
        if (!a.esNuevo && b.esNuevo) return 1
        return 0
      })
      break
    case 'offers':
      resultado.sort((a, b) => {
        if (a.enOferta && !b.enOferta) return -1
        if (!a.enOferta && b.enOferta) return 1
        return 0
      })
      break
    default:
      break
  }

  return resultado
}

export const useCatalogoStore = defineStore('catalogo', () => {
  // --- Datos crudos ---
  const camisasRaw = ref<Camisa[]>([])
  const camisasEstampadasRaw = ref<Camisa[]>([])
  const camisasBordadasRaw = ref<Camisa[]>([])
  const camisaSeleccionada = ref<Camisa | null>(null)
  const cargando = ref(false)
  const error = ref<string | null>(null)

  // --- Estado de filtros (compartido) ---
  const tallasSeleccionadas = ref<string[]>([])
  const subcategoriaActiva = ref('')
  const terminoBusqueda = ref('')
  const ordenamiento = ref('newness')

  // --- Subcategorías dinámicas para el sidebar ---
  /** Calcula las subcategorías con sus conteos reales */
  function calcularSubcategorias(
    lista: Camisa[],
    mapeo: readonly string[]
  ): Subcategoria[] {
    return mapeo.map((sub) => ({
      nombre: sub,
      cantidad: lista.filter((c) => c.subcategorias.includes(sub)).length
    }))
  }

  // --- Computed: subcategorías con conteo real ---
  const subcategoriasReplicasComputed = computed(() =>
    calcularSubcategorias(camisasRaw.value, SUBCATEGORIAS_POR_SLUG.replicas)
  )
  const subcategoriasEstampadasComputed = computed(() =>
    calcularSubcategorias(camisasEstampadasRaw.value, SUBCATEGORIAS_POR_SLUG.estampadas)
  )
  const subcategoriasBordadasComputed = computed(() =>
    calcularSubcategorias(camisasBordadasRaw.value, SUBCATEGORIAS_POR_SLUG.bordadas)
  )

  // --- Computed: listas filtradas ---
  const camisas = computed(() =>
    aplicarFiltros(
      camisasRaw.value,
      tallasSeleccionadas.value,
      subcategoriaActiva.value,
      terminoBusqueda.value,
      ordenamiento.value
    )
  )

  const camisasEstampadas = computed(() =>
    aplicarFiltros(
      camisasEstampadasRaw.value,
      tallasSeleccionadas.value,
      subcategoriaActiva.value,
      terminoBusqueda.value,
      ordenamiento.value
    )
  )

  const camisasBordadas = computed(() =>
    aplicarFiltros(
      camisasBordadasRaw.value,
      tallasSeleccionadas.value,
      subcategoriaActiva.value,
      terminoBusqueda.value,
      ordenamiento.value
    )
  )

  // --- Acciones de filtro ---
  function toggleTalla(talla: string) {
    const indice = tallasSeleccionadas.value.indexOf(talla)
    if (indice > -1) {
      tallasSeleccionadas.value.splice(indice, 1)
    } else {
      tallasSeleccionadas.value.push(talla)
    }
  }

  function seleccionarSubcategoria(nombre: string) {
    subcategoriaActiva.value = subcategoriaActiva.value === nombre ? '' : nombre
  }

  function establecerBusqueda(termino: string) {
    terminoBusqueda.value = termino
  }

  function establecerOrdenamiento(valor: string) {
    ordenamiento.value = valor
  }

  function limpiarFiltros() {
    tallasSeleccionadas.value = []
    subcategoriaActiva.value = ''
    terminoBusqueda.value = ''
    ordenamiento.value = 'newness'
  }

  const hayFiltrosActivos = computed(() =>
    tallasSeleccionadas.value.length > 0 ||
    subcategoriaActiva.value !== '' ||
    terminoBusqueda.value.trim() !== ''
  )

  // --- Carga de datos ---
  async function cargarCamisas() {
    cargando.value = true
    error.value = null
    try {
      const datos = await servicioProductos.obtenerPorCategoria('replicas')
      camisasRaw.value = datos.map(mapearProductoACamisa)
    } catch (e) {
      error.value = 'Error al cargar camisas'
      console.error(e)
    } finally {
      cargando.value = false
    }
  }

  async function cargarCamisasEstampadas() {
    cargando.value = true
    error.value = null
    try {
      const datos = await servicioProductos.obtenerPorCategoria('estampadas')
      camisasEstampadasRaw.value = datos.map((p) => ({
        ...mapearProductoACamisa(p),
        estampado: true,
        categoria: 'Estampadas'
      }))
    } catch (e) {
      error.value = 'Error al cargar camisas estampadas'
      console.error(e)
    } finally {
      cargando.value = false
    }
  }

  async function cargarCamisasBordadas() {
    cargando.value = true
    error.value = null
    try {
      const datos = await servicioProductos.obtenerPorCategoria('bordadas')
      camisasBordadasRaw.value = datos.map((p) => ({
        ...mapearProductoACamisa(p),
        bordado: true,
        categoria: 'Bordadas'
      }))
    } catch (e) {
      error.value = 'Error al cargar camisas bordadas'
      console.error(e)
    } finally {
      cargando.value = false
    }
  }

  async function cargarTodo() {
    await Promise.all([
      cargarCamisas(),
      cargarCamisasEstampadas(),
      cargarCamisasBordadas()
    ])
  }

  /** Obtiene una camisa por ID buscando en todas las listas */
  function obtenerPorId(id: string): Camisa | undefined {
    return (
      camisasRaw.value.find((c) => c.id === id) ??
      camisasEstampadasRaw.value.find((c) => c.id === id) ??
      camisasBordadasRaw.value.find((c) => c.id === id)
    )
  }

  function seleccionarCamisa(camisa: Camisa) {
    camisaSeleccionada.value = camisa
  }

  return {
    // Listas filtradas (computed)
    camisas,
    camisasEstampadas,
    camisasBordadas,
    // Listas crudas
    camisasRaw,
    camisasEstampadasRaw,
    camisasBordadasRaw,
    // Subcategorías con conteo
    subcategoriasReplicasComputed,
    subcategoriasEstampadasComputed,
    subcategoriasBordadasComputed,
    // Estado
    camisaSeleccionada,
    cargando,
    error,
    // Filtros
    tallasSeleccionadas,
    subcategoriaActiva,
    terminoBusqueda,
    ordenamiento,
    hayFiltrosActivos,
    // Acciones de filtro
    toggleTalla,
    seleccionarSubcategoria,
    establecerBusqueda,
    establecerOrdenamiento,
    limpiarFiltros,
    // Carga
    cargarCamisas,
    cargarCamisasEstampadas,
    cargarCamisasBordadas,
    cargarTodo,
    // Utils
    obtenerPorId,
    seleccionarCamisa
  }
})
