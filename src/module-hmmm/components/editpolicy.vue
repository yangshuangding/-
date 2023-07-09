<template>
  <el-dialog
    title="批量策略管理"
    :visible="editpolicydialogForm"
    @close="close"
    width="40%"
  >
    <el-form
      :model="form"
      class="frame"
      :inline="true"
      label-width="100px"
      style="text-align: center"
    >
      <el-form-item label="选择策略： ">
        <el-select v-model="form.policyId" placeholder="请选择" style="width:400px">
          <el-option
            v-for="item in policyList"
            :key="item.policyId"
            :label="item.policyName"
            :value="item.policyId"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editpolicy } from '@/api/hmmm/device.js'
export default {
  name: 'editpolicy',
  props: {
    policyList: {
      type: Array
    },
    editpolicydialogForm: {
      type: Boolean,
      default: false
    },
    innerCodeList: {
      type: Array
      // required: true
    }
  },
  data () {
    return {
      form: {
        policyId: null,
        innerCodeList: ''
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:editpolicydialogForm', false)
      this.form = {
        policyId: null,
        innerCodeList: ''
      }
    },
    async add () {
      this.form.innerCodeList = this.innerCodeList.join('/')
      await editpolicy(this.form)
      this.$message.success('修改成功')
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
