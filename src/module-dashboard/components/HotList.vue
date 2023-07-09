<template>
  <div class="hot">
    <div class="header">
      <span class="t">商品热榜</span>
      <span class="s">{{ week }} ~ {{ nowTime }}</span>
    </div>
    <div class="body">
      <el-row
        :gutter="20"
        v-for="(item, index) in list"
        :key="index"
        ref="hotList"
        class="hotRow"
      >
        <template>
          <el-col :span="4"
            ><div class="grid-content bg-purple">
              <span class="num">{{ index + 1 }}</span>
              <span v-if="index === 0">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jiangbei1"></use>
                </svg>
              </span>
              <span v-else-if="index === 1">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jiangbei2"></use></svg
              ></span>
              <span v-else-if="index === 2">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jiangbei3"></use></svg
              ></span>
              <span v-else>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-biaoqian"></use></svg
              ></span></div
          ></el-col>
          <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
        </template>
        <el-col :span="12"
          ><div class="grid-content bg-purple bg_left">
            {{ item.skuName }}
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple bg_color">
            {{ item.count }}单
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script src="./iconfont.js"></script>
<script>
import { skuTop } from '@/api/base/dashboard.js'
import { getFirstDayOfWeek, getCurrentTime } from './index'
export default {
  data() {
    return {
      list: [],
      week: '',
      nowTime: ''
    }
  },
  created() {
    this.hotList()
  },
  methods: {
    async hotList() {
      this.week = getFirstDayOfWeek()
      this.nowTime = getCurrentTime()
      const res = await skuTop({ start: this.week, end: this.nowTime })
      this.list = res.data
      console.log(this.list)
    }
  }
}
</script>

<style lang="less" scoped>
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
.el-row {
  height: 24px;
  // margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.bg-purple {
  // background: #d3dce6;
  position: relative;
  text-align: center;
  font-size: 14px;

  .num {
    position: absolute;
    right: 19px;
    top: -2px;
    z-index: 10;
    font-size: 12px;
  }
}
.bg_color {
  color: #666;
}
.bg_left {
  text-align: left;
}
.grid-content {
  border-radius: 4px;
  min-height: 24px;
  line-height: 24px;
}
.row-bg {
  padding: 10px 0;
}
.hot {
  width: 360px;
  height: 460px;
}
.body {
  margin-top: 20px;
  height: 470px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  transform: scale(1.9);
  fill: currentColor;
  overflow: hidden;
}
</style>
