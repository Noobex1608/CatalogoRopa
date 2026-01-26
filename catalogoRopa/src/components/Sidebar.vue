<script setup lang="ts">
import { useCatalogoStore } from '../stores/catalogoStore'
import { ref } from 'vue'

const catalogoStore = useCatalogoStore()

const categorias = [
  { nombre: 'Camisas Formales', cantidad: 15 },
  { nombre: 'Camisas Casuales', cantidad: 23 },
  { nombre: 'Camisas Deportivas', cantidad: 12 },
  { nombre: 'Camisas de Lino', cantidad: 8 },
  { nombre: 'Camisas Denim', cantidad: 6 },
  { nombre: 'Ofertas', cantidad: 18 }
]

const tallasSeleccionadas = ref<string[]>([])
const categoriaActiva = ref<string>('')
const preciosSeleccionados = ref<string[]>([])
const precioMin = ref(0)
const precioMax = ref(100)
const precioModificado = ref(false)

// Secciones colapsables
const seccionesAbiertas = ref({
  categorias: true,
  tallas: true,
  precio: true
})

const toggleSeccion = (seccion: 'categorias' | 'tallas' | 'precio') => {
  seccionesAbiertas.value[seccion] = !seccionesAbiertas.value[seccion]
}

const toggleTalla = (talla: string) => {
  const index = tallasSeleccionadas.value.indexOf(talla)
  if (index > -1) {
    tallasSeleccionadas.value.splice(index, 1)
  } else {
    tallasSeleccionadas.value.push(talla)
  }
}

const togglePrecio = (rango: string) => {
  const index = preciosSeleccionados.value.indexOf(rango)
  if (index > -1) {
    preciosSeleccionados.value.splice(index, 1)
  } else {
    preciosSeleccionados.value.push(rango)
  }
}

const seleccionarCategoria = (categoria: string) => {
  categoriaActiva.value = categoriaActiva.value === categoria ? '' : categoria
}

const actualizarPrecio = () => {
  precioModificado.value = false
  // Aquí iría la lógica de filtrado
}

const limpiarFiltros = () => {
  tallasSeleccionadas.value = []
  categoriaActiva.value = ''
  preciosSeleccionados.value = []
  precioMin.value = 0
  precioMax.value = 100
  precioModificado.value = false
}

const eliminarFiltro = (tipo: string, valor: string) => {
  if (tipo === 'talla') {
    const index = tallasSeleccionadas.value.indexOf(valor)
    if (index > -1) tallasSeleccionadas.value.splice(index, 1)
  } else if (tipo === 'categoria') {
    categoriaActiva.value = ''
  } else if (tipo === 'precio') {
    const index = preciosSeleccionados.value.indexOf(valor)
    if (index > -1) preciosSeleccionados.value.splice(index, 1)
  }
}

const hayFiltrosActivos = () => {
  return tallasSeleccionadas.value.length > 0 || 
         categoriaActiva.value !== '' || 
         preciosSeleccionados.value.length > 0
}
</script>

