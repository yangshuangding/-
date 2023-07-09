<template>
    <div class="head">
      <div class="left">
        <span class="title">{{title}}:</span>
        <el-input v-model="input" placeholder="请输入" class="input"></el-input>
        <el-button type="primary" icon="el-icon-search" class="search" @click="search"
          >查询</el-button
        >
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    page: {
      type: String
    }
  },
  data () {
    return {
      input: ''
    }
  },
  methods: {
    search () {
      if (this.page === '设备类型管理') {
        this.$emit('input', this.input)
      } else if (this.page === '设备状态') {
        this.$emit('input1', this.input)
      } else if (this.page === '设备管理') {
        this.$emit('input2', this.input)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  display: flex;
  height: 40px;
  width: 100%;
  line-height: 40px;
  justify-content: space-between;
  font-size: 12px;
  /deep/ .el-button {
    height: 36px;
    padding: 9px, 15px;
    margin-left: 10px;
    font-size: 14px;
  }
  .left {
    // flex: 1;
    display: flex;
    font-size: 16px;
    font-weight: bold;
    color: #606266;
    padding-right: 12px;
    line-height: 36px;
    /deep/ .input {
      width: 200px;
    }
   /deep/ .title {
      width: 80px;
      font-weight: normal;
    }
  }
}
</style>
