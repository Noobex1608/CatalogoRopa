/**
 * Tipos generados manualmente para la base de datos de Supabase.
 * Representan el esquema de las tablas: categorias y productos.
 */

export interface Database {
  public: {
    Tables: {
      categorias: {
        Row: {
          id: string
          nombre: string
          slug: string
          descripcion: string | null
          imagen_url: string | null
          icono: string | null
          orden: number
          created_at: string
        }
        Insert: {
          id?: string
          nombre: string
          slug: string
          descripcion?: string | null
          imagen_url?: string | null
          icono?: string | null
          orden?: number
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          slug?: string
          descripcion?: string | null
          imagen_url?: string | null
          icono?: string | null
          orden?: number
          created_at?: string
        }
      }
      productos: {
        Row: {
          id: string
          nombre: string
          descripcion: string | null
          imagen_url: string
          tallas: string[]
          colores: string[]
          en_oferta: boolean
          es_nuevo: boolean
          categoria_id: string
          subcategorias: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          descripcion?: string | null
          imagen_url: string
          tallas?: string[]
          colores?: string[]
          en_oferta?: boolean
          es_nuevo?: boolean
          categoria_id: string
          subcategorias?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          descripcion?: string | null
          imagen_url?: string
          tallas?: string[]
          colores?: string[]
          en_oferta?: boolean
          es_nuevo?: boolean
          categoria_id?: string
          subcategorias?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

/** Tipo de fila de la tabla categorias */
export type Categoria = Database['public']['Tables']['categorias']['Row']

/** Tipo de fila de la tabla productos */
export type Producto = Database['public']['Tables']['productos']['Row']

/** Producto con la categoría incluida (para joins) */
export type ProductoConCategoria = Producto & {
  categorias: Categoria | null
}
