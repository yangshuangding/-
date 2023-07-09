<template class="a">
  <div class="container">
    <div class="nav">
      <div class="people">
        <img src="../imgs/people1.png" alt="" class="people1">
        <img src="../imgs/people2.png" alt="" class="people2">
        <div class="title">运营人员（当天）</div>
        <div class="main">
          <div class="stats">
          <div class="text-shadow">{{message1.total}}</div>
          <div class="text-color">工单总数（个）</div>
        </div>
        <div class="stats">
          <div class="text-shadow">{{message1.completedTotal}}</div>
          <div class="text-color">完成工单（个）</div>
        </div>
        <div class="stats">
          <div class="text-shadow">{{message1.cancelTotal}}</div>
          <div class="text-color">拒绝工单（个）</div>
        </div>
        <div class="stats">
          <div class="text-shadow">{{message1.workerCount}}</div>
          <div class="text-color">运营员个数（个）</div>
        </div>
        </div>
      </div>

      <div class="bpeople">
        <img src="../imgs/people3.png" alt="" class="people3">
        <div class="title">运维人员（当天）</div>
        <div class="main">
          <div class="stats">
          <div class="text-shadow">{{message2.total}}</div>
          <div class="text-color">工单总数（个）</div>
        </div>
        <div class="stats">
          <div class="text-shadow">{{message2.completedTotal}}</div>
          <div class="text-color">完成工单（个）</div>
        </div>
        <div class="stats">
          <div class="text-shadow">{{message2.cancelTotal}}</div>
          <div class="text-color">拒绝工单（个）</div>
        </div>
        <div class="stats">
          <div class="text-shadow">{{message2.workerCount}}</div>
          <div class="text-color">运维员个数（个）</div>
        </div>
        </div>
      </div>
    </div>

    <div class="statistics">

      <div class="echat">
        <div class="header">
          <div class="status">工单状态</div>
          <div class="block">
    <el-date-picker
    size="mini"
      v-model="time"
      type="daterange"
      range-separator="~"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:230px">

    </el-date-picker>

    <div class="chooseWeek">
 <div
  class="data"
  :class="{ isChecked: type === 'week' }"
  @click="chooseOne('week')"
 >
  周
 </div>
 <div
  class="data"
  :class="{ isChecked: type === 'month' }"
  @click="chooseOne('month')"
 >
  月
 </div>
 <div
  class="data"
  :class="{ isChecked: type === 'year' }"
  @click="chooseOne('year')"
 >
 年
 </div>
     </div>
   </div>
  </div>

  <div class="footer" v-if="renderdata" v-show="renderdata.length">
    <div class="table" ref="main" style="width:888px;height:466px" ></div>
  </div>
  <div class="empty" v-show="!renderdata.length">
    <img src="../imgs/empty.87c4f71b.png" alt="">
        <div>暂无数据</div>
  </div>
      </div>

      <div class="pmonth">
        <img src="../imgs/empty.87c4f71b.png" alt="">
        <div class="null">暂无数据</div>

        <div class="choose">
          <div>人效排名（月度）</div>
          <el-select v-model="value" placeholder="全部" size="mini" style="width:80px">

    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.name"
      :value="item.nodeCount">
    </el-option>
  </el-select>
        </div>

        <div style="margin-top: 20px" class="radio-group">
    <el-radio-group v-model="radio4"  size="mini">
      <el-radio-button label="运营人员"></el-radio-button>
      <el-radio-button label="运维人员"></el-radio-button>
    </el-radio-group>
  </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { areaList, getStatistics, getStatus } from '@/api/base/people.js'
import { quickTime } from '@/utils/day.js'

