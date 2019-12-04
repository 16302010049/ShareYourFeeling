<template>
    <el-card id="card" >
      <el-row>
        <el-col :span="20">
        <div id="content" @click="jumptodetail" style="cursor: pointer">{{input.content}}</div>
        </el-col>
        <el-col :span="4">
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
          <el-button type="danger" icon="el-icon-star-on" size="mini" @click.native="unmark" v-if="hasshoucang">取消收藏</el-button>
          <el-button type="primary" icon="el-icon-star-off" size="mini" @click.native="mark" v-if="!hasshoucang">收藏微博</el-button>
        </el-col>
      </el-row>
      <el-row  id="writter" style="vertical-align: middle">
          <el-col :span="6" @click.native="jumpToSelf" style="cursor: pointer">
            <div>
            <el-avatar :size="30" :src="input.avatarurl" id="avatar"></el-avatar>
              <span>{{input.name}}</span>
            <span>{{input.time}}</span>
            </div>
          </el-col>
          <el-col :span="12" style="color: white;cursor: pointer" @click.native="jumptodetail" >you can not see me</el-col>
        <el-col :span="6">
        <div id="icons" @click="jumptodetail" style="cursor: pointer">
          <i class="el-icon-thirdshare resize"></i>
          <span>{{input.trannum}}</span>
          <i class="el-icon-chat-dot-square"></i>
          <span>{{input.chatnum}}</span>
          <i class="el-icon-thirdgood resize"></i>
          <span>{{input.zannum}}</span>
        </div>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
export default {
  name: 'cardWithoutPicture',
  created () {
    let req = {
      userID: this.$store.state.user.id,
      blogID: this.input.id
    }
    var that = this
    this.$axios
      .post('http://localhost:8080/collect/checkCollect', req)
      .then((response) => {
        if (response.data.info === 'Yes') {
          that.hasshoucang = true
        } else {
          that.hasshoucang = false
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
  },
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      hasshoucang: true
    }
  },
  methods: {
    jumptodetail () {
      this.$cookies.set('blogID', this.$props.input.id)
      this.$router.push('/detail')
    },
    mark () {
      let time = new Date()
      let timestr = this.$options.methods.dateFtt('yyyy-MM-dd hh:mm:ss', time)
      let req = {
        userID: this.$store.state.user.id,
        blogID: this.$props.input.id,
        time: timestr
      }
      var that = this
      this.$axios
        .post('http://localhost:8080/collect/addCollect', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('收藏成功')
            this.hasshoucang = true
          } else {
            that.$message.error('收藏失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    dateFtt (fmt, date) { // author: meizz
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    unmark () {
      let req = {
        userID: this.$store.state.user.id,
        blogID: this.input.id
      }
      var that = this
      this.$axios
        .post('http://localhost:8080/collect/deleteCollect', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.hasshoucang = false
            that.$message.success('取消收藏成功')
          } else {
            that.$message.error('取消收藏失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    jumpToSelf () {
      this.$router.push({path: '/self', query: {isme: '0'}})
    }
  },
  props: ['input']
}
</script>

<style scoped>
  #content{
    text-align: left;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 20px;
    font-style: oblique;
    margin-left: 30px;
  }
  #writter{
    font-size: 20px;
    margin-top: 20px;
    font-style: oblique;
  }
  #card{
    margin-top: 20px;
    }
  .resize{
    font-size: 25px;
  }
</style>
