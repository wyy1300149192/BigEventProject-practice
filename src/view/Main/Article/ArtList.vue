<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章列表</span>
      </div>
      <!-- 搜索区域 -->
      <div class="search-box">
        <el-form :inline="true" :model="q" ref="searchFormRef">
          <el-form-item label="文章分类">
            <el-select
              v-model="q.cate_id"
              placeholder="请选择分类"
              size="small"
            >
              <el-option
                :label="item.cate_name"
                :value="item.id"
                v-for="item in cateList"
                :key="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布状态" style="margin-left: 15px">
            <el-select v-model="q.state" placeholder="请选择状态" size="small">
              <el-option label="已发布" value="已发布"></el-option>
              <el-option label="草稿" value="草稿"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="screenBtn"
              >筛选</el-button
            >
            <el-button type="info" size="small" @click="resBtn">重置</el-button>
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
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column prop="title" label="文章标题" v-slot="name">
          <template>
            <el-link type="primary" @click="artDetailsBtn(name.row.id)">{{
              name.row.title
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cate_name" label="分类"> </el-table-column>
        <el-table-column prop="pub_date" label="发表时间"> </el-table-column>
        <el-table-column prop="state" label="状态"> </el-table-column>
        <el-table-column label="操作" v-slot="name"
          ><template>
            <el-button type="danger" @click="artRemoveBtn(name.row.id)"
              >删除</el-button
            >
          </template></el-table-column
        >
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        :page-size="2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="pagChange"
        @size-change="pagSizeChange"
        :page-sizes="[2, 4, 10, 50, 100]"
        :current-page="q.pagenum"
      >
      </el-pagination>
    </el-card>
    <!-- 发表文章的对话框 -->
    <el-dialog
      title="发表文章"
      :visible.sync="dialogVisible"
      fullscreen
      :before-close="closeBtn"
      @closed="pubClosed"
      ref="pubDialogRef"
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
          <quill-editor v-model="pubForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="文章封面">
          <!-- 用来显示封面的图片 -->

          <img
            src="../../../assets/images/cover.jpg"
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
    <el-dialog
      title="文章详情"
      :visible.sync="artDetailsDialogVisible"
      width="70%"
      height="70%"
    >
      <span>作者：{{ artDetail.nickname }}</span>
      <span>发布时间：{{ artDetail.pub_date }}</span>
      <span>所属分类：{{ artDetail.cate_name }}</span>
      <span>发布状态：{{ artDetail.state }}</span>
      <el-divider></el-divider>
      <img
        :src="'http://www.liulongbin.top:3008' + artDetail.cover_img"
        alt=""
      />

      <div v-html="artDetail.content"></div>
    </el-dialog>
  </div>
</template>

<script>
import cover from "../../../assets/images/cover.jpg"
export default {
  name: "ArtList",
  created() {
    this.getArticleList()
    this.getCateList()
  },
  data() {
    return {
      // 总文章数
      total: 0,
      // 文章列表
      articleList: null,
      // 分类列表
      cateList: "",
      // 文章详情数据
      artDetail: "null",
      // 发布文章是否显示
      dialogVisible: false,
      // 文章详情是否显示
      artDetailsDialogVisible: false,
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
        content: "",
        cover_img: "",
        state: ""
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
    coverChoose(event) {
      // let reader = new FileReader()
      // reader.readAsDataURL(event.target.files[0])
      // reader.addEventListener("load", (e) => {
      //   console.log(e.target.result)
      //   this.pubForm.cover_img = e.target.result
      // })
      const file = event.target.files[0]
      this.pubForm.cover_img = file

      const url = URL.createObjectURL(file)
      this.$refs.imgRef.src = url

      console.log(file)
    },
    // 发布文章和草稿按钮
    pubArticle(state, pubDialogSlot) {
      this.pubForm.state = state
      if (state === "已发布") {
        this.$refs.pubRef.validate(async (vali) => {
          if (vali) {
            if (this.pubForm.content === "") {
              this.$message({
                message: "请输入文本内容",
                type: "error"
              })
              return
            }
            if (this.pubForm.cover_img === "") {
              this.$message({
                message: "图片未选择",
                type: "error"
              })
              return
            }
            const fd = new FormData()
            for (const key in this.pubForm) {
              fd.append(key, this.pubForm[key])
            }
            const { data: res } = await this.$http.post("/my/article/add", fd)
            console.log(res)

            if (res.code === 0) {
              this.$message({
                message: res.message,
                type: "success"
              })
              this.getArticleList()
              this.dialogVisible = false
            } else {
              this.$message({
                message: res.message,
                type: "error"
              })
            }
          } else {
            console.log(13)
            document.body.scrollTop = 0
            document.body.onscroll = function (e) {
              console.log(e.target)
            }
          }
        })
      }
    },
    // 发布文章框关闭触发
    pubClosed() {
      this.$refs.pubRef.resetFields()
      this.pubForm.content = ""
      this.pubForm.cover_img = ""
      this.$refs.fileRef.value = ""
      this.$refs.imgRef.src = cover
    },
    // 获取文章列表
    async getArticleList() {
      const { data: res } = await this.$http.get("/my/article/list", {
        params: this.q
      })
      console.log(res)
      if (res.code === 0) {
        this.articleList = res.data
        this.total = res.total
      }
    },
    // 页变化触发
    pagChange(num) {
      this.q.pagenum = num
      this.getArticleList()
    },
    // 页大小触发
    pagSizeChange(size) {
      this.q.pagesize = size
      this.getArticleList()
    },
    // 搜索筛选按钮
    screenBtn() {
      this.q.pagenum = 1
      this.getArticleList()
    },
    // 搜索重置按钮
    resBtn() {
      this.q = {
        // 当前是第几页
        pagenum: 1,
        // 每页展示多少条
        pagesize: 2,
        cate_id: "",
        state: ""
      }
      this.getArticleList()
    },
    // 文章详情文字链接
    async artDetailsBtn(id) {
      const { data: res } = await this.$http.get("/my/article/info", {
        params: { id }
      })
      console.log(res)
      if (res.code === 0) {
        this.artDetailsDialogVisible = true
        this.artDetail = res.data
      }
    },
    // 文章删除按钮
    artRemoveBtn(id) {
      this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data: res } = await this.$http.delete("/my/article/info", {
            params: { id }
          })
          console.log(res)
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "删除成功!"
            })
            if (this.articleList.length === 1 && this.q.pagenum >= 1) {
              this.q.pagenum--
              this.getArticleList()
            } else {
              this.getArticleList()
            }
          }
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

/deep/ .cover-img {
  height: 300px;
}
</style>
