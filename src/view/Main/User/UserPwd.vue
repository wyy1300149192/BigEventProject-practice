<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>重置密码</span>
    </div>
    <!-- 表单 -->
    <el-form
      :model="pwdForm"
      :rules="pwdRules"
      ref="pwdRef"
      label-width="100px"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="pwdForm.old_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="re_pwd">
        <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="changePwdBtn">修改密码</el-button>
        <el-button @click="$refs.pwdRef.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "UserPwd",
  data() {
    // 验证新密码和原密码重复
    const diffPwd = (r, value, next) => {
      if (value !== this.pwdForm.old_pwd) {
        next()
      } else {
        next(new Error("新旧密码不能重复"))
      }
    }
    // 验证确认密码正确
    const rePwd = (r, value, next) => {
      if (value === this.pwdForm.new_pwd) {
        next()
      } else {
        next(new Error("两次密码不一致"))
      }
    }
    return {
      // 表单数据对象
      pwdForm: {
        old_pwd: "",
        new_pwd: "",
        re_pwd: ""
      },
      // 表单验证规则对象
      pwdRules: {
        old_pwd: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        new_pwd: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: diffPwd, trigger: "blur" }
        ],
        re_pwd: [
          { required: true, message: "请输入确认新密码" },
          { validator: rePwd, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    changePwdBtn() {
      this.$refs.pwdRef.validate(async (vali) => {
        if (vali) {
          const { data: res } = await this.$http.patch(
            "/my/updatepwd",
            this.pwdForm
          )
          if (res.code === 0) {
            this.$message({
              message: "密码修改成功,请重新登录",
              type: "success"
            })
            localStorage.removeItem("token")
            this.$router.push("/login")
          } else {
            this.$message({
              message: res.message,
              type: "error"
            })
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
