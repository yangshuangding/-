<template>
  <div class="box">
    <el-dialog
      title="点位详情"
      width="630px"
      :visible="dialogFormVisible"
      @close="closeDialog"
    >
      <el-table :data="list">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column
          property="innerCode"
          label="机器编号"
          width="158"
        ></el-table-column>
        <el-table-column
          property="vmStatus"
          label="设备状态"
          width="157"
        >
        <template v-slot="{ row }">
          <span>{{ row.vmStatus == 0 ? '未投放' : row.vmStatus == 1 ? '运营' : '撤机' }}</span>
        </template>
        </el-table-column>
        <el-table-column
          property="lastSupplyTime"
          label="最后一次供货时间"
          width="157"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { pointDetails } from '@/api/point/regional.js'
export default {
  name: 'PointDetails',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      form: {
        lastSupplyTime: null
      },
      list: []
    }
  },
  methods: {
    // 获取点位详情
    async getDepartmentInfo () {
      console.log(this.id)
      const { data } = await pointDetails(this.id)
      console.log(data)
      this.list = [...data]
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
    .el-table {
      width: 552px;
      margin: 0px auto;
      ::v-deep th.el-table__cell.is-leaf {
        background: rgb(243, 246, 251);
        border-bottom: 0;
      }
      ::v-deep .el-table td.el-table__cell,
      th.el-table__cell.is-leaf {
        border-bottom: 0;
      }
    }
  }
}
</style>
