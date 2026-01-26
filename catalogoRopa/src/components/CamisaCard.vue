<script setup lang="ts">
import type { Camisa } from '../stores/catalogoStore'

const props = defineProps<{
  camisa: Camisa
}>()

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23d1d5db%22%3E%3Cpath stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z%22/%3E%3C/svg%3E'
}
</script>

<template>
  <div class="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
    <!-- Badges con degradado -->
    <div class="relative">
      <div class="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <span
          v-if="camisa.enOferta"
          class="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-2.5 py-1 text-xs font-bold uppercase rounded-md shadow-md"
        >
          Oferta
        </span>
        <span
          v-if="camisa.esNuevo"
          class="bg-gradient-to-r from-blue-700 to-blue-800 text-white px-2.5 py-1 text-xs font-bold uppercase rounded-md shadow-md"
        >
          Nuevo
        </span>
      </div>

      <!-- Imagen con aspect ratio y fallback -->
      <div class="aspect-3/4 overflow-hidden bg-gray-100 relative">
        <img
          :src="camisa.imagen"
          :alt="camisa.nombre"
          @error="handleImageError"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        
        <!-- Botón overlay en hover -->
        <div class="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-white via-white/80 to-transparent">
          <button class="w-full bg-blue-800 hover:bg-blue-900 text-white py-2.5 rounded-xl font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Añadir al Carrito</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-4">
      <div class="flex items-center min-h-[2.5rem] mb-2">
        <h3 class="text-sm font-medium text-gray-800 hover:text-blue-800 cursor-pointer transition-colors leading-tight line-clamp-2">
          {{ camisa.nombre }}
        </h3>
      </div>

      <!-- Precio -->
      <div>
        <div v-if="camisa.precioAnterior" class="mb-0.5">
          <span class="text-gray-400 line-through text-xs">${{ camisa.precioAnterior.toFixed(2) }}</span>
        </div>
        <div class="text-xl font-bold text-orange-500">
          ${{ camisa.precio.toFixed(2) }}
        </div>
      </div>
    </div>
  </div>
</template>

