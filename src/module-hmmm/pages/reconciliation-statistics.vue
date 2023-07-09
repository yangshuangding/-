<template>
<div class="bgc" >
  <div class="pic">
    <div class="left">
      <div class="image1">
        <img src="@/module-hmmm/assets/left-1.png" alt="">
      </div>
      <div class="image2">
        <img src="@/module-hmmm/assets/left-2.png" alt="">
      </div>
      <h4>日销售统计</h4>
     <div class="text">
       <div class="item">
        <p>{{dateData.count}}</p>
        <span>当日销售量（个）</span>
      </div>
      <div class="item">
        <p>{{dateData.amount}}</p>
      <span>当日销售额（元）</span>
      </div>
      <div class="item">
        <p>{{dateData.total}}</p>
      <span>当日分成（元）</span>
      </div>
     </div>
    </div>
    <div class="right">
      <div class="image1">
        <!-- <img src="@/module-hmmm/assets/left-1.png" alt=""> -->
      </div>
      <div class="image2">
        <img src="@/module-hmmm/assets/right-2.png" alt="">
      </div>
      <h4>月销售统计</h4>
     <div class="text">
       <div class="item">
        <p>{{monthData.count}}</p>
        <span>当月销售量（个）</span>
      </div>
      <div class="item">
        <p>{{monthData.amount}}</p>
      <span>当月销售额（元）</span>
      </div>
      <div class="item">
        <p>{{monthData.total}}</p>
      <span>当月分成（元）</span>
      </div>
     </div>
    </div>
  </div>
 <div class="body">
   <div class="search">
    <span style=" font-size: 14px; ">合作商：</span> <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in nodeList"
      :key="item.name"
      :label="item.name"
      :value="item.name">
    </el-option>
  </el-select>
  <span style="margin: 10px;  font-size: 14px; ">日期：</span>
  <el-date-picker
   unlink-panels
   value-format="yyyy-MM-dd"
      v-model="value1"
      type="daterange"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
    <el-button type="primary" style="  margin-left: 10px;" @click="search" icon="el-icon-search" >查询</el-button>
  </div>
  <div class="count">
    <p>笔数统计:<span>{{sum.count}}</span>个</p>
    <p>收入统计:<span>{{sum.amount}}</span>元</p>
    <p>分成统计:<span>{{sum.total}}</span>元</p>
  </div>
 </div>
  <div class="table">
<el-table
     v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="订单日期"
        >
      </el-table-column>
      <el-table-column
        prop="ownerName"
        label="合作商"
       >
      </el-table-column>
      <el-table-column
        prop="ratio"
        label="分成比例">
      </el-table-column>
      <el-table-column
        prop="orderTotalMoney"
        label="收入(元)">
      </el-table-column>
      <el-table-column
        prop="orderCount"
        label="笔数">
      </el-table-column>
      <el-table-column
        prop="totalBill"
        label="分成金额(元)">
      </el-table-column>
    </el-table>
      <el-footer v-show="tableData.length">
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
      <el-button type="primary" @click="nextPage"  :disabled="+padData.totalPage === +padData.pageIndex">下一页</el-button>
    </div>
  </el-footer>
  </div>
</div>
</template>

