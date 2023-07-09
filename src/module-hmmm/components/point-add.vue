<template>
  <div class="box">
    <el-dialog
      :title="id ? '修改点位' : '新增点位'"
      width="630px"
      :visible="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="name" label="点位名称:">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="form.name"
            maxlength="15"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="所在区域" prop="regionId">
          <el-select v-model="form.regionId" placeholder="请选择">
            <el-option
              v-for="item in region"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属商圈" prop="businessId">
          <el-select v-model="form.businessId" placeholder="请选择">
            <el-option
              v-for="item in business"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属合作商" prop="ownerId">
          <el-select v-model="form.ownerId" placeholder="请选择">
            <el-option
              v-for="item in ownerName"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="areaCode" label="详细地址:">
          <el-select v-model="form.areaCode" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
          <el-input
            type="textarea"
            placeholder="请输入详细地址"
            v-model="form.addr"
            maxlength="60"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submit"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addNewPoints,
  modifyingPoints,
  list,
  listOfBusinessDistricts,
  partner
} from '@/api/point/regional.js'

export default {
  name: 'PointAdd',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    },
    row: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: '', //  名称
        addr: '', //  详细地址
        areaCode: '', //  最后一级区域Id
        createUserId: 5, //  创建人Id
        regionId: '', //  所属区域Id
        businessId: '', //  所属商圈Id
        ownerId: '', //  合作商Id
        ownerName: '' //  合作商名称
      },
      region: [],
      business: [],
      ownerName: [],
      rules: {
        name: [
          { required: true, message: '请输入点位名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        regionId: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        businessId: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        ownerId: [{ required: true, message: '请输入备注', trigger: 'blur' }],
        areaCode: [{ required: true, message: '请输入备注', trigger: 'blur' }]
      },
      queryObj: {
        pageIndex: 1, // 当前页码
        pageSize: 100, // 每页数量
        totalPage: null, // 总页数
        totalCount: 1000 // 总数量
      }
    }
  },
  created () {
    this.asb()
  },
  methods: {
    async asb () {
      const { data } = await list()
      this.region = [...data.currentPageRecords]
      const res = await listOfBusinessDistricts()
      this.business = [...res.data]
      const date = await partner(this.queryObj)
      console.log(date)
      this.ownerName = [...date.data.currentPageRecords]
    },
    // 关闭弹窗
    closeDialog () {
      this.form = {}

      // 重置表单
      this.$refs.form.resetFields()

      // 调用父组件上的方法
      this.$parent.manageList()

      this.$emit('update:dialogFormVisible', false)
    },
    // 点击确定按钮发起增加学科的请求
    async submit () {
      try {
        // form表单校验
        await this.$refs.form.validate()

        // 判断为添加还是编辑
        if (this.id) {
          console.log(this.id)
          await modifyingPoints(this.form)
          this.$message.success('编辑成功')
        } else {
          // 发起请求
          this.form.id = this.id
          await addNewPoints(this.form)
          this.$message.success('添加成功')
        }

        // 关闭页面弹窗
        this.closeDialog()

        // $emit方式调用父组件上的方法

        // 调用父组件上的方法
        this.$parent.manageList()
      } catch (error) {
        console.log(error)
      }
    },
    // 在编辑状态下发起获取点位详情的请求
    async getDepartmentInfo () {
      this.form = this.row
      console.log(this.form)
    }
  }
}
</script>

<style scoped lang="less">
.box {
  .el-dialog__wrapper {
    .el-dialog {
      margin-top: 15vh;
      width: 630px;

      .el-dialog__body {
        padding: 20px 20px 30px;
        color: #666;
        font-size: 14px;
        .el-form {
          .el-form-item {
            ::v-deep .el-form-item__label {
              width: 140px;
              line-height: 36px;
            }
            .el-form-item__content {
              .el-input {
                width: 396px;
                line-height: 36px;
                font-size: 14px;
              }
              .el-textarea {
                width: 396px;
                font-size: 14px;
              }
              .el-select {
                width: 396px;
                line-height: 36px;
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
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
  ::v-deep .el-dialog__footer {
    width: 100%;
    text-align: center;
    ::v-deep .dialog-footer {
      width: 100%;
      text-align: center;
      .el-button--primary {
        margin-left: 34px !important;
      }
    }
  }
}
</style>
