<template>
  <div class="box">
  <div class="header">
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="策略搜索">
    <el-input v-model="formInline.policyName" placeholder="请输入"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="inquire" icon="el-icon-search">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <div class="body">
      <div class="top">
         <el-button class="btns" type="primary" @click="addList"  icon="el-icon-circle-plus-outline">新建</el-button>
      </div>
       <el-table class="tie" :data="tableData" style="width: 100%">
      <el-table-column prop="" type=index label="序号" >
      </el-table-column>
      <el-table-column prop="policyName" label="策略名称" >
      </el-table-column>
      <el-table-column prop="discount" label="策略方案">
      </el-table-column>
        <el-table-column prop="createTime" :formatter="formatDate" label="创建日期">
      </el-table-column>
        <el-table-column prop="address" label="操作" width="270px">
            <template #default='{row}'>
         <div class="box">
          <el-button type="text" @click="details(row)" >查看详情</el-button>
          <el-button type="text" @click="addList(row)">修改</el-button>
          <el-button type="text"  plain style="color:red" @click="open(row.policyId)">删除</el-button>

        </div>
       </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
   <div class="el-footer">
 <span
      >共{{ padData.totalCount }}条记录 第 {{ obj.pageIndex }}/{{
        padData.totalPage
      }}
      页</span
    >
    <div class="btn">
      <el-button
        type="primary"
        @click="previous"
        :disabled="obj.pageIndex === 1"
        >上一页</el-button
      >
      <el-button
      type="primary"
      @click="nextPage"
      :disabled ="padData.totalPage === padData.pageIndex"
      >下一页</el-button>
    </div>
</div>
    </div>
  <!-- 策略新建 -->
 <el-form ref="form" :model="form" :rules="rules">
    <el-dialog
  class="dialog"
  title="新增策略"
  :visible.sync="dialogVisible"
  width="630px"
 >
     <el-form-item label="设备编号:" prop="policyName" :label-width="formLabelWidth">
      <el-input
          type="text"
          placeholder="请输入"
         v-model="form.policyName"
          maxlength="15"
          show-word-limit
> </el-input>
    </el-form-item>
   <el-form-item  label="策略方案:" :label-width="formLabelWidth">
   <el-input-number v-model="form.discount"  placeholder="请输入" prop='discount' :min="1" style="width:470px" controls-position="right"></el-input-number>
   </el-form-item>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="subit">确 定</el-button>
  </span>
</el-dialog>
 </el-form>

<!-- 详情弹窗 -->
<Dialog ref="dialog" :dataObj="dataObj" :policyName="policyName"></Dialog>

  </div>
</template>

<script>
import Dialog from '../components/policyManagementDialog.vue'
import { getList, getAddList, deleteList, editList, detailsList } from '@/api/policyManagement.js'

export default {
  components: {
    Dialog

  },
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      // pagination: {
      //   pageIndex: 1,
      //   pageSize: '10'
      // },
      obj: {
        pageIndex: 1,
        pageSize: 10
      },
      formInline: {
        policyName: ''
      },
      policyName: '',
      form: {
        policyName: '',
        discount: ''
      },
      padData: {
        pageIndex: 1,
        totalCount: '', // 请求回来数据里面的总数
        totalPage: '' // 请求回来数据里面的页数
      },
      rules: {
        policyName: [{ required: true, message: '请输入', trigger: 'blur' }],
        discount: [{ required: true, message: '请输入', trigger: 'blur' }]
      },
      formLabelWidth: '120px',
      dataObj: {}
    }
  },
  created () {
    this.getLists()
  },
  methods: {
    async getLists () {
      const { data } = await getList({ ...this.obj, ...this.formInline })
      console.log(data)
      this.padData.totalCount = data.totalCount
      this.padData.totalPage = data.totalPage
      this.padData.pageIndex = data.pageIndex
      this.tableData = data.currentPageRecords
    },
    // 打开弹窗
    addList (row) {
      this.dialogVisible = true
      if (row.policyId) {
        console.log(row)
        this.form = row
      }
    },
    // 删除按钮
    async open (id) {
      try {
        await deleteList({ id })
        this.$message.success('删除成功')
        this.getLists()
      } catch (error) {
        console.log(error)
      }
    },
    // 新增
    async subit () {
      if (this.form.policyId) {
        try {
          await editList(this.form)
          this.$message.success('修改成功')
          this.dialogVisible = false
          this.getLists()
          this.$refs.form.resetFields()
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          this.$refs.form.validate()
          await getAddList(this.form)
          this.$message.success('新增成功')
          this.dialogVisible = false
          this.getLists()
        } catch (error) {
          console.log(error)
        }
      }
      this.dialogVisible = false
      this.getLists()
    },
    // 查看详情
    async details (row) {
      this.policyName = row.policyName
      const { data } = await detailsList(row.policyId)
      console.log(data)
      this.dataObj = data
      this.$refs.dialog.fn()
    },
    previous () {
      this.obj.pageIndex = this.obj.pageIndex - 1
      this.getLists()
    },
    // 下一页
    nextPage () {
      this.obj.pageIndex = this.obj.pageIndex + 1
      this.getLists()
    },
    // 查询
    inquire () {
      this.getLists()
    },
    // 时间处理
    formatDate (row, column) {
      // 获取单元格数据
      const datac = row[column.property]
      const dtc = new Date(datac)
      // 获取月,默认月份从0开始
      let dtuMonth = dtc.getMonth() + 1
      // 获取日
      let dtuDay = dtc.getDate()
      // 处理1-9月前面加0
      if (dtuMonth < 10) {
        dtuMonth = '0' + (dtc.getMonth() + 1)
      }
      // 处理1-9天前面加0
      if (dtuDay < 10) {
        dtuDay = '0' + dtc.getDate()
      }
      // 获取小时
      let dtuHours = dtc.getHours()
      // 处理1-9时前面加0
      if (dtuHours < 10) {
        dtuHours = '0' + dtc.getHours()
      }
      // 获取分钟
      let dtuMinutes = dtc.getMinutes()
      // 处理1-9分前面加0
      if (dtuMinutes < 10) {
        dtuMinutes = '0' + dtc.getMinutes()
      }
      // 获取秒
      let dtuSeconds = dtc.getSeconds()
      // 处理1-9秒前面加0
      if (dtuSeconds < 10) {
        dtuSeconds = '0' + dtc.getSeconds()
      }
      // 组装年月日时分秒,按自己的要求来
      return (
        dtc.getFullYear() +
    '-' +
    dtuMonth +
    '-' +
    dtuDay +
    ' ' +
    dtuHours +
    ':' +
    dtuMinutes +
    ':' +
    dtuSeconds
      )
      // return (row.TableIsbibei = dd)
      // + " " + dtuHours + ":" + dtuMinutes + ":" + dtuSeconds
    }
  }
}
</script>

<style scoped lang='less'>

  .box{
    padding: 20px;
    .header{
      padding-left: 17px;
      padding-top: 12px;
      display: flex;
      height: 64px;
      background-color: #fff;
      margin-bottom: 20px;
    }
    .body{
      min-height: 500px;
      background-color: #fff;
      padding: 20px;
       .top{
        height: 36px;
        margin-bottom: 20px;
      }
      .tie{
        margin-bottom: 20px;
      }
      .btns{
      background:linear-gradient(135deg,#ff9743,#ff5e20)!important;
      border: none;
      }
      .box{
        .el-button{
          width:60px;
        }
      }
    }
  }
  .el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  // line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 16px;
    color: #c6c6c6;
  }
}
</style>
