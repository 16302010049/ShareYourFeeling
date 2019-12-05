<template>
    <el-card id="card">
      <el-row>
        <el-col :span="2">
        <el-avatar :size="60" :src="input.imageurl" style="cursor: pointer;" @click.native="jumpToSelf"></el-avatar>
        </el-col>
        <el-col :span="4">
          <el-row>
            <div style="text-align: left">{{input.name}}</div>
          </el-row>
          <el-row>
            <div style="text-align: left">
              关注 {{input.guanNum}}|粉丝 {{input.fansNum}}|微博 {{input.blogNum}}
            </div>
          </el-row>
          <el-row>
            <div style="text-align: left">
              {{input.signature}}
            </div>
          </el-row>
        </el-col>
        <el-col :span="14">
          <div style="color: white">
            space
          </div>
        </el-col>
        <el-col :span="4">
          <el-row v-if="!hasguanzhu">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="follow">关注</el-button>
          </el-row>
          <el-row v-if="hasguanzhu">
            <el-button type="danger" icon="el-icon-circle-close" size="small" @click="unFollow">取关</el-button>
          </el-row>
          <el-row class="letter">
          <el-button type="primary" icon="el-icon-message" size="small" :disabled="!hasguanzhu">私信</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
</template>

<script>
export default {
  name: 'peoplecard',
  created () {
    let that = this
    let req = {
      followerID: this.$store.state.user.id,
      followID: this.input.id
    }
    this.$axios
      .post('http://localhost:8080/follow/checkFollow', req)
      .then((response) => {
        if (response.data.info === 'Yes') {
          that.hasguanzhu = true
        } else {
          that.hasguanzhu = false
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
  },
  data () {
    return {
      hasguanzhu: false
    }
  },
  props: ['input'],
  methods: {
    follow () {
      let that = this
      let myDate = new Date()
      let datestr = this.$options.methods.dateFtt('yyyy-MM-dd hh:mm:ss', myDate)
      let req = {
        followerID: this.$store.state.user.id,
        followID: this.input.id,
        time: datestr
      }
      this.$axios
        .post('http://localhost:8080/follow/addFollow', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('关注成功')
            that.hasguanzhu = true
            that.input.guanNum++
          } else {
            that.$message.error('关注失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    unFollow () {
      let that = this
      let req = {
        followerID: this.$store.state.user.id,
        followID: this.input.id
      }
      this.$axios
        .post('http://localhost:8080/follow/deleteFollow', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('取关成功')
            that.hasguanzhu = false
            that.input.guanNum--
          } else {
            that.$message.error('取关失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    jumpToSelf () {
      this.$router.push({path: '/self', query: {isme: '0'}})
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
    }
  }
}
</script>

<style>
  #card{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-style: oblique;
    margin-top: 10px;
  }
  .letter{
    margin-top: 5px;
  }
</style>
