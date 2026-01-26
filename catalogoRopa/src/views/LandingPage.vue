<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const cartCount = ref(0)

const categorias = [
  {
    titulo: 'Catálogo Completo',
    descripcion: 'Explora nuestra colección completa de camisas para todas las ocasiones',
    imagen: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=600&fit=crop',
    ruta: '/catalogo',
    color: 'from-blue-600 to-blue-800',
    icono: 'mdi:hanger'
  },
  {
    titulo: 'Camisas Estampadas',
    descripcion: 'Diseños únicos y modernos con estampados vibrantes y creativos',
    imagen: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=800&h=600&fit=crop',
    ruta: '/camisas-estampadas',
    color: 'from-orange-500 to-red-600',
    icono: 'mdi:palette'
  },
  {
    titulo: 'Camisas Bordadas',
    descripcion: 'Elegancia artesanal con bordados delicados hechos a mano',
    imagen: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=600&fit=crop',
    ruta: '/camisas-bordadas',
    color: 'from-purple-600 to-pink-600',
    icono: 'mdi:sparkles'
  }
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-orange-50">
    <!-- Header Minimalista -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="text-3xl tracking-tighter">
            <span class="font-black text-orange-500 uppercase">Camisa</span><span class="font-extralight text-blue-800">STORE</span>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center gap-6">
            <a href="#" class="text-sm font-medium text-gray-700 hover:text-blue-800 transition-colors">
              Mi Cuenta
            </a>
            <div class="relative">
              <button class="flex items-center transition-all hover:scale-110 text-gray-700 hover:text-orange-500">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {{ cartCount }}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative overflow-hidden py-20 lg:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-pulse">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Nueva Colección 2026
          </div>
          
          <!-- Título Principal -->
          <h1 class="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight md:leading-tight">
            Estilo que
            <span class="bg-gradient-to-r from-orange-500 to-blue-800 bg-clip-text text-transparent">
              Habla por Ti
            </span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto font-light">
            Descubre camisas únicas que combinan calidad premium, diseños exclusivos y artesanía excepcional
          </p>
          
          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <router-link 
              to="/catalogo" 
              class="px-8 py-4 bg-blue-800 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-blue-200 hover:bg-blue-900 hover:-translate-y-1 transition-all"
            >
              Ver Catálogo
            </router-link>
            <router-link 
              to="/camisas-estampadas" 
              class="px-8 py-4 bg-white text-blue-800 border-2 border-blue-800 rounded-full font-bold text-lg hover:bg-blue-50 hover:-translate-y-1 transition-all"
            >
              Ver Ofertas
            </router-link>
          </div>
          
          <!-- Stats -->
          <div class="flex flex-wrap justify-center gap-8 md:gap-12 mb-12">
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-blue-800">30+</div>
              <div class="text-sm text-gray-600 mt-1">Productos</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-orange-500">100%</div>
              <div class="text-sm text-gray-600 mt-1">Calidad</div>
            </div>
            <div class="text-center">
              <div class="text-3xl md:text-4xl font-bold text-purple-600">24/7</div>
              <div class="text-sm text-gray-600 mt-1">Soporte</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categorías Grid -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explora Nuestras Colecciones
          </h2>
          <p class="text-gray-600 text-lg">
            Elige la categoría que mejor se adapte a tu estilo
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <router-link
            v-for="categoria in categorias"
            :key="categoria.ruta"
            :to="categoria.ruta"
            class="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 bg-white"
          >
            <!-- Imagen de fondo -->
            <div class="aspect-[4/3] overflow-hidden bg-gray-200">
              <img
                :src="categoria.imagen"
                :alt="categoria.titulo"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <!-- Overlay gradiente -->
              <div 
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent group-hover:from-black/90 transition-all"
                :class="categoria.color"
              ></div>
            </div>

            <!-- Contenido -->
            <div class="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <div class="mb-3 transform group-hover:scale-110 transition-transform drop-shadow-lg">
                <Icon :icon="categoria.icono" class="text-5xl" />
              </div>
              <h3 class="text-2xl font-bold mb-2 transform group-hover:translate-x-2 transition-transform" style="text-shadow: 2px 2px 8px rgba(0,0,0,0.5);">
                {{ categoria.titulo }}
              </h3>
              <p class="text-white/90 text-sm mb-4 transform group-hover:translate-x-2 transition-transform">
                {{ categoria.descripcion }}
              </p>
              
              <!-- Botón -->
              <div class="flex items-center gap-2 font-semibold transform group-hover:translate-x-2 transition-transform">
                <span>Explorar colección</span>
                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            <!-- Indicador de hover -->
            <div class="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-white/50 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Calidad Premium</h3>
            <p class="text-gray-600">Algodón 100% orgánico y costuras reforzadas para mayor durabilidad</p>
          </div>
          
          <div class="text-center p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Envío Rápido</h3>
            <p class="text-gray-600">Entrega garantizada en 2-3 días hábiles a todo el país sin costo adicional</p>
          </div>
          
          <div class="text-center p-6 bg-white/50 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Pago Seguro</h3>
            <p class="text-gray-600">Transacciones encriptadas y métodos de pago verificados internacionalmente</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
