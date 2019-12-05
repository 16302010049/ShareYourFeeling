<template>
  <el-container>
    <el-aside width="400px" >
      <el-row id="user">
        <el-col :span="4" id="userava">
          <el-avatar :size="50" :src="circleUrl" @click.native="jumpToSelf" style="cursor: pointer"></el-avatar>
        </el-col>
        <el-col :span="4" id="username">
          <div>Test</div>
        </el-col>
      </el-row>
      <el-row id="search">
        <el-input
          placeholder="搜索联系人"
          v-model="input" id="input">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-row>
      <div class="peoplelist">
        <div v-for="(people,index) in peopleList" :key="people" :class="{choose:index===chooseIndex}" @click="chooseMe(index)" style="cursor: pointer">
        <div class="people">
          <el-row>
            <el-row class="people" >
              <el-col :span="4" class="avatar">
                <el-avatar :size="50" :src="people.avatarUrl" @click.native="jumpToOther"></el-avatar>
              </el-col>
              <el-col :span="17">
                <el-row class="name">
                  <div class="infor">{{people.name}}</div>
                </el-row>
                <el-row>
                  <div class="infor">{{people.newMessage}}</div>
                </el-row>
              </el-col>
              <el-col :span="3">
                <el-row>
                  <div class="time">{{people.time}}</div>
                </el-row>
                <el-row>
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
       <div id="chatBoxname">{{parnerName}}</div>
     </el-row>
      <div id="messagebox">
        <qipao v-for="chat in chatList" :key="chat" :input="chat"></qipao>
      </div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容按下Enter发送"
        v-model="textarea" resize="none">
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
      peopleList: [{
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: 'Test',
        newMessage: '这是最新的一条消息',
        time: '10-21',
        newNum: 8
      },
      {
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: 'Test',
        newMessage: '这是最新的一条消息',
        time: '10-21',
        newNum: 12
      },
      {
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: 'Test',
        newMessage: '这是最新的一条消息',
        time: '10-21',
        newNum: 10
      },
      {
        avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        name: 'Test',
        newMessage: '这是最新的一条消息',
        time: '10-21',
        newNum: 9
      }
      ],
      chatList: [
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'left',
          content: '这是左边的第一条消息用来测试换行以及显示效果等'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'right',
          content: '这是右边的第一条消息用来测试换行及显示效果等'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'left',
          content: '这是左边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'right',
          content: '这'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'left',
          content: '这是左边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'right',
          content: '这是右边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'left',
          content: '这是左边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'right',
          content: '这是右边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'left',
          content: '这是左边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'right',
          content: '这是右边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'left',
          content: '这是左边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'right',
          content: '这是右边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'left',
          content: '这是左边的第一条消息'
        },
        {
          avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
          type: 'right',
          content: '这是右边的第一条消息'
        }
      ],
      parnerName: 'Test',
      chooseIndex: -1
    }
  },
  methods: {
    chooseMe (index) {
      this.chooseIndex = index
    },
    jumpToOther () {
      this.$router.push({path: '/self', query: {isme: '0'}})
    },
    jumpToSelf () {
      this.$router.push({path: '/self', query: {isme: '1'}})
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
    margin-top: 10px;
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
    background: #e7e7e7;
  }
  #chatBoxname{
    text-align: left;
    font-size: 32px;
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
