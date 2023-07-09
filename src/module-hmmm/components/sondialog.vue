<template>
  <el-dialog
    title="选择商品"
    :visible="sondialogForm"
    @close="close"
    width="55%"
  >
    <div class="content">
      <el-form ref="form" :model="params" label-width="100px">
        <el-form-item label="商品名称：">
          <el-input v-model="params.skuName" style="width: 300px"></el-input>
          <el-button
            type="primary"
            icon="el-icon-search"
            class="search"
            @click="search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="detail">
      <el-scrollbar style="height: 384px">
        <div>
          <el-row>
            <el-col
              :span="6"
              v-for="item in channellist"
              :key="item.channelCode"
              ><el-card
                :body-style="{
                  padding: '0px',
                  width: '134px',
                  height: '134px'
                }"
                @click.native="choose(item)"
              >
                <div class="sku">
                  <img :src="item.skuImage" class="image" />
                  <span>{{ item.skuName }}</span>
                  <i class="el-icon-success" v-show="item.isshow"></i>
                </div> </el-card
            ></el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button v-if="!showbutton" style="opacity:.3" disabled @click="confirm">确 定</el-button>
      <el-button v-else @click="confirm" >确 定</el-button>
    </div>
    <i class="el-icon-arrow-left" :class="{disabled:params.pageIndex <= 1}" @click="showleft"></i>
      <i class="el-icon-arrow-right" :class="{disabled:channellist.length < 10}" @click="showright"></i>
  </el-dialog>
</template>

<script>
import { prodsearch } from '@/api/hmmm/device.js'
export default {
  name: 'sondialog',
  props: {
    sondialogForm: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      params: {
        pageIndex: 1,
        pageSize: 10,
        skuName: null
      },
      channellist: [],
      showbutton: false,
      choosegood: {}
    }
  },
  methods: {
    close () {
      this.$emit('update:sondialogForm', false)
      this.choosegood = {}
      this.params = {
        pageIndex: 1,
        pageSize: 10,
        skuName: null
      }
      this.channellist = []
      this.showbutton = false
    },
    choose (item) {
      this.showbutton = true
      item.isshow = true
      this.channellist.forEach(item1 => {
        if (item1.skuId !== item.skuId) {
          item1.isshow = false
        }
      })
      this.choosegood = { ...item }
    },
    async search () {
      const { currentPageRecords } = await prodsearch(this.params)
      this.channellist = currentPageRecords
      this.channellist.forEach(item => {
        this.$set(item, 'isshow', false)
      })
      this.showbutton = false
    },
    async initData () {
      const { data } = await prodsearch(this.params)
      this.channellist = [...data.currentPageRecords]
      this.channellist.forEach(item => {
        this.$set(item, 'isshow', false)
      })
    },
    confirm () {
      this.$emit('addgood', this.choosegood)
      this.close()
    },
    showright () {
      if (this.channellist.length < 10) {
        this.params.pageIndex--
      } else {
        this.params.pageIndex++
        this.initData()
      }
    },
    showleft () {
      if (this.params.pageIndex <= 1) {
        this.params.pageIndex = 1
      } else {
        this.params.pageIndex--
        this.initData()
      }
    }
  },
  watch: {
    sondialogForm: {
      async handler () {
        if (this.sondialogForm) {
          const { data } = await prodsearch(this.params)
          this.channellist = [...data.currentPageRecords]
          this.channellist.forEach(item => {
            this.$set(item, 'isshow', false)
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-dialog__header {
  background: #fff;
  color: black;
  .el-dialog__title,
  .el-icon-close {
    color: black;
  }
}
.el-dialog__body {
  height: 411px;
  padding: 0px 30px;
  .content {
    position: relative;
    margin: 0 auto;
    width: 96%;
    height: 54px;
    line-height: 54px;
    span {
      color: #7a99fe;
    }
    .search {
      position: absolute;
      top: 0px;
      right: -100px;
    }
    .el-form {
      display: flex;
      align-items: center;
      height: 100%;
      .el-form-item {
        margin-bottom: 0px;
      }
    }
  }
  .detail {
    margin: 0 auto;
    margin-top: 20px;
    width: 96%;
    .el-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .el-col {
        border: none;
        border-radius: 0;
        text-align: center;
        background-color: #fff;
        width: 134px;
        height: 134px;
        margin-bottom: 20px;
        margin-right: 16px;
        .sku {
          width: 134px;
          height: 134px;
          background-color: #f4f6fb;
          margin: 0 auto;
          position: relative;
          .image {
            width: 84px;
            height: 78px;
            display: block;
            margin: 0 auto;
            margin-bottom: 10px;
          }
        }
        .button {
          padding: 0;
        }
        .el-card__body {
          position: relative;
          .el-icon-success {
            display: block;
            font-size: 40px;
            color: #7a99fe;
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
    /deep/ .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
/deep/ .dialog-footer {
  text-align: center;
  .el-button {
    background: linear-gradient(135deg, #ff9743, #ff5e20);
    color: white;
  }
}
.el-icon-arrow-right {
  font-size: 40px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
}
.el-icon-arrow-left {
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
}
.trs{
  transform: translateX(-50%);
}
.disabled{
  opacity: .3;
}
</style>
