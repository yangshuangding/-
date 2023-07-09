<template>
  <div class='container'>
    <div class="title">
      <span>人员搜索：</span>
      <el-input v-model="input" placeholder="请输入"></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
    </div>

    <div class="main">
      <el-button type="primary" icon="el-icon-circle-plus-outline" class="add" @click="showdialog">新建</el-button>
        <template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="numid"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="人员名称"
        width="240">
      </el-table-column>
      <el-table-column
        prop="regionName"
        label="归属区域"
        width="240">
      </el-table-column>
      <el-table-column
        prop="role.roleName"
        label="角色"
        width="240">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="联系电话"
        width="240">
      </el-table-column>
      <el-table-column
        label="操作">
        <template #default="{row}">
          <el-button type="text" size="small" class="change" @click="updata(row)">修改</el-button>
        <el-button type="text" size="small" class="ddel" @click="del(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  <Pagination :currentPage='currentPage' :totalCount='totalCount' :pageSize='pageSize' :totalPage='totalPage'></Pagination>
  <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination> -->
    </div>

    <el-dialog :title="title" :visible.sync="dialogFormVisible" @close="cancle">
  <el-form :model="form" ref="form" :rules="rules">
    <el-form-item label="人员名称：" :label-width="formLabelWidth" prop="userName">
      <el-input v-model="form.userName" autocomplete="off" placeholder="请输入"  maxlength="5" show-word-limit  style="width:396px"></el-input>
    </el-form-item>
    <el-form-item label="角色：" :label-width="formLabelWidth" prop="roleId">
      <el-select v-model="form.roleId" placeholder="请选择" style="width:396px">
        <el-option v-for="item in options" :key="item.roleId" :label="item.roleName" :value="item.roleId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系电话：" :label-width="formLabelWidth" prop="mobile">
      <el-input v-model="form.mobile" autocomplete="off" placeholder="请输入"  maxlength="11" show-word-limit style="width:396px"></el-input>
    </el-form-item>
    <el-form-item label="负责区域：" :label-width="formLabelWidth" prop="regionName">
      <el-select v-model="form.regionName" placeholder="请选择" style="width:396px">
        <el-option v-for="item in area" :key="item.id" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="头像：" :label-width="formLabelWidth" >
      <el-upload
  class="avatar-uploader"
  action=""
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
   :http-request="uploadImage">
  <img v-if="form.image" :src="form.image" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </el-form-item>
    <span class="text">支持扩展名：jpg、png，文件不得大于100kb</span>

    <el-form-item label="状态：" :label-width="formLabelWidth">
       <el-checkbox v-model="form.status" @click="changeStatus">是否启用</el-checkbox>
    </el-form-item>

  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="cancle">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import Pagination from '../components/pagination.vue'
