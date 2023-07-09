// 布局导航栏
<template>
  <el-menu class="navbar" mode="horizontal">
    <div style="float:left">
      <div class="sidebar-logo">
        <img src="../assets/logo.png">
      </div>
      <div class="sidebar-logo-mini">
        <img src="../assets/minilogo.png">
      </div>
    </div>
    <div class="right-menu">
      <div class="item">
        <span class="el-dropdown-link">
          <img class="avatar" src="../assets/bigUserHeader.png">
          欢迎您， demo
 <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom">
      <span class="logout" @click="logout">退出</span>
    </el-tooltip>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
// import Breadcrumb from '@/components/Breadcrumb'
// import Hamburger from '@/components/Hamburger'
// import Screenfull from '@/components/Screenfull'
// import ThemePicker from '@/components/ThemePicker'
import { search } from '@/api/base/menus'

export default {
  name: 'layoutNavBar',
  components: {
    // Breadcrumb,
    // Hamburger,
    // Screenfull,
    // ThemePicker
  },
  computed: {
    ...mapGetters(['sidebar', 'name', 'avatar'])
  },
  data () {
    return {
      searchVal: '',
      timeout: null,
      showSearchInput: false,
      restaurants: []
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    handleBtnSearch () {
      this.showSearchInput = !this.showSearchInput
      this.$nextTick(() => {
        this.$refs.searchInput.focus()
      })
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter (queryString) {
      return state => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect (item) {
      this.searchVal = ''
      this.showSearchInput = false
      console.log(item)
      this.$message({
        message: `选取了 ${item.value}`,
        type: 'success'
      })
    }
  },
  mounted () {
    this.restaurants = search()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar .item .el-input__inner {
  border: 0px;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0px;
}
.Homelogo {
  background: #1493fa;
  height: 56px;
  padding: 15px 0 0;
  text-align: center;
  span {
    background: url(../assets/logo.png) no-repeat 50%;
    display: block;
    height: 28px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  border: 0px  !important;
  // background: linear-gradient(to right, #1493fa, #01c6fa);
  background-image: url('../assets/logoBg.png');
  .sidebar-logo{
    width: 88px !important;
    height: 35px !important;
    position: relative;
    left: 20px;
    img {
      width: 88px;
      height: 35px;
    }
  }
  .hamburger-container {
    line-height: 60px;
    height: 60px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    // float: right;
    position: absolute;
    right: 0px;
    height: 50px;
    .item {
      display: inline-block;
      color: #fff;
      margin-right: 10px;
      font-size: 16px;
      i {
        font-size: 18px;
      }
      .btnSearch {
        margin-right: 5px;
        font-size: 18px;
        color: #fff;
      }
      .avatar {
        width: 35px;
        vertical-align: -12px;
        margin-right: 10px ;
      }
    }
  }
}
.logout{
  cursor:pointer;
  margin-left: 30px;
  margin-right: 0;
}
</style>
