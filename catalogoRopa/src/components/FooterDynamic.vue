<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

interface ContactoInfo {
  nombre: string
  telefono: string
  email: string
  direccion: string
  horarios: string[]
  redesSociales: {
    facebook: string
    instagram: string
    whatsapp: string
  }
  color: string
}

// 1. CONFIGURACIÓN DE DATOS POR TIENDA
const contactoPorNegocio = computed<ContactoInfo>(() => {
  const path = route.path
  
  if (path.includes('camisas-bordadas')) {
    return {
      nombre: 'Bordados Artesanales',
      telefono: '+52 (33) 1234-5678',
      email: 'bordados@camisastore.com',
      direccion: 'Av. Artesanos 123, Col. Centro, Guadalajara, JAL',
      horarios: [
        'Lun - Vie: 9:00 AM - 7:00 PM',
        'Sábados: 10:00 AM - 6:00 PM',
        'Domingos: 11:00 AM - 3:00 PM'
      ],
      redesSociales: {
        facebook: 'https://facebook.com/bordadosartesanales',
        instagram: 'https://instagram.com/bordados.artesanales',
        whatsapp: 'https://wa.me/523312345678'
      },
      color: 'purple'
    }
  } else if (path.includes('camisas-estampadas')) {
    return {
      nombre: 'Estampados Modernos',
      telefono: '+52 (33) 9876-5432',
      email: 'estampados@camisastore.com',
      direccion: 'Blvd. Creativo 456, Col. Moderna, Guadalajara, JAL',
      horarios: [
        'Lun - Vie: 10:00 AM - 8:00 PM',
        'Sábados: 10:00 AM - 7:00 PM',
        'Domingos: Cerrado'
      ],
      redesSociales: {
        facebook: 'https://facebook.com/estampadosmodernos',
        instagram: 'https://instagram.com/estampados.modernos',
        whatsapp: 'https://wa.me/523398765432'
      },
      color: 'orange'
    }
  } else {
    // Default: Tienda Principal (Réplicas/Home)
    return {
      nombre: 'CamisaStore - Casa Matriz',
      telefono: '+52 (33) 5555-0000',
      email: 'contacto@camisastore.com',
      direccion: 'Av. Principal 789, Col. Comercial, Guadalajara, JAL',
      horarios: [
        'Lun - Vie: 9:00 AM - 8:00 PM',
        'Sábados: 9:00 AM - 7:00 PM',
        'Domingos: 10:00 AM - 4:00 PM'
      ],
      redesSociales: {
        facebook: 'https://facebook.com/camisastore',
        instagram: 'https://instagram.com/camisa.store',
        whatsapp: 'https://wa.me/523355550000'
      },
      color: 'blue'
    }
  }
})

// 2. SISTEMA DE COLORES DINÁMICO
const colorClasses = computed(() => {
  const color = contactoPorNegocio.value.color
  return {
    // Fondos de botones / acentos
    bg: color === 'purple' ? 'bg-purple-600' : color === 'orange' ? 'bg-amber-500' : 'bg-[#009DAE]',
    hover: color === 'purple' ? 'hover:bg-purple-500' : color === 'orange' ? 'hover:bg-amber-400' : 'hover:bg-[#4DBCC8]',
    // Textos
    text: color === 'purple' ? 'text-purple-400' : color === 'orange' ? 'text-amber-500' : 'text-[#009DAE]',
    // Anillos de foco y bordes
    ring: color === 'purple' ? 'focus:ring-purple-500' : color === 'orange' ? 'focus:ring-amber-500' : 'focus:ring-[#009DAE]',
    border: color === 'purple' ? 'border-purple-500/30' : color === 'orange' ? 'border-amber-500/30' : 'border-[#009DAE]/30',
    // Hover en grupos
    groupHoverText: color === 'purple' ? 'group-hover:text-purple-400' : color === 'orange' ? 'group-hover:text-amber-500' : 'group-hover:text-[#009DAE]'
  }
})
</script>

