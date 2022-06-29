<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small">筛选</el-button>
            <el-button type="info" size="small">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 发表文章的按钮 -->
        <el-button
          type="primary"
          size="small"
          class="btn-pub"
          @click="dialogVisible = true"
          >发表文章</el-button
        >
      </div>
      <!-- 文章表格区域 -->
      <!-- 分页区域 -->
    </el-card>
    <!-- 发表文章的对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="dialogVisible"
      fullscreen
      :before-close="closeBtn"
      @closed="pubClosed"
    >
      <!-- 发表文章的表单 -->
      <el-form
        :model="pubForm"
        :rules="pubRules"
        ref="pubRef"
        label-width="100px"
      >
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="pubForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="文章分类" prop="cate_id">
          <el-select
            v-model="pubForm.cate_id"
            placeholder="请选择分类"
            style="width: 100%"
          >
            <el-option
              :label="item.cate_name"
              :value="item.id"
              v-for="item in cateList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章内容">
          <quill-editor v-model="pubForm.conter"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面">
          <!-- 用来显示封面的图片 -->
          <img
            src="../../../assets/images/cover.jpg"
            alt=""
            class="cover-img"
            ref="imgRef"
            v-if="!pubForm.imgurl"
          />
          <img
            v-else
            :src="pubForm.imgurl"
            alt=""
            class="cover-img"
            ref="imgRef"
          />
          <br />
          <!-- 文件选择框，默认被隐藏 -->
          <input
            type="file"
            style="display: none"
            accept="image/*"
            ref="fileRef"
            @change="coverChoose"
          />
          <!-- 选择封面的按钮 -->
          <el-button type="text" @click="coverChooseBtn">+ 选择封面</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="pubArticle('已发布')"
            >发布</el-button
          >
          <el-button type="info" @click="pubArticle('草稿')"
            >存为草稿</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 查看文章详情的对话框 -->
  </div>
</template>

<script>
export default {
  name: "ArtList",
  mounted() {
    this.getCateList()
  },
  data() {
    return {
      // 分类列表
      cateList: "",
      // 发布文章是否显示
      dialogVisible: false,
      // 查询参数对象
      q: {
        // 当前是第几页
        pagenum: 1,
        // 每页展示多少条
        pagesize: 2,
        cate_id: "",
        state: ""
      },
      // 表单的数据对象
      pubForm: {
        title: "",
        cate_id: "",
        conter: "",
        imgurl: ""
      },
      // 表单的验证规则对象
      pubRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 30,
            message: "文章标题的长度为1-30个字符",
            trigger: "blur"
          }
        ],
        cate_id: [
          { required: true, message: "请选择文章标题", trigger: "change" }
        ]
      }
    }
  },
  methods: {
    // 关闭发布文章页面按钮事件
    closeBtn() {
      this.$confirm(
        "此操作将关闭页面，未发布的文章将会丢失, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.dialogVisible = false
        })
        .catch(() => {})
    },
    // 获取文章分类
    async getCateList() {
      const { data: res } = await this.$http.get("/my/cate/list")
      if (res.code === 0) {
        this.cateList = res.data
      }
    },
    // 选择图片按钮
    coverChooseBtn() {
      this.$refs.fileRef.click()
    },
    // 选择图片input事件
    coverChoose(e) {
      const url = URL.createObjectURL(e.target.files[0])
      this.pubForm.imgurl = url
    },
    // 发布文章和草稿按钮
    pubArticle(state) {
      console.log(state)
    },
    // 发布文章框关闭触发
    pubClosed() {
      this.$refs.pubRef.resetFields()
      this.pubForm.conter = ""
      this.pubForm.imgurl = ""
      this.$refs.fileRef.value = ""
    }
  }
}
</script>

<style lang="less" scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  .btn-pub {
    margin-top: 5px;
  }
}
/deep/ .ql-editor {
  min-height: 300px !important;
}
</style>
