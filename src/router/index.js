import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Compare from "../views/Compare.vue"
import Detail from "../views/Detail.vue"

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return { top:0 }
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail,
    },
    {
      path: "/compare",
      name: "compare",
      component: Compare,
    }
  ]
})

export default router
