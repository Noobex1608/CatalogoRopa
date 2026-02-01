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
  <div class="min-h-screen bg-[#EAECE9] font-sans selection:bg-[#009DAE] selection:text-white">
    <HeaderNav />

    <div class="bg-white/60 backdrop-blur-sm border-b border-[#005F7F]/5 mb-8">
      <div class="container mx-auto px-6 py-8 max-w-[1600px]">
        <nav class="flex text-xs font-bold uppercase tracking-wider mb-3">
          <a href="/" class="text-[#005F7F]/60 hover:text-[#002B42] transition-colors">Home</a>
          <span class="mx-3 text-[#009DAE]">/</span>
          <span class="text-[#002B42]">Camisas Bordadas</span>
        </nav>
        
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-4xl font-black text-[#002B42] tracking-tight mb-2">
              Bordados Premium
            </h1>
            <p class="text-sm text-[#005F7F]">
              Mostrando <span class="font-bold text-[#002B42]">{{ catalogoStore.camisasBordadas.length }}</span> diseños exclusivos
            </p>
          </div>

          <div class="relative group">
            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#002B42]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <select
              v-model="ordenamiento"
              class="appearance-none bg-white border border-[#005F7F]/10 rounded-xl pl-4 pr-10 py-2.5 text-sm font-medium text-[#002B42] focus:outline-none focus:ring-2 focus:ring-[#009DAE] focus:border-transparent shadow-sm hover:border-[#009DAE]/50 transition-all cursor-pointer"
            >
              <option value="newness">Más recientes</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="popularity">Más populares</option>
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
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            <CamisaCard
              v-for="camisa in catalogoStore.camisasBordadas"
              :key="camisa.id"
              :camisa="camisa"
            />
          </div>

          <div class="flex justify-center mt-12">
            <button class="px-6 py-2.5 bg-[#002B42] text-white rounded-full text-sm font-bold shadow-lg hover:bg-[#009DAE] hover:-translate-y-1 transition-all duration-300">
              Cargar más diseños
            </button>
          </div>
        </div>
      </div>
    </main>
    
    <FooterDynamic />
  </div>
</template>