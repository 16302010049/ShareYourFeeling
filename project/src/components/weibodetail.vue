<template xmlns:el-col="http://www.w3.org/1999/html">
  <el-card id="card">
    <el-row id="writter">
      <el-col :span="1.6">
      <el-avatar :size="50" :src="info.avatarurl" id="avatar" style="vertical-align:middle"></el-avatar>
      </el-col>
      <el-col :span="4" id="name">
        <el-row><div class="infor">{{info.name}}</div></el-row>
        <el-row><div class="infor">{{info.time}}</div></el-row>
      </el-col>
      <el-col :span="2" v-if="!info.hasguanzhu"><el-button type="primary" icon="el-icon-circle-plus-outline">关注</el-button></el-col>
      <el-col :span="2" v-if="info.hasguanzhu"><el-button type="danger" icon="el-icon-circle-close">取关</el-button></el-col>
      <el-col :span="14">
        <span style="color: white">space</span>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" icon="el-icon-delete" ></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="content">{{info.content}}</div>
      </el-col>
    </el-row>
    <el-row v-if="info.photoUrlList.length>0">
      <div class="demo-image">
        <div class="block">
          <el-image
            style="width: 600px; height: 400px"
            :src="bigUrl"
            :fit="fit"></el-image>
        </div>
        <div class="smallpic" v-if="info.photoUrlList.length>1">
          <el-image
            v-for="(url,index) in info.photoUrlList"
            :key = "index"
            style="width: 75px; height: 50px;cursor: pointer"
            :src="url"
            :fit="fit" class="small-image"
            @click.native="showBigPic(index)"></el-image>
        </div>
      </div>
    </el-row>
    <el-row id="infor">
      <el-col :span="6" v-if="hasshoucang === '0'" class="shoucang" @click.native="mark()">
        <i class="el-icon-star-off"></i>
        <span>收藏</span>
      </el-col>
      <el-col :span="6" v-if="hasshoucang === '1'" class="shoucang" @click.native="unmark()">
        <i class="el-icon-star-on"></i>
        <span >取消收藏</span>
      </el-col>
      <el-col :span="6">
        <i class="el-icon-position"></i>
        <span>{{info.trannum}}</span>
      </el-col>
      <el-col :span="6">
        <i class="el-icon-chat-dot-square"></i>
        <span>{{info.chatnum}}</span>
      </el-col>
      <el-col :span="6">
        <i class="el-icon-thumb"></i>
        <span>{{info.zannum
          }}</span>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="commentInput">
      <el-col :span="6" style="color: white">haha</el-col>
      <el-col :span="10">
        <el-input v-model="commentInput" placeholder="请输入评论"></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" icon="el-icon-edit" @click="sendComment">评论</el-button>
      </el-col>
    </el-row>
    <div v-for="comment in comments" :key="comment">
    <el-row>
      <el-col :span="4">
        <span style="color: white">keepSpace</span>
      </el-col>
      <el-col :span="1.5">
        <el-avatar :size="30" :src="comment.avatarUrl"></el-avatar>
      </el-col>
      <el-col :span="3" >
        <el-row><div class="infor">{{comment.name}}</div></el-row>
        <el-row><div class="infor">{{comment.time}}</div></el-row>
      </el-col>
      <el-col :span="12">
        <div class="com">{{comment.content}}</div>
      </el-col>
      <el-col :span="3"><el-button type="danger" icon="el-icon-circle-close" size="small" >删除</el-button></el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <span style="color: white">keepSpace</span>
      </el-col>
      <el-col :span="16">
        <el-divider></el-divider>
      </el-col>
    </el-row>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000" id="pages">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'weibodetail',
  created () {
    this.info = this.$cookies.get('blogInfo')
    if (this.info.photoUrlList.length > 0) {
      this.bigUrl = this.info.photoUrlList[0]
    }
    console.log(this.info)
  },
  data () {
    return {
      comment: '',
      commentInput: '',
      info: {},
      bigUrl: '',
      comments: [
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          name: 'Test',
          content: '这是一条评论',
          time: '10月31日 21:36'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          name: 'Test',
          content: '这是一条评论',
          time: '10月31日 21:36'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          name: 'Test',
          content: '这是一条评论',
          time: '10月31日 21:36'
        }
      ],
      fit: 'fill',
      hasshoucang: '0'
    }
  },
  methods: {
    mark () {
      this.hasshoucang = '1'
      console.log('jfekjf')
    },
    unmark () {
      this.hasshoucang = '0'
    },
    showBigPic (val) {
      this.bigUrl = this.info.photoUrlList[val]
      console.log(this.bigUrl)
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
    sendComment () {
      if (this.commentInput === '') {
        this.$message.error('评论内容不能为空')
      } else {
        var myDate = new Date()
        var datestr = this.$options.methods.dateFtt('yyyy-MM-dd hh:mm:ss', myDate)
        var req = {
          blogId: this.info.id,
          avatarUrl: this.info.avatarurl,
          author: this.info.name,
          content: this.commentInput,
          time: datestr
        }
        var that = this
        this.$axios
          .post('http://localhost:8080/comment/addComment', req)
          .then((response) => {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
            that.$message.error('网络错误')
          })
      }
    }
  }
}
</script>

<style scoped>
 .infor{
   text-align: left;
 }
  #name{
    margin-top: 5px;
  }
  #card{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .content{
    font-style: oblique;
    font-size:20px;
    text-align: left;
    margin-top:20px;
  }
  .small-image{
    margin-left: 0;
    margin-right: 5px;
    padding:0;
  }
  #infor{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #comment{
    margin-bottom: 20px;
  }
  .com{
    text-align: left;
  }
  .site{
  }
  .shoucang{
    cursor: pointer;
  }
  .commentInput{
    margin-bottom: 50px;
  }
</style>
