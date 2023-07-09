// 布局侧边栏项
<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden && item.children">
      <router-link
        v-if="
          item.children.length === 1 &&
          !item.children[0].children &&
          !item.alwaysShow &&
          item.children[0].meta &&
          item.children[0].meta.icon
        "
        :to="item.path + '/' + item.children[0].path"
        :key="item.children[0].name"
      >
        <el-menu-item :index="item.path + '/' + item.children[0].path">
          <!-- <svg-icon
            v-if="item.children[0].meta && item.children[0].meta.icon"
            :icon-class="item.children[0].meta.icon"
          ></svg-icon> -->
          <i
            v-if="item.children[0].meta && item.children[0].meta.icon"
            :class="item.children[0].meta.icon"
          ></i>
          <span
            v-if="item.children[0].meta && item.children[0].meta.title"
            slot="title"
            >{{ item.children[0].meta.title }}</span
          >
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="item.name || item.path" :key="item.name">
        <template slot="title">
          <!-- <svg-icon
            v-if="item.meta && item.meta.icon"
            :icon-class="item.meta.icon"
          ></svg-icon> -->
          <i v-if="item.meta && item.meta.icon" :class="item.meta.icon"></i>
          <span v-if="item.meta && item.meta.title">{{ item.meta.title }}</span>
        </template>
        <template v-for="(child, index) in item.children">
          <router-link
            :to="item.path + '/' + child.path"
            :key="index"
            v-if="!child.hidden"
          >
            <el-menu-item :index="item.path + '/' + child.path">
              <!-- <svg-icon
                v-if="child.meta && child.meta.icon"
                :icon-class="child.meta.icon"
              ></svg-icon> -->
              <i
                v-if="child.meta && child.meta.icon"
                :class="child.meta.icon"
              ></i>
              <span v-if="child.meta && child.meta.title">{{
                child.meta.title
              }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { generateTitle } from '@/utils/i18n'

export default {
  name: 'layoutSidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    generateTitle
  }
}
</script>
<style lang="scss" scoped>
.menu-wrapper {
  box-shadow: 0;
}
</style>
