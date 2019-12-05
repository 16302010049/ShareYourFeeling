<template>
    <el-container>
      <el-aside width="300px">
      </el-aside>
      <el-main>
        <selfcard :input="selfCardInput"/>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1" v-if="isMe">我的动态({{user.blogNum}})</el-menu-item>
          <el-menu-item index="1" v-if="!isMe">他的动态</el-menu-item>
          <el-menu-item index="2" v-if="isMe">我的资料</el-menu-item>
          <el-menu-item index="3" v-if="isMe">我的关注</el-menu-item>
          <el-menu-item index="3" v-if="!isMe">他的关注</el-menu-item>
          <el-menu-item index="4" v-if="isMe">我的粉丝</el-menu-item>
          <el-menu-item index="4" v-if="!isMe">他的粉丝</el-menu-item>
        </el-menu>
        <div v-if="currentIndex==='1'">
          <el-row class="search">
            <el-col :span="1">
              <span style="color: white">Space</span>
            </el-col>
            <el-col :span="10" id="">
              <el-input v-model="input" placeholder="搜索微博" prefix-icon="el-icon-search"/>
            </el-col>
          </el-row>
          <div v-for="card in cardInput" :key="card">
            <card-without-picture v-if="card.photoUrlList.length ===0" :input="card"/>
            <cardwithonepicture v-if="card.photoUrlList.length ===1" :input="card"/>
            <cardwithpictures v-if="card.photoUrlList.length>1" :input="card"/>
          </div>
        </div>
        <div v-if="currentIndex==='2'">
          <el-card id="mycard">
          <editinforform :input="editformInput"></editinforform>
          </el-card>
        </div>
        <div v-if="currentIndex==='3'">
          <el-row class="search">
            <el-col :span="1">
              <span style="color: white">Space</span>
            </el-col>
            <el-col :span="10" >
              <el-input v-model="input" placeholder="搜索粉丝" prefix-icon="el-icon-search"/>
            </el-col>
          </el-row>
          <peoplecard :input="cardInput"></peoplecard>
          <peoplecard :input="cardInput"></peoplecard>
          <peoplecard :input="cardInput"></peoplecard>
        </div>
        <div v-if="currentIndex==='4'">
          <el-row class="search">
            <el-col :span="1">
              <span style="color: white">Space</span>
            </el-col>
            <el-col :span="10" >
              <el-input v-model="input" placeholder="搜索关注" prefix-icon="el-icon-search"/>
            </el-col>
          </el-row>
          <peoplecard :input="cardInput2"></peoplecard>
          <peoplecard :input="cardInput2"></peoplecard>
          <peoplecard :input="cardInput2"></peoplecard>
        </div>
        <el-pagination
          @current-change = "handlePageChange"
          background
          layout="prev, pager, next"
          :page-count="pageSize" id="pages" v-if="currentIndex!=='2'">
        </el-pagination>
      </el-main>
      <el-aside width="300px"></el-aside>
    </el-container>
</template>

<script>
import Selfcard from '../components/selfcard'
import CardWithoutPicture from '../components/cardwithoutpicture'
import Cardwithonepicture from '../components/cardwithonepicture'
import Cardwithpictures from '../components/cardwithpictures'
import Editinforform from '../components/editinforform'
import Peoplecard from '../components/peoplecard'

export default {
  name: 'self',
  components: {
    Peoplecard,
    Editinforform,
    Cardwithpictures,
    Cardwithonepicture,
    CardWithoutPicture,
    Selfcard
  },
  inject: ['reload'],
  data () {
    return {
      user: {},
      userID: 0,
      activeIndex: '1',
      currentIndex: '1',
      selfCardInput: {},
      cardInput: [],
      editformInput: {
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: 'test',
        mailbox: 'test@test.com',
        sex: 'male',
        pass: '123',
        checkpass: '123',
        date1: '2019-8-2',
        signature: '',
        tags: ['JK', 'RK', 'TS']
      },
      cardInput3: {
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: 'Test2',
        gNum: 102,
        fansNum: 102,
        weiboNum: 102,
        signature: '这是他的签名',
        type: 'guanzhu',
        hasgz: true
      },
      cardInput2: {
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: 'Test2',
        gNum: 102,
        fansNum: 102,
        weiboNum: 102,
        signature: '这是他的签名',
        type: 'fans',
        hasgz: true
      },
      isMe: true,
      pageSize: 0
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.currentIndex = key
      if (key === '1') {
        let req = {
          userID: this.userID,
          pageNum: 1,
          pageSize: 4,
          require: ''
        }
        let that = this
        this.$axios
          .post('http://localhost:8080/user/getUserBlogPage', req)
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
    },
    handlePageChange(){

    }
  },
  watch: {
    '$route': function (to, from) {
      this.reload()
    }
  },
  created () {
    this.userID = this.$cookies.get('selfID')
    let that = this
    this.$axios
      .get('http://localhost:8080/user/getOther', {params: {userID: this.userID}})
      .then((response) => {
        if (response.data !== undefined) {
          that.user = response.data
          that.selfCardInput = that.user
        } else {
          that.$message.error('网络错误')
        }
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
    let req = {
      userID: this.userID,
      pageNum: 1,
      pageSize: 4,
      require: ''
    }
    this.$axios
      .post('http://localhost:8080/user/getUserBlogPage', req)
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
</script>

<style scoped>
  #pages{
    margin-top: 30px;
  }
  .search{
    margin-top: 30px;
    margin-bottom: 20px;
  }
  #mycard{
    margin-top: 30px;
  }
</style>
