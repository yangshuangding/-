<template>
  <div class="stars">
    <div class="index">
      <div class="left">
        <div class="header">
          <div class="Statistics_l">
            <WorkOrderStatistics :list='list'></WorkOrderStatistics>
          </div>
          <div class="Statistics_r">
            <SalesStatistics></SalesStatistics>
          </div>
        </div>
        <div class="body">
          <div class="title">
            <div class="text">
              <span class="l">销售数据</span>
              <span class="t">{{list.start}} ~ {{list.end}}</span>
            </div>
            <div class="button">
              <span
                class="btn"
                :class="{ btn_click: activeBtn === '1' }"
                @click="weeks"
                >周</span
              >
              <span
                class="btn"
                :class="{ btn_click: activeBtn === '2' }"
                @click="month"
                >月</span
              >
              <span
                class="btn"
                :class="{ btn_click: activeBtn === '3' }"
                @click="years"
                >年</span
              >
            </div>
          </div>
          <div class="charts">
            <div class="chart_l">
              <SalesData :dataweeks="dataweeks"></SalesData>
            </div>
            <div class="chart_r">
              <SalesVolume :regionCollect="regionCollect"></SalesVolume>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="body">
          <HotList :list='list'></HotList>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <PieChart></PieChart>
        <div class="collect">
          <span class="el-icon-more more"></span>
          <div class="count">16</div>
          <div class="name">点位数</div>
          <div class="count count2">5</div>
          <div class="name">合作商数</div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <span class="c">异常设备监控</span>
          <span class="el-icon-more"></span>
        </div>
        <div class="body">
          <img
            src="https://likede2-admin.itheima.net/img/empty.87c4f71b.png"
            alt=""
          />
          <div class="tips">暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PieChart from '../components/PieChart.vue'
import SalesData from '../components/SalesData.vue'
import SalesVolume from '../components/SalesVolume.vue'
import WorkOrderStatistics from '../components/WorkOrderStatistics.vue'
import SalesStatistics from '../components/SalesStatistics.vue'
import HotList from '../components/HotList.vue'