<template>
  <footer class="bg-[#001E2F] text-white py-12 border-t-4" :class="colorClasses.border">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10 items-start">
        
        <div>
          <h4 class="font-bold text-xl mb-6 flex items-center gap-3 tracking-tight">
            <div class="p-2 rounded-lg bg-white/5 border border-white/10">
              <Icon icon="mdi:store" class="text-2xl" :class="colorClasses.text" />
            </div>
            {{ contactoPorNegocio.nombre }}
          </h4>
          <p class="text-gray-400 text-sm mb-6 leading-relaxed">
            {{ route.path.includes('camisas-bordadas') ? 'Expertos en bordados de alta precisión para empresas y particulares.' : route.path.includes('camisas-estampadas') ? 'Diseños vibrantes en DTF y Vinilo Textil de larga duración.' : 'Tu destino #1 para réplicas deportivas de calidad premium.' }}
          </p>
          
          <div>
            <h5 class="font-bold text-xs uppercase tracking-widest mb-4 text-[#005F7F]">Explora</h5>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"><span class="text-[10px] opacity-50">›</span> Catálogo Completo</a></li>
              <li><a href="#" class="hover:text-white transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"><span class="text-[10px] opacity-50">›</span> Ofertas Flash</a></li>
              <li><a href="#" class="hover:text-white transition-colors flex items-center gap-2 hover:translate-x-1 duration-200"><span class="text-[10px] opacity-50">›</span> Nuevos Lanzamientos</a></li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-lg mb-6 tracking-tight text-white">Contacto</h4>
          <ul class="space-y-4 text-sm">
            <li class="group flex items-start gap-3">
              <Icon icon="mdi:phone" class="text-xl mt-0.5 flex-shrink-0 text-[#005F7F] transition-colors" :class="colorClasses.groupHoverText" />
              <div>
                <span class="block text-xs text-[#005F7F] font-bold uppercase mb-0.5">Llámanos</span>
                <a :href="`tel:${contactoPorNegocio.telefono}`" class="text-gray-300 hover:text-white transition-colors font-medium">
                  {{ contactoPorNegocio.telefono }}
                </a>
              </div>
            </li>
            <li class="group flex items-start gap-3">
              <Icon icon="mdi:email" class="text-xl mt-0.5 flex-shrink-0 text-[#005F7F] transition-colors" :class="colorClasses.groupHoverText" />
              <div>
                <span class="block text-xs text-[#005F7F] font-bold uppercase mb-0.5">Escríbenos</span>
                <a :href="`mailto:${contactoPorNegocio.email}`" class="text-gray-300 hover:text-white transition-colors break-all font-medium">
                  {{ contactoPorNegocio.email }}
                </a>
              </div>
            </li>
            <li class="group flex items-start gap-3">
              <Icon icon="mdi:map-marker" class="text-xl mt-0.5 flex-shrink-0 text-[#005F7F] transition-colors" :class="colorClasses.groupHoverText" />
              <div>
                <span class="block text-xs text-[#005F7F] font-bold uppercase mb-0.5">Visítanos</span>
                <span class="text-gray-300">
                  {{ contactoPorNegocio.direccion }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="font-bold text-lg mb-6 tracking-tight text-white">Horarios</h4>
          <div class="bg-white/5 rounded-xl p-5 border border-white/5">
            <ul class="space-y-3 text-sm text-gray-400">
              <li v-for="(horario, index) in contactoPorNegocio.horarios" :key="index" class="flex items-start gap-3">
                <Icon icon="mdi:clock-outline" class="text-lg mt-0.5 flex-shrink-0" :class="colorClasses.text" />
                <span class="font-medium">{{ horario }}</span>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-lg mb-6 tracking-tight text-white">Síguenos</h4>
          <div class="flex gap-3 mb-8">
            <a 
              :href="contactoPorNegocio.redesSociales.facebook" 
              target="_blank"
              class="w-10 h-10 bg-[#002B42] border border-[#005F7F]/30 hover:bg-[#1877F2] hover:border-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
            >
              <Icon icon="mdi:facebook" class="text-xl" />
            </a>
            <a 
              :href="contactoPorNegocio.redesSociales.instagram" 
              target="_blank"
              class="w-10 h-10 bg-[#002B42] border border-[#005F7F]/30 hover:bg-pink-600 hover:border-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
            >
              <Icon icon="mdi:instagram" class="text-xl" />
            </a>
            <a 
              :href="contactoPorNegocio.redesSociales.whatsapp" 
              target="_blank"
              class="w-10 h-10 bg-[#002B42] border border-[#005F7F]/30 hover:bg-green-600 hover:border-transparent rounded-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1"
            >
              <Icon icon="mdi:whatsapp" class="text-xl" />
            </a>
          </div>

          <div class="relative group">
            <h5 class="font-bold text-xs uppercase tracking-widest mb-3 text-white">Newsletter</h5>
            <div class="relative">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                class="w-full pl-4 pr-24 py-3 text-sm rounded-xl bg-[#002B42] border border-[#005F7F]/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-[#002B42]/80 transition-all"
                :class="colorClasses.ring"
              />
              <button 
                class="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-lg text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl"
                :class="[colorClasses.bg, colorClasses.hover]"
              >
                Unirme
              </button>
            </div>
            <p class="text-[10px] text-gray-500 mt-2 ml-1">* Novedades exclusivas de {{ contactoPorNegocio.nombre }}.</p>
          </div>
        </div>
      </div>

      <div class="border-t border-[#005F7F]/20 pt-8 mt-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div class="text-center md:text-left">
            <div class="text-lg tracking-tighter mb-1 flex items-center justify-center md:justify-start gap-1">
              <Icon :icon="route.path.includes('estampadas') ? 'mdi:printer-3d-nozzle' : route.path.includes('bordadas') ? 'mdi:needle' : 'mdi:tshirt-crew'" 
                    class="text-xl mr-1 opacity-80" :class="colorClasses.text" />
              
              <span class="font-black uppercase tracking-wide text-white">
                {{ route.path.includes('estampadas') ? 'Estampados' : route.path.includes('bordadas') ? 'Bordados' : 'Camisa' }}
              </span>
              
              <span class="font-light uppercase" :class="colorClasses.text">
                {{ route.path.includes('estampadas') ? 'Modernos' : route.path.includes('bordadas') ? 'Artesanales' : 'Store' }}
              </span>
            </div>
            <p class="text-gray-500 text-xs font-medium">
              &copy; 2026 CamisaStore Inc. Todos los derechos reservados.
            </p>
          </div>

          <div class="flex gap-4 opacity-40 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
             <Icon icon="logos:visa" class="text-2xl" />
             <Icon icon="logos:mastercard" class="text-2xl" />
             <Icon icon="logos:paypal" class="text-2xl" />
           </div>

          <div class="flex flex-wrap gap-4 text-xs font-medium text-gray-500">
            <a href="#" class="hover:text-white transition-colors">Privacidad</a>
            <a href="#" class="hover:text-white transition-colors">Términos</a>
            <a href="#" class="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>