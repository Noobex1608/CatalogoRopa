<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const cartCount = ref(0)
const activeSection = ref('inicio')
</script>

<template>
  <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
    <!-- Top Bar Informativa -->
    <div class="bg-blue-900 text-white">
      <div class="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <p class="text-center text-[11px] font-medium tracking-wide">
          🎉 Envío gratis por compras superiores a $50 | Nuevos arribos de temporada
        </p>
      </div>
    </div>

    <!-- Main Navigation -->
    <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between gap-8">
        <!-- Logo Mejorado -->
        <div class="shrink-0">
          <div class="text-2xl tracking-tighter">
            <span class="font-black text-orange-500 uppercase">Camisa</span><span class="font-extralight text-blue-800">STORE</span>
          </div>
        </div>

        <!-- Search Bar Premium -->
        <div class="hidden md:flex flex-1 max-w-2xl">
          <div class="relative w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              class="w-full px-6 py-2.5 bg-gray-50 border border-transparent rounded-full shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-200 focus:bg-white focus:shadow-sm transition-all text-sm text-gray-700 placeholder-gray-500"
            />
            <button class="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-800 hover:bg-blue-900 text-white p-2 rounded-full transition-all hover:scale-105">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <!-- Shortcut Indicator -->
            <div class="absolute right-14 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-1 text-gray-400 text-xs">
              <kbd class="px-2 py-0.5 bg-gray-200 border border-gray-300 rounded text-[10px] font-mono">⌘</kbd>
              <kbd class="px-2 py-0.5 bg-gray-200 border border-gray-300 rounded text-[10px] font-mono">K</kbd>
            </div>
          </div>
        </div>

        <!-- Navigation Links con micro-interacciones -->
        <div class="hidden lg:flex items-center space-x-6">
          <router-link 
            to="/" 
            class="relative group text-gray-700 text-sm hover:scale-105 transition-transform duration-200"
            :class="route.path === '/' ? 'font-semibold text-blue-800' : 'font-medium'"
          >
            Inicio
            <span 
              class="absolute -bottom-1 left-0 h-0.5 bg-blue-800 transition-all"
              :class="route.path === '/' ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </router-link>
          
          <router-link 
            to="/catalogo" 
            class="relative group text-gray-700 text-sm hover:scale-105 transition-transform duration-200"
            :class="route.path === '/catalogo' ? 'font-semibold text-blue-800' : 'font-medium'"
          >
            Catálogo
            <span 
              class="absolute -bottom-1 left-0 h-0.5 bg-blue-800 transition-all"
              :class="route.path === '/catalogo' ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </router-link>
          
          <router-link 
            to="/camisas-estampadas" 
            class="relative group text-gray-700 text-sm hover:scale-105 transition-transform duration-200"
            :class="route.path === '/camisas-estampadas' ? 'font-semibold text-blue-800' : 'font-medium'"
          >
            Estampadas
            <span 
              class="absolute -bottom-1 left-0 h-0.5 bg-blue-800 transition-all"
              :class="route.path === '/camisas-estampadas' ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </router-link>
          
          <router-link 
            to="/camisas-bordadas" 
            class="relative group text-gray-700 text-sm hover:scale-105 transition-transform duration-200"
            :class="route.path === '/camisas-bordadas' ? 'font-semibold text-blue-800' : 'font-medium'"
          >
            Bordadas
            <span 
              class="absolute -bottom-1 left-0 h-0.5 bg-blue-800 transition-all"
              :class="route.path === '/camisas-bordadas' ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </router-link>
          
          <a 
            href="#" 
            @click.prevent="activeSection = 'ofertas'"
            class="relative group text-gray-700 text-sm hover:scale-105 transition-transform duration-200"
            :class="activeSection === 'ofertas' ? 'font-semibold text-blue-800' : 'font-medium'"
          >
            Ofertas
            <span 
              class="absolute -bottom-1 left-0 h-0.5 bg-blue-800 transition-all"
              :class="activeSection === 'ofertas' ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </a>
          
          <a 
            href="#" 
            @click.prevent="activeSection = 'cuenta'"
            class="relative group text-gray-700 text-sm hover:scale-105 transition-transform duration-200"
            :class="activeSection === 'cuenta' ? 'font-semibold text-blue-800' : 'font-medium'"
          >
            Mi Cuenta
            <span 
              class="absolute -bottom-1 left-0 h-0.5 bg-blue-800 transition-all"
              :class="activeSection === 'cuenta' ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </a>
          
          <!-- Cart Icon Mejorado -->
          <div class="relative">
            <button 
              class="flex items-center transition-all hover:scale-110"
              :class="cartCount > 0 ? 'text-gray-700 hover:text-orange-500' : 'text-gray-400 hover:text-gray-600'"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span 
                v-if="cartCount > 0" 
                class="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-bounce"
              >
                {{ cartCount }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
