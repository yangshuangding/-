<template>
  <div class="device">
    <el-container>
      <el-header>
        <HeadSearch :title="title" :page="text" @input1="search1"></HeadSearch>
      </el-header>
      <el-main class="main">
        <el-table
          :data="tableList"
          style="width: 100%"
          :header-cell-style="{
            background: '#f3f6fb'
          }"
          fit
          highlight-current-row
          class="customer-table"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
          <el-table-column prop="type.name" label="设备型号"> </el-table-column>
          <el-table-column prop="node.name" label="详细地址"> </el-table-column>
          <el-table-column prop="role" label="运营状态">
            <template #default="{ row }">
              {{
                row.vmStatus === 1
                  ? '运营'
                  : row.vmStatus === 0
                  ? '未投放'
                  : '撤机'
              }}
            </template>
          </el-table-column>
          <el-table-column prop="node.name" label="设备状态" width="300px">
            <el-link
              :underline="false"
              style="
                background-color: #ffbc29;
                color: white;
                dispaly: block;
                width: 50px;
                border-radius: 30px;
                margin-right: 10px;
              "
              >离线</el-link
            >
            <el-link
              :underline="false"
              style="
                background-color: #47d597;
                color: white;
                dispaly: block;
                width: 50px;
                border-radius: 30px;
                margin-right: 10px;
              "
              >货道</el-link
            >
            <el-link
              :underline="false"
              style="
                background-color: #47d597;
                color: white;
                dispaly: block;
                width: 70px;
                border-radius: 30px;
              "
              >传动轴</el-link
            >
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <div class="actions">
                <el-link type="info" :underline="false" @click="view(row)"
                  >查看详情</el-link
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20" class="bottom">
          <el-col :span="4"
            ><el-link disabled
              >共{{ totalCount }}页，第{{ params.pageIndex }}/{{
                totalPage
              }}页</el-link
            ></el-col
          >
          <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4">
            <el-button
              v-if="params.pageIndex === 1"
              style="background: #edf0f9; color: #ccc; border: none"
              :disabled="params.pageIndex === 1"
              plain
              >上一页</el-button
            >
            <el-button
              v-else
              style="background: #d5ddf8; color: black; border: none"
              plain
              @click="pageup"
              >上一页</el-button
            >
            <el-button
              v-if="params.pageIndex >= totalPage"
              plain
              style="background: #edf0f9; color: #ccc; border: none"
              :disabled="params.pageIndex === totalPage"
              >下一页</el-button
            >
            <el-button
              v-else
              plain
              style="color: black; border: none; background: #d5ddf8"
              @click="pagedown"
              >下一页</el-button
            ></el-col
          >
        </el-row>
        <!-- 弹出编辑对话框表格 -->
        <el-dialog title="设备详情" :visible.sync="dialogFormVisible">
          <div class="content">
            <p>
              销售量：<span>{{ deviceDetail.orderCount }}个</span>
            </p>
            <p>
              销售额：<span>{{ deviceDetail.orderAmount }}元</span>
            </p>
            <p>
              补货次数：<span>{{ deviceDetail.supplyCount }}次</span>
            </p>
            <p>
              维修次数：<span>{{ deviceDetail.repairCount }}次</span>
            </p>
          </div>
          <br />
          商品销量 (月)
          <div class="detail" v-if="deviceDetail.skuCollect.length">
            <el-row>
              <el-col
                :span="6"
                v-for="item in deviceDetail.skuCollect"
                :key="item.skuName"
                ><p>{{ item.skuName }}: {{ item.count }}</p></el-col
              >
            </el-row>
          </div>
          <p v-else style="text-align: center">当前设备暂未销售商品</p>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import {
  list,
  orderCount,
  orderAmount,
  supplyCount,
  repairCount,
  skuCollect
} from '@/api/hmmm/device.js'
import HeadSearch from '../components/headsearch.vue'
import { getFirstDayOfMonth, getMyTime } from '../utils/formateTime'
export default {
  name: 'device-status',
  components: {
    HeadSearch
  },
  data () {
    return {
      params: {
        pageIndex: 1,
        pageSize: 10,
        innerCode: null
      },
      tableList: [],
      title: '设备编号',
      dialogFormVisible: false,
      totalCount: null,
      totalPage: null,
      text: '设备状态',
      dateParams: {
        start: '',
        end: '',
        innerCode: null
      },
      countParams: {
        start: '',
        end: '',
        innerCode: null
      },
      deviceDetail: {
        orderCount: null,
        orderAmount: null,
        supplyCount: null,
        repairCount: null,
        skuCollect: []
      }
    }
  },
  created () {
    this.initData()
  },
  methods: {
    search1 (val) {
      this.params.innerCode = val
      this.initData()
    },
    async initData () {
      const res = await list(this.params)
      this.tableList = res.data.currentPageRecords
      this.totalPage = res.data.totalPage
      this.totalCount = res.data.totalCount
    },
    async view (row) {
      this.dateParams.innerCode = row.innerCode
      this.countParams.innerCode = row.innerCode
      await this.handledata()
      this.dialogFormVisible = true
    },
    async handledata () {
      // 处理时间
      const start = getFirstDayOfMonth().result
      const end = getMyTime().time
      const simplestart = getFirstDayOfMonth().simple
      const simpleend = getMyTime().simpleTime

      // 赋值时间
      this.dateParams.start = start
      this.dateParams.end = end
      this.countParams.start = simplestart
      this.countParams.end = simpleend

      // 请求销售数量和销售额
      const { data } = await orderCount(this.dateParams)
      this.deviceDetail.orderCount = data
      const res = await orderAmount(this.dateParams)
      this.deviceDetail.orderAmount = res.data

      // 请求维修次数和补货次数
      const res1 = await supplyCount(this.countParams)
      this.deviceDetail.supplyCount = res1.data
      const res2 = await repairCount(this.countParams)
      this.deviceDetail.repairCount = res2.data

      // 请求商品销量
      const res3 = await skuCollect(this.countParams)
      this.deviceDetail.skuCollect = [...res3.data]
    },
    pageup () {
      this.params.pageIndex--
      this.initData()
    },
    pagedown () {
      this.params.pageIndex++
      this.initData()
    }
  }
}
</script>

<style scoped lang="less">
.device {
  width: 100%;
  height: 40%;
  background-color: #f8fafd;
  padding: 20px;
  .el-header {
    margin-bottom: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
}
.main {
  /deep/ .el-dialog__header {
    background: #fff;
    color: black;
    .el-dialog__title,
    .el-icon-close {
      color: black;
    }
  }
  .el-row {
    margin-top: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #fff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    // background-color: #f9fafc;
  }
  // .customer-table th{
  //   // border:none;
  // }
  background-color: #fff;
  .actions {
    display: flex;
    justify-content: flex-start;
    a {
      color: #6480e3;
      margin-right: 10px;
    }
  }
}
.frame {
  margin: 0, auto;
  .el-form-item {
    .el-input {
      width: 280px;
    }
    .el-select {
      width: 280px;
    }
  }
}
/deep/ .el-dialog__wrapper {
  .el-dialog__body {
    .content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 54px;
      padding: 0 20px;
      background-color: #f4f6fb;
      span {
        color: #7a99fe;
      }
    }
    .detail {
      .el-col {
        border: 1px solid #ccc;
        border-radius: 0;
        text-align: center;
      }
    }
  }
}
</style>
