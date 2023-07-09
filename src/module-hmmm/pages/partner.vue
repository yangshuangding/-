<template>
  <!-- 合作商管理 -->
  <div class="box">
    <!-- 搜索 -->
    <div class="searchFor">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="合作商搜索：">
          <el-input
            v-model="formInline.user"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="onSubmit(formInline.user)"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据 -->
    <div class="main">
      <el-row>
        <el-button
          icon="el-icon-circle-plus-outline"
          type="danger"
          plain
          @click="openDrawer('add')"
        >
          新建
        </el-button>
      </el-row>
      <!-- table数据表格 -->
      <el-table
        ref="singleTable"
        :data="list"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="name" label="合作商名称" min-width="137">
        </el-table-column>
        <el-table-column prop="account" label="账号" min-width="132">
        </el-table-column>
        <el-table-column prop="vmCount" label="设备数量" min-width="132">
        </el-table-column>
        <el-table-column prop="ratio" label="分成比例" min-width="132">
          <template #default="{ row }">{{ row.ratio }}%</template>
        </el-table-column>
        <el-table-column
          prop="contact"
          label="联系人"
          min-width="132"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="联系电话"
          min-width="132"
        ></el-table-column>
        <el-table-column label="操作" width="250">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="openResetting(row.id)">
              重置密码
            </el-button>
            <el-button type="text" size="small" @click="openDetails(row)">
              查看详情
            </el-button>
            <el-button
              type="text"
              size="small"
              @click="openDrawer('edit', row)"
            >
              修改
            </el-button>
            <el-button
              class="delete"
              type="text"
              size="small"
              @click="open(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- table数据表格 -->
      <!-- 分页组件区域 -->
      <div class="paging">
        <div class="record">
          共{{ queryObj.totalCount }}条记录 第 {{ queryObj.pageIndex }}/{{
            queryObj.totalPage
          }}
          页
        </div>
        <div class="button">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryObj.pageIndex"
            :page-size="queryObj.pageSize"
            layout="prev, next"
            background
            :total="queryObj.totalCount"
            prev-text="上一页"
            next-text="下一页"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 分页组件区域 -->
    </div>
    <!-- 弹窗组件 -->
    <NewPartners
      ref="newPartners"
      :dialogFormVisible.sync="visible"
      :id="currentId"
      :row="row"
    ></NewPartners>
    <PartnerDetails
      ref="partnerDetails"
      :dialogFormVisible.sync="visibles"
      :row="row"
    ></PartnerDetails>
    <!-- 弹窗组件 -->
  </div>
</template>

<script>
import { partner, deletePartner, resetting } from '@/api/point/regional.js'
import NewPartners from '../components/newPartners.vue'
import PartnerDetails from '../components/partnerDetails.vue'

export default {
  components: {
    NewPartners,
    PartnerDetails
  },
  data () {
    return {
      // 搜索
      formInline: {
        user: ''
      },
      currentId: null,
      visibles: false,
      visible: false,
      centerDialogVisible: false,
      drawerType: 'add', // 打开添加
      list: [],
      queryObj: {
        pageIndex: 1, // 当前页码
        pageSize: 10, // 每页数量
        totalPage: null, // 总页数
        totalCount: 1000 // 总数量
      },
      row: {}
    }
  },
  created () {
    this.manageList()
  },
  methods: {
    // 发起获取列表数据的请求
    async manageList () {
      const { data } = await partner(this.queryObj)
      console.log(data)

      this.list = [...data.currentPageRecords]
      this.queryObj.pageIndex = Number(data.pageIndex)
      this.queryObj.pageSize = Number(data.pageSize)
      this.queryObj.totalPage = data.totalPage
      this.queryObj.totalCount = Number(data.totalCount)
    },
    // 点击操作选项打开dialod弹窗
    async openDrawer (type, row) {
      this.drawerType = type

      if (type === 'add') {
        this.visible = true // 显示弹层
      } else if (type === 'edit') {
        this.visible = true // 显示弹层
        this.currentId = row.id
        this.row = row

        // 因为vue更新是异步，在props的currentdId修改之前，已经创建了子组件发送了请求
        this.$nextTick(() => {
          // 调用子组件上的方法
          this.$refs.newPartners.getDepartmentInfo()
        })
      }
    },
    // 打开详情
    async openDetails (row) {
      this.visibles = true
      this.row = row

      // 因为vue更新是异步，在props的currentdId修改之前，已经创建了子组件发送了请求
      this.$nextTick(() => {
        // 调用子组件上的方法
        this.$refs.partnerDetails.getDepartmentInfo()
      })
    },
    // 重置密码
    openResetting (id) {
      this.$confirm('', '确定要重置合作商密码吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          console.log(id)
          await resetting(id)
          this.$message({
            type: 'danger',
            message: '重置密码成功!'
          })
          this.manageList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置密码'
          })
        })
    },
    // 删除
    async open (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      })
        .then(async () => {
          console.log(id)
          await deletePartner(id)
          this.$message({
            type: 'danger',
            message: '删除成功!'
          })
          this.manageList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // pageSize 改变时会触发
    handleSizeChange (pageSize) {
      // console.log(`每页 ${pageSize} 条`)
      this.queryObj.pageSize = pageSize
      this.manageList()
    },
    // current当前页改变时会触发
    handleCurrentChange (pageIndex) {
      // console.log(`当前页: ${pageIndex}`)
      // 改变参数对象中的当前页
      this.queryObj.pageIndex = pageIndex
      this.manageList()
    },
    // 搜索
    onSubmit (user) {
      this.list = this.list.filter(item => {
        return item.name === user
      })
    }
  }
}
</script>

<style scoped lang="less">
.box {
  width: 100%;
  padding: 20px;
  .searchFor {
    display: flex;
    height: 64px;
    margin-bottom: 20px;
    padding-left: 17px;
    background-color: #fff;
    .el-form {
      height: 36px;
      margin-top: 14px;
      ::v-deep .el-form-item__label {
        font-weight: 400;
      }
      ::v-deep .el-button--medium {
        padding: 10px 20px 10px 15px;
      }
      ::v-deep .el-button {
        width: 80px;
        height: 36px;
      }
    }
  }
  .main {
    padding: 20px 15px 19px 17px;
    background-color: #fff;
    .el-row {
      width: 100%;
      margin-bottom: 20px;
      ::v-deep .el-button--medium {
        padding: 8px 10px;
      }
      ::v-deep .el-button {
        width: 80px;
        height: 36px;
        font-size: 16px;
        span {
          font-size: 14px;
          font-weight: 500;
        }
      }
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
  .paging {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 32px 16px;
    .record {
      display: inline-block;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      font-size: 16px !important;
      color: #dbdfe5 !important;
    }
    .button {
      ::v-deep .el-pagination {
        .btn-prev {
          width: 70px;
          height: 32px;
          margin: 0 16px;
          border-radius: 2px;
          background-color: #d5ddf8;
        }
        .btn-next {
          width: 70px;
          height: 32px;
          margin: 0 16px;
          border-radius: 2px;
          background-color: #d5ddf8;
        }
      }
    }
  }
  ::v-deep .el-button--small {
    font-size: 14px;
  }
  ::v-deep .delete {
    color: #ff5a5a;
  }
}
</style>