import { mapGetters } from 'vuex'
import { peopleList, roleList, areaList, addPeople, delPeople, updataPeople } from '@/api/base/people.js'
import COS from 'cos-js-sdk-v5'
export default {
  components: {
    Pagination
  },
  data () {
    return {
      title: '新增人员',
      input: '',
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '130px',
      options: [],
      area: [],
      form: {
        userName: '',
        roleId: null,
        mobile: '',
        regionId: '',
        regionName: '',
        status: false,
        image: ''
      },
      totalCount: 0,
      pageSize: 10,
      currentPage: 1,
      totalPage: 0,
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        roleId: [{ required: true, message: '请输入', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入', trigger: 'blur' }],
        regionName: [{ required: true, message: '请输入', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.getlist()
    this.getData()
    this.getRoleList()
    this.getAreaList()
  },
  methods: {
    // 上一页
    previous () {
      this.currentPage = this.currentPage - 1
      this.getlist()
    },
    // 下一页
    nextPage () {
      this.currentPage = this.currentPage + 1
      this.getlist()
    },
    // 修改
    async updata (row) {
      console.log(row)
      this.title = '修改人员'
      this.form = {
        id: row.id,
        userName: row.userName,
        roleId: row.roleId,
        mobile: row.mobile,
        regionId: row.regionId,
        regionName: row.regionName,
        status: row.status,
        image: row.image
      }
      this.dialogFormVisible = true
    },
    // 删除
    async del (data) {
      try {
        await delPeople(data.id)
        this.$message.success('删除成功！')
        this.getlist()
      } catch (error) {
        this.$message.error(error + '删除失败！')
      }
    },
    // 取消
    cancle () {
      this.dialogFormVisible = false
      this.$refs.form.resetFields()
      this.form = {
        userName: '',
        roleId: null,
        mobile: '',
        regionId: '',
        regionName: '',
        status: false,
        image: ''
      }
    },
    // 搜索
    search () {
      this.getlist()
    },
    changeStatus () {
      this.form.status = !this.form.status
    },
    async getlist () {
      const { data } = await peopleList({ pageIndex: this.currentPage, pageSize: this.pageSize, userName: this.input })
      console.log(data)
      this.totalPage = data.totalPage
      this.totalCount = +data.totalCount
      // console.log(this.totalCount)
      this.tableData = data.currentPageRecords
      this.tableData.forEach((item, index) => { item.numid = (this.pageSize * (this.currentPage - 1)) + index + 1 })
      // console.log(this.tableData)
    },
    async getRoleList () {
      const { data } = await roleList()
      this.options = data
    },
    async getAreaList () {
      const { data } = await areaList({ pageSize: 100 })
      // console.log(data.currentPageRecords)
      this.area = data.currentPageRecords
    },
    getData () {
      this.loginName = this.name
      console.log(this.loginName)
    },

    // handleSizeChange (val) {
    //   console.log(`每页 ${val} 条`)
    //   this.pageSize = val
    //   this.getlist()
    // },
    // handleCurrentChange (val) {
    //   console.log(`当前页: ${val}`)
    //   this.currentPage = val
    //   this.getlist()
    // },
    showdialog () {
      this.dialogFormVisible = true
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },

    // 图片鉴定
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 和 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 表单提交
    async submit () {
      console.log(this.form.regionName)
      const res = this.area.filter(item => item.name === this.form.regionName)
      console.log(res)
      this.form.regionId = res.length ? res[0].id : 0
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          if (!this.form.id) {
            this.form.roleId = +this.form.roleId
            await addPeople(this.form)
            this.$message.success('添加成功！')
            this.dialogFormVisible = false
          } else {
            this.form.roleId = +this.form.roleId
            await updataPeople(this.form)
            this.$message.success('修改成功！')
            this.dialogFormVisible = false
          }
          this.getlist()
        } else {
          this.$message.error('请填入正确信息')
          return false
        }
      })
    },

    // 选择图片上传
    uploadImage (params) {
      console.log(params.file)
      const cos = new COS({
        SecretId: 'AKIDlS4VknfU5b2UtGbnlU5WhqqgUG5nMhom',
        SecretKey: 'rVv88xY0ZzGKBqKdNxRmz2wfCanspb9b'
      }) // 完成cos对象的初始化
      cos.putObject({
        Bucket: 'kfc-1318642979', // 存储桶名称
        Region: 'ap-nanjing', // 地域名称
        Key: params.file.name, // 文件名称
        StorageClass: 'STANDARD', // 固定值
        Body: params.file // 文件对象
      }, (err, data) => {
        if (data.statusCode === 200 && data.Location) {
          // 拿到了腾讯云返回的地址
          this.form.image = 'http://' + data.Location
          console.log(this.form.image)
          // this.$emit('input', 'http://' + data.Location) // 将地址返回了
        } else {
          this.$message.error(err.Message) // 上传失败提示消息
        }
      })
    }
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style scoped lang='less'>
/deep/ .el-dialog__header {
  background-color: #fff;

}
 /deep/ .el-dialog__title {
   color: #000;
   font-size: 16px;
   font-weight: 700;
 }

  /deep/ .el-dialog__close  {
     color: #ccc;
  }

.container{
  padding: 20px;
  .title {
    display: flex;
    align-items: center;
    height: 64px;
    background-color: #fff;
    padding-left: 17px;
    margin-bottom: 20px;
    span{
      font-size: 14px;
      color: #606266;
      padding-right: 12px;
    }
    .el-input {
      height: 36px;
      width: 210px;
      border-radius: 4px;
      margin-right: 10px;
    }
    .el-button{
      background-color: #5f84ff;
      border-color: #5f84ff;
    }
}
.main {
  background-color: #fff;
  padding: 20px;
  .add{
      background:linear-gradient(135deg,#ff9743,#ff5e20)!important;
      border: none;
      margin-bottom: 20px;
    }
    .change{
      font-size: 14px;
    }
    .ddel{
      font-size: 14px;
      color: red;
    }
}
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 84px;
    height: 84px;
    line-height: 84px;
    text-align: center;
    border: 1px dashed #ccc;
    border-radius: 4px;
    background-color: #f3f6fb;
  }

  .avatar {
    width: 84px;
    height: 84px;
    display: block;
  }
  .text {
    margin-left: 130px;
    color: #ccc;
  }
  /deep/ .el-dialog {
    width: 630px;
  }
</style>
