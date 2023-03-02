import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CreateListing from '../views/CreateListing.vue'
import Listings from '../views/Listings.vue'
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
    {
      path: "/listings",
      name: "listings",
      component: Listings,
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
