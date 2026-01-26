import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import CatalogoView from '../views/CatalogoView.vue'
import CamisasEstampadasView from '../views/CamisasEstampadasView.vue'
import CamisasBordadasView from '../views/CamisasBordadasView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
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
    }
  ]
})

export default router
