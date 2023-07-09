<template>
  <div class="box">
    <el-dialog
      :title="id ? '修改区域' : '新增区域'"
      width="630px"
      :visible="dialogFormVisible"
      @close="closeDialog"
    >
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="regionName" label="区域名称:">
          <el-input
            type="text"
            placeholder="请输入"
            v-model="form.regionName"
            maxlength="15"
            show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注说明:">
          <el-input
            type="textarea"
            placeholder="请输入备注（不超过40个字）"
            v-model="form.remark"
            maxlength="40"
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
import { newlyAdded, modify, details } from '@/api/point/regional.js'

export default {
  name: 'RegionalAdd',
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
        regionName: '',
        remark: '',
        id: ''
      },
      rules: {
        regionName: [
          { required: true, message: '请输入区域名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入备注', trigger: 'blur' },
          { min: 3, max: 40, message: '长度在 3 到 40 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 关闭弹窗
    closeDialog () {
      this.form = {
        regionName: '',
        remark: '',
        id: ''
      }

      // 重置表单
      this.$refs.form.resetFields()

      this.$emit('update:dialogFormVisible', false)
    },
    // 点击确定按钮发起增加学科的请求
    async submit () {
      try {
        // form表单校验
        // await this.$refs.form.validate()

        // 判断为添加还是编辑
        if (this.form.id) {
          console.log(this.form.id)
          await modify(this.form)
          this.$message.success('编辑成功')
        } else {
          // 发起请求
          this.form.id = this.id
          await newlyAdded(this.form)
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
    // 在编辑状态下发起获取学科详情的请求
    async getDepartmentInfo () {
      const { data } = await details(this.id)

      console.log(data)
      this.form = { ...data }
      this.form.regionName = data.name
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
