<template>
  <div>
    <el-container class="box">
      <el-header>
        <span>商品搜索：</span>
        <el-input
          v-model="pagination.skuName"
          placeholder="请输入内容"
          class="seachInnp"
        ></el-input>
        <el-button type="primary" class="seachBtn" @click="seach">
          <span class="el-icon-search"></span>
          查询
        </el-button>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24"
            ><div class="grid-content bg-purple-dark">
              <el-button type="primary" class="newBtn" @click="edit('add')"
                ><span class="el-icon-circle-plus-outline"></span
                >新建</el-button
              >
              <el-button type="primary" class="Toleadinto" @click="addData"
                >导入数据</el-button
              >
            </div></el-col
          >
        </el-row>
      </el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="skuId" type=index label="序号" width="80">
        </el-table-column>
        <el-table-column
          prop="skuName"
          label="商品名称"
          width="200"
          header-cell-class-name="mybgc"
        >
        </el-table-column>
        <el-table-column prop="skuImage" label="商品图片" width="200">
          <template #default="{ row }">
            <img :src="row.skuImage" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="brandName" label="品牌" width="200">
        </el-table-column>
        <el-table-column prop="unit" label="规格" width="150">
        </el-table-column>
        <el-table-column prop="price" label="商品价格" width="150">
        </el-table-column>
        <el-table-column prop="className" label="商品类型" width="150 ">
          <template #default="{ row }">
            <span>{{ row.skuClass.className }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建日期">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="edit(row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-footer>
        <span
          >共{{ padData.totalCount }}条记录 第 {{ pagination.pageIndex }}/{{
            padData.totalPage
          }}
          页</span
        >
        <div class="btn">
          <el-button
            type="primary"
            @click="previous"
            :disabled="pagination.pageIndex === 1"
            >上一页</el-button
          >
          <el-button type="primary" @click="nextPage">下一页</el-button>
        </div>
      </el-footer>
    </el-container>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="140px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称：" prop="skuName">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="ruleForm.skuName"
            maxlength="15"
            show-word-limit
            class="inputwigth"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="品牌：" prop="brandName">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="ruleForm.brandName"
            maxlength="15"
            show-word-limit
            class="inputwigth"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商品价格（元）：" prop="price">
          <el-input-number
            v-model="ruleForm.price"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="9999"
            placeholder="请输入"
            class="inputwigth"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品类型：">
          <el-select
            class="inputwigth"
            v-model="ruleForm.classId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in listType"
              :key="item.classId"
              :label="item.className"
              :value="item.classId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格：" prop="unit">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="ruleForm.unit"
            maxlength="10"
            show-word-limit
            class="inputwigth"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="商品图片：" prop="skuImage">
          <el-upload
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImage"
          >
            <img
              v-if="ruleForm.skuImage"
              :src="ruleForm.skuImage"
              class="avatar"
            />
            <i v-else class="el-icon-upload2 avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <p class="digodn">支持扩展名：jpg、png，文件不得大于100kb</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cleBtn"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitForm" class="subBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog title="数据导入" :visible.sync="dialogVisible1" width="25%">
      <el-form>
        <el-form-item label="标题：" prop="dataTitle">
          <el-upload
            class="upload-demo"
            action=""
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
          >
            <el-button size="small" type="primary" class="upBtn"
              >点击上传</el-button
            >
          </el-upload>
        </el-form-item>
      </el-form>
      <p class="digodn">支持扩展名：xls、xlsx，文件不得大于1M</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false" class="cleBtn"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitForm1" class="subBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { list, edit, addService, listType } from '@/api/hmmm/product.js'
import COS from 'cos-js-sdk-v5'
export default {
  data () {
    return {
      input: '',
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // },
        // {
        //   name: 'food2.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }
      ],
      title: '新增商品',
      tableData: [],
      dialogVisible: false,
      dialogVisible1: false,
      ruleForm: {},
      pagination: {
        pageIndex: 1,
        pageSize: '10',
        skuName: ''
      },
      padData: {
        totalCount: '',
        totalPage: ''
      },
      rules: {
        skuName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, max: 15, message: '长度在 1 到 15 个字符', trigger: 'blur' }
        ],
        brandName: [
          { required: true, message: '请输入品牌', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ],
        classId: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ],
        price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        skuImage: [
          { required: true, message: '请选择商品图片', trigger: 'blur' }
        ],
        unit: [{ required: true, message: '请输入规格', trigger: 'blur' }]
      },
      renderData: {},
      listType: {}
    }
  },
  created () {
    this.renderList()
  },
  methods: {
    // 渲染函数
    async renderList () {
      const res = await list(this.pagination)
      this.tableData = res.data.currentPageRecords
      this.tableData.forEach(ele => {
        ele.createTime =
          ele.createTime.substring(0, 10) +
          '  ' +
          ele.createTime.substring(11, 19)
      })
      console.log(res)
      this.padData = res.data
      const { data } = await listType()
      console.log(data)
      this.listType = data.currentPageRecords
      // console.log(res)
    },
    async edit (row) {
      if (row === 'add') {
        this.title = '新增商品'
        this.dialogVisible = true
      } else {
        this.title = '修改商品'
        this.dialogVisible = true
        this.ruleForm = row
      }
    },
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          if (this.title === '新增商品') {
            await addService(this.ruleForm)
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.renderList()
            this.resetForm()
          } else {
            const res = await edit(this.ruleForm)
            console.log(res)
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.renderList()
            this.resetForm()
          }
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    },

    async seach () {
      const res = await list(this.pagination)
      console.log(res)
      this.tableData = res.data.currentPageRecords
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleChange (value) {
      console.log(value)
    },

    // 选择图片上传
    uploadImage (params) {
      console.log(params.file)
      const cos = new COS({
        SecretId: 'AKIDFXemy6TegaKrbFpEPSOBnHfPyPk0EKIB',
        SecretKey: 'wlU5c5OenmaD7wcBf7ScgeT8vb8Uc8au'
      }) // 完成cos对象的初始化
      cos.putObject(
        {
          Bucket: 'jiaozhu-1318639601', // 存储桶名称
          Region: 'ap-nanjing', // 地域名称
          Key: params.file.name, // 文件名称
          StorageClass: 'STANDARD', // 固定值
          Body: params.file // 文件对象
        },
        (err, data) => {
          if (data.statusCode === 200 && data.Location) {
            // 拿到了腾讯云返回的地址
            // 通过input自定义事件将地址传出去
            // this.$emit('input', 'http://' + data.Location) // 将地址返回了
            this.ruleForm.skuImage = 'http://' + data.Location
          } else {
            this.$message.error(err.Message) // 上传失败提示消息
          }
        }
      )
    },
    // 上一页
    previous () {
      this.pagination.pageIndex = this.pagination.pageIndex - 1
      this.renderList()
    },
    // 下一页
    nextPage () {
      this.pagination.pageIndex = this.pagination.pageIndex + 1
      this.renderList()
    },
    submitForm1 () {
      this.dialogVisible1 = false
    },
    addData () {
      this.dialogVisible1 = true
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      )
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  },
  watch: {
    dialogVisible () {
      if (!this.dialogVisible) {
        this.$refs.ruleForm.resetFields()
        this.ruleForm = {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 20px;
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.el-main {
  background-color: #fff;
  color: #333;
  padding: 20px;
  padding-bottom: 0;
  .newBtn {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    border: 0;
  }
}
.el-header {
  background-color: #fff;
  color: #333;
  align-items: center;
  display: flex;
  font-size: 14px;
  margin-bottom: 20px;
  padding-left: 17px;
  .seachInnp {
    width: 200px;
  }
  .seachBtn {
    width: 80px;
    height: 36px;
    background-color: #5f84ff;
    margin-left: 20px;
  }
}
/deep/.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 0;
}
/deep/.el-table th.el-table__cell {
  background-color: #f3f6fb;
}
/deep/.el-table {
  padding: 20px;
}
.delBtn {
  color: red;
}
/deep/.el-dialog__footer {
  text-align: center !important;
  .cleBtn {
    margin-right: 20px;
    background-color: #fbf4f0;
    border: 0;
  }
  .subBtn {
    background: linear-gradient(135deg, #ff9743, #ff5e20) !important;
    border: 0;
  }
}
.Toleadinto {
  margin-right: 20px;
  background-color: #fbf4f0;
  color: #000;
  border: 0;
}
img {
  width: 40px;
  height: 40px;
  border-radius: 40px;
  background-color: #ff9743;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 84px;
  height: 84px;
  line-height: 84px;
  text-align: center;
  border: 1px dashed #8c939d;
  background-color: rgba(224, 238, 253, 0.702);
}
.avatar {
  width: 84px;
  height: 84px;
  display: block;
}
.digodn {
  text-align: center;
  font-size: 14px;
  color: #666;
}
.inputwigth {
  width: 395px;
}
.el-footer {
  background-color: #fff;
  color: #333;
  text-align: center;
  // line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 16px;
    color: #c6c6c6;
  }
}
.upBtn {
  width: 220px;
  height: 40px;
  transform: translateX(-26px);
}
.upload-demo {
  text-align: center;
}
</style>
