import Vue from "vue"
import VueRouter from "vue-router"
// 引入 注册 组件
import Reg from "../view/Reg/Reg.vue"
// 引入 登录 组件
import Login from "../view/Login/Login.vue"
// 引入 主页 组件
import Main from "../view/Main/Main.vue"
// 引入主页 - 首页 组件
import Home from "../view/Main/Home/Home.vue"
// 引入主页 - 个人信息 组件
import UserInfo from "../view/Main/User/UserInfo.vue"
// 引入主页 - 更换头像 组件
import UserAvatar from "../view/Main/User/UserAvatar.vue"
// 引入主页 - 更换头像 组件
import UserPwd from "../view/Main/User/UserPwd.vue"
// 引入主页 - 文章分类 组件
import ArtCate from "../view/Main/Article/ArtCate.vue"

// 引入主页 - 文章发表 组件
import ArtList from "../view/Main/Article/ArtList.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: "/reg",
    component: Reg
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/",
    component: Main,
    children: [
      // 主页 - 首页
      { path: "/home", component: Home },
      // 主页 - 个人信息
      { path: "/user-info", component: UserInfo },
      // 主页 - 更换头像
      { path: "/user-avatar", component: UserAvatar },
      // 主页 - 重置密码
      { path: "/user-pwd", component: UserPwd },
      // 主页 - 文章分类
      { path: "art-cate", component: ArtCate },
      // 主页 - 文章发表
      { path: "art-list", component: ArtList }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 解决重复push报错的问题
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

// 路由守卫
router.beforeEach((to, from, next) => {
  // 在主页如本地没有token则退出至登录页
  if (to.path === "/") {
    if (localStorage.getItem("token")) {
      next()
    } else {
      next("/login")
    }
  }
  next()
})

export default router
