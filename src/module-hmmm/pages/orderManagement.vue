<template>
  <div class="box">
  <div class="header">
   <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="订单编号：">
    <el-input v-model="formInline.orderNo" placeholder="请输入订单编号"></el-input>
  </el-form-item>
  <el-form-item label="选择日期：">
  <el-date-picker
   value-format="yyyy-MM-dd"
   unlink-panels
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="inquire">查询</el-button>
  </el-form-item>
</el-form>
    </div>
    <div class="body">
       <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="" type=index label="序号" >
      </el-table-column>
      <el-table-column prop="orderNo" label="订单编号" >
      </el-table-column>
      <el-table-column prop="skuName" label="商品名称">
      </el-table-column>
        <el-table-column prop="amount" label="订单金额（元）">
      </el-table-column>
        <el-table-column prop="innerCode" label="设备编号">
      </el-table-column>
        <el-table-column prop="status" label="订单状态">
          <template #default="{row}">
            <span>  {{
              row.status === 0 ?
              "创建" :
              row.status === 1 ? "支付完成":
              row.status===2? "出货完成" : "出货失败"
              }} </span>
          </template>
      </el-table-column>
        <el-table-column prop="createTime" :formatter="formatDate" label="订单日期">
      </el-table-column>
        <el-table-column prop="address" label="操作">
           <template #default='{row}'>
         <div class="box">
          <el-button type="text" @click="edit(row)">查看详情</el-button>
        </div>
       </template>
      </el-table-column>
    </el-table>
    <!-- 详情 -->
    <el-dialog
  class="dialog"
  title="工单详情"
  :visible.sync="dialogVisible2"
  width="630px"
 >
  <div class="topHeader">
      <img class="log" src="@/icons/svg/下载.png1.png" alt="">
      <p>  {{
              this.newList.status === 0 ?
              "创建" :
              this.newList.status === 1 ? "支付完成":
              this.newList.status===2? "出货完成" : "出货失败"
              }}
        </p>
      <img class="pic" src="@/icons/svg/pic_2.3b5af41c.png" alt="">
  </div>

 <template>
   <div class="box2">
    <el-row :gutter="24">
  <el-col :span="12"><div class="grid-content bg-purple">
    <span>订单编号：</span> <span>{{this.newList.orderNo}}</span>
    </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">
    <span>商品名称：</span> <span>{{this.newList.skuName}}</span>
    </div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple">
    <span>订单金额：</span> <span>{{this.newList.amount}}</span>
    </div></el-col>
<el-col :span="12"><div class="grid-content bg-purple">
    <span>设备编号；</span> <span>{{this.newList.innerCode}}</span>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
    <span>创建时间：</span><span>{{this.newList.createTime
}}</span>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
    <span>完成时间：</span> <span>{{this.newList.updateTime}}</span>
    </div></el-col>
    <el-col :span="12"><div class="grid-content bg-purple">
    <span>支付方式：</span> <span>{{this.newList.skuName===1? "支付宝" :"微信"}}</span>
    </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">
    <span>设备地址</span> <span>{{this.newList.addr}}</span>
    </div></el-col>
</el-row>

  </div>
 </template>
</el-dialog>
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
  </div>
</template>

<script>
import { WorkorderList } from '@/api/orderManagement.js'
export default {

  data () {
    return {
      dialogVisible2: false,
      tableData: [],
      value1: null,
      formInline: {
        orderNo: null,
        startDate: null,
        endDate: null
      },
      obj: {
        pageIndex: 1,
        pageSize: 10
      },
      newList: {},
      padData: {
        pageIndex: 1,
        totalCount: '', // 请求回来数据里面的总数
        totalPage: '' // 请求回来数据里面的页数
      }

    }
  },

  created () {
    this.getDataList()
  },

  methods: {
    async getDataList () {
      const { data } = await WorkorderList({ ...this.obj, ...this.formInline })
      console.log(data)
      this.padData.totalCount = data.totalCount
      this.padData.totalPage = data.totalPage
      this.padData.pageIndex = data.pageIndex
      this.tableData = data.currentPageRecords
    },
    // 添加按钮
    addList () {
      this.$refs.dialog.fn()
    },
    // 详情
    edit (row) {
      this.dialogVisible2 = true
      this.newList = row
      console.log(this.newList)
    },
    // 关闭
    open () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'info',
          message: '实验数据无法删除!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 分页
    previous () {
      this.obj.pageIndex = this.obj.pageIndex - 1
      this.getDataList()
    },
    // 下一页
    nextPage () {
      this.obj.pageIndex = this.obj.pageIndex + 1
      this.getDataList()
    },
    // 查询
    inquire () {
      this.formInline.startDate = this.value1[0]
      this.formInline.endDate = this.value1[1]
      this.getDataList()
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
      }
      .dialog{
        padding: 20px 20px 30px;
        .el-form-item{
          span{
          margin-right: 30px;
        }
        }

    }
    .topHeader{
      position: relative;
      display: flex;
      margin: 20px;
      height: 54px;
      margin-bottom: 25px;
      background-color: #f8f8f8;
        .log{
          width: 26px;
          height: 26px;
          margin:14px 20px 0;;
        }
        p{
          height: 17px;
          width: 362px;
          line-height: 27px;
          font-size: 14px;
        }
        .pic{
          position: absolute;
          bottom: 0;
          right: 60px;
          width: 88px;
          height: 68px;
        }

      }
      .box2{
         .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
    margin-bottom: 10px
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
      text-align: center;
      line-height: 36px;
  }
     .row-bg {
        padding: 10px 0;
    }
    .foot{
      text-align: center;
      .Cancel{
        width: 80px;
        height: 36px;
        color: #655B56;
        background-color: #f3e7e1;
      }
    }
  }
}
 .el-footer {
  height: 100px;
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