<template>
  <aside class="sticky top-24 space-y-4">
    <!-- Filtros Activos -->
    <div v-if="hayFiltrosActivos()" class="bg-white rounded-xl shadow-sm p-5">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-sm font-bold uppercase tracking-wider text-gray-500">
          Filtros Activos
        </h3>
        <button 
          @click="limpiarFiltros"
          class="text-sm text-blue-800 hover:text-blue-900 font-medium"
        >
          Limpiar todo
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <span 
          v-if="categoriaActiva"
          class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
        >
          {{ categoriaActiva }}
          <button @click="eliminarFiltro('categoria', categoriaActiva)" class="hover:text-blue-900">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>
        <span 
          v-for="talla in tallasSeleccionadas" 
          :key="talla"
          class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
        >
          Talla {{ talla }}
          <button @click="eliminarFiltro('talla', talla)" class="hover:text-blue-900">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>
        <span 
          v-for="precio in preciosSeleccionados" 
          :key="precio"
          class="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
        >
          {{ precio }}
          <button @click="eliminarFiltro('precio', precio)" class="hover:text-blue-900">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </span>
      </div>
    </div>

    <!-- Sidebar Principal -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <!-- Categorías -->
      <div class="border-b border-gray-100">
        <button 
          @click="toggleSeccion('categorias')"
          class="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 class="text-sm font-bold uppercase tracking-wider text-gray-500">
            Categorías
          </h3>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform"
            :class="{ 'rotate-180': seccionesAbiertas.categorias }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="seccionesAbiertas.categorias" class="px-6 pb-6">
          <ul class="space-y-1">
            <li v-for="categoria in categorias" :key="categoria.nombre">
              <button
                @click="seleccionarCategoria(categoria.nombre)"
                class="w-full flex items-center justify-between text-left text-gray-700 hover:text-blue-800 transition-all text-base py-2.5 px-3 rounded-lg group relative"
                :class="categoriaActiva === categoria.nombre ? 'bg-blue-50 text-blue-800 font-semibold' : ''"
              >
                <span 
                  class="absolute left-0 top-0 bottom-0 w-1 bg-blue-800 rounded-r transition-opacity"
                  :class="categoriaActiva === categoria.nombre ? 'opacity-100' : 'opacity-0'"
                ></span>
                <span class="ml-1">{{ categoria.nombre }}</span>
                <span class="bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full text-xs font-medium">
                  {{ categoria.cantidad }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Filtro por Tallas -->
      <div class="border-b border-gray-100">
        <button 
          @click="toggleSeccion('tallas')"
          class="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 class="text-sm font-bold uppercase tracking-wider text-gray-500">
            Tallas
          </h3>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform"
            :class="{ 'rotate-180': seccionesAbiertas.tallas }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="seccionesAbiertas.tallas" class="px-6 pb-6">
          <div class="grid grid-cols-3 gap-2">
            <button 
              v-for="talla in ['S', 'M', 'L', 'XL', 'XXL']" 
              :key="talla"
              @click="toggleTalla(talla)"
              class="py-3 text-sm font-semibold border rounded-lg transition-all"
              :class="tallasSeleccionadas.includes(talla) 
                ? 'bg-blue-800 text-white border-blue-800' 
                : 'border-gray-200 text-gray-700 hover:border-blue-800 hover:text-blue-800'"
            >
              {{ talla }}
            </button>
          </div>
        </div>
      </div>

      <!-- Filtro por Precio -->
      <div>
        <button 
          @click="toggleSeccion('precio')"
          class="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
        >
          <h3 class="text-sm font-bold uppercase tracking-wider text-gray-500">
            Rango de Precio
          </h3>
          <svg 
            class="w-5 h-5 text-gray-400 transition-transform"
            :class="{ 'rotate-180': seccionesAbiertas.precio }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="seccionesAbiertas.precio" class="px-6 pb-6 space-y-4">
          <!-- Rangos predefinidos -->
          <div class="space-y-2">
            <label 
              v-for="rango in ['$0 - $25', '$25 - $40', '$40+']" 
              :key="rango"
              class="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                :checked="preciosSeleccionados.includes(rango)"
                @change="togglePrecio(rango)"
                class="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <span class="ml-3 text-base text-gray-700 group-hover:text-blue-800">{{ rango }}</span>
            </label>
          </div>

          <!-- Inputs personalizados -->
          <div class="pt-3 border-t border-gray-100">
            <p class="text-sm text-gray-500 mb-3">Personalizado:</p>
            <div class="flex items-center gap-2">
              <input
                v-model.number="precioMin"
                @input="precioModificado = true"
                type="number"
                placeholder="Min"
                class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span class="text-gray-400 text-sm">-</span>
              <input
                v-model.number="precioMax"
                @input="precioModificado = true"
                type="number"
                placeholder="Max"
                class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              v-if="precioModificado"
              @click="actualizarPrecio"
              class="w-full mt-3 bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors"
            >
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
