import { supabase } from './supabaseCliente'
import type { User, Session } from '@supabase/supabase-js'
import { ref } from 'vue'

/** Usuario actualmente autenticado */
export const usuarioActual = ref<User | null>(null)

/** Sesión activa */
export const sesionActual = ref<Session | null>(null)

/** Indica si se está verificando la sesión */
export const verificandoSesion = ref(true)

/**
 * Servicio de autenticación con Supabase Auth.
 * Solo se usa para el acceso administrativo.
 */
export const servicioAuth = {
  /** Iniciar sesión con email y contraseña */
  async iniciarSesion(email: string, password: string): Promise<{ exito: boolean; error?: string }> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      return { exito: false, error: error.message }
    }

    usuarioActual.value = data.user
    sesionActual.value = data.session
    return { exito: true }
  },

  /** Cerrar sesión */
  async cerrarSesion(): Promise<void> {
    await supabase.auth.signOut()
    usuarioActual.value = null
    sesionActual.value = null
  },

  /** Verificar si hay una sesión activa */
  async verificarSesion(): Promise<boolean> {
    verificandoSesion.value = true
    try {
      const { data } = await supabase.auth.getSession()
      sesionActual.value = data.session
      usuarioActual.value = data.session?.user ?? null
      return !!data.session
    } finally {
      verificandoSesion.value = false
    }
  },

  /** Escuchar cambios en el estado de autenticación */
  escucharCambios(): void {
    supabase.auth.onAuthStateChange((_evento, sesion) => {
      sesionActual.value = sesion
      usuarioActual.value = sesion?.user ?? null
    })
  }
}
