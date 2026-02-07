import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import CatalogoView from '../views/CatalogoView.vue'
import CamisasEstampadasView from '../views/CamisasEstampadasView.vue'
import CamisasBordadasView from '../views/CamisasBordadasView.vue'
import DetalleProductoView from '../views/DetalleProductoView.vue'
import { servicioAuth } from '../services/servicioAuth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/catalogo',
      name: 'catalogo',
      component: CatalogoView
    },
    {
      path: '/camisas-estampadas',
      name: 'camisas-estampadas',
      component: CamisasEstampadasView
    },
    {
      path: '/camisas-bordadas',
      name: 'camisas-bordadas',
      component: CamisasBordadasView
    },
    {
      path: '/producto/:id',
      name: 'detalle-producto',
      component: DetalleProductoView
    },
    /* ─── Rutas admin (ocultas, sin enlace público) ─── */
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../views/admin/AdminLogin.vue'),
      meta: { esAdmin: true }
    },
    {
      path: '/admin',
      name: 'admin-dashboard',
      component: () => import('../views/admin/AdminDashboard.vue'),
      meta: { esAdmin: true, requiereAuth: true }
    }
  ]
})

/* ─── Guard de autenticación para rutas admin ─── */
router.beforeEach(async (to, _from, next) => {
  if (to.meta.requiereAuth) {
    const autenticado = await servicioAuth.verificarSesion()
    if (!autenticado) {
      return next({ name: 'admin-login', query: { redirect: to.fullPath } })
    }
  }

  // Si ya está logueado y va al login, redirigir al dashboard
  if (to.name === 'admin-login') {
    const autenticado = await servicioAuth.verificarSesion()
    if (autenticado) {
      return next({ name: 'admin-dashboard' })
    }
  }

  next()
})

export default router
