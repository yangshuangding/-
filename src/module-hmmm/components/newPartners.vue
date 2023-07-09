<template>
  <div class="box">
    <el-dialog
      :title="id ? '修改合作商' : '新增合作商'"
      width="630px"
      :visible="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="name" label="合作商名称:">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="form.name"
            maxlength="10"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="contact" label="联系人:">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="form.contact"
            maxlength="10"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="mobile" label="联系电话:">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="form.mobile"
            maxlength="11"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="ratio" label="分成比例(%):">
          <el-input-number
            v-model="form.ratio"
            controls-position="right"
            :min="0"
            :max="100"
          ></el-input-number>
        </el-form-item>
        <el-form-item prop="account" label="账号:" v-if="!this.id">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="form.account"
            maxlength="18"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:" v-if="!this.id">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="form.password"
            maxlength="20"
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
import { addPartners, modifyPartner } from '@/api/point/regional.js'

export default {
  name: 'NewPartners',
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    },
    row: {
      type: Object
    }
  },
  data () {
    return {
      form: {
        name: '', //  合作商名称
        account: '', //  账号
        password: '', //  密码
        ratio: '', //  分成比例
        contact: '', //  联系人
        phone: '', //  联系电话
        mobile: '' //  手机号
      },
      rules: {
        name: [
          { required: true, message: '请输入合作商名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个字符', trigger: 'blur' }
        ],
        ratio: [
          { required: true, message: '请输入备注', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
          await modifyPartner(this.form)
          this.$message.success('编辑成功')
        } else {
          // 发起请求
          this.form.id = this.id
          await addPartners(this.form)
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
    // 在编辑状态下发起获取合作商详情的请求
    async getDepartmentInfo () {
      console.log(this.row)
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
              .el-input-number {
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
