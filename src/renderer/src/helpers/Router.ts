import { createRouter, createWebHistory, Router } from 'vue-router';

import HomeView from '../views/HomeView.vue'
import MenuCartView from '../views/MenuCartView.vue'
import BalanceView from '../views/BalanceView.vue'
import OffersView from '../views/OffersView.vue'
import HistoryView from '../views/HistoryView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/cart', component: MenuCartView },
  { path: '/balance', component: BalanceView },
  { path: '/offers', component: OffersView },
  { path: '/history', component: HistoryView }
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router