<script>
// total, amount, count, collect,
import { list, nodeCollect, total, amount, count } from '@/api/base/reconciliation-statistics.js'
import { parseTime } from '@/utils'
export default {
  data () {
    return {
      loading: false,
      value: null,
      value1: ['2023-01-01', '2024-01-01'],
      nodeList: [],
      tableData: [],
      pagination: {
        pageIndex: 1,
        pageSize: '10'
      },
      padData: {
        pageIndex: '',
        totalCount: '', // 请求回来数据里面的总数
        totalPage: '' // 请求回来数据里面的页数
      },
      dateData: {
        total: 0,
        amount: 0,
        count: 0
      },
      monthData: {
        total: 0,
        amount: 0,
        count: 0
      },
      sum: {
        total: 0,
        amount: 0,
        count: 0
      },
      partnerId: null
    }
  },
  async created () {
    this.loading = true
    const res = await nodeCollect()
    this.nodeList = res.data
    this.list()
    // const data1 = await list()
    // console.log(data1)
    // const data2 = await total()
    // console.log(data2)
    // const data3 = await amount()
    // console.log(data3)
    // const data4 = await count()
    // console.log(data4)
    // const data5 = await collect()
    // console.log(data5)
  },
  methods: {
    async list () {
      this.loading = true
      let data = null
      if (this.value1 && this.value1?.length !== 0) {
        // const res = await collect({ collectType: '1', start: this.value1[0], end: this.value1[1] })
        // console.log(res)

        this.nodeList.forEach(item => {
          if (item.name === this.value) {
            this.partnerId = item.value
          }
        })
        const res1 = await total({ partnerId: this.partnerId, start: this.value1[0] + ' ' + '12:00:00', end: this.value1[1] + ' ' + '12:00:00' })
        const time = new Date(this.value1[1]) - new Date(this.value1[0])
        const days = time / (1000 * 3600 * 24)
        const months = days / 30
        this.sum.total = res1.data
        this.dateData.total = (res1.data / days).toFixed()
        this.monthData.total = (res1.data / months).toFixed()

        const res2 = await amount({ partnerId: this.partnerId, start: this.value1[0] + ' ' + '12:00:00', end: this.value1[1] + ' ' + '12:00:00' })
        this.dateData.amount = (res2.data / days).toFixed()
        this.monthData.amount = (res2.data / months).toFixed()
        this.sum.amount = res2.data

        const res3 = await count({ partnerId: this.partnerId, start: this.value1[0] + ' ' + '12:00:00', end: this.value1[1] + ' ' + '12:00:00' })
        this.dateData.count = (res3.data / days).toFixed()
        this.monthData.count = (res3.data / months).toFixed()
        this.sum.count = res3.data

        data = await list({ ...this.pagination, partnerName: this.value, start: this.value1[0], end: this.value1[1] })
      } else {
        data = await list({ ...this.pagination, partnerName: this.value })
      }

      // const { data } = await list({ ...this.pagination, ...obj })
      this.padData.totalCount = data.data.totalCount
      this.padData.totalPage = data.data.totalPage
      this.padData.pageIndex = data.data.pageIndex
      this.tableData = data.data.currentPageRecords
      this.tableData.forEach(item => {
        item.createTime = parseTime(item.createTime)
        item.ratio = item.ratio + '%'
        item.orderTotalMoney = '+' + item.orderTotalMoney / 100
        item.totalBill = '+' + item.totalBill / 100
      })
      this.loading = false
    },
    search () {
      this.pagination.pageIndex = 1
      this.list()
    },
    // 上一页
    previous () {
      this.pagination.pageIndex = this.pagination.pageIndex - 1
      this.list()
    },
    // 下一页
    nextPage () {
      this.pagination.pageIndex = this.pagination.pageIndex + 1
      this.list()
    }
  }
}
</script>

<style scoped lang="less">

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
.el-range-separator{
  width: 30px !important;
}
.bgc{
  padding: 20px;
  padding-top: 0;
   background-color: #f8fafd;
  .body {
    padding: 20px;
    background-color: #ffffff;
    .count{
      display: flex;
      p{
        margin-right: 50px;
        font-size: 14px;
        color: #333;
        span {
          margin-left: 20px;
          margin-right: 10px;
          font-size: 20px;
          color: #ff5757;
        }
      }
    }
  }
}
.pic {
  margin-bottom: 20px;
  display: flex;
  .left{
    margin-right: 20px;
    position: relative;
    flex: 1;
    z-index: 1;
    width: 569px;
    height: 166px;
    border-radius: 20px;
    padding: 20px;
    background-color: #e9f3ff;
    .image1{
      z-index: -1;
      position: absolute;
      top: 0px;
      left: 0px;
      img {
         border-radius: 20px 0 0 0 ;
      }
    }
    .image2 {
      z-index: -1;
      position: absolute;
      top: 60px;
      right: 20px;
    }
    h4 {
      margin: 0;
      font-size: 16px;
      color: #000;
      font-weight: 400;
    }
    .text {
       display: flex;
       justify-content: space-around;
       p {
        font-size: 36px;
        color: #072074;
        font-weight: 700;
        margin: 0;
        margin-top: 30px;
       }
       span {
        font-size: 12px;
        color: #91a7dc;
       }
    }
  }
  .right {
     position: relative;
      flex: 1;
     z-index: 1;
    width: 569px;
    height: 166px;
    border-radius: 20px;
    padding: 20px;
    background-color: #fbefe8;
    .image1{
      z-index: -1;
      position: absolute;
      top: 20px;
      left: 20px;
      img {
         border-radius: 20px 0 0 0 ;
      }
    }
    .image2 {
     z-index: -1;
      position: absolute;
       top: 40px;
      right: 20px;
    }
    h4 {
      margin: 0;
      font-size: 16px;
      color: #000;
      font-weight: 400;
    }
    .text {
       display: flex;
       justify-content: space-around;
       p {
        font-size: 36px;
        color: #ff5757;
        font-weight: 700;
        margin: 0;
        margin-top: 30px;
       }
       span {
        font-size: 12px;
        color: #e9a190;
       }
    }
  }
}

/deep/.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 0;
}
/deep/.el-table th.el-table__cell {
  background-color: #f3f6fb;
}
/deep/.el-table {
  padding: 20px;
}
</style>