export default {
  data () {
    return {
      options: [],
      value: '',
      radio4: '上海',
      message1: {},
      message2: {},
      time: quickTime('上周'),
      type: 'week',
      renderdata: [],
      date: [],
      finishCount: []
    }
  },
  methods: {
    async getAreaList () {
      const { data } = await areaList({ pageSize: 100 })
      console.log(data)
      this.options = data.currentPageRecords
    },
    async getStatistics () {
      const a = quickTime('今天')
      const res = {
        start: a[0] + ' 00:00:00',
        end: a[1] + ' 23:59:59'
      }
      const { data } = await getStatistics(res)
      this.message1 = data[0]
      this.message2 = data[1]
    },
    chooseOne (val) {
      this.type = val
      if (this.type === 'week') {
        this.time = quickTime('上周')
      }
      if (this.type === 'month') {
        this.time = quickTime('本月')
      }
      if (this.type === 'year') {
        this.time = quickTime('本年度')
      }
      this.getStatus()
      this.date = []
      this.finishCount = []
    },
    async getStatus () {
      const res = {
        start: this.time[0],
        end: this.time[1]
      }
      const { data } = await getStatus(res)
      console.log(data)
      this.renderdata = data
      data.forEach(item => {
        console.log(item)
        this.date.push(item.collectDate)
        this.finishCount.push(item.finishCount)
      })
      console.log(this.date)
    }
  },
  created () {
    this.getAreaList()
    this.getStatistics()
    this.getStatus()
  },
  mounted () {
    this.taohai = echarts.init(this.$refs.main)
  },
  watch: {
    renderdata () {
      this.taohai.setOption({
        gird: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '8%',
          containLabel: true
        },
        title: {
          subtext: '工单量: 个'
        },
        xAxis: {
          type: 'category',
          data: this.date
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: this.finishCount,
            type: 'line'
          }
        ]
      })
    }
  }
}

</script>

<style scoped lang='less'>
.container {
  padding:0 20px 20px;
  .nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .people {
      z-index: 1;
      padding: 20px;
      width: 600px;
      height: 166px;
      background-color: #e9f3ff;
      border-radius: 20px;
      position: relative;
      background-position: 0 0,calc(100% - 12px) 100%;
      .people1{
        z-index: -1;
        border-radius: 20px;
        position: absolute;
        left: 0px;
        top: 0px;
      }
      .people2 {
        z-index: -1;
        position: absolute;
        right: 20px;
        bottom: 0;
      }
      .title {
        z-index: 999;
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
      .main {
        display: flex;
        .stats{
          flex: 1;
          padding: 0 20px;
          padding-top: 25px;
          justify-content: center;
          .text-shadow {
            font-size: 36px;
            font-weight: 600;
            text-shadow: 2px 4px 7px rgba(85,132,255,.5);
            color: #072074;
          }
          .text-color {
            font-size: 12px;
            margin-top: 5px;
            color: #91A7DC;
          }
        }
      }
    }

    .bpeople {
      z-index: 1;
      padding: 20px;
      width: 600px;
      height: 166px;
      background-color: #fbefe8;
      border-radius: 20px;
      position: relative;
      background-position: 0 0,calc(100% - 12px) 100%;
      .people3 {
        z-index: -1;
        position: absolute;
        right: 20px;
        bottom: 0;
      }
      .title {
        z-index: 999;
        font-size: 16px;
        color: #333;
        font-weight: 600;
      }
      .main {
        display: flex;
        .stats{
          flex: 1;
          padding: 0 20px;
          padding-top: 25px;
          justify-content: center;
          .text-shadow {
            font-size: 36px;
            font-weight: 600;
            text-shadow: 2px 4px 7px rgba(255,99,85,.5);
            color: #ff5757;
          }
          .text-color {
            font-size: 12px;
            margin-top: 5px;
            color: #de9690;
          }
        }
      }
    }
  }
  .statistics {
    display: flex;
    .echat {
      display: flex;
      flex-direction: column;
      width: 920px;
      height: 540px;
      background-color: #fff;
      border-radius: 20px;
      margin-right: 20px;
      padding: 20px;
      position: relative;
      .header {
        width: 100%;
        height: 34px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .block {
          display: flex;
          align-items: center;
            .chooseWeek {
              margin-left: 20px;
 display: flex;
 justify-content: center;
 align-items: center;
 width: 129px;
 height: 34px;
 background: rgba(233, 243, 255, 0.37);
 border-radius: 10px;
 .data {
  text-align: center;
  line-height: 25px;
  width: 37px;
  height: 25px;
  font-size: 14px;
  color: #9ca3b4;
  cursor: pointer;
 }
 .isChecked {
  background: #fff;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.11);
  border-radius: 7px;
  font-weight: 600;
  color: #333;
 }
}
        }
      }
      .footer{
        flex: 1;
      }
      .empty {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 40%;
      }
    }
    .pmonth {
      z-index: 1;
      position: relative;
      flex: 1;
      background-color: #fff;
      border-radius: 20px;
      padding: 20px;
      img {
        z-index: -1;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 40%;
      }
      .null {
        z-index: -1;
        position: absolute;
         left: 50%;
        transform: translateX(-50%);
        top: 60%;
        font-size: 14px;
      }
      .choose {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        color: #333;
        display: flex;
      }
      .radio-group{
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
