<template>
  <el-card id="card">
    <el-row>
      <el-col :span="3"  @click.native = jumptodetail style="cursor: pointer">
        <el-image
          style="width: 100px; height: 100px"
          :src="input.photoUrlList[0]"
          fit="fill"></el-image>
      </el-col>
      <el-col :span="21">
        <el-row>
          <el-col :span="19"  @click.native = jumptodetail style="cursor: pointer">
          <div id="content" >{{input.content}}</div>
          </el-col>
          <el-col :span="5">
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="danger" icon="el-icon-star-on" size="mini" @click.native="unmark" v-if="hasshoucang">取消收藏</el-button>
            <el-button type="primary" icon="el-icon-star-off" size="mini" @click.native="mark" v-if="!hasshoucang">收藏微博</el-button>
          </el-col>
        </el-row>
        <el-row id="writter" style="vertical-align: middle" >
          <el-col :span="8" @click.native="jumpToSelf" style="cursor: pointer">
            <div>
              <el-avatar :size="30" :src="input.avatarurl" id="avatar"></el-avatar>
              <span>{{input.name}}</span>
              <span>{{input.time}}</span>
            </div>
          </el-col>
          <el-col :span="9" style="color: white;cursor: pointer" @click.native="jumptodetail">just for space</el-col>
          <el-col :span="7">
            <div id="icons"  @click = jumptodetail style="cursor: pointer">
              <i class="el-icon-position"></i>
              <span>{{input.trannum}}</span>
              <i class="el-icon-chat-dot-square"></i>
              <span>{{input.chatnum}}</span>
              <i class="el-icon-thumb"></i>
              <span>{{input.zannum}}</span>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'cardwithonepicture',
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      hasshoucang: true
    }
  },
  props: ['input'],
  methods: {
    jumptodetail () {
      this.$cookies.set('blogInfo', this.$props.input)
      this.$router.push('/detail')
    },
    mark () {
      this.hasshoucang = true
    },
    unmark () {
      this.hasshoucang = false
    },
    jumpToSelf () {
      this.$router.push({path: '/self', query: {isme: '0'}})
    }
  }
}
</script>

<style scoped>
  #content {
    text-align: left;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
    font-style: oblique;
    margin-left: 8px;
  }

  #writter {
    font-size: 20px;
    margin-top: 20px;
    font-style: oblique;
  }

  #card{
    margin-top: 20px;
  }
</style>
