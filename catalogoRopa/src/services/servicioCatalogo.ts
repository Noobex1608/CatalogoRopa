import { supabase } from './supabaseCliente'
import type { Producto, Categoria } from '../types/supabase'

/**
 * Servicio para interactuar con la tabla de categorías en Supabase.
 */
export const servicioCategorias = {
  /** Obtiene todas las categorías ordenadas por el campo 'orden' */
  async obtenerTodas(): Promise<Categoria[]> {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .order('orden', { ascending: true })

    if (error) {
      console.error('Error al obtener categorías:', error.message)
      return []
    }

    return data ?? []
  },

  /** Obtiene una categoría por su slug */
  async obtenerPorSlug(slug: string): Promise<Categoria | null> {
    const { data, error } = await supabase
      .from('categorias')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error al obtener categoría por slug:', error.message)
      return null
    }

    return data
  }
}

/**
 * Servicio para interactuar con la tabla de productos en Supabase.
 */
export const servicioProductos = {
  /** Obtiene todos los productos */
  async obtenerTodos(): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener productos:', error.message)
      return []
    }

    return data ?? []
  },

  /** Obtiene productos filtrados por el slug de la categoría */
  async obtenerPorCategoria(slugCategoria: string): Promise<Producto[]> {
    // Primero obtenemos el id de la categoría por su slug
    const categoria = await servicioCategorias.obtenerPorSlug(slugCategoria)
    if (!categoria) return []

    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('categoria_id', categoria.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener productos por categoría:', error.message)
      return []
    }

    return data ?? []
  },

  /** Obtiene un producto por su ID */
  async obtenerPorId(id: string): Promise<Producto | null> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error al obtener producto:', error.message)
      return null
    }

    return data
  },

  /** Obtiene productos en oferta */
  async obtenerEnOferta(): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('en_oferta', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener ofertas:', error.message)
      return []
    }

    return data ?? []
  },

  /** Obtiene productos nuevos */
  async obtenerNuevos(): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('es_nuevo', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error al obtener nuevos:', error.message)
      return []
    }

    return data ?? []
  }
}
