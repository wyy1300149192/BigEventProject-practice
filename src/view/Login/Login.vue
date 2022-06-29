<template>
  <!-- 登录页面的整体盒子 -->
  <div class="login-container">
    <!-- 登录的盒子 -->
    <div class="login-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 登录的表单区域 -->
      <!-- 注册的表单区域 -->
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginRef"
        class="demo-ruleForm"
      >
        <!-- 账号输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            :validate-event="false"
          ></el-input>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            :validate-event="false"
            @keydown.enter.native="login_btn"
          ></el-input>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-button type="primary" class="login-btn" @click="login_btn"
          >登录</el-button
        >

        <!-- 去注册文字链接 -->
        <el-link type="info" :underline="false" class="text-info" href="#/reg"
          >去注册</el-link
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 表单绑定
      loginForm: {
        username: "",
        password: ""
      },
      // 表单验证规则
      loginRules: {
        username: [
          { required: true, message: "请输入用户名" },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "用户名或密码错误",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码" },
          {
            pattern: /^\S{6,15}$/,
            message: "用户名或密码错误",
            trigger: "blur"
          }
        ]
      }
    }
  },
  methods: {
    login_btn() {
      this.$refs.loginRef.validate(async (vali) => {
        if (vali) {
          const { data: res } = await this.$http.post(
            "/api/login",
            this.loginForm
          )
          if (res.code === 0) {
            this.$message({
              message: "登录成功",
              type: "success"
            })
            localStorage.setItem("token", res.token)
            this.$router.push("/home")
          } else {
            this.$message({
              message: res.message,
              type: "error"
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .login-box {
    width: 400px;
    height: 270px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }

    .login-btn {
      width: 100%;
    }

    .text-info {
      text-decoration: underline;
    }
  }
}
</style>
