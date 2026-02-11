<script setup lang="ts">
import { onMounted } from 'vue'
import { useCatalogoStore } from '../stores/catalogoStore'
import HeaderNav from '../components/HeaderNav.vue'
import CamisaCard from '../components/CamisaCard.vue'
import Sidebar from '../components/Sidebar.vue'
import FooterDynamic from '../components/FooterDynamic.vue'

const catalogoStore = useCatalogoStore()

onMounted(() => {
  catalogoStore.limpiarFiltros()
  catalogoStore.cargarCamisas()
})
</script>

<template>
  <div class="min-h-screen bg-[#EAECE9] font-sans selection:bg-[#009DAE] selection:text-white">
    <HeaderNav />

    <div class="bg-white/60 backdrop-blur-sm border-b border-[#005F7F]/5 mb-8">
      <div class="container mx-auto px-6 py-8 max-w-[1600px]">
        <nav class="flex text-xs font-bold uppercase tracking-wider mb-3">
          <router-link to="/" class="text-[#005F7F]/60 hover:text-[#002B42] transition-colors">Home</router-link>
          <span class="mx-3 text-[#009DAE]">/</span>
          <span class="text-[#002B42]">Catálogo</span>
        </nav>
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-4xl font-black text-[#002B42] tracking-tight mb-2">
              Camisas Oficiales
            </h1>
            <p class="text-sm text-[#005F7F]">
              Mostrando <span class="font-bold text-[#002B42]">{{ catalogoStore.camisas.length }}</span>
              de {{ catalogoStore.camisasRaw.length }} productos exclusivos
            </p>
          </div>

          <div class="relative group">
            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#002B42]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <select
              :value="catalogoStore.ordenamiento"
              @change="catalogoStore.establecerOrdenamiento(($event.target as HTMLSelectElement).value)"
              class="appearance-none bg-white border border-[#005F7F]/10 rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-[#002B42] focus:outline-none focus:ring-2 focus:ring-[#009DAE] focus:border-transparent shadow-sm hover:border-[#009DAE]/50 transition-all cursor-pointer"
            >
              <option value="newness">Más recientes</option>
              <option value="name-asc">Nombre A-Z</option>
              <option value="offers">Ofertas primero</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <main class="container mx-auto px-4 sm:px-6 pb-20 max-w-[1600px]">
      <div class="flex flex-col lg:flex-row gap-8">
        
        <div class="w-full lg:w-64 flex-shrink-0 order-1 lg:order-1">
          <Sidebar />
        </div>

        <div class="flex-1 order-2 lg:order-2">
          <!-- Estado de carga -->
          <div v-if="catalogoStore.cargando" class="flex items-center justify-center py-20">
            <div class="w-10 h-10 border-4 border-[#009DAE] border-t-transparent rounded-full animate-spin"></div>
          </div>

          <!-- Sin resultados -->
          <div v-else-if="catalogoStore.camisas.length === 0" class="text-center py-20">
            <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 class="text-lg font-bold text-gray-500 mb-2">No se encontraron productos</h3>
            <p class="text-sm text-gray-400 mb-4">Intenta ajustar los filtros o la búsqueda.</p>
            <button @click="catalogoStore.limpiarFiltros()" class="px-5 py-2 bg-[#002B42] text-white rounded-full text-sm font-bold hover:bg-[#009DAE] transition-all">
              Limpiar filtros
            </button>
          </div>

          <!-- Grid de productos -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
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