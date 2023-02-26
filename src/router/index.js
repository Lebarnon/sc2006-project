import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CreateListing from '../views/CreateListing.vue'

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
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
    {
      path: "/create-listing",
      name: "create-listing",
      component: CreateListing,
    },
  ]
})

export default router
