import Vue from "vue"
import VueRouter from "vue-router"
import register from "../components/Register.vue"
Vue.use(VueRouter)

const routes = [
  { path: "/register", component: register },
  { path: "/", redirect: "/register" }

]

const router = new VueRouter({
  routes
})
export default router
