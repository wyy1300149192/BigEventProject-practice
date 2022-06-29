<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form
        :model="regForm"
        :rules="regRules"
        ref="regRef"
        class="demo-ruleForm"
      >
        <!-- 账号输入框 -->
        <el-form-item prop="username">
          <el-input
            v-model="regForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <!-- 密码输入框 -->
        <el-form-item prop="password">
          <el-input
            v-model="regForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>

        <!-- 确认密码输入框 -->
        <el-form-item prop="repassword">
          <el-input
            v-model="regForm.repassword"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>

        <!-- 注册按钮 -->
        <el-button type="primary" class="reg-btn" @click="reg_btn"
          >注册</el-button
        >

        <!-- 去登录文字链接 -->
        <el-link type="info" class="text-info" href="#/login" :underline="false"
          >已有账号，去登录</el-link
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Reg",
  data() {
    // 确认密码验证
    const validatePass = (rule, value, callback) => {
      if (value === this.regForm.password) {
        callback()
      } else {
        callback(new Error("两次输入的密码不一致"))
      }
    }
    return {
      // 表单绑定
      regForm: {
        username: "",
        password: "",
        repassword: ""
      },
      // 表单验证规则
      regRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,10}$/,
            message: "请输入1-10位字母数字组合",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^\S{6,15}$/,
            message: "请输入1-15位数字或字母、字符(空格除外)",
            trigger: "blur"
          }
        ],
        repassword: [{ validator: validatePass, trigger: "blur" }]
      }
    }
  },
  methods: {
    // 注册按钮
    reg_btn() {
      this.$refs.regRef.validate(async (valid) => {
        if (valid) {
          // 发请求
          const { data: res } = await this.$http.post("/api/reg", this.regForm)
          console.log(res)
          // 成功
          if (res.code === 0) {
            this.$message({
              message: "注册成功，跳转至登录页...",
              type: "success"
            })
            this.$router.push("/login")
          } else {
            // 失败
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
.reg-container {
  background: url("../../assets/images/login_bg.jpg") center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 0 20px;

    .title-box {
      height: 60px;
      background: url("../../assets/images/login_title.png") center no-repeat;
    }

    .reg-btn {
      width: 100%;
    }

    .text-info {
      text-decoration: underline;
    }
  }
}
</style>
