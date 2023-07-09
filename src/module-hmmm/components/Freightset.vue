<template>
  <div>
    <el-dialog
      title="货道设置"
      :visible="FreightdialogForm"
      @close="close"
      width="62%"
    >
      <div class="content">
        <p>
          货道行数：<span>{{ typedel.vmRow }}</span>
        </p>
        <p>
          货道列数：<span>{{ typedel.vmCol }}</span>
        </p>
        <p>
          货道容量（个）：<span>{{ typedel.channelMaxCapacity }}</span>
        </p>
        <p>
          <el-button type="primary" @click="sort">智能排货</el-button>
        </p>
      </div>
      <br />
      <div class="detail">
        <el-scrollbar style="height: 384px">
          <div>
            <el-row :class="{trs:showr}">
              <el-col
                :span="6"
                v-for="item in channellist1"
                :key="item.channelCode"
                ><el-card
                  :body-style="{
                    padding: '0px',
                    width: '150px',
                    height: '180px'
                  }"
                >
                  <div class="sku">
                    <img v-if="item.isdel" :src="item.sku?.skuImage" class="image" />
                    <svg-icon icon-class="nopic" v-else></svg-icon>
                    <p v-if="item.isdel">{{ item.sku?.brandName || '暂无商品' }}</p>
                    <p v-else>{{  '暂无商品' }}</p>
                    <div class="code">{{ item.channelCode }}</div>
                  </div>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="add(item)"
                      >添加</el-button
                    >
                    <el-button
                      type="text"
                      v-if="item.isdel"
                      class="button"
                      style="color: red"
                      :disabled="!item.isdel"
                      @click="item.isdel = false"
                      >删除</el-button
                    >
                    <el-button v-else disabled type="text" class="button"
                      >删除</el-button
                    >
                  </div>
                </el-card></el-col
              >
            </el-row>
          </div>
        </el-scrollbar>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm">确 定</el-button>
      </div>
      <i class="el-icon-arrow-left" :class="{disabled:!showr}" @click="showleft"></i>
      <i class="el-icon-arrow-right" :class="{disabled:showr}" @click="showright"></i>
    </el-dialog>
    <sondialog :sondialogForm.sync="sonvisible" @addgood="addgood"></sondialog>
    <sortdialog :sotrdialogForm.sync="sortvisible"></sortdialog>
  </div>
</template>

<script>
import sondialog from './sondialog.vue'
import sortdialog from './sortdialog.vue'
export default {
  name: 'Freightdialog',
  components: {
    sondialog, sortdialog
  },
  props: {
    FreightdialogForm: {
      type: Boolean,
      required: true
    },
    channellist: {
      type: Array,
      required: true
    },
    typedel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sonvisible: false,
      sortvisible: false,
      showr: false,
      channellist1: [],
      channelCode: ''
    }
  },
  methods: {
    addgood (val) {
      const item = this.channellist1.find(item => item.channelCode === this.channelCode)
      item.isdel = true
      item.sku.brandName = val.skuName
      item.sku.skuImage = val.skuImage
    },
    close () {
      this.$emit('update:FreightdialogForm', false)
      this.sonvisible = false
      this.sortvisible = false
      this.showr = false
      this.channellist1 = []
      this.channelCode = ''
    },
    sort () {
      this.sortvisible = true
    },
    add (item) {
      this.channelCode = item.channelCode
      this.sonvisible = true
    },
    confirm () {
      this.close()
    },
    showright () {
      this.showr = true
    },
    showleft () {
      this.showr = false
    }
  },
  watch: {
    channellist: {
      handler () {
        this.channellist1 = [...this.channellist]
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
  .content {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 850px;
    height: 54px;
    padding: 0 20px;
    background-color: #f4f6fb;
    span {
      color: #7a99fe;
    }
  }
  .detail {
    margin: 0 auto;
    width: 850px;
    .el-row {
      width: 1700px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      overflow: hidden;
      transition: .8s;
      .el-col {
        border: none;
        border-radius: 0;
        text-align: center;
        background-color: #fff;
        width: 166px;
        height: 180px;
        margin-bottom: 20px;
        .sku {
          width: 150px;
          height: 135px;
          background-color: #f4f6fb;
          margin: 0 auto;
          position: relative;
        /deep/  .svg-icon{
            font-size: 100px;
          }
          .code {
            width: 43px;
            height: 23px;
            border-radius: 0 10px 10px 0;
            line-height: 23px;
            color: white;
            background-color: #829bed;
            position: absolute;
            top: 10px;
            left: 0;
          }
          .image {
            width: 84px;
            height: 78px;
            display: block;
            margin: 0 auto;
            margin-bottom: 10px;
          }
        }
        .bottom {
          margin-top: 12px;
          line-height: 12px;
          text-align: center;
          background-color: #fff;
        }

        .button {
          padding: 0;
        }

        .clearfix:before,
        .clearfix:after {
          display: table;
          content: '';
        }

        .clearfix:after {
          clear: both;
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
