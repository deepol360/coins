import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Coins from '../views/Coins.vue'
import UserTable from '../views/UserTable.vue'
import UserAccount from '../views/UserAccount.vue'
import UserCoins from '../views/UserCoins.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/coins',
    name: 'coins',
    component: Coins
  },
  {
    path: '/usertable',
    name: 'usertable',
    component: UserTable
  },
  {
    path: '/useraccount',
    name: 'useraccount',
    component: UserAccount
  },
  {
    path: '/usercoins',
    name: 'usercoins',
    component: UserCoins
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
