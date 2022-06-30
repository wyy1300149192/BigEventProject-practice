import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/reg",
    component: () => import(/* webpackChunkName:"Reg" */ "../view/Reg/Reg.vue")
  },
  {
    path: "/login",
    component: () =>
      import(/* webpackChunkName:"Login" */ "../view/Login/Login.vue")
  },
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName:"Main" */ "../view/Main/Main.vue"),
    children: [
      // 主页 - 首页
      {
        path: "/home",
        component: () =>
          import(/* webpackChunkName:"Home" */ "../view/Main/Home/Home.vue")
      },
      // 主页 - 个人信息
      {
        path: "/user-info",
        component: () =>
          import(
            /* webpackChunkName:"UserInfo" */ "../view/Main/User/UserInfo.vue"
          )
      },
      // 主页 - 更换头像
      {
        path: "/user-avatar",
        component: () =>
          import(
            /* webpackChunkName:"UserAvatar" */ "../view/Main/User/UserAvatar.vue"
          )
      },
      // 主页 - 重置密码
      {
        path: "/user-pwd",
        component: () =>
          import(
            /* webpackChunkName:"UserPwd" */ "../view/Main/User/UserPwd.vue"
          )
      },
      // 主页 - 文章分类
      {
        path: "art-cate",
        component: () =>
          import(
            /* webpackChunkName:"ArtCate" */ "../view/Main/Article/ArtCate.vue"
          )
      },
      // 主页 - 文章发表
      {
        path: "art-list",
        component: () =>
          import(
            /* webpackChunkName:"ArtList" */ "../view/Main/Article/ArtList.vue"
          )
      }
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
