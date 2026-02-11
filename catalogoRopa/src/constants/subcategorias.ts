export const SUBCATEGORIAS_POR_SLUG = {
  replicas: [
    'Ligas Europeas',
    'Selecciones Nacionales',
    'Retro / Clasicas',
    'Edicion Especial',
    'Ninos'
  ],
  estampadas: [
    'Anime y Manga',
    'Bandas de Rock',
    'Frases y Memes',
    'Minimalistas',
    'Parejas'
  ],
  bordadas: [
    'Logos Empresariales',
    'Nombres e Iniciales',
    'Escudos',
    'Gorras Bordadas',
    'Uniformes'
  ]
} as const

export type CategoriaSlug = keyof typeof SUBCATEGORIAS_POR_SLUG

export function obtenerSubcategoriasPorSlug(slug: string | null | undefined): string[] {
  if (!slug) return []
  const normalizado = slug.toLowerCase()
  if (normalizado.includes('bordad')) return [...SUBCATEGORIAS_POR_SLUG.bordadas]
  if (normalizado.includes('estampad')) return [...SUBCATEGORIAS_POR_SLUG.estampadas]
  if (normalizado.includes('replic')) return [...SUBCATEGORIAS_POR_SLUG.replicas]
  return []
}
