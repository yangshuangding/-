<template>
  <div class="box">
    <el-dialog
      title="区域详情"
      width="630px"
      :visible="dialogFormVisible"
      @close="closeDialog"
    >
      <el-descriptions>
        <el-descriptions-item label="区域名称">{{
          form.name
        }}</el-descriptions-item>
        <el-descriptions-item label="包含点位">
          <template>
            <el-table :data="list">
              <el-table-column
                type="index"
                label="序号"
                width="80"
              ></el-table-column>
              <el-table-column
                property="name"
                label="点位名称"
                width="158"
              ></el-table-column>
              <el-table-column
                property="vmCount"
                label="设备数量"
                width="158"
              ></el-table-column>
            </el-table>
          </template>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script>
import { details, pointSearch } from '@/api/point/regional.js'
export default {
  name: 'RegionalDetails',
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
  components: {},
  data () {
    return {
      form: {
        name: '',
        pagelndex: 1,
        pageSize: 1000
      },
      list: [],
      from: {
        regionId: '',
        pagelndex: 1,
        pageSize: 1000
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 在区域详情的请求
    async getDepartmentInfo () {
      const { data } = await details(this.id)

      console.log(data)
      this.form = { ...data }
      //   this.form.regionName = data.name

      // 获取点位搜索
      this.from.regionId = this.id
      const res = await pointSearch(this.from)
      this.list = [...res.data.currentPageRecords]
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
    background-color: #fff;
    color: #909399;
  }
  ::v-deep .el-descriptions-row {
    display: flex;
    flex-direction: column;
  }
  ::v-deep .el-descriptions-item__label {
    width: 140px;
    text-align: right;
    padding: 0 0 0 50px;
  }
  .el-table {
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
</style>
