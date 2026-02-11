<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useCarritoStore } from '../stores/carritoStore'

const carrito = useCarritoStore()

function procederAlPago() {
  const url = carrito.generarUrlWhatsApp()
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<template>
  <!-- Backdrop -->
  <Teleport to="body">
    <Transition name="backdrop">
      <div
        v-if="carrito.abierto"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        @click="carrito.cerrarCarrito()"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="drawer">
      <div
        v-if="carrito.abierto"
        class="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div class="flex items-center gap-3">
            <Icon icon="mdi:cart" class="text-[#002B42] text-xl" />
            <h2 class="text-lg font-bold text-[#002B42]">Mi Carrito</h2>
            <span
              v-if="carrito.totalItems > 0"
              class="bg-[#009DAE] text-white text-xs font-bold px-2 py-0.5 rounded-full"
            >
              {{ carrito.totalItems }}
            </span>
          </div>
          <button
            @click="carrito.cerrarCarrito()"
            class="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
          >
            <Icon icon="mdi:close" class="text-xl" />
          </button>
        </div>

        <!-- Empty state -->
        <div
          v-if="carrito.items.length === 0"
          class="flex-1 flex flex-col items-center justify-center px-6"
        >
          <Icon icon="mdi:cart-outline" class="text-6xl text-gray-200 mb-4" />
          <p class="text-gray-500 font-medium mb-1">Tu carrito está vacío</p>
          <p class="text-gray-400 text-sm text-center">
            Agrega productos para verlos aquí
          </p>
          <button
            @click="carrito.cerrarCarrito()"
            class="mt-6 px-6 py-2.5 bg-[#002B42] text-white text-sm font-bold rounded-full hover:bg-[#009DAE] transition-colors"
          >
            Seguir comprando
          </button>
        </div>

        <!-- Items list -->
        <div v-else class="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          <TransitionGroup name="item">
            <div
              v-for="(item, index) in carrito.items"
              :key="`${item.producto.id}-${item.talla}-${item.color}`"
              class="flex gap-4 bg-gray-50 rounded-2xl p-3 border border-gray-100"
            >
              <!-- Imagen -->
              <img
                :src="item.producto.imagen"
                :alt="item.producto.nombre"
                class="w-20 h-20 rounded-xl object-cover flex-shrink-0"
              />

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-bold text-gray-800 truncate">
                  {{ item.producto.nombre }}
                </h3>
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-xs text-gray-400">{{ item.talla }}</span>
                  <span class="text-gray-300">•</span>
                  <span class="text-xs text-gray-400 truncate">{{ item.color }}</span>
                </div>

                <div class="flex items-center justify-between mt-2">
                  <!-- Controles de cantidad -->
                  <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      @click="carrito.actualizarCantidad(index, item.cantidad - 1)"
                      class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm"
                    >
                      <Icon icon="mdi:minus" class="text-xs" />
                    </button>
                    <span class="w-8 h-7 flex items-center justify-center text-xs font-bold text-gray-700 border-x border-gray-200">
                      {{ item.cantidad }}
                    </span>
                    <button
                      @click="carrito.actualizarCantidad(index, item.cantidad + 1)"
                      class="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors text-sm"
                    >
                      <Icon icon="mdi:plus" class="text-xs" />
                    </button>
                  </div>

                </div>
              </div>

              <!-- Eliminar -->
              <button
                @click="carrito.eliminarItem(index)"
                class="self-start p-1.5 text-gray-300 hover:text-red-500 transition-colors flex-shrink-0"
              >
                <Icon icon="mdi:delete-outline" class="text-base" />
              </button>
            </div>
          </TransitionGroup>
        </div>

        <!-- Footer con resumen y checkout -->
        <div
          v-if="carrito.items.length > 0"
          class="border-t border-gray-100 px-6 py-5 bg-white space-y-4"
        >
          <!-- Botones -->
          <button
            @click="procederAlPago"
            class="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-md"
          >
            <Icon icon="mdi:whatsapp" class="text-xl" />
            Proceder por WhatsApp
          </button>

          <div class="flex gap-3">
            <button
              @click="carrito.cerrarCarrito()"
              class="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm transition-colors"
            >
              Seguir comprando
            </button>
            <button
              @click="carrito.vaciarCarrito()"
              class="flex items-center justify-center gap-1 text-red-400 hover:text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-xl text-sm transition-colors"
            >
              <Icon icon="mdi:delete-sweep" class="text-base" />
              Vaciar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}

/* Drawer slide-in from right */
.drawer-enter-active {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.drawer-leave-active {
  transition: transform 0.25s ease-in;
}
.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

/* Items list animation */
.item-enter-active {
  transition: all 0.3s ease;
}
.item-leave-active {
  transition: all 0.2s ease;
}
.item-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.item-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.item-move {
  transition: transform 0.3s ease;
}
</style>
