<template>
  <div>
    <el-row v-if="input.type==='right'">
      <el-col :span="12">
        <div style="color:   rgba(236, 235, 238, 0.77)">space</div>
      </el-col>
      <el-col :span="10">
        <div class="right">
          <span>{{input.content}}</span>
        </div>
      </el-col>
      <el-col :span="2">
        <el-avatar :size="50" :src="input.avatarUrl" @click.native="jumpToSelf" style="cursor: pointer"></el-avatar>
      </el-col>
    </el-row>
    <el-row v-if="input.type==='left'">
      <el-col :span="2">
        <el-avatar :size="50" :src="input.avatarUrl" @click.native="jumpToOther" style="cursor: pointer"></el-avatar>
      </el-col>
      <el-col :span="10">
        <div class="left">
          <span>{{input.content}}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'qipao',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  props: ['input'],
  methods: {
    jumpToOther () {
      this.$router.push({path: '/self', query: {isme: '0'}})
    },
    jumpToSelf () {
      this.$router.push({path: '/self', query: {isme: '1'}})
    }
  }
}
</script>

<style scoped>
  .right span {
    background-color: #fff;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 4px;
    margin: 10px 0 10px 10px;
    position: relative;
    max-width: 300px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 18px;
    word-wrap: break-word;
    white-space: normal;
  }

  .right span::before {
    content: '';
    border: 8px solid #ffffff00;
    border-left: 8px solid #fff;
    position: absolute;
    top: 6px;
    right: -16px;
  }

  .left span {
    background-color: #fff;
    padding: 5px 8px;
    display: inline-block;
    border-radius: 4px;
    margin: 10px 0 10px 10px;
    position: relative;
    max-width: 300px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 18px;
    word-wrap: break-word;
    white-space: normal;
  }

  .left span::after {
    content: '';
    border: 8px solid #ffffff00;
    border-right: 8px solid #fff;
    position: absolute;
    top: 6px;
    left: -16px;
  }
  .right{
    text-align: right;
  }
  .left{
    text-align: left;
  }
</style>
