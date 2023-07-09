<template>
 <div>
<el-dialog title="新增工单" :visible.sync="dialogFormVisible" width="600px">
  <el-form :model="form" ref="form" :rules="rules">
    <el-form-item label="设备编号:" prop="innerCode" :label-width="formLabelWidth">
      <el-input
          type="text"
          placeholder="请输入"
         v-model="form.innerCode"
          maxlength="15"
          show-word-limit
> </el-input>
    </el-form-item>
    <el-form-item label="工单类型:"  prop="productType" :label-width="formLabelWidth">
      <el-select v-model="form.productType" placeholder="请选择">
          <el-option
      v-for="item in options2"
      :key="item.typeId"
      :label="item.typeName"
      :value="item.typeId">
    </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="运营人员:"  prop="userId" :label-width="formLabelWidth">
      <el-select v-model="form.userId" placeholder="请选择">
         <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.userName"
      :value="item.id">
    </el-option>

      </el-select>
    </el-form-item>
    <el-form-item  label="备注:"  prop="desc" :label-width="formLabelWidth" width="300px">
        <el-input
            type="textarea"
             placeholder="请输入备注（不超过40字）"
            v-model="form.desc"
            maxlength="40"
            show-word-limit
          >
        </el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="quxiao">取 消</el-button>
    <el-button class="btn2" type="primary" @click="subit">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template>

<script>
import { addListData, OperationPersonnel, WorkOrderType } from '@/api/operational.js'

export default {
  props: {
    tableData: {
      type: Array
    },
    newList: {
      type: Object
    }
  },
  data () {
    return {
      value: '',
      dialogFormVisible: false,
      textarea: '',
      form: {
        createType: 1,
        innerCode: '',
        userId: '',
        productType: '',
        desc: ''

      },
      options: [],
      options2: [],
      rules: {
        innerCode: [{ required: true, message: '请输入', trigger: 'blur' }],
        productType: [{ required: true, message: '请输入', trigger: 'blur' }],
        userId: [{ required: true, message: '请输入', trigger: 'blur' }],
        desc: [{ required: true, message: '请输入', trigger: 'blur' },
          { min: 0, max: 40, message: '备注字数不能超过40字', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    async fn () {
      console.log(this.newList)
      this.form = {
        createType: 1,
        innerCode: this.newList.innerCode,
        productType: this.newList.taskType?.typeId,
        userId: this.newList.userName,
        desc: this.newList.desc
      }
      this.dialogFormVisible = true
      const { data } = await OperationPersonnel()
      this.options = data.currentPageRecords

      const { data: res } = await WorkOrderType()
      this.options2 = res
    },
    async subit () {
      this.$refs.form.validate()
      this.dialogFormVisible = false
      const data = await addListData(this.form)
      console.log(data)
    },
    quxiao () {
      this.$emit('resss')
      this.dialogFormVisible = false
      this.$refs.form.validate()
      this.$refs.form.resetFields()
      this.form = {
        createType: 1,
        innerCode: '',
        userId: '',
        productType: '',
        desc: ''
      }
    }
  }
}
</script>

<style scoped lang='less'>
    .dialog-footer{
        text-align: center;
        .el-button{
            margin:0px 20px;
        }
        .btn2{
            background:linear-gradient(135deg,#ff9743,#ff5e20)!important;
            border: none;
        }
    }
</style>
