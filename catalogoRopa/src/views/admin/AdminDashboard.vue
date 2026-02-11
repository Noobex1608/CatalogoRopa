<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { servicioAuth, usuarioActual } from '../../services/servicioAuth'
import { servicioAdminProductos } from '../../services/servicioAdminProductos'
import { servicioCategorias } from '../../services/servicioCatalogo'
import { obtenerSubcategoriasPorSlug } from '../../constants/subcategorias'
import type { Producto, Categoria } from '../../types/supabase'
import type { Database } from '../../types/supabase'

type ProductoInsert = Database['public']['Tables']['productos']['Insert']

const router = useRouter()

/* ───── Estado general ───── */
const categorias = ref<Categoria[]>([])
const productos = ref<(Producto & { categoria_nombre?: string })[]>([])
const categoriaActiva = ref<string>('') // '' = todas
const cargando = ref(false)
const error = ref('')

/* ───── Modal de formulario ───── */
const mostrarModal = ref(false)
const modoEdicion = ref(false)
const productoEditandoId = ref<string | null>(null)
const guardando = ref(false)

const formDefaults = {
  nombre: '',
  descripcion: '',
  imagen_url: '',
  tallas: [] as string[],
  colores: [] as string[],
  en_oferta: false,
  es_nuevo: false,
  categoria_id: '',
  subcategorias: [] as string[]
}
const form = ref({ ...formDefaults })
const tallasInput = ref('')
const coloresInput = ref('')

/* ───── Modal de confirmación ───── */
const mostrarConfirmacion = ref(false)
const productoAEliminar = ref<Producto | null>(null)
const eliminando = ref(false)

/* ───── Búsqueda ───── */
const busqueda = ref('')

/* ───── Computed ───── */
const productosFiltrados = computed(() => {
  let lista = productos.value

  if (categoriaActiva.value) {
    lista = lista.filter(p => p.categoria_id === categoriaActiva.value)
  }

  if (busqueda.value.trim()) {
    const termino = busqueda.value.toLowerCase()
    lista = lista.filter(p =>
      p.nombre.toLowerCase().includes(termino) ||
      p.descripcion?.toLowerCase().includes(termino)
    )
  }

  return lista
})

const totalProductos = computed(() => productos.value.length)

function categoriaNombre(id: string): string {
  return categorias.value.find(c => c.id === id)?.nombre ?? 'Sin categoría'
}

const categoriaSeleccionada = computed(() =>
  categorias.value.find((c) => c.id === form.value.categoria_id) ?? null
)

const subcategoriasDisponibles = computed(() =>
  obtenerSubcategoriasPorSlug(categoriaSeleccionada.value?.slug ?? categoriaSeleccionada.value?.nombre)
)

watch(
  () => form.value.categoria_id,
  () => {
    const disponibles = subcategoriasDisponibles.value
    form.value.subcategorias = form.value.subcategorias.filter((s) => disponibles.includes(s))
  }
)

function setEnOferta(checked: boolean) {
  form.value.en_oferta = checked
  if (checked) form.value.es_nuevo = false
}

function setEsNuevo(checked: boolean) {
  form.value.es_nuevo = checked
  if (checked) form.value.en_oferta = false
}

/* ───── Carga de datos ───── */
async function cargarDatos() {
  cargando.value = true
  error.value = ''
  try {
    const [cats, prods] = await Promise.all([
      servicioCategorias.obtenerTodas(),
      servicioAdminProductos.obtenerTodos()
    ])
    categorias.value = cats
    productos.value = prods

    // Pre-seleccionar primera categoría si no hay una activa
    if (!categoriaActiva.value && cats.length > 0) {
      categoriaActiva.value = '' // Mostrar todas por defecto
    }
  } catch (e: any) {
    error.value = e.message ?? 'Error al cargar datos'
  } finally {
    cargando.value = false
  }
}

/* ───── CRUD ───── */
function abrirCrear() {
  modoEdicion.value = false
  productoEditandoId.value = null
  form.value = { ...formDefaults }
  // Pre-seleccionar la categoría activa si hay una
  if (categoriaActiva.value) {
    form.value.categoria_id = categoriaActiva.value
  } else if (categorias.value.length > 0) {
    form.value.categoria_id = categorias.value[0]?.id ?? ''
  }
  tallasInput.value = 'S, M, L, XL'
  coloresInput.value = ''
  mostrarModal.value = true
}

