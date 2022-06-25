<template>
  <div>
    <h3>演示 element 组件的用法</h3>
    <el-button type="success">主要按钮</el-button>

    <hr>

    <el-input v-model="input" placeholder="请输入内容"></el-input>

    <hr>

    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      @cell-click="cellClick">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    cellClick() {
      console.log('单元格被点击了')
    }
  }
}
</script>

<style>

</style>
