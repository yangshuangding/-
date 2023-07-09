<template>
  <el-footer>
    <span
      >共{{ totalCount }}条记录 第 {{currentPage }}/{{totalPage}}
      页</span
    >
    <div class="btn">
      <el-button
        type="primary"
        @click="previous"
        :disabled="currentPage === 1"
        >上一页</el-button
      >
      <el-button type="primary" @click="nextPage" :disabled="currentPage >= totalPage">下一页</el-button>
    </div>
  </el-footer>
</template>

<script>
export default {
  props: ['currentPage', 'totalCount', 'pageSize', 'totalPage'],
  data () {
    return {
    }
  },
  methods: {
    previous () {
      this.$parent.previous()
    },
    nextPage () {
      this.$parent.nextPage()
    }
  },
  created () {

  }
}
</script>

<style lang="less" scoped>
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
</style>
