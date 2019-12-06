<template>
      <el-main>
      <el-container>
        <el-aside width="300px">
              <!--<el-menu
                default-active="1"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#409EFF"
                text-color="#fff"
                active-text-color="gold">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">热门</span>
                </el-menu-item>
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">最新</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-menu"></i>
                  <span slot="title">关注</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <i class="el-icon-menu"></i>
                  <span slot="title">搞笑</span>
                </el-menu-item>
                <el-menu-item index="5">
                  <i class="el-icon-menu"></i>
                  <span slot="title">社会</span>
                </el-menu-item>
                <el-menu-item index="6">
                  <i class="el-icon-menu"></i>
                  <span slot="title">电影</span>
                </el-menu-item>
                <el-menu-item index="7">
                  <i class="el-icon-menu"></i>
                  <span slot="title">体育</span>
                </el-menu-item>
                <el-menu-item index="8">
                  <i class="el-icon-menu"></i>
                  <span slot="title">美食</span>
                </el-menu-item>
                <el-menu-item index="9">
                  <i class="el-icon-menu"></i>
                  <span slot="title">动漫</span>
                </el-menu-item>
                <el-menu-item index="10">
                  <i class="el-icon-menu"></i>
                  <span slot="title">生活</span>
                </el-menu-item>
              </el-menu>-->
        </el-aside>
        <el-main>
          <el-row id="searchme">
            <el-col :span="7">
              <span style="color: white">Space</span>
            </el-col>
          <el-col :span="10" >
            <el-input v-model="input" placeholder="搜索感兴趣的内容或人" prefix-icon="el-icon-search" @input="handleInputChange"/>
          </el-col>
          </el-row>
          <div v-for="card in cardInput" :key="card">
            <card-without-picture v-if="card.photoUrlList.length ===0" :input="card"/>
            <cardwithonepicture v-if="card.photoUrlList.length ===1" :input="card"/>
            <cardwithpictures v-if="card.photoUrlList.length>1" :input="card"/>
          </div>
          <el-pagination
            @current-change = "handlePageChange"
              background
            :current-page.sync="currentPage"
            layout="prev, pager, next"
            :page-count="pageSize" id="pages"
            >
          </el-pagination>
        </el-main>
        <el-aside width="300px"/>
      </el-container>
      </el-main>
</template>

<script>
import CardWithoutPicture from '../components/cardwithoutpicture'
import Cardwithonepicture from '../components/cardwithonepicture'
import Cardwithpictures from '../components/cardwithpictures'
export default {
  name: 'index',
  data () {
    return {
      input: '',
      pageSize: 0,
      cardInput: [],
      currentPage: 1,
      isInSearch: false
    }
  },
  created () {
    var first = {
      pageNum: 1,
      pageSize: 4
    }
    var that = this
    this.$axios
      .post('http://localhost:8080/blog/getBlog', first)
      .then((response) => {
        that.cardInput = []
        that.pageSize = response.data.totalPage
        for (var i = 0; i < response.data.content.length; i++) {
          console.log(response.data.content[i].avatarUrl)
          var temp = {
            id: response.data.content[i].id,
            photoUrlList: JSON.parse(response.data.content[i].imageList),
            avatarurl: response.data.content[i].imageurl,
            chatnum: response.data.content[i].commentNum,
            trannum: response.data.content[i].tranNum,
            zannum: response.data.content[i].zanNum,
            name: response.data.content[i].name,
            content: response.data.content[i].content,
            time: response.data.content[i].date,
            authorID: response.data.content[i].authorID
          }
          console.log(temp)
          that.cardInput.push(temp)
        }
        console.log(that.cardInput)
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
  },
  components: {Cardwithpictures, Cardwithonepicture, CardWithoutPicture},
  methods: {
    jumptodetail () {
      this.$router.push('/detail')
    },
    handlePageChange (val) {
      if (this.input === '') {
        this.$options.methods.getAllRequest(val, this)
      } else {
        this.$options.methods.searchBlogByStr(this, this.input, val)
      }
    },
    handleInputChange (val) {
      if (val !== '') {
        this.isInSearch = true
        this.currentPage = 1
        this.$options.methods.searchBlogByStr(this, val, 1)
      } else {
        this.currentPage = 1
        this.$options.methods.getAllRequest(1, this)
      }
    },
    getAllRequest (val, context) {
      var first = {
        pageNum: val,
        pageSize: 4
      }
      var that = context
      context.$axios
        .post('http://localhost:8080/blog/getBlog', first)
        .then((response) => {
          that.cardInput = []
          that.pageSize = response.data.totalPage
          for (var i = 0; i < response.data.content.length; i++) {
            console.log(response.data.content[i].avatarUrl)
            var temp = {
              id: response.data.content[i].id,
              photoUrlList: JSON.parse(response.data.content[i].imageList),
              avatarurl: response.data.content[i].imageurl,
              chatnum: response.data.content[i].commentNum,
              trannum: response.data.content[i].tranNum,
              zannum: response.data.content[i].zanNum,
              name: response.data.content[i].name,
              content: response.data.content[i].content,
              time: response.data.content[i].date,
              authorID: response.data.content[i].authorID
            }
            console.log(temp)
            that.cardInput.push(temp)
          }
          console.log(that.cardInput)
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    searchBlogByStr (context, input, pageNum) {
      var req = {
        searchStr: input,
        pageNum: pageNum,
        pageSize: 4
      }
      var that = context
      context.$axios
        .post('http://localhost:8080/blog/searchBlog', req)
        .then((response) => {
          that.cardInput = []
          that.pageSize = response.data.totalPage
          for (var i = 0; i < response.data.content.length; i++) {
            console.log(response.data.content[i].avatarUrl)
            var temp = {
              id: response.data.content[i].id,
              photoUrlList: JSON.parse(response.data.content[i].imageList),
              avatarurl: response.data.content[i].imageurl,
              chatnum: response.data.content[i].commentNum,
              trannum: response.data.content[i].tranNum,
              zannum: response.data.content[i].zanNum,
              name: response.data.content[i].name,
              content: response.data.content[i].content,
              time: response.data.content[i].date,
              authorID: response.data.content[i].authorID
            }
            console.log(temp)
            that.cardInput.push(temp)
          }
          console.log(that.cardInput)
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
  #searchbox{
    width: 400px;
  }
  i{
    color: white;
  }
  #test{
  }
  #searchme{
    margin-bottom: 20px;
  }
  #pages{
    margin-top: 30px;
  }
</style>
