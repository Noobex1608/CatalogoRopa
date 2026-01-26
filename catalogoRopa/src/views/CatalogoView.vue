<script setup lang="ts">
import { ref } from 'vue'
import { useCatalogoStore } from '../stores/catalogoStore'
import HeaderNav from '../components/HeaderNav.vue'
import CamisaCard from '../components/CamisaCard.vue'
import Sidebar from '../components/Sidebar.vue'
import FooterDynamic from '../components/FooterDynamic.vue'

const catalogoStore = useCatalogoStore()
const ordenamiento = ref('newness')
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header con navegación -->
    <HeaderNav />

    <!-- Breadcrumbs y Título -->
    <div class="bg-white shadow-sm mb-6">
      <div class="container mx-auto px-6 py-6 max-w-[1600px]">
        <nav class="flex text-sm mb-4 tracking-wide">
          <a href="#" class="text-gray-400 hover:text-blue-800 transition-colors">Home</a>
          <span class="mx-2 text-gray-300">/</span>
          <span class="text-blue-700 font-medium">Camisas</span>
        </nav>
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Camisas</h1>
            <p class="text-sm text-gray-500 mt-1">
              {{ catalogoStore.camisas.length }} productos disponibles
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenido principal -->
    <main class="container mx-auto px-6 py-8 max-w-[1600px]">
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Sidebar más estrecho -->
        <div class="w-full lg:w-64 flex-shrink-0 order-1 lg:order-1">
          <Sidebar />
        </div>

        <!-- Catálogo Grid expandido -->
        <div class="flex-1 order-2 lg:order-2">
          <!-- Ordenamiento -->
          <div class="flex justify-between items-center mb-6">
            <p class="text-sm text-gray-600">
              <span class="font-medium text-gray-900">{{ catalogoStore.camisas.length }}</span> productos encontrados
            </p>
            <select
              v-model="ordenamiento"
              class="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            >
              <option value="newness">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="popularity">Más populares</option>
            </select>
          </div>

          <!-- Grid de productos optimizado -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mb-8">
            <CamisaCard
              v-for="camisa in catalogoStore.camisas"
              :key="camisa.id"
              :camisa="camisa"
            />
          </div>
        </div>
      </div>
    </main>
    
    <FooterDynamic />
  </div>
</template>

