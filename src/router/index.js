import Vue from "vue"
import VueRouter from "vue-router"
import register from "../view/Register.vue"
import login from "../view/Login.vue"
Vue.use(VueRouter)

const routes = [
  { path: "/register", component: register },
  { path: "/login", component: login },
  { path: "/", redirect: "/register" }
]

const router = new VueRouter({
  routes
})
export default router
