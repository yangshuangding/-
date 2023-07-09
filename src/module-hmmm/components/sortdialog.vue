<template>
  <el-dialog
    title="智能排货"
    :visible="sotrdialogForm"
    @close="close"
    width="55%"
  >
    <div class="content">
<p>该区域属于{{$store.getters.business.name}}商圈适合销售一下商品：</p>
    </div>
    <div class="detail" v-if="channellist?.length!==0">
      <el-scrollbar style="height: 384px">
        <div>
          <el-row>
            <el-col
              :span="6"
              v-for="item in channellist"
              :key="item.skuId"
              ><el-card
                :body-style="{
                  padding: '0px',
                  width: '134px',
                  height: '134px'
                }"
              >
                <div class="sku">
                  <img :src="item.image" class="image" />
                  <span>{{ item.skuName }}</span>
                </div> </el-card
            ></el-col>
          </el-row>
        </div>
      </el-scrollbar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button  @click="confirm" >采纳建议</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { top10 } from '@/api/hmmm/device.js'
export default {
  name: 'sortdialog',
  props: {
    sotrdialogForm: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      channellist: []
    }
  },
  methods: {
    close () {
      this.$emit('update:sotrdialogForm', false)
      this.channellist = []
    },
    confirm () {
      this.close()
    }
  },
  watch: {
    sotrdialogForm: {
      async handler () {
        if (this.sotrdialogForm) {
          const { data } = await top10(this.$store.getters.business.id)
          this.channellist = data
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
</style>
