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
      <el-col :span="2" v-if="!isFollow&&!isMe"><el-button type="primary" icon="el-icon-circle-plus-outline" @click="follow">关注</el-button></el-col>
      <el-col :span="2" v-if="isFollow&&!isMe"><el-button type="danger" icon="el-icon-circle-close" @click="unFollow">取关</el-button></el-col>
      <el-col :span="14">
        <span style="color: white">space</span>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" icon="el-icon-delete" v-if="isMe" @click="deleteBlog"></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="content" style=" word-wrap:break-word">{{info.content}}</div>
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
    <el-row id="infor" style="color: #409EFF;margin-top: 150px">
      <el-col :span="6" v-if="!hasshoucang" class="shoucang" @click.native="mark()">
        <i class="el-icon-star-off"></i>
        <span>收藏</span>
      </el-col>
      <el-col :span="6" v-if="hasshoucang" class="shoucang" @click.native="unmark()">
        <i class="el-icon-star-on"></i>
        <span >取消收藏</span>
      </el-col>
      <el-col :span="6">
        <i class="el-icon-thirdshare resize" style="cursor: pointer" @click="tranBlog"></i>
        <span>{{info.trannum}}</span>
      </el-col>
      <el-col :span="6">
        <i class="el-icon-chat-dot-square" style="cursor: pointer" @click="readComment"></i>
        <span>{{info.chatnum}}</span>
      </el-col>
      <el-col :span="6">
        <i class="el-icon-thirdgood resize" v-if="!isThumbsUp" style="cursor: pointer" @click="thumbsUp"></i>
        <i class="el-icon-thirdgood-fill resize" v-if="isThumbsUp" style="cursor: pointer" @click="thumbsDown"></i>
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
        <div class="com" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis">{{comment.content}}</div>
      </el-col>
      <el-col :span="3" v-if="userID === comment.authorID"><el-button type="danger" icon="el-icon-circle-close" size="small"  @click="deleteComment(comment.id)">删除</el-button></el-col>
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
    this.userID = this.$store.state.user.id
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
        this.isMe = this.$store.state.user.name === response.data.name
        console.log(that.info)
        if (that.info.photoUrlList.length > 0) {
          that.bigUrl = this.info.photoUrlList[0]
        }
        let ta = that
        let req2 = {
          followerID: that.$store.state.user.id,
          followID: that.info.authorID
        }
        this.$axios
          .post('http://localhost:8080/follow/checkFollow', req2)
          .then((response) => {
            if (response.data.info === 'Yes') {
              ta.isFollow = true
            } else {
              ta.isFollow = false
            }
          })
          .catch(function (error) {
            console.log(error)
            that.$message.error('网络错误')
          })
      }).catch(function (error) {
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
    let req = {
      userID: that.$store.state.user.id,
      blogID: that.blogID
    }
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
    this.$axios
      .post('http://localhost:8080/thumbsup/checkThumbsUp', req)
      .then((response) => {
        if (response.data.info === 'Yes') {
          that.isThumbsUp = true
        } else {
          that.isThumbsUp = false
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
      hasshoucang: false,
      pageTotal: 0,
      currentPage: 1,
      userID: 0,
      isThumbsUp: false,
      isMe: false,
      isFollow: false
    }
  },
  methods: {
    mark () {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      let time = new Date()
      let timestr = this.$options.methods.dateFtt('yyyy-MM-dd hh:mm:ss', time)
      let req = {
        userID: this.$store.state.user.id,
        blogID: this.info.id,
        time: timestr
      }
      var that = this
      this.$axios
        .post('http://localhost:8080/collect/addCollect', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('收藏成功')
            that.hasshoucang = true
          } else {
            this.$message.error('收藏失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
      console.log('jfekjf')
    },
    unmark () {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      let req = {
        userID: this.$store.state.user.id,
        blogID: this.info.id
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
    thumbsUp () {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      let req = {
        userID: this.$store.state.user.id,
        blogID: this.info.id
      }
      var that = this
      this.$axios
        .post('http://localhost:8080/thumbsup/addThumbsUp', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.isThumbsUp = true
            that.$message.success('点赞成功')
            that.$options.methods.refreshBlog(this, 1)
          } else {
            that.$message.error('点赞失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    thumbsDown () {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      let req = {
        userID: this.$store.state.user.id,
        blogID: this.info.id
      }
      var that = this
      this.$axios
        .post('http://localhost:8080/thumbsup/deleteThumbsUp', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.isThumbsUp = false
            that.$message.success('取消点赞成功')
            that.$options.methods.refreshBlog(this, 1)
          } else {
            that.$message.error('取消点赞失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    readComment () {
      this.$options.methods.refreshBlog(this, 1)
    },
    showBigPic (val) {
      this.bigUrl = this.info.photoUrlList[val]
      console.log(this.bigUrl)
    },
    deleteComment (val) {
      var that = this
      let req = {
        commentID: val,
        blogID: this.blogID
      }
      this.$axios
        .post('http://localhost:8080/comment/deleteComment', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('删除成功')
            that.$options.methods.refreshBlog(this, 1)
          } else {
            that.$message.error('删除失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    deleteBlog () {
      let that = this
      this.$axios
        .get('http://localhost:8080/blog/deleteBlog', {params: {blogID: this.blogID}})
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('删除成功')
            this.$router.go(-1)
          } else {
            that.$message.error('删除失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    tranBlog () {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      let datep = new Date()
      let datestrp = this.$options.methods.dateFtt('yyyy-MM-dd hh:mm:ss', datep)
      var that = this
      let req = {
        blogID: this.info.id,
        userID: this.$store.state.user.id,
        date: datestrp
      }
      this.$axios
        .post('http://localhost:8080/blog/tranBlog', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('转发成功')
            that.$options.methods.refreshBlog(this, 1)
          } else {
            that.$message.error('转发失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    follow () {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      let that = this
      let myDate = new Date()
      let datestr = this.$options.methods.dateFtt('yyyy-MM-dd hh:mm:ss', myDate)
      let req = {
        followerID: this.$store.state.user.id,
        followID: this.info.authorID,
        time: datestr
      }
      this.$axios
        .post('http://localhost:8080/follow/addFollow', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('关注成功')
            that.isFollow = true
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
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      let that = this
      let req = {
        followerID: this.$store.state.user.id,
        followID: this.info.authorID
      }
      this.$axios
        .post('http://localhost:8080/follow/deleteFollow', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('取关成功')
            that.isFollow = false
          } else {
            that.$message.error('取关失败')
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
    sendComment () {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
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
              that.$message.success('评论成功')
              that.$options.methods.refreshBlog(this, 1)
            } else {
              that.$message.error('评论失败')
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
    margin-bottom: 20px;
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
 .resize{
   font-size: 25px;
 }
</style>
