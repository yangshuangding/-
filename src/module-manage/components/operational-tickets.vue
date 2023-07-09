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
    <el-form-item  label="补货数量:" :label-width="formLabelWidth">
         <el-button type="text" @click="inventory">补货清单</el-button>
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

<!-- 补货清单 -->
<el-dialog title="补货清单" :visible.sync="dialogTableVisibles" width="630px">
  <el-table :data="gridData">
    <el-table-column property="channelCode" label="货到编号" width="100px"></el-table-column>
    <el-table-column property="sku.brandName" label="商品名称" width="100px" ></el-table-column>
    <el-table-column property="currentCapacity" label="当前数量" width="100px"></el-table-column>
    <el-table-column property="maxCapacity" label="还可添加" width="100px"></el-table-column>
    <el-table-column property="maxCapacity" label="补满数量" width="190px">
        <el-input-number style="width:150px" v-model="value1" controls-position="right" :min="1" :max="10"></el-input-number>
    </el-table-column>
  </el-table>
</el-dialog>
<!-- 补货清单 -->
 </div>
</template>

<script>
import { addListData, OperationPersonnel, WorkOrderType, channelList } from '@/api/operational.js'

export default {
  props: {
    tableData: {
      type: Array
    },
    // gridData: {
    //   type: Array
    // },
    newList: {
      type: Object
    }
  },
  data () {
    return {
      value1: 10,
      dialogTableVisibles: false,
      gridData: [

      ],
      value: '',
      dialogFormVisible: false,
      textarea: '',
      form: {
        createType: 1,
        innerCode: '',
        userId: '',
        productType: '',
        desc: '',
        delivery: false
        // resource: null
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
      console.log(this.options)

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
    },
    // 获取售货机货道详情
    async inventory () {
      this.$refs.form.validate()
      console.log(this.form.innerCode)
      if (this.form.innerCode) {
        this.dialogTableVisibles = true
        const { data } = await channelList(this.form.innerCode)
        this.gridData = data
      }
    },
    // 时间处理
    formatDate (row, column) {
      // 获取单元格数据
      const datac = row[column.property]
      const dtc = new Date(datac)
      // 获取月,默认月份从0开始
      let dtuMonth = dtc.getMonth() + 1
      // 获取日
      let dtuDay = dtc.getDate()
      // 处理1-9月前面加0
      if (dtuMonth < 10) {
        dtuMonth = '0' + (dtc.getMonth() + 1)
      }
      // 处理1-9天前面加0
      if (dtuDay < 10) {
        dtuDay = '0' + dtc.getDate()
      }
      // 获取小时
      let dtuHours = dtc.getHours()
      // 处理1-9时前面加0
      if (dtuHours < 10) {
        dtuHours = '0' + dtc.getHours()
      }
      // 获取分钟
      let dtuMinutes = dtc.getMinutes()
      // 处理1-9分前面加0
      if (dtuMinutes < 10) {
        dtuMinutes = '0' + dtc.getMinutes()
      }
      // 获取秒
      let dtuSeconds = dtc.getSeconds()
      // 处理1-9秒前面加0
      if (dtuSeconds < 10) {
        dtuSeconds = '0' + dtc.getSeconds()
      }
      // 组装年月日时分秒,按自己的要求来
      return (
        dtc.getFullYear() +
    '-' +
    dtuMonth +
    '-' +
    dtuDay +
    ' ' +
    dtuHours +
    ':' +
    dtuMinutes +
    ':' +
    dtuSeconds
      )
      // return (row.TableIsbibei = dd)
      // + " " + dtuHours + ":" + dtuMinutes + ":" + dtuSeconds
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
