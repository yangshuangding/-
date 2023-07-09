<template>
  <el-dialog
    title="策略管理"
    :visible="viewpolicydialogForm"
    @close="close"
    width="40%"
  >
    <el-form
      class="frame"
      :inline="true"
      label-width="100px"
    >
      <el-form-item
        label="机器编号： "
        style="width: 200px; margin-right: 40px"
      >
        {{detailpolicy.innerCode}}
      </el-form-item>
      <el-form-item
        label="策略名称： "
        style="width: 200px; margin-right: 40px"
      >
        {{detailpolicy.policyName}}
      </el-form-item>
      <el-form-item
        label="策略方案： "
        style="width: 200px; margin-right: 40px"
      >
      </el-form-item>
      <el-progress :text-inside="true"  :color="color" :stroke-width="26" :percentage="detailpolicy.discount"></el-progress>
    </el-form>
    <div slot="footer" class="dialog-footer" style="text-align: center;">
      <el-button @click="cancelpolicy" style="background-color:#fbf4f0">取消策略</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { cancelpolicy } from '@/api/hmmm/device.js'
export default {
  name: 'policydetail',
  props: {
    viewpolicydialogForm: {
      type: Boolean,
      default: false
    },
    detailpolicy: {
      type: Object
    }
  },
  data () {
    return {
      params: {
        innerCode: null,
        policyId: null
      },
      color: ''
    }
  },
  watch: {
    detailpolicy: {
      handler () {
        if (this.detailpolicy.discount < 30) {
          this.color = '#909399'
        } else if (this.detailpolicy.discount < 70) {
          this.color = '#5cb87a'
        } else {
          this.color = '#6f7ad3'
        }
      },
      deep: true
    }
  },
  methods: {
    close () {
      this.$emit('update:viewpolicydialogForm', false)
    },
    async cancelpolicy () {
      this.params.innerCode = this.detailpolicy.innerCode
      this.params.policyId = this.detailpolicy.policyId
      await cancelpolicy(this.params)
      this.$message.success('取消成功')
      this.$emit('update')
      this.close()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__header {
  background: #fff;
  color: black;
  .el-dialog__title,
  .el-icon-close {
    color: black;
  }
}
</style>
