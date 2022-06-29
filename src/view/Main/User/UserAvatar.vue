<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>更换头像</span>
    </div>
    <div>
      <!-- 图片，用来展示用户选择的头像 -->
      <img v-if="avatarUrl" :src="avatarUrl" alt="" class="preview" />
      <img
        v-else
        src="../../../assets/images/avatar.jpg"
        alt=""
        class="preview"
      />

      <!-- 按钮区域 -->
      <div class="btn-box">
        <input
          type="file"
          accept="image/*"
          style="display: none"
          ref="fileRef"
          @change="initAvatar"
        />
        <el-button type="primary" icon="el-icon-plus" @click="select_img"
          >选择图片</el-button
        >
        <el-button
          type="success"
          icon="el-icon-upload"
          :disabled="avatarUrl === ''"
          @click="uploadAvatar"
          >上传头像</el-button
        >
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UserAvatar",
  data() {
    return {
      avatarUrl: ""
    }
  },
  methods: {
    // 选择图片按钮事件
    select_img() {
      this.$refs.fileRef.click()
    },
    // 选择的头像显示
    initAvatar(e) {
      if (e.target.files.length === 0) {
        this.$message({
          message: "选择失败，请重新选择",
          type: "success"
        })
      } else {
        const f = new FileReader()
        f.readAsDataURL(e.target.files[0])
        f.addEventListener("load", (e) => {
          this.avatarUrl = e.target.result
        })
      }
    },

    // 上传头像按钮事件
    async uploadAvatar() {
      if (this.avatarUrl) {
        const { data: res } = await this.$http.patch("/my/update/avatar", {
          avatar: this.avatarUrl
        })
        console.log(res)

        if (res.code === 0) {
          this.$message({
            message: "更换成功",
            type: "success"
          })
          this.$store.dispatch("getUserInfo")
        } else {
          this.$message({
            message: "意外问题，请联系开发者",
            type: "error"
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.btn-box {
  margin-top: 10px;
}
.preview {
  width: 350px;
  height: 350px;
  object-fit: cover;
}
</style>
