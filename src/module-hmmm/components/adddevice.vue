<template>
  <el-dialog
    title="新增设备"
    :visible="adddialogForm"
    @close="close"
    width="40%"
  >
    <el-form
      :rules="rules"
      :model="form"
      class="frame"
      :inline="true"
      ref="form"
      label-width="100px"
      style="text-align: center"
    >
      <el-form-item
        label="设备编号： "
        style="width: 300px; margin-right: 140px"
      >
        系统自动生成
      </el-form-item>
      <el-form-item label="选择型号： " prop="vmType">
        <el-select v-model="form.vmType" placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.name"
            :value="item.typeId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择点位：" prop="nodeId">
        <el-select v-model="form.nodeId" placeholder="请选择" @change="change">
          <el-option
            v-for="item in nodeList"
            :key="item.name"
            :label="item.name"
            :value="item.id"
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
import { adddevice } from '@/api/hmmm/device.js'
export default {
  name: 'adddevice',
  props: {
    typeList: {
      type: Array,
      required: true
    },
    nodeList: {
      type: Array,
      required: true
    },
    adddialogForm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        vmType: null,
        nodeId: null,
        createUserId: null
      },
      rules: {
        vmType: { required: true, message: '请选择', trigger: 'change' },
        nodeId: { required: true, message: '请选择', trigger: 'change' }
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:adddialogForm', false)
      this.form = {
        vmType: null,
        nodeId: null,
        createUserId: null
      }
      this.$refs.form.resetFields()
    },
    async add () {
      await adddevice(this.form)
      this.$message.success('添加成功')
      this.$emit('update')
      this.close()
    },
    change (val) {
      this.form.createUserId = this.nodeList.find(
        item => item.id === val
      ).createUserId
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
