<template>
  <div class="device">
    <el-container>
      <el-header>
        <HeadSearch :title="title" :page="text" @input2="search2"></HeadSearch>
      </el-header>
      <el-main class="main">
        <div class="top">
          <el-button
            style="
              background: linear-gradient(135deg, #ff9743, #ff5e20);
              color: white;
            "
            icon="el-icon-circle-plus-outline"
            @click="adddevice"
            >新建</el-button
          >
          <el-button type="warning" plain style="color: #655b56; border: none" @click="handleAll"
            >批量操作</el-button
          >
        </div>
        <!-- 列表展示部分 -->
        <el-table
          :data="tableList"
          style="width: 100%"
          :header-cell-style="{
            background: '#f3f6fb'
          }"
          fit
          highlight-current-row
          class="customer-table"
          @selection-change="handleselection"
          ref="table"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="innerCode" label="设备编号"> </el-table-column>
          <el-table-column prop="type.name" label="设备型号"> </el-table-column>
          <el-table-column prop="node.name" label="详细地址"> </el-table-column>
          <el-table-column prop="ownerName" label="合作商"> </el-table-column>
          <el-table-column prop="role" label="设备状态">
            <template #default="{ row }">
              {{
                row.vmStatus === 1
                  ? '运营'
                  : row.vmStatus === 0
                  ? '未投放'
                  : '撤机'
              }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <div class="actions">
                <el-link
                  type="primary"
                  :underline="false"
                  @click.native="devset(row)"
                  style="margin-left: 10px"
                  >货道</el-link
                >
                <el-link
                  type="primary"
                  :underline="false"
                  @click.native="handleone(row.innerCode)"
                  >策略</el-link
                >
                <el-link type="info" :underline="false" @click="edit(row)"
                  >修改</el-link
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页工具 -->
        <el-row :gutter="20" class="bottom">
          <el-col :span="4"
            ><el-link disabled
              >共{{ totalCount }}页，第{{ params.pageIndex }}/{{
                totalPage
              }}页</el-link
            ></el-col
          >
          <el-col :span="16"><div class="grid-content bg-purple"></div></el-col>
          <el-col :span="4">
            <el-button
              v-if="params.pageIndex === 1"
              style="background: #edf0f9; color: #ccc; border: none"
              :disabled="params.pageIndex === 1"
              plain
              >上一页</el-button
            >
            <el-button
              v-else
              style="background: #d5ddf8; color: black; border: none"
              plain
              @click="pageup"
              >上一页</el-button
            >
            <el-button
              v-if="params.pageIndex >= totalPage"
              plain
              style="background: #edf0f9; color: #ccc; border: none"
              :disabled="params.pageIndex === totalPage"
              >下一页</el-button
            >
            <el-button
              v-else
              plain
              style="color: black; border: none; background: #d5ddf8"
              @click="pagedown"
              >下一页</el-button
            ></el-col
          >
        </el-row>
        <!-- 弹出新增对话框表格 -->
        <adddevice :adddialogForm.sync="addvisible" :typeList="typeList" :nodeList="nodeList" @update="update"></adddevice>
        <!-- 弹出修改对话框 -->
        <editdevice :editdialogForm.sync="editvisible" :nodeList="nodeList" :item="item" @update="update"></editdevice>
        <!-- 弹出策略管理对话框 -->
        <editpolicy :editpolicydialogForm.sync="editpolicyvisible" :policyList="policyList" :innerCodeList="innerCodeList" @update="update"></editpolicy>
        <!-- 弹出策略详情对话框，如果这个售货机没有策略，那就弹出单个的策略管理对话框 -->
        <policydetail :viewpolicydialogForm.sync="viewpolicyvisible" :detailpolicy="detailpolicy" @update="update"></policydetail>
        <!-- 弹出货道管理对话框 -->
        <Freightset :FreightdialogForm.sync="freightvisible" :channellist="channellist" :typedel="typedel"></Freightset>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { list, nodelist, typelist, policylist, viewpolicy, channelList, typedetail } from '@/api/hmmm/device.js'
import HeadSearch from '../components/headsearch.vue'
import adddevice from '../components/adddevice.vue'
import editdevice from '../components/editdevice.vue'
import editpolicy from '../components/editpolicy.vue'
import policydetail from '../components/policydetail.vue'
import Freightset from '../components/Freightset.vue'
export default {
  name: 'devicemanage',
  components: {
    HeadSearch, adddevice, editdevice, editpolicy, policydetail, Freightset
  },
  data () {
    return {
      text: '设备管理',
      params: {
        pageIndex: 1,
        pageSize: 10,
        innerCode: null
      },
      nodeParams: {
        pageIndex: 1,
        pageSize: 10000
      },
      tableList: [],
      title: '设备编号',
      totalCount: null,
      totalPage: null,
      typeList: [],
      nodeList: [],
      addvisible: false,
      editvisible: false,
      editpolicyvisible: false,
      viewpolicyvisible: false,
      freightvisible: false,
      item: {},
      policyList: [],
      innerCodeList: [],
      detailpolicy: {},
      channellist: [],
      typedel: {}
    }
  },
  created () {
    this.initData()
  },
  methods: {
    handleselection (val) {
      console.log(val)
      this.innerCodeList = [...val]
    },
    async  handleAll () {
      this.innerCodeList = this.innerCodeList.map(item => {
        return item.innerCode
      })
      console.log(this.innerCodeList)
      if (this.innerCodeList.length === 0) {
        this.$message.error('请选择后再操作')
      } else {
        this.editpolicyvisible = true
        const { data } = await policylist()
        this.policyList = data
      }
    },
    search2 (val) {
      this.params.innerCode = val
      this.initData()
    },
    update () {
      this.initData()
    },
    async adddevice () {
      const res = await nodelist(this.nodeParams)
      this.nodeList = [...res.data.currentPageRecords]
      const res1 = await typelist(this.nodeParams)
      this.typeList = [...res1.data.currentPageRecords]
      this.addvisible = true
    },
    async initData () {
      const res = await list(this.params)
      this.tableList = res.data.currentPageRecords
      this.totalPage = res.data.totalPage
      this.totalCount = res.data.totalCount
    },
    async devset (row) {
      const res = await typedetail(row.type.typeId)
      this.typedel = res.data
      const { data } = await channelList(row.innerCode)
      this.channellist = [...data]
      this.channellist.forEach(item => {
        this.$set(item, 'isdel', true)
      })
      this.freightvisible = true
      this.$store.commit('app2/setbusiness', { id: row.node.businessType.id, name: row.node.businessType.name })
    },
    async handleone (id) {
      const { data } = await viewpolicy(id)
      if (data === '') {
        this.innerCodeList = [id]
        this.editpolicyvisible = true
        const { data } = await policylist()
        this.policyList = data
      } else {
        this.detailpolicy = { ...data }
        this.viewpolicyvisible = true
      }
    },
    async edit (row) {
      const res = await nodelist(this.nodeParams)
      this.nodeList = [...res.data.currentPageRecords]
      this.item = row
      this.editvisible = true
    },
    pageup () {
      this.params.pageIndex--
      this.initData()
    },
    pagedown () {
      this.params.pageIndex++
      this.initData()
    }
  }
}
</script>

<style scoped lang="less">
.device {
  width: 100%;
  height: 40%;
  background-color: #f8fafd;
  padding: 20px;
  .el-header {
    margin-bottom: 20px;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
}
.main {
  .top {
    margin-bottom: 20px;
    display: flex;
    justify-content: start;
    /deep/ .el-button {
      height: 36px;
      padding: 9px, 15px;
      font-size: 14px;
    }
  }
  .el-row {
    margin-top: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #fff;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    // background-color: #f9fafc;
  }
  // .customer-table th{
  //   // border:none;
  // }
  background-color: #fff;
  .actions {
    display: flex;
    justify-content: flex-start;
    a {
      color: #6480e3;
      margin-right: 10px;
    }
  }
}
.frame {
  margin: 0, auto;
  .el-form-item {
    .el-input {
      width: 280px;
    }
    .el-select {
      width: 280px;
    }
  }
  /deep/ .el-dialog__body {
    padding-left: 180px;
  }
}
</style>
