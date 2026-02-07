import { supabase } from './supabaseCliente'
import type { Producto } from '../types/supabase'
import type { Database } from '../types/supabase'

type ProductoInsert = Database['public']['Tables']['productos']['Insert']
type ProductoUpdate = Database['public']['Tables']['productos']['Update']

/**
 * Servicio CRUD administrativo para productos.
 * Requiere usuario autenticado con las políticas RLS correspondientes.
 */
export const servicioAdminProductos = {
  /** Obtiene todos los productos con el nombre de su categoría */
  async obtenerTodos(): Promise<(Producto & { categoria_nombre?: string })[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*, categorias(nombre)')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Admin – Error al obtener productos:', error.message)
      throw new Error(error.message)
    }

    return (data ?? []).map((p: any) => ({
      ...p,
      categoria_nombre: p.categorias?.nombre ?? 'Sin categoría'
    }))
  },

  /** Obtiene productos filtrados por categoría ID */
  async obtenerPorCategoria(categoriaId: string): Promise<Producto[]> {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .eq('categoria_id', categoriaId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Admin – Error al obtener por categoría:', error.message)
      throw new Error(error.message)
    }

    return data ?? []
  },

  /** Crea un producto nuevo */
  async crear(producto: ProductoInsert): Promise<Producto> {
    const { data, error } = await (supabase
      .from('productos') as any)
      .insert(producto)
      .select()
      .single()

    if (error) {
      console.error('Admin – Error al crear producto:', error.message)
      throw new Error(error.message)
    }

    return data
  },

  /** Actualiza un producto existente */
  async actualizar(id: string, cambios: ProductoUpdate): Promise<Producto> {
    const { data, error } = await (supabase
      .from('productos') as any)
      .update(cambios)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Admin – Error al actualizar producto:', error.message)
      throw new Error(error.message)
    }

    return data
  },

  /** Elimina un producto por ID */
  async eliminar(id: string): Promise<void> {
    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Admin – Error al eliminar producto:', error.message)
      throw new Error(error.message)
    }
  },

  /** Sube una imagen al bucket de productos y retorna la URL pública */
  async subirImagen(archivo: File, nombreArchivo?: string): Promise<string> {
    const nombre = nombreArchivo ?? `${Date.now()}-${archivo.name.replace(/\s+/g, '-')}`
    const ruta = `productos/${nombre}`

    const { error } = await supabase.storage
      .from('imagenes-productos')
      .upload(ruta, archivo, {
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('Admin – Error al subir imagen:', error.message)
      throw new Error(error.message)
    }

    const { data: urlData } = supabase.storage
      .from('imagenes-productos')
      .getPublicUrl(ruta)

    return urlData.publicUrl
  },

  /** Elimina una imagen del bucket */
  async eliminarImagen(ruta: string): Promise<void> {
    // Extraer la ruta relativa de la URL completa si es necesario
    const rutaRelativa = ruta.includes('imagenes-productos/')
      ? ruta.split('imagenes-productos/')[1]
      : ruta

    const { error } = await supabase.storage
      .from('imagenes-productos')
      .remove([`productos/${rutaRelativa}`])

    if (error) {
      console.error('Admin – Error al eliminar imagen:', error.message)
    }
  }
}
