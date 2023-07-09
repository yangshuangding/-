<template>
  <div ref="chart" class="box"></div>
</template>

<script>
import * as echarts from 'echarts'

import { nodeCollect } from '@/api/base/dashboard.js'
export default {
  data () {
    return {
      data: [],
      chart: ''
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.chart)
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      const { data } = await nodeCollect()
      console.log(data)
      this.data = data
    }
  },
  watch: {
    data (value) {
      const datas = value
      var option = {
        title: {
          text: '合作商点位数Top5'
        },
        color: ['#85a7ff', '#99ebbd', '#ffb18b', '#c6ebff', '#becce6'],
        tooltip: {
          trigger: 'item',
          formatter: function (e) {
            const value = (e.value * 10).toFixed(1)
            return e.name + value + '%'
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['20%', '50%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {
              formatter: function (e) {
                const value = (e.value * 10).toFixed(1)
                return e.name + value + '%'
              }
            },
            labelLine: {
              length: 1,
              length2: 20
            },
            data: datas
          }
        ]
      }

      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.box {
  width: 668px;
  height: 318px;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.5); */
}
</style>
