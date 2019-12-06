<template>
      <el-main>
        <el-container>
          <el-aside width="300px">
          </el-aside>
          <el-main>
            <el-row id="search">
              <el-col :span="5">
                <span style="color: white">Space</span>
              </el-col>
              <el-col :span="10" >
                <el-input v-model="input" placeholder="搜索收藏的内容" @input="search" prefix-icon="el-icon-search"></el-input>
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
              :page-count="pageSize"
              layout="prev, pager, next"
             id="pages">
            </el-pagination>
          </el-main>
          <el-aside width="300px"></el-aside>
        </el-container>
      </el-main>
</template>

<script>
import Cardwithpictures from '../components/cardwithpictures'
import CardWithoutPicture from '../components/cardwithoutpicture'
import Cardwithonepicture from '../components/cardwithonepicture'
export default {
  name: 'collect',
  components: {Cardwithonepicture, CardWithoutPicture, Cardwithpictures},
  created () {
    let req = {
      userID: this.$store.state.user.id,
      pageNum: 1,
      pageSize: 4,
      str: ''
    }
    var that = this
    this.$axios
      .post('http://localhost:8080/user/getCollect', req)
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
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
  },
  data () {
    return {
      cardInput: [],
      pageSize: 1,
      currentPage: 1,
      input: ''
    }
  },
  methods: {
    handlePageChange (val) {
      this.$options.methods.searchCollect(this, val, this.input)
    },
    search () {
      this.currentPage = 1
      this.$options.methods.searchCollect(this, 1, this.input)
    },
    searchCollect (context, pageNum, str) {
      let req = {
        userID: context.$store.state.user.id,
        pageNum: pageNum,
        pageSize: 4,
        str: str
      }
      var that = context
      context.$axios
        .post('http://localhost:8080/user/getCollect', req)
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
  #pages{
    margin-top: 30px;
  }
</style>
