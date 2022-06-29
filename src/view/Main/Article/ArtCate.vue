<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix header-box">
        <span>文章分类</span>
        <el-button type="primary" size="mini" @click="addVisible = true"
          >添加分类</el-button
        >
      </div>
      <!-- 表格区域 -->
      <el-table
        :data="CateList"
        stripe
        style="width: 100%"
        border
        :header-row-style="{ color: '#000' }"
      >
        <el-table-column prop="id" label="序号" width="180"> </el-table-column>
        <el-table-column prop="cate_name" label="分类名称" width="180">
        </el-table-column>
        <el-table-column prop="cate_alias" label="分类别名"> </el-table-column>
        <el-table-column label="操作"
          ><template v-slot="scope">
            <el-button type="primary" size="mini" @click="alterBtn(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="alterDelBtn(scope.row.id)"
              >删除</el-button
            >
          </template></el-table-column
        >
      </el-table>
    </el-card>
    <!-- 添加分类的对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addVisible"
      :width="'40%'"
      @closed="addClos"
    >
      <el-form
        :model="addForm"
        :rules="rules"
        :label-width="'100px'"
        ref="sortRef"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="addForm.cate_name"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="addForm.cate_alias"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisibleBtn">添 加</el-button>
      </div>
    </el-dialog>

    <!-- 修改分类的对话框 -->
    <el-dialog title="修改分类" :visible.sync="alterVisible" :width="'40%'">
      <el-form
        :model="alerForm"
        :rules="rules"
        :label-width="'100px'"
        ref="alerRef"
      >
        <el-form-item label="分类名称" prop="cate_name">
          <el-input
            v-model="alerForm.cate_name"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item label="分类别名" prop="cate_alias">
          <el-input
            v-model="alerForm.cate_alias"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alterVisible = false">取 消</el-button>
        <el-button type="primary" @click="alterOkBtn">确 认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ArtCate",
  data() {
    return {
      // 文章分类数据
      CateList: null,

      // 添加分类表单数据
      addForm: { cate_name: "", cate_alias: "" },
      // 是否显示添加分类弹框
      addVisible: false,

      // 修改分类表单数据
      alerForm: { cate_name: "", cate_alias: "" },
      // 是否显示修改分类弹框
      alterVisible: false,

      // 表单校验
      rules: {
        cate_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          {
            pattern: /^\S{1,10}$/,
            message: "分类名必须是1-10位的非空字符",
            trigger: "blur"
          }
        ],
        cate_alias: [
          { required: true, message: "请输入分类别名", trigger: "blur" },
          {
            pattern: /^[a-zA-Z0-9]{1,15}$/,
            message: "分类别名必须是1-15位的字母数字",
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted() {
    // 获取列表
    this.getCateList()
  },
  methods: {
    // 获取文章分类列表
    async getCateList() {
      const { data: res } = await this.$http.get("/my/cate/list")
      console.log(res)
      this.CateList = res.data
    },
    // 关闭添加分类对话框触发
    addClos() {
      this.$refs.sortRef.resetFields()
    },
    // 添加分类按钮
    addVisibleBtn() {
      this.$refs.sortRef.validate(async (vali) => {
        // 校验通过
        if (vali) {
          // 发送请求
          const { data: res } = await this.$http.post(
            "/my/cate/add",
            this.addForm
          )
          // 请求通过
          if (res.code === 0) {
            this.$message({
              message: res.message,
              type: "success"
            })
            this.addVisible = false
            this.getCateList()
          } else {
            // 请求失败
            this.$message({
              message: res.message,
              type: "error"
            })
          }
        }
      })
    },
    // 修改按钮
    alterBtn(row) {
      this.alterVisible = true
      this.alerForm = Object.assign({}, row)
    },
    // 修改确认按钮
    alterOkBtn() {
      this.$refs.alerRef.validate(async (vali) => {
        if (vali) {
          const { data: res } = await this.$http.put(
            "/my/cate/info",
            this.alerForm
          )
          if (res.code === 0) {
            this.$message({
              message: res.message,
              type: "success"
            })
            this.addVisible = false
            this.getCateList()
          } else {
            // 请求失败
            this.$message({
              message: res.message,
              type: "error"
            })
          }
        }
      })
    },
    alterDelBtn(id) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("/my/cate/del", {
            params: { id }
          })

          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            })
            this.getCateList()
          } else {
            this.$message({
              type: "error",
              message: res.message
            })
          }
          console.log(res)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          })
        })
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
