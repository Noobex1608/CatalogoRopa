<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

// Configuración dinámica según la tienda
const storeConfig = computed(() => {
  const path = route.path
  
  if (path.includes('camisas-estampadas')) {
    return {
      main: 'Estampados',
      sub: 'MODERNOS',
      colorMain: 'text-amber-500',
      colorSub: 'text-gray-800',
      accent: 'bg-amber-500',
      hoverText: 'hover:text-amber-600',
      activeBorder: 'bg-amber-500',
      placeholder: 'Buscar diseño...',
      icon: 'mdi:printer-3d-nozzle'
    }
  } else if (path.includes('camisas-bordadas')) {
    return {
      main: 'Bordados',
      sub: 'ARTESANALES',
      colorMain: 'text-purple-600',
      colorSub: 'text-gray-800',
      accent: 'bg-purple-600',
      hoverText: 'hover:text-purple-600',
      activeBorder: 'bg-purple-600',
      placeholder: 'Buscar bordado...',
      icon: 'mdi:needle'
    }
  } else {
    // Default (Réplicas/Home)
    return {
      main: 'Camisa',
      sub: 'STORE',
      colorMain: 'text-[#002B42]',
      colorSub: 'text-[#009DAE]',
      accent: 'bg-[#002B42]',
      hoverText: 'hover:text-[#002B42]',
      activeBorder: 'bg-[#009DAE]',
      placeholder: 'Buscar equipo...',
      icon: 'mdi:tshirt-crew'
    }
  }
})
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 transition-all duration-300">
    <div class="text-white transition-colors duration-500" :class="storeConfig.accent">
      <div class="max-w-[1600px] mx-auto px-4 py-2 sm:px-6 lg:px-8 text-center">
        <p class="text-[10px] md:text-[11px] font-medium tracking-widest uppercase opacity-95">
          ✨ Diseños exclusivos | Cotiza tu pedido por WhatsApp
        </p>
      </div>
    </div>

    <div class="max-w-[1600px] mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-6">
        
        <router-link to="/" class="shrink-0 group cursor-pointer flex items-center gap-2 min-w-[240px]">
          <div class="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md transition-colors duration-500" :class="storeConfig.accent">
             <Icon :icon="storeConfig.icon" class="text-lg" />
          </div>
          <div class="flex flex-col leading-none">
            <span class="font-black uppercase text-lg tracking-tight" :class="storeConfig.colorMain">{{ storeConfig.main }}</span>
            <span class="font-light text-xs tracking-widest" :class="storeConfig.colorSub">{{ storeConfig.sub }}</span>
          </div>
        </router-link>

        <nav class="hidden lg:flex items-center space-x-8">
          <router-link to="/" class="relative text-sm text-gray-500 hover:text-gray-900 transition-colors py-2 group" :class="route.path === '/' ? 'text-gray-900 font-bold' : 'font-medium'">
            Inicio
            <span class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" :class="[storeConfig.activeBorder, route.path === '/' ? 'w-full' : '']"></span>
          </router-link>
          
          <router-link to="/catalogo" class="relative text-sm text-gray-500 hover:text-gray-900 transition-colors py-2 group" :class="route.path.includes('/catalogo') ? 'text-gray-900 font-bold' : 'font-medium'">
            Réplicas
            <span class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" :class="[storeConfig.activeBorder, route.path.includes('/catalogo') ? 'w-full' : '']"></span>
          </router-link>
          
          <router-link to="/camisas-estampadas" class="relative text-sm text-gray-500 hover:text-gray-900 transition-colors py-2 group" :class="route.path.includes('/camisas-estampadas') ? 'text-gray-900 font-bold' : 'font-medium'">
            Estampados
            <span class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" :class="[storeConfig.activeBorder, route.path.includes('/camisas-estampadas') ? 'w-full' : '']"></span>
          </router-link>
          
          <router-link to="/camisas-bordadas" class="relative text-sm text-gray-500 hover:text-gray-900 transition-colors py-2 group" :class="route.path.includes('/camisas-bordadas') ? 'text-gray-900 font-bold' : 'font-medium'">
            Bordados
            <span class="absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" :class="[storeConfig.activeBorder, route.path.includes('/camisas-bordadas') ? 'w-full' : '']"></span>
          </router-link>
        </nav>

        <div class="hidden md:flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:ring-2 focus-within:ring-opacity-50 transition-all w-64" :class="`focus-within:ring-${storeConfig.accent.replace('bg-', '')}`">
          <Icon icon="mdi:magnify" class="text-gray-400 mr-2" />
          <input 
            type="text" 
            :placeholder="storeConfig.placeholder"
            class="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400 text-gray-700"
          />
        </div>

        <button class="lg:hidden text-gray-600">
          <Icon icon="mdi:menu" class="text-2xl" />
        </button>
      </div>
    </div>
  </header>
</template>