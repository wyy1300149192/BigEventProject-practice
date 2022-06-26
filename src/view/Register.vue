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
        :rules="rules"
        label-width="auto"
        ref="regRef"
      >
        <el-form-item prop="username">
          <el-input v-model="regForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
         <el-form-item prop="password">
          <el-input v-model="regForm.password" placeholder="请输入密码"></el-input>
        </el-form-item>
         <el-form-item prop="repassword">
          <el-input v-model="regForm.repassword" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" class="reg_btn">注册</el-button>
        <el-link type="info" href="#/login">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  // 验证确认密码
  data() {
    // 验证密码是否相同
    const repwd = (rule, value, callback) => {
      // rule：基本没用
      // value：要验证的那个表单元素的值
      if (value === this.regForm.password) {
        // 验证通过，则直接调用 callback 即可
        callback()
      } else {
        // 验证不通过，则调用 callback，并穿进去一个错误对象 new Error('错误信息')
        callback(new Error('两次输入的密码不一致!'))
      }
    }
    return {
      // 输入框绑定
      regForm: {
        username: '',
        password: '',
        repassword: ''
      },
      // 输入框验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{1,15}/, message: '请输入1-15的字母或数字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '请输入6-15位字符', trigger: 'blur' }
        ],
        repassword: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,15}$/, message: '请输入6-15位字符', trigger: 'blur' },
          { validator: repwd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册按钮事件
    submitForm() {
      this.$refs.regRef.validate(async(valid) => {
        if (valid) {
          const { data: res } = await this.$http.post('/api/reg', this.regForm)
          console.log(res)
          if (res.code === 0) {
            this.$message({
              message: '注册成功，正在跳转登录页面...',
              type: 'success'
            })
            // 跳转登录页
            this.$router.push({ path: "/login" })
          } else {
            this.$message({
              message: res.message,
              type: 'error'
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
  background: url("../assets/images/login_bg.jpg") center;
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
      background: url("../assets/images/login_title.png") center no-repeat;
    }
    .reg_btn {
      width: 100%;
    }
  }
}
</style>
