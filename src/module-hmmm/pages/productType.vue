<template>
  <div>
    <el-container class="box">
      <el-header>
        <span>商品类型搜索：</span>
        <el-input
          v-model="input"
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
            </div></el-col
          >
        </el-row>
      </el-main>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="classId" label="序号" width="80">
        </el-table-column>
        <el-table-column
          prop="className"
          label="商品类型名称"
          width="1250"
          header-cell-class-name="mybgc"
        >
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="text" @click="edit(row)">修改</el-button>
            <el-button type="text" class="delBtn" @click="del(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-container>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="35%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品类型名称：" prop="className">
          <el-input
            type="text"
            placeholder="请输入内容"
            v-model="ruleForm.className"
            maxlength="10"
            show-word-limit
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" class="cleBtn"
          >取 消</el-button
        >
        <el-button type="primary" @click="submitForm" class="subBtn"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { list, edit, delets, addService } from '@/api/hmmm/productType.js'
export default {
  data () {
    return {
      input: '',
      title: '新增商品信息',
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
        ]
      },
      renderData: {}
    }
  },
  created () {
    this.renderList()
  },
  methods: {
    async renderList () {
      const res = await list()
      this.tableData = res.data.currentPageRecords
      console.log(res)
    },
    async edit (row) {
      if (row === 'add') {
        this.title = '新增商品信息'
        this.dialogVisible = true
      } else {
        this.title = '修改商品信息'
        this.dialogVisible = true
        this.ruleForm = row
      }
    },
    submitForm () {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          if (this.title === '新增商品信息') {
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
    async del (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delets(row)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.renderList()
        })
        .catch(() => {})
    },
    async seach () {
      const res = await list({ className: this.input })
      console.log(res)
      this.tableData = res.data.currentPageRecords
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
</style>
