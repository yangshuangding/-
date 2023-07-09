<template>
  <el-dialog
    title="修改设备"
    :visible="editdialogForm"
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
      style="margin-left: 4vw"
    >
      <el-form-item
        label="机器编号： "
        style="width: 300px;"
      >
        {{item.innerCode}}
      </el-form-item>
      <el-form-item
        label="供货时间： "
        style="width: 300px;"
      >
        {{item.lastSupplyTime}}
      </el-form-item>
      <el-form-item
        label="设备类型： "
        style="width: 300px;"
      >
        {{item.type?.name}}
      </el-form-item>
      <el-form-item
        label="设备容量："
        style="width: 300px;"
      >
        {{item.type?.channelMaxCapacity}}
      </el-form-item>
      <el-form-item label="设备点位：" prop="nodeId">
        <el-select v-model="form.nodeId" placeholder="请选择">
          <el-option
            v-for="item in nodeList"
            :key="item?.name"
            :label="item?.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        label="合作商： "
        style="width: 300px;"
      >
       {{item.ownerName}}
      </el-form-item>
      <el-form-item
        label="所属区域： "
        style="width: 300px;"
      >
        {{item.region?.name}}
      </el-form-item>
      <el-form-item
        label="设备地址： "
        style="width: 300px;"
      >
        {{item.node?.name}}
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="add">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { editdevice } from '@/api/hmmm/device.js'
export default {
  name: 'editdevice',
  props: {
    nodeList: {
      type: Array,
      required: true
    },
    editdialogForm: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      form: {
        id: null,
        nodeId: null
      },
      rules: {
        nodeId: { required: true, message: '请选择', trigger: 'change' }
      }
    }
  },
  methods: {
    close () {
      this.$emit('update:editdialogForm', false)
      this.form = {
        id: null,
        nodeId: null
      }
      this.$refs.form.resetFields()
    },
    async add () {
      await editdevice(this.form)
      this.$message.success('修改成功')
      this.$emit('update')
      this.close()
    }
  },
  watch: {
    editdialogForm: {
      handler () {
        if (this.editdialogForm) {
          this.form.id = this.item.id
          this.form.nodeId = this.item.nodeId
        }
      }
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
