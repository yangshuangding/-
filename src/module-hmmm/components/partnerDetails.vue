<template>
  <div class="box">
    <el-dialog
      title="合作商详情"
      width="630px"
      :visible="dialogFormVisible"
      @close="closeDialog"
    >
      <el-descriptions :column="2" colon>
        <el-descriptions-item label="合作商名称">
          <span>{{ this.form.name }}</span>
        </el-descriptions-item>
        <el-descriptions-item label="联系人">
          {{ form.contact }}
        </el-descriptions-item>
        <el-descriptions-item label="联系电话">
          {{ form.mobile }}
        </el-descriptions-item>
        <el-descriptions-item label="分成比例">
          {{ form.ratio }}%
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PointDetails',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: '', //  合作商名称
        contact: '', //  联系人
        ratio: '', //  分成比例
        mobile: '' //  手机号
      }
    }
  },
  methods: {
    // 获取合作商详情
    async getDepartmentInfo () {
      this.form = this.row
    },
    // 关闭弹窗
    closeDialog () {
      // 重置表单
      //   this.$refs.form.resetFields()

      this.$emit('update:dialogFormVisible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  ::v-deep .el-dialog__header {
    padding: 20px;
    padding-bottom: 10px;
    background-color: #fff;
    color: #333;
    .el-dialog__title {
      background-color: #fff;
      color: #333;
      line-height: 22px;
      font-size: 16px;
      font-weight: 600;
    }
  }
  ::v-deep .el-dialog__close {
    color: #909399;
  }
  .el-dialog__body {
    padding: 20px 20px 30px;
    color: #666;
  }
  ::v-deep .el-descriptions-row {
    display: flex;
    justify-content: space-evenly;
  }
}
</style>
