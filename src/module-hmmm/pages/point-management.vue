<template>
  <!-- 点位管理 -->
  <div class="box">
    <!-- 搜索 -->
    <div class="searchFor">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="点位搜索：">
          <el-input
            v-model="formInline.name"
            placeholder="请输入"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="区域搜索：">
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
            @click="onSubmit(formInline)"
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
        <el-table-column prop="name" label="点位名称" min-width="171">
        </el-table-column>
        <el-table-column prop="region.name" label="所在区域" min-width="169">
        </el-table-column>
        <el-table-column
          prop="businessType.name"
          label="商圈类型"
          min-width="169"
        >
        </el-table-column>
        <el-table-column prop="ownerName" label="合作商" min-width="169">
        </el-table-column>
        <el-table-column
          prop="addr"
          label="详细地址"
          min-width="169"
        ></el-table-column>
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="text" size="small" @click="openDetails(row.id)"
              >查看详情</el-button
            >
            <el-button type="text" size="small" @click="openDrawer('edit', row)"
              >修改</el-button
            >
            <el-button
              class="delete"
              type="text"
              size="small"
              @click="open(row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- table数据表格 -->
      <!-- 分页组件区域 -->
      <div class="paging">
        <div class="record">
          共{{ padData.totalCount }}条记录 第 {{ queryObj.pageIndex }}/{{
            padData.totalPage
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
            :total="padData.totalCount"
            prev-text="上一页"
            next-text="下一页"
          >
          </el-pagination>
        </div>
      </div>
      <!-- 分页组件区域 -->
    </div>
    <!-- 弹窗组件 -->
    <PointAdd
      ref="pointAdd"
      :dialogFormVisible.sync="visible"
      :row="row"
      :id="currentId"
    ></PointAdd>
    <PointDetails
      ref="pointDetails"
      :dialogFormVisible.sync="visibles"
      :id="currentId"
    ></PointDetails>
    <!-- 弹窗组件 -->
  </div>
</template>

<script>
import { pointSearch, deletePoint } from '@/api/point/regional.js'
import PointAdd from '../components/point-add.vue'
import PointDetails from '../components/pointDetails.vue'

export default {
  components: {
    PointAdd,
    PointDetails
  },
  data () {
    return {
      // 搜索
      formInline: {
        name: '',
        user: ''
      },
      currentId: null,
      row: {},
      visibles: false,
      visible: false,
      drawerType: 'add', // 打开添加
      list: [],
      queryObj: {
        pageIndex: null, // 当前页码
        pageSize: 10 // 每页数量
      },
      padData: {
        totalPage: null,
        totalCount: null // 总数量
      }
    }
  },
  created () {
    this.manageList()
  },
  methods: {
    // 发起获取列表数据的请求
    async manageList () {
      const { data } = await pointSearch(this.queryObj)
      console.log(data)

      this.list = [...data.currentPageRecords]
      this.queryObj.pageIndex = Number(data.pageIndex)
      this.queryObj.pageSize = Number(data.pageSize)
      this.padData.totalPage = data.totalPage
      this.padData.totalCount = Number(data.totalCount)
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
          this.$refs.pointAdd.getDepartmentInfo()
        })
      }
    },
    // 打开详情
    async openDetails (id) {
      this.visibles = true
      this.currentId = id

      // 因为vue更新是异步，在props的currentdId修改之前，已经创建了子组件发送了请求
      this.$nextTick(() => {
        // 调用子组件上的方法
        this.$refs.pointDetails.getDepartmentInfo()
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
          await deletePoint(id)
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
    onSubmit (formInline) {
      this.list = this.list.filter(item => {
        return item.name === formInline.name || item.region.name === formInline.user
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
  ::v-deep .el-textarea {
    margin: 20px 0 0 140px;
  }
}
</style>
