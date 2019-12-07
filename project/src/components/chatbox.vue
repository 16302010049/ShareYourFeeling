<template>
  <el-container>
    <el-aside width="400px" >
      <el-row id="user">
        <el-col :span="4" id="userava">
          <el-avatar :size="50" :src="user.imageurl" @click.native="jumpToSelf" style="cursor: pointer"></el-avatar>
        </el-col>
        <el-col :span="4" id="username">
          <div>{{user.name}}</div>
        </el-col>
      </el-row>
      <el-row id="search">
        <el-input
          placeholder="搜索联系人"
          v-model="input" id="input"
         @input="handleInput">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-row>
      <div class="peoplelist">
        <div v-for="(people,index) in peopleList" :key="people" :class="{choose:index===chooseIndex}" @click="chooseMe(index)" style="cursor: pointer">
        <div class="people">
          <el-row>
            <el-row class="people" >
              <el-col :span="4" class="avatar">
                <el-avatar :size="50" :src="people.imageurl" @click.native="jumpToOther(index)"></el-avatar>
              </el-col>
              <el-col :span="17">
                <el-row class="name">
                  <div class="infor">{{people.name}}</div>
                </el-row>
              </el-col>
            </el-row>
          </el-row>
        </div>
        <hr>
        </div>
      </div>
    </el-aside>
    <el-main id="chatBox">
     <el-row>
       <el-col :span="8">
       <div id="chatBoxname">{{parnerName}}</div>
       </el-col>
       <el-col :span="4">
       <el-button type="primary" icon="el-icon-refresh"  @click="refresh" v-if="chooseIndex>=0">刷新</el-button>
       </el-col>
     </el-row>
      <div id="messagebox">
        <qipao v-for="chat in chatList" :key="chat" :input="chat"></qipao>
      </div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容按下Enter发送"
        v-model="textarea" resize="none"
       @keyup.enter.native="inputChat"
        v-if="chooseIndex>=0">
      </el-input>
    </el-main>
  </el-container>
</template>

<script>
import Qipao from './qipao'
export default {
  name: 'chatbox',
  components: {Qipao},
  data () {
    return {
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      input: '',
      textarea: '',
      peopleList: [],
      chatList: [],
      parnerName: '未选择联系人',
      chooseIndex: -1,
      user: {}
    }
  },
  created () {
    this.user = this.$store.state.user
    let req = {
      userID: this.user.id,
      str: ''
    }
    this.peopleList = []
    var that = this
    this.$axios
      .post('http://localhost:8080/user/getChatList', req)
      .then((response) => {
        that.peopleList = response.data
      })
      .catch(function (error) {
        console.log(error)
        this.$message.error('网络错误')
      })
  },
  methods: {
    chooseMe (index) {
      this.chooseIndex = index
      this.textarea = ''
      this.parnerName = this.peopleList[index].name
      let req = {
        userIDSmall: Math.min(this.user.id, this.peopleList[index].id),
        userIDBig: Math.max(this.user.id, this.peopleList[index].id)
      }
      var that = this
      this.chatList = []
      this.$axios
        .post('http://localhost:8080/user/getChat', req)
        .then((response) => {
          console.log(response)
          let message = JSON.parse(response.data.content)
          console.log(message)
          for (let i = 0; i < message.length; i++) {
            if (message[i].userID === that.user.id) {
              let temp = {
                avatarUrl: that.user.imageurl,
                type: 'right',
                content: message[i].content
              }
              that.chatList.push(temp)
            } else {
              let temp = {
                avatarUrl: that.peopleList[index].imageurl,
                type: 'left',
                content: message[i].content
              }
              that.chatList.push(temp)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
          this.$message.error('网络错误')
        })
    },
    handleInput (val) {
      this.chooseIndex = -1
      this.chatList = []
      this.parnerName = '未选择联系人'
      let req = {
        userID: this.user.id,
        str: val
      }
      this.peopleList = []
      var that = this
      this.$axios
        .post('http://localhost:8080/user/getChatList', req)
        .then((response) => {
          that.peopleList = response.data
        })
        .catch(function (error) {
          console.log(error)
          this.$message.error('网络错误')
        })
    },
    refresh () {
      this.parnerName = this.peopleList[this.chooseIndex].name
      let req = {
        userIDSmall: Math.min(this.user.id, this.peopleList[this.chooseIndex].id),
        userIDBig: Math.max(this.user.id, this.peopleList[this.chooseIndex].id)
      }
      var that = this
      this.chatList = []
      this.$axios
        .post('http://localhost:8080/user/getChat', req)
        .then((response) => {
          console.log(response)
          let message = JSON.parse(response.data.content)
          console.log(message)
          for (let i = 0; i < message.length; i++) {
            if (message[i].userID === that.user.id) {
              let temp = {
                avatarUrl: that.user.imageurl,
                type: 'right',
                content: message[i].content
              }
              that.chatList.push(temp)
            } else {
              let temp = {
                avatarUrl: that.peopleList[this.chooseIndex].imageurl,
                type: 'left',
                content: message[i].content
              }
              that.chatList.push(temp)
            }
          }
        })
        .catch(function (error) {
          console.log(error)
          this.$message.error('网络错误')
        })
    },
    inputChat () {
      var inp = this.textarea.replace(/[\r\n]/g, '')
      if (inp !== '') {
        let chat = {
          userID: this.user.id,
          content: inp
        }
        let req = {
          userIDSmall: Math.min(this.user.id, this.peopleList[this.chooseIndex].id),
          userIDBig: Math.max(this.user.id, this.peopleList[this.chooseIndex].id),
          content: JSON.stringify(chat)
        }
        var that = this
        this.$axios
          .post('http://localhost:8080/user/addChat', req)
          .then((response) => {
            if (response.data.info === 'success') {
              let temp = {
                avatarUrl: that.user.imageurl,
                type: 'right',
                content: inp
              }
              that.chatList.push(temp)
            } else {
              this.$message.error('网络错误')
            }
          })
          .catch(function (error) {
            console.log(error)
            this.$message.error('网络错误')
          })
      } else {
        this.$message.error('请输入内容')
      }
    },
    jumpToOther (index) {
      this.$cookies.set('selfID', this.peopleList[index].id)
      this.$router.push('/self-' + new Date().toTimeString())
    },
    jumpToSelf () {
      this.$cookies.set('selfID', this.user.id)
      this.$router.push('/self-' + new Date().toTimeString())
    }
  }
}
</script>

<style scoped>
  #user {
    background: #409EFF;
    color: white;
    font-size: 32px;
  }

  #userava {
    margin-top: 5px;
  }

  #username {
    margin-top: 10px;
  }

  #search {
    background: deepskyblue;
  }

  .people {
    color: white;
  }

  .avatar {
    margin-top: 5px;
  }

  .name {
    margin-top: 18px;
    font-size: 25px;
  }

  #input {
    background: #409EFF;
    color: #409EFF;
  }

  .infor {
    text-align: left;
  }

  .time {
    margin-top: 5px;
    font-size: 12px;
  }

  .peoplelist {
    background: #409EFF;
    color: white;
    height: 700px;
    overflow: auto;
  }

  hr {
    color: white;
    width: 90%;
    margin-bottom: 0;
  }
  #chatBox{
    background: rgba(236, 235, 238, 0.77);
  }
  #chatBoxname{
    text-align: left;
    font-size: 25px;
    color: #a9a9a9;
    margin-bottom: 30px;
  }
  #messagebox{
    height: 600px;
    overflow: auto;
  }
  .item{
    margin-top: 10px;
  }
  .choose{
    background: #2d8ce1;
  }
</style>
