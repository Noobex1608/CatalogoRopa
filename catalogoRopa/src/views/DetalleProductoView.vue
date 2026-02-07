<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCatalogoStore } from '../stores/catalogoStore'
import { servicioProductos } from '../services/servicioCatalogo'
import HeaderNav from '../components/HeaderNav.vue'
import FooterDynamic from '../components/FooterDynamic.vue'
import { Icon } from '@iconify/vue'
import type { Camisa } from '../stores/catalogoStore'
import { useCarritoStore } from '../stores/carritoStore'

const route = useRoute()
const carrito = useCarritoStore()
const router = useRouter()
const catalogoStore = useCatalogoStore()

const producto = ref<Camisa | null>(null)
const tallaSeleccionada = ref('')
const colorSeleccionado = ref('')
const cargando = ref(true)
const imagenCargada = ref(false)

/** Carga el producto por ID desde el store o desde Supabase */
async function cargarProducto() {
  cargando.value = true
  const id = route.params.id as string

  // Primero intentar desde el store (ya cargado)
  let encontrado = catalogoStore.obtenerPorId(id)

  // Si no está en el store, cargar todos y reintentar
  if (!encontrado) {
    await catalogoStore.cargarTodo()
    encontrado = catalogoStore.obtenerPorId(id)
  }

  // Si aún no existe, intentar directo de Supabase
  if (!encontrado) {
    const productoRemoto = await servicioProductos.obtenerPorId(id)
    if (productoRemoto) {
      encontrado = {
        id: productoRemoto.id,
        nombre: productoRemoto.nombre,
        precio: productoRemoto.precio,
        precioAnterior: productoRemoto.precio_anterior ?? undefined,
        tallas: productoRemoto.tallas ?? [],
        colores: productoRemoto.colores ?? [],
        imagen: productoRemoto.imagen_url,
        descripcion: productoRemoto.descripcion ?? '',
        enOferta: productoRemoto.en_oferta,
        esNuevo: productoRemoto.es_nuevo
      }
    }
  }

  producto.value = encontrado ?? null
  if (encontrado) {
    tallaSeleccionada.value = encontrado.tallas[0] ?? ''
    colorSeleccionado.value = encontrado.colores[0] ?? ''
  }
  cargando.value = false
}

const descuento = computed(() => {
  if (!producto.value?.precioAnterior) return 0
  return Math.round(
    ((producto.value.precioAnterior - producto.value.precio) / producto.value.precioAnterior) * 100
  )
})

const mensajeWhatsApp = computed(() => {
  if (!producto.value) return ''
  const texto = `Hola! Me interesa la *${producto.value.nombre}*\n\n` +
    `- Precio: $${producto.value.precio}\n` +
    `- Talla: ${tallaSeleccionada.value}\n` +
    `- Color: ${colorSeleccionado.value}\n\n` +
    `Esta disponible?`
  return `https://wa.me/523355550000?text=${encodeURIComponent(texto)}`
})

function volver() {
  router.back()
}

onMounted(cargarProducto)

watch(() => route.params.id, cargarProducto)
</script>

