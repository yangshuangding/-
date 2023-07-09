<template>
  <div class="statistics">
    <div class="stbox">
      <div class="header">
        <span class="t">工单统计</span>
        <span class="s"> {{ week }} ~ {{ nowTime }}</span>
      </div>
      <div class="body">
        <div class="state">
          <div class="num">{{ serviceList.total }}</div>
          <div class="text">工单总数(个)</div>
        </div>
        <div class="state">
          <div class="num">{{ serviceList.completedTotal }}</div>
          <div class="text">完成工单(个)</div>
        </div>
        <div class="state">
          <div class="num">{{ serviceList.workerCount || serviceList.progressTotal}}</div>
          <div class="text">进行工单(个)</div>
        </div>
        <div class="state">
          <div class="num">{{ serviceList.cancelTotal }}</div>
          <div class="text">取消工单(个)</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { service } from '@/api/base/dashboard.js'
import { getFirstDayOfWeek, getCurrentTime } from './index'

export default {
  data () {
    return {
      week: '',
      nowTime: '',
      serviceList: {}
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.week = getFirstDayOfWeek()
      this.nowTime = getCurrentTime()
      const res = await service({ start: this.week + ' 00:00:00', end: this.nowTime + ' 23:59:59' })
      console.log(res.data.at(0))
      this.serviceList = res.data.at(0)
    }
  }
}
</script>

<style lang="less" scoped>
.statistics {
  width: 700px;
  height: 166px;
  padding-left: 10px;
  padding-right: 10px;
}
.stbox {
  background: #e9f3ff;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMcA…jFo4e5XU3F6Uv4PzsqEn/B1VshFHJ0SGMAAAAAElFTkSuQmCC),
    url(https://likede2-admin.itheima.net/img/task.66b715b7.png);
  background-position: 0 0, calc(100% - 12px) 100%;
  background-repeat: no-repeat, no-repeat;
  padding: 20px;
  border-radius: 20px;
}
.header {
  height: 20px;
  display: flex;
  .t {
    font-weight: 700;
  }
  .s {
    font-size: 12px;
    color: #666;
    margin-left: 10px;
    line-height: 20px;
  }
}
.body {
  height: 107px;
  display: flex;
  .state {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .num {
      height: 50px;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 50px;
      text-shadow: 2px 4px 7px rgba(85, 132, 255, 0.5);
    }
    .text {
      height: 17px;
      margin-top: 3px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #91a7dc;
      line-height: 17px;
    }
  }
}
</style>