import { list, regionCollect } from '@/api/base/dashboard.js'
export default {
  components: {
    PieChart,
    SalesData,
    SalesVolume,
    WorkOrderStatistics,
    SalesStatistics,
    HotList
  },
  data () {
    return {
      activeBtn: '1',
      list: {
        collectType: 1,
        start: '',
        end: ''
      },
      dataweeks: {},
      regionCollect: {}
    }
  },
  created () {
    this.weeks()
  },
  methods: {
    async weeks () {
      this.activeBtn = '1'
      const now = Date.now()
      const dayOfWeek = new Date(now).getDay()
      const offset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek // 计算偏移量
      const firstDayOfWeek = new Date(now + offset * 24 * 60 * 60 * 1000) // 计算本周第一天的日期
      const firstDayOfWeekTimestamp = Math.floor(
        firstDayOfWeek.getTime() / 1000
      ) // 将日期转换为时间戳
      // console.log(firstDayOfWeekTimestamp) // 输出本周第一天的时间戳
      this.list.start = this.timezh(firstDayOfWeekTimestamp)
      this.list.end = this.timezh(now / 1000)
      // console.log(this.list.end)
      const res = await list(this.list)
      this.dataweeks = res.data
      // console.log(this.dataweeks)
      const { data } = await regionCollect(this.list)
      this.regionCollect = data
      console.log(this.regionCollect)
    },
    timezh (time) {
      const timestamp = time // 待转换的时间戳
      const date = new Date(timestamp * 1000) // 将时间戳转换为 Date 对象
      const year = date.getFullYear() // 获取年份
      const month = ('0' + (date.getMonth() + 1)).slice(-2) // 获取月份，需要补零
      const day = ('0' + date.getDate()).slice(-2) // 获取日期，需要补零
      const formattedDateString = `${year}-${month}-${day}` // 拼接成格式化的日期字符串
      return formattedDateString
    },
    async month () {
      this.activeBtn = '2'
      const now = Date.now()
      const thisMonth = new Date(now).getMonth()
      const firstDayOfMonth = new Date(new Date(now).setDate(1))
      const firstDayOfMonthTimestamp = Math.floor(
        firstDayOfMonth.getTime() / 1000
      )
      console.log(thisMonth)
      console.log(firstDayOfMonthTimestamp) // 输出当前月份的第一天的时间戳
      this.list.start = this.timezh(firstDayOfMonthTimestamp)
      this.list.end = this.timezh(now / 1000)
      console.log(this.list.end)
      const res = await list(this.list)
      this.dataweeks = res.data
      const { data } = await regionCollect(this.list)
      this.regionCollect = data
    },
    async years () {
      this.activeBtn = '3'
      const now = new Date()
      const year = now.getFullYear() // 获取当前年份
      const firstDayOfYear = new Date(year, 0, 1) // 创建当前年份的第一天的 Date 对象
      const firstDayOfYearTimestamp = firstDayOfYear.getTime() // 获取当前年份的第一天时间戳
      this.list.start = this.timezh(firstDayOfYearTimestamp / 1000)
      this.list.end = this.timezh(now / 1000)
      console.log(this.list.end)
      const res = await list(this.list)
      this.dataweeks = res.data
      const { data } = await regionCollect(this.list)
      this.regionCollect = data
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  display: flex;
  margin-bottom: 20px;
  .left {
    width: 1300px;
    height: 538px;
    // background-color: aqua;
    .header {
      display: flex;
    }
    .body {
      margin-top: 20px;
      padding: 20px;
      height: 352px;
      background-color: #fff;
      border-radius: 30px;
      .title {
        height: 34px;
        display: flex;
        justify-content: space-between;
        .text {
          line-height: 34px;
          .l {
            font-weight: 700;
          }
          .t {
            font-size: 12px;
            color: #666;
            margin-left: 10px;
            line-height: 20px;
          }
        }
        .button {
          width: 129px;
          height: 34px;
          background-color: #f2f8fd;
          display: flex;
          border-radius: 10px;
          padding: 0 10px;
          align-items: center;
          font-size: 14px;
          text-align: center;
          .btn {
            flex: 1;
          }
          .btn_click {
            width: 37px;
            height: 25px;
            border-radius: 8px;
            background-color: #fff;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
            text-align: center;
            line-height: 25px;
          }
          .btn:hover {
            cursor: pointer;
          }
        }
      }
      .charts {
        width: 1240px;
        height: 278px;
        display: flex;
        .chart_r,
        .chart_l {
          width: 620px;
        }
      }
    }
  }
  .right {
    width: 360px;
    height: 538px;
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;
    margin-left: 20px;
    // background-color: blanchedalmond;
  }
}
.footer {
  width: 1700px;
  height: 353px;
  display: flex;
  // background-color: aqua;
  .left {
    width: 990px;
    padding: 20px;
    display: flex;
    background-color: #fff;
    border-radius: 30px;
    .collect {
      width: 154px;
      height: 230px;
      padding-top: 47px;
      padding-left: 38px;
      transform: translateY(50px);
      position: relative;
      margin-left: 20px;
      background: linear-gradient(135deg, transparent, #f8f8f9 0) 0 0,
        linear-gradient(-135deg, transparent 12px, #f8f8f9 0) 100% 0,
        linear-gradient(-45deg, transparent, #f8f8f9 0) 100% 100%,
        linear-gradient(45deg, transparent 12px, #f8f8f9 0) 0 100%;
      background-size: 50% 50%;
      background-repeat: no-repeat;
      .more {
        position: absolute;
        top: -50px;
        right: -90px;
      }
      .count {
        height: 33px;
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #072074;
        line-height: 33px;
      }
      .name {
        height: 17px;
        margin-top: 6px;
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #000412;
        line-height: 17px;
      }
      .count2 {
        margin-top: 20px;
      }
    }
  }
  .right {
    width: 670px;
    height: 353px;
    padding: 20px;
    margin-left: 20px;
    background-color: #fff;
    border-radius: 30px;
    .title {
      display: flex;
      justify-content: space-between;
      .c {
        font-weight: 700;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 300px;
      img {
        width: 123px;
        height: 96px;
      }
    }
  }
}
.stars {
  padding: 20px;
}
</style>
