<template>
 <div>
<el-dialog
  title="策略详情"
  :visible.sync="dialogVisible"
  width="630px"
  >
 <div class="tacticsTop">
<span>策略名称：</span><span>{{policyName}}</span>
 </div>
    <el-table
      :data="dataObj.currentPageRecords"
      style="width: 100%">
      <el-table-column
        prop=""
        type=index
        label="序号"
       >
      </el-table-column>
      <el-table-column
        prop="nodeName"
        label="点位名称"
        >
      </el-table-column>
      <el-table-column
        prop="innerCode"
        label="设备编号">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="el-footer">
 <span
      >共{{ padData.totalCount }}条记录 第 {{ pagination.pageIndex }}/{{
        padData.totalPage
      }}
      页</span
    >
    <div class="btn">
      <el-button
        type="primary"
        @click="previous"
        :disabled="pagination.pageIndex === 1"
        >上一页</el-button
      >
      <el-button type="primary"
       @click="nextPage"
       :disabled ="padData.totalPage === padData.pageIndex">下一页</el-button>
    </div>
</div>
</el-dialog>
 </div>
</template>

<script>
// import { detailsList } from '@/api/policyManagement.js'
export default {
  props: {
    dataObj: {
      type: Object
    },
    policyName: {
      type: String
    }
  },
  data () {
    return {
      dialogVisible: false,
      pagination: {
        pageIndex: 1,
        pageSize: 10
      },
      padData: {
        pageIndex: 1,
        totalCount: '', // 请求回来数据里面的总数
        totalPage: '' // 请求回来数据里面的页数
      },
      tableData: []

    }
  },
  methods: {
    async fn () {
      this.dialogVisible = true
      // this.tableData = this.dataObj.currentPageRecords
    },
    previous () {
      this.pagination.pageIndex = this.pagination.pageIndex - 1
      this.fn()
    },
    // 下一页
    nextPage () {
      this.pagination.pageIndex = this.pagination.pageIndex + 1
      this.fn()
    }
  }
}
</script>

<style scoped lang='less'>
    .dialog-footer{
        text-align: center;
        .el-button{
            margin:0px 20px;
        }
        .btn2{
            background:linear-gradient(135deg,#ff9743,#ff5e20)!important;
            border: none;
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
