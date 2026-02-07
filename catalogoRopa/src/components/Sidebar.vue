<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCatalogoStore } from '../stores/catalogoStore'

const route = useRoute()
const catalogoStore = useCatalogoStore()

const seccionesAbiertas = ref({
  categorias: true,
  tallas: true
})

// Subcategorías dinámicas con conteo real desde el store
const categoriasDinamicas = computed(() => {
  const path = route.path
  if (path.includes('camisas-estampadas')) {
    return catalogoStore.subcategoriasEstampadasComputed
  } else if (path.includes('camisas-bordadas')) {
    return catalogoStore.subcategoriasBordadasComputed
  }
  return catalogoStore.subcategoriasReplicasComputed
})

const colorTienda = computed(() => {
  if (route.path.includes('estampadas')) return 'text-amber-600'
  if (route.path.includes('bordadas')) return 'text-purple-600'
  return 'text-[#002B42]'
})

const colorBarraActiva = computed(() => {
  if (route.path.includes('estampadas')) return 'bg-amber-500'
  if (route.path.includes('bordadas')) return 'bg-purple-500'
  return 'bg-[#009DAE]'
})

const toggleSeccion = (seccion: 'categorias' | 'tallas') => {
  seccionesAbiertas.value[seccion] = !seccionesAbiertas.value[seccion]
}
</script>

<template>
  <aside class="sticky top-24 space-y-6">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <!-- Sección Categorías -->
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
                @click="catalogoStore.seleccionarSubcategoria(categoria.nombre)"
                class="w-full flex items-center justify-between text-left text-sm py-2.5 px-3 rounded-lg group relative transition-all duration-200"
                :class="catalogoStore.subcategoriaActiva === categoria.nombre 
                  ? 'bg-gray-100 font-bold' 
                  : 'text-gray-600 hover:bg-gray-50'"
              >
                <span 
                  class="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-1 rounded-r transition-all duration-300"
                  :class="[
                    catalogoStore.subcategoriaActiva === categoria.nombre ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
                    colorBarraActiva
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

      <!-- Sección Tallas -->
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
              @click="catalogoStore.toggleTalla(talla)"
              class="py-2.5 text-xs font-bold border rounded-lg transition-all duration-200 hover:border-gray-400"
              :class="catalogoStore.tallasSeleccionadas.includes(talla) 
                ? 'bg-gray-800 text-white border-gray-800' 
                : 'border-gray-200 text-gray-500'"
            >
              {{ talla }}
            </button>
          </div>
        </div>
      </div>

      <!-- Botón limpiar filtros -->
      <div v-if="catalogoStore.hayFiltrosActivos" class="px-5 pb-5">
        <button
          @click="catalogoStore.limpiarFiltros()"
          class="w-full py-2.5 text-xs font-bold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Limpiar filtros
        </button>
      </div>
    </div>
  </aside>
</template>