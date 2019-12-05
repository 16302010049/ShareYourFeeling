<template>
  <div id="app">
    <el-container>
      <el-header>
        <webheader/></el-header>
      <el-container style="min-height: 700px">
        <router-view v-if="isRouterAlive"/>
      </el-container>
      <el-footer>
        <webfooter/></el-footer>
    </el-container>
  </div>
</template>

<script>
import Webheader from './components/webheader'
import Webfooter from './components/webfooter'
export default {
  name: 'App',
  components: {Webfooter, Webheader},
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
