<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { servicioAuth } from '../../services/servicioAuth'
import { Icon } from '@iconify/vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const errorMsg = ref('')
const cargando = ref(false)
const mostrarPassword = ref(false)

async function handleLogin() {
  errorMsg.value = ''
  if (!email.value || !password.value) {
    errorMsg.value = 'Completa todos los campos'
    return
  }

  cargando.value = true
  const { exito, error } = await servicioAuth.iniciarSesion(email.value, password.value)
  cargando.value = false

  if (!exito) {
    errorMsg.value = error === 'Invalid login credentials'
      ? 'Credenciales inválidas'
      : error ?? 'Error al iniciar sesión'
    return
  }

  router.push('/admin')
}
</script>

<template>
  <div class="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo / Branding -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#009DAE]/20 mb-4">
          <Icon icon="mdi:shield-lock" class="w-8 h-8 text-[#009DAE]" />
        </div>
        <h1 class="text-2xl font-bold text-white">Panel Administrativo</h1>
        <p class="text-gray-400 text-sm mt-1">CamisaSTORE — Acceso restringido</p>
      </div>

      <!-- Formulario -->
      <form
        @submit.prevent="handleLogin"
        class="bg-[#111d33] border border-gray-700/50 rounded-2xl p-8 shadow-2xl"
      >
        <!-- Error -->
        <Transition name="fade">
          <div
            v-if="errorMsg"
            class="mb-5 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3"
          >
            <Icon icon="mdi:alert-circle" class="w-5 h-5 flex-shrink-0" />
            {{ errorMsg }}
          </div>
        </Transition>

        <!-- Email -->
        <div class="mb-5">
          <label for="email" class="block text-sm font-medium text-gray-300 mb-2">
            Correo electrónico
          </label>
          <div class="relative">
            <Icon icon="mdi:email-outline" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="admin@camisastore.com"
              class="w-full pl-11 pr-4 py-3 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] transition-all"
            />
          </div>
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label for="password" class="block text-sm font-medium text-gray-300 mb-2">
            Contraseña
          </label>
          <div class="relative">
            <Icon icon="mdi:lock-outline" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              id="password"
              v-model="password"
              :type="mostrarPassword ? 'text' : 'password'"
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full pl-11 pr-12 py-3 bg-[#0a1628] border border-gray-600/50 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#009DAE]/50 focus:border-[#009DAE] transition-all"
            />
            <button
              type="button"
              @click="mostrarPassword = !mostrarPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
            >
              <Icon :icon="mostrarPassword ? 'mdi:eye-off' : 'mdi:eye'" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="cargando"
          class="w-full py-3 bg-[#009DAE] hover:bg-[#00b4c8] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <Icon v-if="cargando" icon="mdi:loading" class="w-5 h-5 animate-spin" />
          <Icon v-else icon="mdi:login" class="w-5 h-5" />
          {{ cargando ? 'Ingresando…' : 'Iniciar Sesión' }}
        </button>
      </form>

      <p class="text-center text-gray-600 text-xs mt-6">
        Volver al
        <RouterLink to="/" class="text-[#009DAE] hover:underline">catálogo público</RouterLink>
      </p>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
