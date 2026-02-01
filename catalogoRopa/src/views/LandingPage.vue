<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const cartCount = ref(2)

// He actualizado la imagen en todas las categorías como pediste
const categorias = [
  {
    titulo: 'Equipos Réplicas ',
    subtitulo: 'Fútbol',
    descripcion: 'Camisetas oficiales y retro.',
    // Imagen actualizada
    imagen: 'https://image.made-in-china.com/2f0j00fbAourqcaEkY/Custom-New-Sublimated-Polyester-Soccer-Jersey-Set-Classic-Polyester-Quick-Dry-Football-Shirt.webp',
    ruta: '/catalogo',
    accent: 'text-blue-200',
    // Ajusté la opacidad a /90 para que tape un poco más las rayas donde hay texto
    gradient: 'from-[#002B42]/95 via-[#005F7F]/60 to-transparent',
    icono: 'mdi:tshirt-crew'
  },
  {
    titulo: 'Estampados',
    subtitulo: 'Personalización',
    descripcion: 'Vinilo y DTF a tu gusto.',
    // Imagen actualizada
    imagen: 'https://reclamosbello.com/wp-content/uploads/2023/09/img-tazas.jpg',
    ruta: '/camisas-estampadas',
    accent: 'text-teal-200',
    // Ajusté la opacidad a /90 para que tape un poco más las rayas donde hay texto
    gradient: 'from-[#005F7F]/95 via-[#009DAE]/60 to-transparent',
    icono: 'mdi:printer-3d-nozzle'
  },
  {
    titulo: 'Bordados',
    subtitulo: 'Alta Costura',
    descripcion: 'Detalles que duran siempre.',
    // Imagen actualizada
    imagen: 'https://image.made-in-china.com/2f0j00VneoBTySZfga/Customized-Denim-Fabric-Washed-Cotton-Embroidery-Baseball-Caps-with-Metal-Hat.webp',
    ruta: '/camisas-bordadas',
    accent: 'text-emerald-200',
    // Ajusté la opacidad a /90 para que tape un poco más las rayas donde hay texto
    gradient: 'from-[#009DAE]/95 via-[#4DBCC8]/60 to-transparent',
    icono: 'mdi:needle'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#EAECE9] font-sans overflow-x-hidden relative">
    
    <div class="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#005F7F]/20 rounded-full blur-[100px] animate-pulse"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#009DAE]/15 rounded-full blur-[120px]"></div>
    <div class="fixed inset-0 opacity-[0.03] pointer-events-none" style="background-image: radial-gradient(#002B42 1px, transparent 1px); background-size: 24px 24px;"></div>

    <header class="fixed w-full top-4 z-50 px-4">
      <div class="max-w-5xl mx-auto bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-full px-6 py-3 flex items-center justify-between relative">
        
        <div class="flex items-center gap-2 flex-shrink-0">
          <div class="w-8 h-8 bg-[#002B42] text-white rounded-full flex items-center justify-center shadow-lg">
            <span class="font-bold">C</span>
          </div>
          <span class="font-bold text-[#002B42] tracking-tight text-lg hidden sm:block">Camisa<span class="font-light text-[#009DAE]">STORE</span></span>
        </div>

        <nav class="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-6 text-sm font-medium text-[#005F7F]">
          <span class="bg-white/50 px-4 py-1 rounded-full border border-transparent cursor-default select-none text-[#002B42]">
            Colecciones
          </span>
        </nav>

        <div class="flex items-center flex-shrink-0">
          <button class="flex items-center gap-2 bg-[#002B42] hover:bg-[#009DAE] text-white px-5 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group">
            <span class="font-bold text-sm tracking-wide hidden sm:block">Contáctanos</span>
            <Icon icon="mdi:whatsapp" class="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </header>

    <section class="relative pt-32 pb-32 lg:pt-40 lg:pb-48 bg-[#002B42] text-white rounded-b-[3rem] lg:rounded-b-[5rem] shadow-2xl overflow-hidden">
      <div class="absolute top-0 right-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div class="relative max-w-7xl mx-auto px-6 text-center z-10">
        <span class="inline-block py-1 px-3 rounded-full bg-[#009DAE]/20 text-[#009DAE] text-xs font-bold tracking-wider mb-4 border border-[#009DAE]/30 backdrop-blur-sm">
          NUEVA TEMPORADA 2026
        </span>
        
        <h1 class="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight tracking-tight">
          Viste tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#4DBCC8] to-[#009DAE]">Identidad</span>
        </h1>
        
        <p class="text-lg text-blue-100/80 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
          Desde réplicas exactas hasta bordados y estampados. Calidad premium en cada detalle.
        </p>

        <div class="flex justify-center gap-8 text-sm font-medium text-blue-200/60">
          <div class="flex items-center gap-2">
            <Icon icon="mdi:check-decagram" class="text-[#4DBCC8]" /> Calidad 100%
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="mdi:arrow-top" class="text-[#4DBCC8]" /> +100 productos
          </div>
        </div>
      </div>
    </section>

    <main class="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-20 lg:-mt-24 pb-20">
      
      <div class="grid md:grid-cols-3 gap-6">
  <router-link
    v-for="(cat, index) in categorias"
    :key="cat.ruta"
    :to="cat.ruta"
    class="group relative h-[420px] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:shadow-[#009DAE]/20"
  >
    <img 
      :src="cat.imagen" 
      :alt="cat.titulo"
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    
    <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

    <div class="absolute inset-0 p-6 flex flex-col justify-between">
      <div class="flex justify-between items-start">
        <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-[#009DAE] group-hover:border-[#009DAE] transition-all duration-300">
          <Icon :icon="cat.icono" class="w-6 h-6 text-white" />
        </div>
        <Icon icon="mdi:arrow-top-right" class="text-white/50 w-6 h-6 group-hover:text-[#009DAE] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </div>

      <div class="transform transition-transform duration-300 group-hover:-translate-y-1">
        <span :class="['text-xs font-bold uppercase tracking-wider mb-2 block pl-1', cat.accent]">
          {{ cat.subtitulo }}
        </span>
        
        <h3 class="text-3xl font-black text-white mb-2 leading-none drop-shadow-md">
          {{ cat.titulo }}
        </h3>
        
        <p class="text-gray-300 text-sm line-clamp-2 mb-6 font-medium">
          {{ cat.descripcion }}
        </p>
        
        <div class="w-full py-3.5 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center gap-2 text-white text-sm font-bold border border-white/10 group-hover:bg-[#009DAE] group-hover:border-[#009DAE] transition-all duration-300">
          Ver Catálogo
          <Icon icon="mdi:arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </router-link>
      </div>

      <div class="mt-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 flex flex-wrap md:flex-nowrap justify-around gap-6 items-center text-center md:text-left">
        <div class="flex items-center gap-4 min-w-[200px]">
          <div class="w-12 h-12 rounded-full bg-blue-50 text-[#002B42] flex items-center justify-center">
            <Icon icon="mdi:shield-check" class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-[#002B42] text-sm">Pago Seguro</h4>
            <p class="text-xs text-gray-500">Tarjetas y Transferencias</p>
          </div>
        </div>
        
        <div class="w-px h-10 bg-gray-200 hidden md:block"></div>

        <div class="flex items-center gap-4 min-w-[200px]">
          <div class="w-12 h-12 rounded-full bg-teal-50 text-[#009DAE] flex items-center justify-center">
            <Icon icon="mdi:package-variant-closed" class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-[#002B42] text-sm">Envíos Nacionales</h4>
            <p class="text-xs text-gray-500">Entrega en todo el país</p>
          </div>
        </div>

        <div class="w-px h-10 bg-gray-200 hidden md:block"></div>

        <div class="flex items-center gap-4 min-w-[200px]">
          <div class="w-12 h-12 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
            <Icon icon="mdi:whatsapp" class="w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-[#002B42] text-sm">Soporte Directo</h4>
            <p class="text-xs text-gray-500">Atención personalizada</p>
          </div>
        </div>
      </div>
      
    </main>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #009DAE;
}
</style>