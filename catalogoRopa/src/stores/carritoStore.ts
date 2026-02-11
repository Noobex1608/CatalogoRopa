import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Camisa } from './catalogoStore'

export interface ItemCarrito {
  producto: Camisa
  talla: string
  color: string
  cantidad: number
}

export const useCarritoStore = defineStore('carrito', () => {
  const items = ref<ItemCarrito[]>([])
  const abierto = ref(false)

  /* ─── Computed ─── */
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.cantidad, 0)
  )


  /* ─── Acciones ─── */
  function agregarItem(producto: Camisa, talla: string, color: string, cantidad = 1) {
    // Buscar si ya existe un item con mismo producto + talla + color
    const existente = items.value.find(
      (i) => i.producto.id === producto.id && i.talla === talla && i.color === color
    )

    if (existente) {
      existente.cantidad += cantidad
    } else {
      items.value.push({ producto, talla, color, cantidad })
    }
  }

  function eliminarItem(index: number) {
    items.value.splice(index, 1)
  }

  function actualizarCantidad(index: number, nuevaCantidad: number) {
    if (nuevaCantidad <= 0) {
      eliminarItem(index)
      return
    }
    const item = items.value[index]
    if (item) {
      item.cantidad = nuevaCantidad
    }
  }

  function vaciarCarrito() {
    items.value = []
  }

  function toggleCarrito() {
    abierto.value = !abierto.value
  }

  function cerrarCarrito() {
    abierto.value = false
  }

  /** Genera la URL de WhatsApp con el resumen del pedido */
  function generarUrlWhatsApp(): string {
    if (items.value.length === 0) return ''

    let mensaje = '*PEDIDO - CamisaSTORE*\n'
    mensaje += '------------------------\n\n'

    items.value.forEach((item, i) => {
      mensaje += `*${i + 1}. ${item.producto.nombre}*\n`
      mensaje += `   - Talla: ${item.talla}\n`
      mensaje += `   - Color: ${item.color}\n`
      mensaje += `   - Cantidad: ${item.cantidad}\n`
      mensaje += '\n'
    })

    mensaje += '------------------------\n'
    mensaje += `*Total articulos:* ${totalItems.value}\n`
    mensaje += 'Esta disponible mi pedido?'

    return `https://wa.me/523355550000?text=${encodeURIComponent(mensaje)}`
  }

  return {
    items,
    abierto,
    totalItems,
    agregarItem,
    eliminarItem,
    actualizarCantidad,
    vaciarCarrito,
    toggleCarrito,
    cerrarCarrito,
    generarUrlWhatsApp
  }
})
