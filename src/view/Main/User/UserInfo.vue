<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>基本资料</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="UserInfoForm"
      :rules="UserInfoRules"
      ref="UserInfoRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账户名">
        <el-input v-model="UserInfoForm.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="UserInfoForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="UserInfoForm.email"></el-input>
      </el-form-item>
      <el-button type="primary" @click="submitForm">提交修改</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UserInfo",
  mounted() {
    // 初始化获取vuex中的用户信息
    this.UserInfoForm = Object.assign({}, this.$store.state.userInfo)
  },
  data() {
    return {
      UserInfoForm: {
        username: "",
        nickname: "",
        email: ""
      },
      UserInfoRules: {
        nickname: [
          { required: true, message: "请输入用户昵称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "昵称必须是1-10位的非空字符串",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入用户邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" }
        ]
      }
    }
  },
  watch: {
    // 监测vuex的用户信息一变化就赋值给表单
    "$store.state.userInfo": {
      deep: true,
      immediate: true,
      handler(newValue, oldValue) {
        this.UserInfoForm = Object.assign({}, this.$store.state.userInfo)
      }
    }
  },

  methods: {
    // 重置按钮
    resetForm() {
      this.$refs.UserInfoRef.resetFields()
      this.UserInfoForm = Object.assign({}, this.$store.state.userInfo)
    },

    // 提交按钮
    submitForm() {
      this.$refs.UserInfoRef.validate(async (vali) => {
        if (vali) {
          const { data: res } = await this.$http.put(
            "/my/userinfo",
            this.UserInfoForm
          )
          if (res.code === 0) {
            this.$store.dispatch("getUserInfo")
          }
          console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 500px;
}
</style>