<template>
  <div class="min-h-screen bg-[#EAECE9] font-sans selection:bg-[#009DAE] selection:text-white">
    <HeaderNav />

    <!-- Estado de carga -->
    <div v-if="cargando" class="flex items-center justify-center min-h-[60vh]">
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-[#009DAE] border-t-transparent rounded-full animate-spin"></div>
        <p class="text-sm text-gray-500 font-medium">Cargando producto...</p>
      </div>
    </div>

    <!-- Producto no encontrado -->
    <div v-else-if="!producto" class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <Icon icon="mdi:package-variant-remove" class="text-6xl text-gray-300 mb-4" />
        <h2 class="text-2xl font-bold text-gray-600 mb-2">Producto no encontrado</h2>
        <p class="text-gray-400 mb-6">El producto que buscas no existe o fue eliminado.</p>
        <button @click="volver" class="px-6 py-2.5 bg-[#002B42] text-white rounded-full text-sm font-bold hover:bg-[#009DAE] transition-all">
          Volver al catálogo
        </button>
      </div>
    </div>

    <!-- Contenido del producto -->
    <template v-else>
      <!-- Breadcrumb -->
      <div class="bg-white/60 backdrop-blur-sm border-b border-[#005F7F]/5">
        <div class="container mx-auto px-6 py-4 max-w-[1600px]">
          <nav class="flex items-center text-xs font-bold uppercase tracking-wider">
            <router-link to="/" class="text-[#005F7F]/60 hover:text-[#002B42] transition-colors">Home</router-link>
            <span class="mx-3 text-[#009DAE]">/</span>
            <button @click="volver" class="text-[#005F7F]/60 hover:text-[#002B42] transition-colors">Catálogo</button>
            <span class="mx-3 text-[#009DAE]">/</span>
            <span class="text-[#002B42] truncate max-w-[200px]">{{ producto.nombre }}</span>
          </nav>
        </div>
      </div>

      <main class="container mx-auto px-4 sm:px-6 py-10 max-w-[1600px]">
        <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            
            <!-- Imagen -->
            <div class="relative bg-gray-50 aspect-square lg:aspect-auto lg:min-h-[600px] overflow-hidden">
              <!-- Badges -->
              <div class="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <span v-if="producto.esNuevo" class="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm border border-gray-100">
                  Nuevo
                </span>
                <span v-if="producto.enOferta && descuento > 0" class="bg-red-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
                  -{{ descuento }}%
                </span>
              </div>

              <!-- Skeleton de carga -->
              <div v-if="!imagenCargada" class="absolute inset-0 bg-gray-200 animate-pulse"></div>

              <img
                :src="producto.imagen"
                :alt="producto.nombre"
                class="w-full h-full object-cover transition-opacity duration-500"
                :class="imagenCargada ? 'opacity-100' : 'opacity-0'"
                @load="imagenCargada = true"
              />
            </div>

            <!-- Info del producto -->
            <div class="p-8 lg:p-12 flex flex-col">
              <div class="mb-auto">
                <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Colección 2026
                </p>

                <h1 class="text-3xl lg:text-4xl font-black text-[#002B42] tracking-tight mb-4 leading-tight">
                  {{ producto.nombre }}
                </h1>

                <p class="text-gray-500 leading-relaxed mb-8">
                  {{ producto.descripcion }}
                </p>

                <!-- Precio -->
                <div class="flex items-baseline gap-3 mb-8">
                  <span class="text-4xl font-black text-[#002B42]">${{ producto.precio.toFixed(2) }}</span>
                  <span v-if="producto.precioAnterior" class="text-lg text-gray-400 line-through">${{ producto.precioAnterior.toFixed(2) }}</span>
                  <span v-if="descuento > 0" class="text-sm font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-md">
                    Ahorras ${{ (producto.precioAnterior! - producto.precio).toFixed(2) }}
                  </span>
                </div>

                <!-- Selector de color -->
                <div class="mb-6">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Color: <span class="text-[#002B42]">{{ colorSeleccionado }}</span>
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="color in producto.colores"
                      :key="color"
                      @click="colorSeleccionado = color"
                      class="px-4 py-2 text-sm font-medium border rounded-xl transition-all duration-200"
                      :class="colorSeleccionado === color
                        ? 'border-[#002B42] bg-[#002B42] text-white shadow-md'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'"
                    >
                      {{ color }}
                    </button>
                  </div>
                </div>

                <!-- Selector de talla -->
                <div class="mb-8">
                  <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Talla: <span class="text-[#002B42]">{{ tallaSeleccionada }}</span>
                  </h3>
                  <div class="flex flex-wrap gap-2">
                    <button
                      v-for="talla in producto.tallas"
                      :key="talla"
                      @click="tallaSeleccionada = talla"
                      class="w-14 h-14 text-sm font-bold border rounded-xl transition-all duration-200 flex items-center justify-center"
                      :class="tallaSeleccionada === talla
                        ? 'border-[#002B42] bg-[#002B42] text-white shadow-md'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'"
                    >
                      {{ talla }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Botones de acción -->
              <div class="space-y-3 pt-6 border-t border-gray-100">
                <button
                  @click="carrito.agregarItem(producto!, tallaSeleccionada, colorSeleccionado)"
                  class="w-full flex items-center justify-center gap-3 bg-[#002B42] hover:bg-[#009DAE] text-white px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-md"
                >
                  <Icon icon="mdi:cart-plus" class="text-xl" />
                  Agregar al carrito
                </button>

                <a
                  :href="mensajeWhatsApp"
                  target="_blank"
                  class="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-md"
                >
                  <Icon icon="mdi:whatsapp" class="text-xl" />
                  Pedir directo por WhatsApp
                </a>

                <button
                  @click="volver"
                  class="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200"
                >
                  <Icon icon="mdi:arrow-left" class="text-lg" />
                  Seguir comprando
                </button>
              </div>

              <!-- Info extra -->
              <div class="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div class="flex items-center gap-3 text-sm text-gray-500">
                  <Icon icon="mdi:truck-delivery-outline" class="text-[#009DAE] text-xl" />
                  <span>Envío nacional</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-500">
                  <Icon icon="mdi:shield-check-outline" class="text-[#009DAE] text-xl" />
                  <span>Calidad garantizada</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-500">
                  <Icon icon="mdi:swap-horizontal" class="text-[#009DAE] text-xl" />
                  <span>Cambios y devoluciones</span>
                </div>
                <div class="flex items-center gap-3 text-sm text-gray-500">
                  <Icon icon="mdi:credit-card-outline" class="text-[#009DAE] text-xl" />
                  <span>Pago seguro</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterDynamic />
    </template>
  </div>
</template>
