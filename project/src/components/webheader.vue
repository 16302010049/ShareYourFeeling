<template>
  <el-row class="title">
    <el-col :span="3"><h1 class="blog">ShareYourFeeling</h1></el-col>
    <el-col :span="5">
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="#ffd04b"
        id="menu">
        <el-menu-item index="1" v-on:click="goToIndex()">广场</el-menu-item>
        <el-menu-item index="2" v-on:click="goToPost()">发动态</el-menu-item>
        <el-menu-item index="3" @click="goToNearby()">附近的人</el-menu-item>
        <el-menu-item index="4" @click.native="goToFriend">好友推荐</el-menu-item>
      </el-menu>
    </el-col>
    <div v-if="user===''">
      <el-col :span="13">
        <div style="color:#409EFF;">Space</div>
      </el-col>
      <el-col :span="1">
        <el-avatar :size="50" :src="circleUrl" class="avatar"></el-avatar>
      </el-col>
      <el-col :span="1.5">
        <div class="res">
          <span class="clickAble" v-on:click="goToLogin()">登录</span>
          <span>|</span>
          <span class="clickAble" v-on:click="goToRegister()">注册</span>
        </div>
      </el-col>
    </div>
    <div v-if="user!==''">
      <el-col :span="13">
        <div style="color:#409EFF;">Space</div>
      </el-col>
      <el-col :span="1">
        <el-avatar :size="50" :src="circleUrl" class="avatar"></el-avatar>
      </el-col>
      <el-col :span="1">
        <el-dropdown>
          <div class="el-dropdown-link">
            {{user.name}}<i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-s-home" @click.native="goToSelf">主页</el-dropdown-item>
            <el-dropdown-item icon="el-icon-chat-dot-round" @click.native="goToMessage">消息<el-badge value="12" class="item"></el-badge></el-dropdown-item>
            <el-dropdown-item icon="el-icon-star-on" @click.native="goToCollect">收藏</el-dropdown-item>
            <el-dropdown-item icon="el-icon-switch-button" @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'webheader',
  data () {
    return {
      input: '',
      activeIndex: '0',
      activeIndex2: '0',
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      user: ''
    }
  },
  created () {
    console.log(this.$cookies.get('user'))
    this.user = this.$cookies.isKey('user') ? this.$cookies.get('user') : ''
    this.$store.commit('editUser', this.user)
    if (this.user !== '') {
      this.circleUrl = this.user.imageurl
    }
    console.log(this.user.imageurl)
  },
  computed: {
    /**
     * @return {boolean}
     */
    ListenUser () {
      return this.$store.state.user
    }
  },
  watch: {
    ListenUser: function (old) {
      this.user = old
      if (this.user !== null) { this.circleUrl = this.user.imageurl === undefined ? 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' : this.user.imageurl } else { this.circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' }
      console.log(this.user)
    }
  },
  methods: {
    goToRegister () {
      this.$router.push('/register')
    },
    goToLogin () {
      this.$router.push({path: '/login'})
    },
    goToIndex () {
      this.$router.push('/')
    },
    goToPost () {
      this.$router.push('/post')
    },
    goToSelf () {
      this.$router.push({path: '/self', query: {isme: '1'}})
    },
    goToMessage () {
      this.$router.push('/message')
    },
    goToCollect () {
      this.$router.push('/collect')
    },
    goToNearby () {
      this.$router.push('/nearby')
    },
    goToFriend () {
      this.$router.push('/findfriend')
    },
    logout () {
      this.$store.commit('editUser', '')
      console.log(this.$store.state.user)
      this.$cookies.remove('user')
      this.$message.success('成功退出')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .title {
    background-color: #409EFF;
  }

  .blog {
    text-align: left;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    font-size: 22px;
    margin-left: 10px;
    font-style: italic;
  }

  .res {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    color: white;
    margin-top: 20px;
  }

  #menu {
    margin-top: 4px;
    margin-bottom: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .avatar {
    margin-top: 5px;
  }

  .clickAble {
    cursor: pointer;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: white;
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin-top: 20px;
    font-style: oblique;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .item {
  }
</style>
