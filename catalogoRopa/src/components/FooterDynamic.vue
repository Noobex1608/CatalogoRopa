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

const contactoPorNegocio = computed<ContactoInfo>(() => {
  const path = route.path
  
  if (path === '/camisas-bordadas') {
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
  } else if (path === '/camisas-estampadas') {
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
    // Catálogo general o landing page
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

const colorClasses = computed(() => {
  const color = contactoPorNegocio.value.color
  return {
    bg: color === 'purple' ? 'bg-purple-600' : color === 'orange' ? 'bg-orange-500' : 'bg-blue-800',
    hover: color === 'purple' ? 'hover:bg-purple-700' : color === 'orange' ? 'hover:bg-orange-600' : 'hover:bg-blue-900',
    text: color === 'purple' ? 'text-purple-500' : color === 'orange' ? 'text-orange-500' : 'text-blue-800',
    ring: color === 'purple' ? 'focus:ring-purple-500' : color === 'orange' ? 'focus:ring-orange-500' : 'focus:ring-blue-500',
    border: color === 'purple' ? 'border-purple-600/20' : color === 'orange' ? 'border-orange-500/20' : 'border-blue-800/20',
    groupHoverText: color === 'purple' ? 'group-hover:text-purple-500' : color === 'orange' ? 'group-hover:text-orange-500' : 'group-hover:text-blue-800'
  }
})
</script>

<template>
  <footer class="bg-gray-900 text-white py-10 border-t-2" :class="colorClasses.border">
    <div class="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8 items-start">
        <!-- Información del Negocio -->
        <div>
          <h4 class="font-bold text-lg mb-4 flex items-center gap-2">
            <Icon icon="mdi:store" class="text-2xl" :class="colorClasses.text" />
            {{ contactoPorNegocio.nombre }}
          </h4>
          <p class="text-gray-400 text-sm mb-4 leading-relaxed">
            {{ route.path === '/camisas-bordadas' ? 'Bordados artesanales de alta calidad' : route.path === '/camisas-estampadas' ? 'Estampados únicos y modernos' : 'Tu destino para camisas de calidad premium' }}
          </p>
          
          <!-- Enlaces Rápidos -->
          <div class="mt-6">
            <h5 class="font-semibold text-sm mb-3 text-gray-300">Navegación Rápida</h5>
            <ul class="space-y-2 text-sm text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">Catálogo Completo</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Ofertas Especiales</a></li>
              <li><a href="#" class="hover:text-white transition-colors">Nuevos Arrivals</a></li>
            </ul>
          </div>
        </div>

        <!-- Contacto -->
        <div>
          <h4 class="font-bold text-lg mb-4">Contacto</h4>
          <ul class="space-y-3 text-sm">
            <li class="group flex items-start gap-2">
              <Icon icon="mdi:phone" class="text-lg mt-0.5 flex-shrink-0 text-gray-500 transition-colors" :class="colorClasses.groupHoverText" />
              <a :href="`tel:${contactoPorNegocio.telefono}`" class="text-gray-400 hover:text-white transition-colors">
                {{ contactoPorNegocio.telefono }}
              </a>
            </li>
            <li class="group flex items-start gap-2">
              <Icon icon="mdi:email" class="text-lg mt-0.5 flex-shrink-0 text-gray-500 transition-colors" :class="colorClasses.groupHoverText" />
              <a :href="`mailto:${contactoPorNegocio.email}`" class="text-gray-400 hover:text-white transition-colors break-all">
                {{ contactoPorNegocio.email }}
              </a>
            </li>
            <li class="group flex items-start gap-2">
              <Icon icon="mdi:map-marker" class="text-lg mt-0.5 flex-shrink-0 text-gray-500 transition-colors" :class="colorClasses.groupHoverText" />
              <span class="text-gray-400">
                {{ contactoPorNegocio.direccion }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Horarios de Atención -->
        <div>
          <h4 class="font-bold text-lg mb-4">Horarios de Atención</h4>
          <ul class="space-y-2.5 text-sm text-gray-400">
            <li v-for="(horario, index) in contactoPorNegocio.horarios" :key="index" class="group flex items-start gap-2">
              <Icon icon="mdi:clock-outline" class="text-lg mt-0.5 flex-shrink-0 text-gray-500 transition-colors" :class="colorClasses.groupHoverText" />
              <span>{{ horario }}</span>
            </li>
          </ul>
        </div>

        <!-- Redes Sociales y Newsletter -->
        <div>
          <h4 class="font-bold text-lg mb-4">Síguenos</h4>
          <div class="flex gap-3 mb-6">
            <a 
              :href="contactoPorNegocio.redesSociales.facebook" 
              target="_blank"
              class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
            >
              <Icon icon="mdi:facebook" class="text-2xl" />
            </a>
            <a 
              :href="contactoPorNegocio.redesSociales.instagram" 
              target="_blank"
              class="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors"
            >
              <Icon icon="mdi:instagram" class="text-2xl" />
            </a>
            <a 
              :href="contactoPorNegocio.redesSociales.whatsapp" 
              target="_blank"
              class="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
            >
              <Icon icon="mdi:whatsapp" class="text-2xl" />
            </a>
          </div>

          <!-- Newsletter mejorado -->
          <div class="mb-6">
            <h5 class="font-semibold text-sm mb-2">Newsletter</h5>
            <p class="text-xs text-gray-500 mb-3 italic">Prometemos no enviar spam, solo estilo</p>
            <div class="relative">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                class="w-full px-4 py-3 pr-28 text-sm rounded-full bg-gray-800 border-none text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                :class="colorClasses.ring"
              />
              <button 
                class="absolute right-1 top-1 bottom-1 px-5 rounded-full text-white font-bold text-xs uppercase tracking-wider transition-all"
                :class="[colorClasses.bg, colorClasses.hover]"
              >
                Unirme
              </button>
            </div>
          </div>

          <!-- Trust Badges -->
          <div class="mt-6">
            <p class="text-xs text-gray-500 mb-3">Métodos de pago seguros</p>
            <div class="flex flex-wrap gap-3 items-center opacity-60">
              <Icon icon="logos:visa" class="text-3xl" />
              <Icon icon="logos:mastercard" class="text-3xl" />
              <Icon icon="logos:paypal" class="text-3xl" />
              <div class="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded text-xs text-gray-400">
                <Icon icon="mdi:shield-check" class="text-green-500 text-base" />
                <span>Envío Seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-800 pt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <!-- Logo y Copyright -->
          <div class="text-center md:text-left">
            <div class="text-xl tracking-tighter mb-2">
              <span class="font-black uppercase" :class="colorClasses.text">Camisa</span><span class="font-extralight">STORE</span>
            </div>
            <p class="text-gray-400 text-sm">
              &copy; 2026 CamisaStore. Todos los derechos reservados.
            </p>
          </div>

          <!-- Enlaces legales -->
          <div class="flex flex-wrap gap-3 text-sm text-gray-400">
            <a href="#" class="hover:text-white transition-colors">Términos y Condiciones</a>
            <span class="text-gray-700">•</span>
            <a href="#" class="hover:text-white transition-colors">Política de Privacidad</a>
            <span class="text-gray-700">•</span>
            <a href="#" class="hover:text-white transition-colors">Devoluciones</a>
            <span class="text-gray-700">•</span>
            <a href="#" class="hover:text-white transition-colors">Envíos</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
