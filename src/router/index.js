import Vue from 'vue'
import VueRouter from 'vue-router'
import Selector from '../views/Selector.vue'
import Photos from '../views/Photos.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Selector',
    component: Selector
  },

  {
    path: '/photos/:breed',
    name: 'Photos',
    component: Photos
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
