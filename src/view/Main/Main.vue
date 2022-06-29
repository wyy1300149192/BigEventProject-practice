<template>
  <el-container class="main-container">
    <!-- 头部区域 -->
    <el-header>
      <!-- 左侧的 logo -->
      <img src="../../assets/images/logo.png" alt="" />
      <!-- 右侧的菜单 -->
      <el-menu
        class="el-menu-top"
        mode="horizontal"
        background-color="#23262E"
        text-color="#fff"
        active-text-color="#409EFF"
      >
        <el-submenu index="1">
          <template slot="title">
            <!-- 头像 -->
            <img :src="userInfo.user_pic" alt="" class="avatar" />
            <span>个人中心</span>
          </template>
          <el-menu-item index="1-1"
            ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
          >
          <el-menu-item index="1-2"
            ><i class="el-icon-camera"></i>更换头像</el-menu-item
          >
          <el-menu-item index="1-3"
            ><i class="el-icon-key"></i>重置密码</el-menu-item
          >
        </el-submenu>
        <el-menu-item index="2" @click="exit_btn"
          ><i class="el-icon-switch-button"></i>退出</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <!-- 侧边栏区域 -->
      <el-aside width="200px">
        <div style="color: #fff; margin-top: 20px">侧边栏区域</div>
        <!-- 用户信息区域 -->
        <el-aside width="200px">
          <!-- 用户信息区域 -->
          <div class="user-box">
            <img :src="userInfo.user_pic" alt="" />
            <span>欢迎 {{ userInfo.nickname || userInfo.username }}</span>
          </div>
        </el-aside>
        <!-- 侧边栏导航区域 -->
        <!-- 菜单选项区域 -->
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <template v-for="item in menus">
            <!-- 多级 -->
            <el-submenu
              :index="item.indexPath"
              v-if="item.children"
              :key="item.indexPath"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item
                v-for="i in item.children"
                :key="i.indexPath"
                :index="i.indexPath"
              >
                <i :class="i.icon"></i>
                <span slot="title">{{ i.title }}</span></el-menu-item
              >
            </el-submenu>
            <!-- 一级 -->
            <el-menu-item :index="item.indexPath" v-else :key="item.indexPath">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <!-- 右侧区域 -->
      <el-container>
        <!-- 页面主体区域 -->
        <el-main> <router-view></router-view></el-main>
        <!-- 底部 footer 区域 -->
        <el-footer>© www.itheima.com - 黑马程序员</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from "vuex"
export default {
  name: "Main",
  mounted() {
    // 初始化请求数据 - 用户数据
    this.$store.dispatch("getUserInfo")
    // 初始化请求数据 - 侧边菜单
    this.getMenuData()
  },
  data() {
    return {
      // 侧边菜单数据
      menus: []
    }
  },
  computed: {
    // 用户数据
    ...mapState(["userInfo"])
  },
  methods: {
    // 退出按钮
    exit_btn() {
      this.$confirm("此操作将退出此账号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          localStorage.removeItem("token")
          this.$router.push("/login")
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          })
        })
    },
    // 获取左侧菜单选项
    async getMenuData() {
      const { data: res } = await this.$http.get("/my/menus")
      console.log(res)
      this.menus = res.data
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  height: 100%;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }
  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
  .el-main {
    overflow-y: scroll;
    height: 0;
    background-color: #f2f2f2;
  }
  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.avatar {
  border-radius: 50%;
  width: 35px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}

// 用户信息区域
.user-box {
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  user-select: none;
  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 15px;
    object-fit: cover;
  }
  span {
    color: white;
    font-size: 12px;
  }
}
</style>
