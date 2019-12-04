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
      <el-col :span="6" >
        <el-row><div class="infor">{{comment.name}}</div></el-row>
        <el-row><div class="infor">{{comment.time}}</div></el-row>
      </el-col>
      <el-col :span="10">
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
      :current-page="currentPage"
      @current-change="handlePageChange"
      layout="prev, pager, next"
      :page-count="pageTotal"
      id="pages">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: 'weibodetail',
  created () {
    this.blogID = this.$cookies.get('blogID')
    var that = this
    this.$axios
      .get('http://localhost:8080/blog/getSingleBlog', {params: {'blogID': this.blogID}})
      .then((response) => {
        console.log(response)
        that.info = {
          id: response.data.id,
          content: response.data.content,
          chatnum: response.data.commentNum,
          trannum: response.data.tranNum,
          zannum: response.data.zanNum,
          authorID: response.data.authorID,
          time: response.data.date,
          photoUrlList: JSON.parse(response.data.imageList),
          name: response.data.name,
          avatarurl: response.data.imageurl
        }
        console.log(that.info)
        if (that.info.photoUrlList.length > 0) {
          that.bigUrl = this.info.photoUrlList[0]
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
    console.log(this.info)
    var getPage = {
      blogId: this.blogID,
      pageNum: 1,
      pageSize: 4
    }
    this.$axios
      .post('http://localhost:8080/comment/getComment', getPage)
      .then((response) => {
        that.pageTotal = response.data.totalPage
        var commentlist = response.data.content
        that.comments = []
        for (var i = 0; i < commentlist.length; i++) {
          var temp = {
            id: commentlist[i].id,
            blogId: commentlist[i].blogId,
            authorID: commentlist[i].authorID,
            content: commentlist[i].content,
            time: commentlist[i].time,
            name: commentlist[i].name,
            avatarUrl: commentlist[i].imageurl
          }
          that.comments.push(temp)
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
  },
  data () {
    return {
      blogID: '',
      comment: '',
      commentInput: '',
      info: {},
      bigUrl: '',
      comments: [],
      fit: 'fill',
      hasshoucang: '0',
      pageTotal: 0,
      currentPage: 1
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
          authorID: this.$store.state.user.id,
          content: this.commentInput,
          time: datestr
        }
        var that = this
        this.$axios
          .post('http://localhost:8080/comment/addComment', req)
          .then((response) => {
            if (response.data.info === 'success') {
              that.$options.methods.refreshBlog(this, 1)
            } else {
              this.$message.error('评论失败')
            }
          })
          .catch(function (error) {
            console.log(error)
            that.$message.error('网络错误')
          })
      }
    },
    handlePageChange (val) {
      this.$options.methods.refreshBlog(this, val)
    },
    refreshBlog (context, val) {
      this.blogID = context.$cookies.get('blogID')
      var that = context
      that.$axios
        .get('http://localhost:8080/blog/getSingleBlog', {params: {'blogID': this.blogID}})
        .then((response) => {
          console.log(response)
          that.info = {
            id: response.data.id,
            content: response.data.content,
            chatnum: response.data.commentNum,
            trannum: response.data.tranNum,
            zannum: response.data.zanNum,
            authorID: response.data.authorID,
            time: response.data.date,
            photoUrlList: JSON.parse(response.data.imageList),
            name: response.data.name,
            avatarurl: response.data.imageurl
          }
          console.log(that.info)
          if (that.info.photoUrlList.length > 0) {
            that.bigUrl = context.info.photoUrlList[0]
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
      console.log(this.info)
      var getPage = {
        blogId: this.blogID,
        pageNum: val,
        pageSize: 4
      }
      context.currentPage = val
      context.$axios
        .post('http://localhost:8080/comment/getComment', getPage)
        .then((response) => {
          that.pageTotal = response.data.totalPage
          var commentlist = response.data.content
          that.comments = []
          for (var i = 0; i < commentlist.length; i++) {
            var temp = {
              id: commentlist[i].id,
              blogId: commentlist[i].blogId,
              authorID: commentlist[i].authorID,
              content: commentlist[i].content,
              time: commentlist[i].time,
              name: commentlist[i].name,
              avatarUrl: commentlist[i].imageurl
            }
            that.comments.push(temp)
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
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
