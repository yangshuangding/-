<template>
  <div class='container'>
    <div class="title">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="人员搜索：">
    <el-input v-model="formInline.user" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item label="角色：">
    <el-select v-model="formInline.role" placeholder="请选择">
      <el-option label="运营员" value="false"></el-option>
      <el-option label="维修员" value="true"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">查询</el-button>
  </el-form-item>
</el-form>
    </div>

    <div class="main">

        <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="numid"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="人员名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系电话">
      </el-table-column>
      <el-table-column
        prop="workCount"
        label="完成工单(本月)">
      </el-table-column>
       <el-table-column
        prop="progressTotal"
        label="进行中工单">
      </el-table-column>
      <el-table-column
        prop="cancelCount"
        label="拒绝工单(本月)">
      </el-table-column>
 <el-table-column
        prop="address"
        label="操作">
      <template #default="{row}">
        <el-button type="text" size="small" @click="detail(row)">查看详情</el-button>
      </template>
       </el-table-column>
    </el-table>
  </template>

     <Pagination :currentPage='currentPage' :totalCount='totalCount' :pageSize='pageSize' :totalPage='totalPage'></Pagination>
    </div>

    <el-dialog title="人员详情" :visible.sync="dialogFormVisible" @close="cancle">
      <div class="message"><span>人员名称：{{form.userName}}</span> <span>角色：{{form.roleName}}</span><span>联系电话：{{form.mobile}}</span> <span>负责街道：{{form.regionName}}</span></div>

      <div class="table">
 <table>
  <tr class="firstTr">
   <td />
   <td>总工单数</td>
   <td>拒绝单数</td>
   <td>完成工单</td>
   <td>进行中工单</td>
  </tr>
  <tr>
   <td>本周</td>
   <td>{{workmsg1.total}}</td>
   <td>{{workmsg1.cancelCount}}</td>
   <td>{{workmsg1.workCount}}</td>
   <td>{{workmsg1.progressTotal}}</td>

  </tr>
  <tr>
   <td>本月</td>
  <td>{{workmsg2.total}}</td>
   <td>{{workmsg2.cancelCount}}</td>
   <td>{{workmsg2.workCount}}</td>
   <td>{{workmsg2.progressTotal}}</td>

  </tr>
  <tr>
  <td>本年</td>
  <td>{{workmsg3.total}}</td>
   <td>{{workmsg3.cancelCount}}</td>
   <td>{{workmsg3.workCount}}</td>
   <td>{{workmsg3.progressTotal}}</td>
  </tr>
 </table>
</div>

</el-dialog>

  </div>
</template>

<script>
import { quickTime } from '@/utils/day.js'
import Pagination from '../components/pagination.vue'
import { searchUserWork, kunList, getUserWork } from '@/api/base/people.js'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      formInline: {
        user: '',
        role: ''
      },
      tableData: [],
      data: [],
      dialogFormVisible: false,
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPage: 0,
      form: {},
      workmsg1: {},
      workmsg2: {},
      workmsg3: {}
    }
  },
  methods: {
    // 上一页
    previous () {
      this.currentPage = this.currentPage - 1
      this.getList()
    },
    // 下一页
    nextPage () {
      this.currentPage = this.currentPage + 1
      this.getList()
    },
    onSubmit () {
      this.getList()
    },
    // 渲染列表
    async getList () {
      const { data } = await searchUserWork({ pageIndex: this.currentPage, pageSize: this.pageSize, userName: this.formInline.user, isRepair: this.formInline.role })
      this.totalPage = data.totalPage
      this.totalCount = +data.totalCount
      this.tableData = data.currentPageRecords
      this.tableData.forEach((item, index) => { item.numid = (this.pageSize * (this.currentPage - 1)) + index + 1 })
    },
    async detail (row) {
      this.dialogFormVisible = true

      const { data } = await kunList(row.userId)
      this.form = data
      const a = quickTime('本周')

      const data1 = { userId: row.userId, start: a[0] + ' 00:00:00', end: a[1] + ' 23:59:59' }
      const res = await getUserWork(data1)

      this.workmsg1 = res.data

      const b = quickTime('本月')

      const data2 = { userId: row.userId, start: b[0] + ' 00:00:00', end: b[1] + ' 23:59:59' }
      const res2 = await getUserWork(data2)

      this.workmsg2 = res2.data

      const c = quickTime('本年度')

      const data3 = { userId: row.userId, start: c[0] + ' 00:00:00', end: c[1] + ' 23:59:59' }
      const res3 = await getUserWork(data3)

      this.workmsg3 = res3.data
    },

    // 取消
    cancle () {
      this.dialogFormVisible = false
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang='less'>
/deep/ .el-dialog__header {
  background-color: #fff;
}
 /deep/ .el-dialog__title {
   color: #000;
   font-size: 16px;
   font-weight: 700;
 }

  /deep/ .el-dialog__close  {
     color: #ccc;
  }

.container{
  padding: 20px;
  .title {
    display: flex;
    align-items: center;
    height: 64px;
    background-color: #fff;
    padding-left: 17px;
    margin-bottom: 20px;
    padding-top: 20px;
}
.main {
  background-color: #fff;
  padding: 20px;
  .add{
      background:linear-gradient(135deg,#ff9743,#ff5e20)!important;
      border: none;
      margin-bottom: 20px;
    }
    .change{
      font-size: 14px;
    }
    .ddel{
      font-size: 14px;
      color: red;
    }
}
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 4px;
    background-color: #f3f6fb;
  }

  .avatar {
    width: 84px;
    height: 84px;
    display: block;
  }
  .text {
    margin-left: 130px;
    color: #ccc;
  }
  /deep/ .el-dialog {
    width: 630px;
  }
  .message {
    width: 580px;
    height: 86px;
    background-color: #f3f6fb;
    padding: 20px 20px 0;
    margin-bottom: 30px;
    display: flex;
    flex-wrap: wrap;
    span {
      margin-right: 50px;
    }
  }
  .table {
    margin-right: 10px;
 margin-top: 30px;
 font-size: 16px;
 .firstTr{
  background-color: #f3f6fb;
 }
 table{
  border-collapse: collapse;
  margin: 0 auto;
 }
 tr {
  width: 115px;
  height: 40px;
  td {
  border-collapse: collapse;
  width: 115px;
  height: 40px;
  border: 1px solid #d8dde3;
  text-align: center;
  }
 }
  }
</style>