function abrirEditar(producto: Producto) {
  modoEdicion.value = true
  productoEditandoId.value = producto.id
  form.value = {
    nombre: producto.nombre,
    descripcion: producto.descripcion ?? '',
    imagen_url: producto.imagen_url,
    tallas: [...producto.tallas],
    colores: [...producto.colores],
    en_oferta: producto.en_oferta,
    es_nuevo: producto.es_nuevo,
    categoria_id: producto.categoria_id,
    subcategorias: producto.subcategorias ?? []
  }
  tallasInput.value = producto.tallas.join(', ')
  coloresInput.value = producto.colores.join(', ')
  mostrarModal.value = true
}

async function guardarProducto() {
  error.value = ''

  // Validación básica
  if (!form.value.nombre.trim()) { error.value = 'El nombre es obligatorio'; return }
  if (!form.value.imagen_url.trim()) { error.value = 'La URL de imagen es obligatoria'; return }
  if (!form.value.categoria_id) { error.value = 'Selecciona una categoría'; return }

  // Parsear tallas y colores
  const tallas = tallasInput.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)
  const colores = coloresInput.value
    .split(',')
    .map(c => c.trim())
    .filter(Boolean)

  guardando.value = true

  try {
    const datos: ProductoInsert = {
      nombre: form.value.nombre.trim(),
      descripcion: form.value.descripcion.trim() || null,
      imagen_url: form.value.imagen_url.trim(),
      tallas,
      colores,
      en_oferta: form.value.en_oferta,
      es_nuevo: form.value.es_nuevo,
      categoria_id: form.value.categoria_id,
      subcategorias: form.value.subcategorias
    }

    if (modoEdicion.value && productoEditandoId.value) {
      await servicioAdminProductos.actualizar(productoEditandoId.value, datos)
    } else {
      await servicioAdminProductos.crear(datos)
    }

    mostrarModal.value = false
    await cargarDatos()
  } catch (e: any) {
    error.value = e.message ?? 'Error al guardar producto'
  } finally {
    guardando.value = false
  }
}

function confirmarEliminar(producto: Producto) {
  productoAEliminar.value = producto
  mostrarConfirmacion.value = true
}

async function eliminarProducto() {
  if (!productoAEliminar.value) return
  eliminando.value = true
  error.value = ''
  try {
    await servicioAdminProductos.eliminar(productoAEliminar.value.id)
    mostrarConfirmacion.value = false
    productoAEliminar.value = null
    await cargarDatos()
  } catch (e: any) {
    error.value = e.message ?? 'Error al eliminar producto'
  } finally {
    eliminando.value = false
  }
}

/* ───── Subir imagen ───── */
const subiendoImagen = ref(false)

async function handleSubirImagen(event: Event) {
  const input = event.target as HTMLInputElement
  const archivo = input.files?.[0]
  if (!archivo) return

  subiendoImagen.value = true
  try {
    const url = await servicioAdminProductos.subirImagen(archivo)
    form.value.imagen_url = url
  } catch (e: any) {
    error.value = `Error al subir imagen: ${e.message}`
  } finally {
    subiendoImagen.value = false
    input.value = ''
  }
}

/* ───── Cerrar sesión ───── */
async function cerrarSesion() {
  await servicioAuth.cerrarSesion()
  router.push('/admin/login')
}

/* ───── Lifecycle ───── */
onMounted(() => {
  cargarDatos()
})

</script>

