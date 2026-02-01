<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const tallasSeleccionadas = ref<string[]>([])
const categoriaActiva = ref<string>('')

const seccionesAbiertas = ref({
  categorias: true,
  tallas: true
})

// Lógica de Tiendas Separadas: Definimos las categorías según la ruta
const categoriasDinamicas = computed(() => {
  const path = route.path

  if (path.includes('camisas-estampadas')) {
    return [
      { nombre: 'Anime & Manga', cantidad: 42 },
      { nombre: 'Bandas de Rock', cantidad: 18 },
      { nombre: 'Frases y Memes', cantidad: 25 },
      { nombre: 'Minimalistas', cantidad: 12 },
      { nombre: 'Parejas', cantidad: 8 }
    ]
  } else if (path.includes('camisas-bordadas')) {
    return [
      { nombre: 'Logos Empresariales', cantidad: 15 },
      { nombre: 'Nombres y Iniciales', cantidad: 30 },
      { nombre: 'Escudos', cantidad: 10 },
      { nombre: 'Gorras Bordadas', cantidad: 20 },
      { nombre: 'Uniformes', cantidad: 5 }
    ]
  } else {
    // Por defecto: Catálogo de Réplicas (Fútbol)
    return [
      { nombre: 'Ligas Europeas', cantidad: 45 },
      { nombre: 'Selecciones Nacionales', cantidad: 32 },
      { nombre: 'Retro / Clásicas', cantidad: 12 },
      { nombre: 'Edición Especial', cantidad: 8 },
      { nombre: 'Niños', cantidad: 15 }
    ]
  }
})

// También cambiamos el color de los elementos según la tienda
const colorTienda = computed(() => {
  if (route.path.includes('estampadas')) return 'text-amber-600'
  if (route.path.includes('bordadas')) return 'text-purple-600'
  return 'text-[#002B42]' // Default Navy
})

const toggleSeccion = (seccion: 'categorias' | 'tallas') => {
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

const seleccionarCategoria = (categoria: string) => {
  categoriaActiva.value = categoriaActiva.value === categoria ? '' : categoria
}
</script>

<template>
  <aside class="sticky top-24 space-y-6">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="border-b border-gray-100">
        <button 
          @click="toggleSeccion('categorias')"
          class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group"
        >
          <h3 class="text-xs font-bold uppercase tracking-widest group-hover:opacity-80 transition-colors" :class="colorTienda">
            Categorías
          </h3>
          <svg 
            class="w-4 h-4 text-gray-400 transition-all duration-300"
            :class="{ 'rotate-180': seccionesAbiertas.categorias }"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div v-show="seccionesAbiertas.categorias" class="px-5 pb-5">
          <ul class="space-y-1">
            <li v-for="categoria in categoriasDinamicas" :key="categoria.nombre">
              <button
                @click="seleccionarCategoria(categoria.nombre)"
                class="w-full flex items-center justify-between text-left text-sm py-2.5 px-3 rounded-lg group relative transition-all duration-200"
                :class="categoriaActiva === categoria.nombre 
                  ? 'bg-gray-100 font-bold' 
                  : 'text-gray-600 hover:bg-gray-50'"
              >
                <span 
                  class="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r transition-all duration-300"
                  :class="[
                    categoriaActiva === categoria.nombre ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
                    route.path.includes('estampadas') ? 'bg-amber-500' : route.path.includes('bordadas') ? 'bg-purple-500' : 'bg-[#009DAE]'
                  ]"
                ></span>
                
                <span class="ml-2">{{ categoria.nombre }}</span>
                
                <span class="bg-gray-100 text-gray-400 px-2 py-0.5 rounded text-[10px] font-bold">
                  {{ categoria.cantidad }}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <button 
          @click="toggleSeccion('tallas')"
          class="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors group"
        >
          <h3 class="text-xs font-bold uppercase tracking-widest group-hover:opacity-80 transition-colors" :class="colorTienda">
            Tallas
          </h3>
          <svg class="w-4 h-4 text-gray-400 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div v-show="seccionesAbiertas.tallas" class="px-5 pb-5">
          <div class="grid grid-cols-3 gap-2">
            <button 
              v-for="talla in ['S', 'M', 'L', 'XL', 'XXL']" 
              :key="talla"
              @click="toggleTalla(talla)"
              class="py-2.5 text-xs font-bold border rounded-lg transition-all duration-200 hover:border-gray-400"
              :class="tallasSeleccionadas.includes(talla) 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'border-gray-200 text-gray-500'"
            >
              {{ talla }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>