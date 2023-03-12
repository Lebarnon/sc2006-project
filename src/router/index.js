import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CreateListing from '../views/CreateListing.vue'
import Listings from '../views/Listings.vue'
import Compare from "../views/Compare.vue"
import Detail from "../views/Detail.vue"
import Favourites from "../views/Favourites.vue"
import { useUserStore } from '../stores/user'
import { useSnackbarStore } from '../stores/snackbar'

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
      path: "/detail/:id",
      name: "detail",
      component: Detail,
    },
    {
      path: "/compare",
      name: "compare",
      component: Compare,
    },
    {
      path: "/favourites",
      name: "favourites",
      component: Favourites,
    },
  ]
})

router.beforeEach((to, from, next) => {
  const privatePages = ["/create-listing", "/compare", "/favourites"]; 
  //check if the "to" path is a public page or not
  const authRequired = privatePages.includes(to.path); 
  
  //page require auth and not authenticated
  if (authRequired && !useUserStore().isAuthenticated) {
    // show error
    useSnackbarStore().display("You need to be logged in to access!")
    //return the user to the login to force the user to login
    return next("/login"); 
  }
  //The conditional is false, then send the user to the right place
  return next();
});

export default router