<template>
  <div class="min-h-screen bg-[#0a1628] text-gray-200">
    <!-- ───── Topbar ───── -->
    <header class="bg-[#111d33] border-b border-gray-700/50 sticky top-0 z-40">
      <div class="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <Icon icon="mdi:shield-lock" class="w-7 h-7 text-[#009DAE]" />
          <h1 class="text-lg font-bold text-white">Admin Panel</h1>
          <span class="hidden sm:inline text-xs bg-[#009DAE]/20 text-[#009DAE] px-2 py-0.5 rounded-full">
            {{ totalProductos }} productos
          </span>
        </div>

        <div class="flex items-center gap-4">
          <RouterLink to="/" class="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
            <Icon icon="mdi:storefront" class="w-4 h-4" />
            <span class="hidden sm:inline">Ver tienda</span>
          </RouterLink>
          <div class="text-gray-500 text-xs hidden md:block">
            {{ usuarioActual?.email }}
          </div>
          <button
            @click="cerrarSesion"
            class="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            <Icon icon="mdi:logout" class="w-4 h-4" />
            <span class="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
      <!-- ───── Error global ───── -->
      <Transition name="fade">
        <div
          v-if="error"
          class="mb-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3"
        >
          <Icon icon="mdi:alert-circle" class="w-5 h-5 flex-shrink-0" />
          {{ error }}
          <button @click="error = ''" class="ml-auto text-red-400 hover:text-red-300">
            <Icon icon="mdi:close" class="w-4 h-4" />
          </button>
        </div>
      </Transition>

      <!-- ───── Barra de acciones ───── -->
      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <!-- Tabs de categorías -->
        <div class="flex gap-1 bg-[#111d33] rounded-xl p-1 overflow-x-auto">
          <button
            @click="categoriaActiva = ''"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              categoriaActiva === ''
                ? 'bg-[#009DAE] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            ]"
          >
            Todas
          </button>
          <button
            v-for="cat in categorias"
            :key="cat.id"
            @click="categoriaActiva = cat.id"
            :class="[
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
              categoriaActiva === cat.id
                ? 'bg-[#009DAE] text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            ]"
          >
            {{ cat.nombre }}
            <span class="ml-1 text-xs opacity-70">
              ({{ productos.filter(p => p.categoria_id === cat.id).length }})
            </span>
          </button>
        </div>

        <div class="flex-1" />

        <!-- Búsqueda -->
        <div class="relative">
          <Icon icon="mdi:magnify" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            v-model="busqueda"
            type="text"
            placeholder="Buscar producto…"
            class="w-full sm:w-64 pl-10 pr-4 py-2.5 bg-[#111d33] border border-gray-700/50 rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50"
          />
        </div>

        <!-- Botón crear -->
        <button
          @click="abrirCrear"
          class="flex items-center gap-2 px-5 py-2.5 bg-[#009DAE] hover:bg-[#00b4c8] text-white font-semibold rounded-xl transition-all shadow-lg shadow-[#009DAE]/20 whitespace-nowrap"
        >
          <Icon icon="mdi:plus" class="w-5 h-5" />
          Nuevo producto
        </button>
      </div>

      <!-- ───── Loading ───── -->
      <div v-if="cargando" class="flex items-center justify-center py-20">
        <Icon icon="mdi:loading" class="w-8 h-8 text-[#009DAE] animate-spin" />
      </div>

      <!-- ───── Tabla de productos ───── -->
      <div v-else class="bg-[#111d33] border border-gray-700/50 rounded-2xl overflow-hidden">
        <!-- Tabla desktop -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700/50 text-gray-400">
                <th class="text-left py-4 px-4 font-medium">Producto</th>
                <th class="text-left py-4 px-4 font-medium hidden md:table-cell">Categoría</th>
                <th class="text-center py-4 px-4 font-medium hidden lg:table-cell">Tallas</th>
                <th class="text-center py-4 px-4 font-medium hidden sm:table-cell">Estado</th>
                <th class="text-right py-4 px-4 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="producto in productosFiltrados"
                :key="producto.id"
                class="border-b border-gray-700/30 hover:bg-white/[0.02] transition-colors"
              >
                <!-- Producto (imagen + nombre) -->
                <td class="py-3 px-4">
                  <div class="flex items-center gap-3">
                    <img
                      :src="producto.imagen_url"
                      :alt="producto.nombre"
                      class="w-12 h-12 rounded-lg object-cover bg-gray-800 flex-shrink-0"
                      loading="lazy"
                    />
                    <div class="min-w-0">
                      <p class="font-medium text-white truncate max-w-[200px] lg:max-w-[300px]">
                        {{ producto.nombre }}
                      </p>
                      <p class="text-gray-500 text-xs truncate max-w-[200px]">
                        {{ producto.descripcion?.slice(0, 60) }}{{ (producto.descripcion?.length ?? 0) > 60 ? '…' : '' }}
                      </p>
                    </div>
                  </div>
                </td>

                <!-- Categoría -->
                <td class="py-3 px-4 hidden md:table-cell">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#009DAE]/10 text-[#4DBCC8]">
                    {{ categoriaNombre(producto.categoria_id) }}
                  </span>
                  <div v-if="producto.subcategorias?.length" class="mt-1 flex flex-wrap gap-1">
                    <span
                      v-for="sub in producto.subcategorias"
                      :key="sub"
                      class="px-1.5 py-0.5 bg-white/5 text-gray-400 text-[10px] rounded"
                    >
                      {{ sub }}
                    </span>
                  </div>
                </td>

                <!-- Tallas -->
                <td class="py-3 px-4 hidden lg:table-cell">
                  <div class="flex flex-wrap justify-center gap-1">
                    <span
                      v-for="talla in producto.tallas.slice(0, 4)"
                      :key="talla"
                      class="px-1.5 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded"
                    >
                      {{ talla }}
                    </span>
                    <span v-if="producto.tallas.length > 4" class="text-gray-500 text-xs">
                      +{{ producto.tallas.length - 4 }}
                    </span>
                  </div>
                </td>

                <!-- Estado -->
                <td class="py-3 px-4 hidden sm:table-cell">
                  <div class="flex justify-center gap-1.5">
                    <span
                      v-if="producto.en_oferta"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/15 text-amber-400"
                    >
                      Oferta
                    </span>
                    <span
                      v-if="producto.es_nuevo"
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400"
                    >
                      Nuevo
                    </span>
                    <span
                      v-if="!producto.en_oferta && !producto.es_nuevo"
                      class="text-gray-600 text-xs"
                    >
                      —
                    </span>
                  </div>
                </td>

                <!-- Acciones -->
                <td class="py-3 px-4">
                  <div class="flex items-center justify-end gap-1">
                    <button
                      @click="abrirEditar(producto)"
                      class="p-2 text-gray-400 hover:text-[#009DAE] hover:bg-[#009DAE]/10 rounded-lg transition-all"
                      title="Editar"
                    >
                      <Icon icon="mdi:pencil" class="w-4 h-4" />
                    </button>
                    <button
                      @click="confirmarEliminar(producto)"
                      class="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      title="Eliminar"
                    >
                      <Icon icon="mdi:delete" class="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty state -->
        <div v-if="productosFiltrados.length === 0 && !cargando" class="py-16 text-center">
          <Icon icon="mdi:package-variant" class="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p class="text-gray-400">No se encontraron productos</p>
          <button
            @click="busqueda = ''; categoriaActiva = ''"
            class="mt-3 text-sm text-[#009DAE] hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </main>

    <!-- ═══════ Modal Crear / Editar ═══════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="mostrarModal"
          class="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[5vh] overflow-y-auto"
        >
          <!-- Backdrop -->
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="mostrarModal = false" />

          <!-- Panel -->
          <div class="relative bg-[#111d33] border border-gray-700/50 rounded-2xl w-full max-w-2xl shadow-2xl z-10">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-gray-700/50">
              <h2 class="text-lg font-bold text-white flex items-center gap-2">
                <Icon :icon="modoEdicion ? 'mdi:pencil' : 'mdi:plus-circle'" class="w-5 h-5 text-[#009DAE]" />
                {{ modoEdicion ? 'Editar producto' : 'Nuevo producto' }}
              </h2>
              <button @click="mostrarModal = false" class="text-gray-400 hover:text-white transition-colors">
                <Icon icon="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <!-- Form -->
            <form @submit.prevent="guardarProducto" class="p-6 space-y-5">
              <!-- Nombre -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Nombre *</label>
                <input
                  v-model="form.nombre"
                  type="text"
                  placeholder="Ej: Camiseta Barcelona 2024"
                  class="w-full px-4 py-2.5 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] text-sm"
                />
              </div>

              <!-- Descripción -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Descripción</label>
                <textarea
                  v-model="form.descripcion"
                  rows="3"
                  placeholder="Describe el producto…"
                  class="w-full px-4 py-2.5 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] text-sm resize-none"
                />
              </div>

              <!-- Imagen URL + upload -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Imagen *</label>
                <div class="flex gap-3">
                  <input
                    v-model="form.imagen_url"
                    type="text"
                    placeholder="URL de la imagen o sube una"
                    class="flex-1 px-4 py-2.5 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] text-sm"
                  />
                  <label
                    class="flex items-center gap-1 px-4 py-2.5 bg-[#0a1628] border border-gray-600/50 rounded-xl text-gray-300 hover:border-[#009DAE] cursor-pointer transition-colors text-sm whitespace-nowrap"
                  >
                    <Icon v-if="subiendoImagen" icon="mdi:loading" class="w-4 h-4 animate-spin" />
                    <Icon v-else icon="mdi:cloud-upload" class="w-4 h-4" />
                    Subir
                    <input
                      type="file"
                      accept="image/*"
                      class="hidden"
                      @change="handleSubirImagen"
                    />
                  </label>
                </div>
                <!-- Vista previa -->
                <div v-if="form.imagen_url" class="mt-2">
                  <img
                    :src="form.imagen_url"
                    alt="Vista previa"
                    class="w-20 h-20 rounded-lg object-cover border border-gray-700/50"
                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                  />
                </div>
              </div>

              <!-- Categoría -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Categoría *</label>
                <select
                  v-model="form.categoria_id"
                  class="w-full px-4 py-2.5 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] text-sm"
                >
                  <option value="" disabled>Seleccionar categoría</option>
                  <option v-for="cat in categorias" :key="cat.id" :value="cat.id">
                    {{ cat.nombre }}
                  </option>
                </select>
              </div>

              <!-- Subcategorías -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-1.5">Subcategorías</label>
                <div v-if="subcategoriasDisponibles.length" class="flex flex-wrap gap-2">
                  <label
                    v-for="sub in subcategoriasDisponibles"
                    :key="sub"
                    class="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-600/50 bg-[#0a1628] text-sm text-gray-300 cursor-pointer hover:border-[#009DAE]/70"
                  >
                    <input
                      v-model="form.subcategorias"
                      type="checkbox"
                      :value="sub"
                      class="w-4 h-4 rounded bg-[#0a1628] border-gray-600 text-[#009DAE] focus:ring-[#009DAE] focus:ring-offset-0"
                    />
                    <span>{{ sub }}</span>
                  </label>
                </div>
                <p v-else class="text-xs text-gray-500">Selecciona una categoría para ver sus subcategorías.</p>
              </div>

              <!-- Tallas + Colores -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Tallas</label>
                  <input
                    v-model="tallasInput"
                    type="text"
                    placeholder="S, M, L, XL"
                    class="w-full px-4 py-2.5 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] text-sm"
                  />
                  <p class="text-gray-500 text-xs mt-1">Separadas por comas</p>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-1.5">Colores</label>
                  <input
                    v-model="coloresInput"
                    type="text"
                    placeholder="Rojo, Azul, Negro"
                    class="w-full px-4 py-2.5 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] text-sm"
                  />
                  <p class="text-gray-500 text-xs mt-1">Separados por comas</p>
                </div>
              </div>

              <!-- Toggles -->
              <div class="flex gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="form.en_oferta"
                    @change="setEnOferta(($event.target as HTMLInputElement).checked)"
                    class="w-4 h-4 rounded bg-[#0a1628] border-gray-600 text-[#009DAE] focus:ring-[#009DAE] focus:ring-offset-0"
                  />
                  <span class="text-sm text-gray-300">En oferta</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="form.es_nuevo"
                    @change="setEsNuevo(($event.target as HTMLInputElement).checked)"
                    class="w-4 h-4 rounded bg-[#0a1628] border-gray-600 text-[#009DAE] focus:ring-[#009DAE] focus:ring-offset-0"
                  />
                  <span class="text-sm text-gray-300">Es nuevo</span>
                </label>
              </div>

              <!-- Error en el form -->
              <div v-if="error" class="text-red-400 text-sm flex items-center gap-1">
                <Icon icon="mdi:alert-circle" class="w-4 h-4" />
                {{ error }}
              </div>

              <!-- Actions -->
              <div class="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  @click="mostrarModal = false"
                  class="px-5 py-2.5 text-sm text-gray-400 hover:text-white border border-gray-600/50 rounded-xl hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  :disabled="guardando"
                  class="px-5 py-2.5 text-sm bg-[#009DAE] hover:bg-[#00b4c8] text-white font-semibold rounded-xl transition-all disabled:opacity-60 flex items-center gap-2"
                >
                  <Icon v-if="guardando" icon="mdi:loading" class="w-4 h-4 animate-spin" />
                  {{ modoEdicion ? 'Guardar cambios' : 'Crear producto' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ═══════ Modal Confirmación Eliminar ═══════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="mostrarConfirmacion"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="mostrarConfirmacion = false" />

          <div class="relative bg-[#111d33] border border-gray-700/50 rounded-2xl w-full max-w-md shadow-2xl z-10 p-6">
            <div class="text-center">
              <div class="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 mb-4">
                <Icon icon="mdi:delete-alert" class="w-7 h-7 text-red-400" />
              </div>
              <h3 class="text-lg font-bold text-white mb-2">¿Eliminar producto?</h3>
              <p class="text-gray-400 text-sm mb-1">
                Estás a punto de eliminar:
              </p>
              <p class="text-white font-medium mb-4">
                "{{ productoAEliminar?.nombre }}"
              </p>
              <p class="text-red-400/80 text-xs mb-6">
                Esta acción no se puede deshacer.
              </p>

              <div class="flex gap-3 justify-center">
                <button
                  @click="mostrarConfirmacion = false"
                  class="px-5 py-2.5 text-sm text-gray-400 hover:text-white border border-gray-600/50 rounded-xl hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  @click="eliminarProducto"
                  :disabled="eliminando"
                  class="px-5 py-2.5 text-sm bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all disabled:opacity-60 flex items-center gap-2"
                >
                  <Icon v-if="eliminando" icon="mdi:loading" class="w-4 h-4 animate-spin" />
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
