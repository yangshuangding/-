<template>
  <div class="device">
    <el-container>
      <el-header>
        <HeadSearch :title="title" @input="search" :page="text"></HeadSearch>
      </el-header>
      <el-main class="main">
        <div class="top">
          <el-button
            style="
              background: linear-gradient(135deg, #ff9743, #ff5e20);
              color: white;
            "
            icon="el-icon-circle-plus-outline"
            @click="adddevicetype"
            >新建</el-button
          >
        </div>
        <el-table
          :data="tableList"
          style="width: 100%"
          :header-cell-style="{
            background: '#f3f6fb'
          }"
          fit
          highlight-current-row
          class="customer-table"
        >
          <el-table-column type="index" label="序号"> </el-table-column>
          <el-table-column prop="name" label="型号名称"> </el-table-column>
          <el-table-column prop="model" label="型号编码"> </el-table-column>
          <el-table-column label="设备照片">
            <template #default="{ row }">
              <el-avatar :src="row.image"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="vmRow" label="货道行"> </el-table-column>
          <el-table-column prop="vmCol" label="货道列"> </el-table-column>
          <el-table-column prop="channelMaxCapacity" label="设备容量">
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <div class="actions">
                <el-link
                  type="primary"
                  :underline="false"
                  @click.native="edit(row)"
                  style="margin-left: 10px"
                  >修改</el-link
                >
                <el-link
                  type="primary"
                  :underline="false"
                  @click.native="del(row.typeId)"
                  style="color: red"
                  >删除</el-link
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
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
        <!-- 弹出编辑对话框表格 -->
        <el-dialog title="新增设备类型" :visible.sync="dialogFormVisible" @close="close">
          <el-form
            :rules="rules"
            :model="form"
            ref="form"
            class="frame"
            :inline="true"
            label-width="100px"
            style="margin-left: 6vw"
          >
            <el-form-item label="型号名称：" prop="name">
              <el-input
                v-model="form.name"
                size="medium"
                autocomplete="off"
                placeholder="请输入"
                maxlength="10"
                show-word-limit
                style="width: 380px"
              ></el-input>
            </el-form-item>
            <el-form-item label="型号编码：" prop="model">
              <el-input
                v-model="form.model"
                size="medium"
                autocomplete="off"
                placeholder="请输入(限制数字、字母、中划线、下划线)"
                maxlength="15"
                show-word-limit
                style="width: 380px"
              ></el-input>
            </el-form-item>
            <el-form-item label="货道行数： " prop="vmRow" width="500px">
              <el-input-number
                placeholder="请输入"
                v-model="form.vmRow"
                controls-position="right"
                style="width: 380px"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="货道列数：" prop="vmCol">
              <el-input-number
                placeholder="请输入"
                v-model="form.vmCol"
                controls-position="right"
                style="width: 380px"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="货道容量：" prop="channelMaxCapacity">
              <el-input-number
                placeholder="请输入"
                v-model="form.channelMaxCapacity"
                controls-position="right"
                style="width: 380px"
                :min="1"
                :max="10"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="设备图片： " prop="image" width="500px">
              <el-upload
                action=""
                list-type="picture-card"
                :on-change="change"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-upload2"></i>
                <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
                <img v-if="form.image" :src="form.image" class="avatar">
              <!-- <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { typelist, remove, uploadimg, add, updatedevicetype } from '@/api/hmmm/device.js'
import HeadSearch from '../components/headsearch.vue'
export default {
  components: {
    HeadSearch
  },
  data () {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      params: {
        pageIndex: 1,
        pageSize: 10,
        name: ''
      },
      tableList: [],
      title: '型号搜索',
      dialogFormVisible: false,
      form: {
        name: '',
        model: '',
        vmRow: '',
        vmCol: '',
        channelMaxCapacity: '',
        image: '',
        typeId: null
      },
      rules: {
        name: { required: true, tirgger: 'blur', message: '请输入型号名称' },
        model: [
          { required: true, tirgger: 'blur', message: '请输入型号编码' },
          { pattern: /^[-_a-zA-Z0-9]{0,16}$/, message: '请输入正确的格式' }
        ],
        vmRow: {
          required: true,
          tirgger: 'blur',
          message: '请输入货道行数',
          type: 'number'
        },
        vmCol: {
          required: true,
          tirgger: 'blur',
          message: '请输入货道列数',
          type: 'number'
        },
        channelMaxCapacity: {
          required: true,
          tirgger: 'change',
          message: '请输入货道容量',
          type: 'number'
        },
        image: { required: true, tirgger: 'blur', message: '请添加图片' }
      },
      // 9: null,
      totalCount: null,
      totalPage: null,
      text: '设备类型管理'
    }
  },
  created () {
    this.initData()
  },
  methods: {
    search (val) {
      this.params.name = val
      this.initData()
    },
    async  change (event) {
      console.log(event)
      const fd = new FormData()
      fd.append('fileName', event.raw)
      const res = await uploadimg(fd)
      console.log(res)
      this.form.image = res.data
    },
    async initData () {
      const res = await typelist(this.params)
      this.tableList = res.data.currentPageRecords
      this.totalPage = res.data.totalPage
      this.totalCount = res.data.totalCount
    },
    async del (id) {
      await remove(id)
      this.$message.success('删除成功')
      this.initData()
    },
    edit (row) {
      this.dialogFormVisible = true
      this.form = row
      console.log(3)
    },
    adddevicetype () {
      this.dialogFormVisible = true
    },
    async  submit () {
      if (!this.form.typeId) {
        await add(this.form)
        this.$message.success('添加成功')
      } else {
        await updatedevicetype(this.form)
        this.$message.success('修改成功')
      }
      this.close()
      this.initData()
    },
    close () {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      this.form = {
        name: '',
        model: '',
        vmRow: '',
        vmCol: '',
        channelMaxCapacity: '',
        image: '',
        typeId: null
      }
    },
    pageup () {
      this.params.pageIndex--
      this.initData()
    },
    pagedown () {
      this.params.pageIndex++
      this.initData()
    },
    handleChange () {
      console.log(1)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
  /deep/ .el-dialog__header {
    background: #fff;
    color: black;
    .el-dialog__title,
    .el-icon-close {
      color: black;
    }
  }
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
  // /deep/ .bottom {
  //   margin-top: 20px;
  //   width: 1000px;
  //   display: flex;
  //   .grid-content{
  //     width: 500px;
  //   }
  // }
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
  position: relative;
  .el-form-item {
    .el-input {
      width: 280px;
    }
    .el-select {
      width: 280px;
    }
  }
  .avatar{
    width: 145px;
    height: 145px;
    position: absolute;
    // background-color: #ccc;
    top: 0;
    left: 200px;
  }
  /deep/ .el-dialog__body {
    padding-left: 180px;
  }
}
</style>
