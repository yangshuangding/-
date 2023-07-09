<template>
  <div class="volume" ref="sales"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: ['regionCollect'],
  mounted () {
    this.sales = echarts.init(this.$refs.sales)
  },
  watch: {
    regionCollect (value) {
      const option = {
        title: {
          text: '销售额分布',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: [
            '',
            '',
            value.xAxis[0],
            '',
            value.xAxis[1],
            value.xAxis?.[2] ? value.xAxis[2] : '',
            '',
            ''
          ]
        },
        yAxis: {
          name: '单位：元',
          type: 'value'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        color: '#91b0ff',
        series: [
          {
            data: [
              0,
              0,
              value.series[0],
              0,
              value.series[1],
              value.series[2] ? value.series[2] : 0,
              0,
              0
            ],
            type: 'bar'
          }
        ]
      }
      this.sales.setOption(option)
    }
  }
}
</script>

<style>
.volume {
  width: 620px;
  height: 278px;
}
</style>
