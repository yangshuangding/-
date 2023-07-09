<template>
  <div class="sales" ref="sales"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  props: ['dataweeks'],
  data () {
    return {}
  },
  mounted () {
    this.sales = echarts.init(this.$refs.sales)
  },
  watch: {
    dataweeks (value) {
      const option = {
        title: {
          text: '销售额趋势图',
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: value.xAxis
        },
        yAxis: {
          name: '单位：元',
          type: 'value'
        },
        grid: {
          containLabel: true,
          left: '0%',
          right: '0%'
        },
        color: ['#ff5757'],
        series: [
          {
            data: value.series,
            type: 'line',
            smooth: true
          }
        ]
      }
      this.sales.setOption(option)
    }
  }
}
</script>

<style>
.sales {
  width: 620px;
  height: 278px;
}
</style>
