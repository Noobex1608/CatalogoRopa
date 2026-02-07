<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import type { Camisa } from '../stores/catalogoStore'
import { useCarritoStore } from '../stores/carritoStore'

const props = defineProps<{
  camisa: Camisa
}>()

const router = useRouter()
const carrito = useCarritoStore()

function agregarAlCarrito(e: Event) {
  e.stopPropagation()
  const talla = props.camisa.tallas[0] ?? 'M'
  const color = props.camisa.colores[0] ?? 'Único'
  carrito.agregarItem(props.camisa, talla, color)
}

const descuento = computed(() => {
  if (!props.camisa.precioAnterior) return 0
  return Math.round(
    ((props.camisa.precioAnterior - props.camisa.precio) / props.camisa.precioAnterior) * 100
  )
})

function irADetalle() {
  router.push({ name: 'detalle-producto', params: { id: props.camisa.id } })
}
</script>

<template>
  <div
    @click="irADetalle"
    class="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 group border border-gray-100 flex flex-col h-full cursor-pointer"
  >
    
    <div class="relative overflow-hidden aspect-[4/5] bg-gray-50">
      <!-- Badges -->
      <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        <span v-if="camisa.esNuevo" class="bg-white/90 backdrop-blur-md text-gray-800 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm border border-gray-100">
          Nuevo
        </span>
        <span v-if="camisa.enOferta && descuento > 0" class="bg-red-500 text-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-sm">
          -{{ descuento }}%
        </span>
      </div>

      <img
        :src="camisa.imagen"
        :alt="camisa.nombre"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
      />
      
      <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span class="bg-white text-gray-900 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Ver Detalles
        </span>
      </div>
    </div>

    <div class="p-5 flex-1 flex flex-col">
      <div class="mb-auto">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
          Colección 2026
        </p>

        <h3 class="text-base font-bold text-gray-800 group-hover:text-blue-900 transition-colors leading-tight mb-3">
          {{ camisa.nombre }}
        </h3>

        <p class="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">
          {{ camisa.descripcion || 'Diseño exclusivo con materiales de alta durabilidad.' }}
        </p>
      </div>

      <!-- Precio + Agregar al carrito -->
      <div class="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-50">
        <div class="flex items-baseline gap-2">
          <span class="text-lg font-black text-[#002B42]">${{ camisa.precio.toFixed(2) }}</span>
          <span v-if="camisa.precioAnterior" class="text-xs text-gray-400 line-through">${{ camisa.precioAnterior.toFixed(2) }}</span>
        </div>
        <button
          @click="agregarAlCarrito"
          class="p-2 bg-[#002B42] hover:bg-[#009DAE] text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm"
          title="Agregar al carrito"
        >
          <Icon icon="mdi:cart-plus" class="text-base" />
        </button>
      </div>
    </div>
  </div>
</template>