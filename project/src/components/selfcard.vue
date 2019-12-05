<template>
  <el-card id="card" :style="{backgroundImage: 'url(' +input.backgroundUrl+ ')'}" >
    <el-row>
      <el-col :span="2">
      <el-upload
        class="upload-demo"
        action="String"
        :http-request="updateBackground"
        :file-list="fileList"
        :show-file-list="false"
        v-if="isMe">
        <el-button size="small" type="primary">修改背景图</el-button>
      </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-avatar :size="100" :src="input.imageurl" id="head"/>
    </el-row>
    <el-row>
      <div id="name">{{input.name}}</div>
      <div id="signature">{{input.signature}}</div>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'selfcard',
  created () {
    this.userID = this.$cookies.get('selfID')
    if (this.userID == this.$store.state.user.id) {
      this.isMe = true
    } else {
      this.isMe = false
    }
  },
  data () {
    return {
      isMe: true,
      userID: 0
    }
  },
  props: ['input'],
  methods: {
    updateBackground (file) {
      let req = new FormData()
      req.append('userID', this.userID)
      req.append('file', file.file)
      let that = this
      this.$axios
        .post('http://localhost:8080/user/modifyBackground', req)
        .then((response) => {
          let userNew = response.data
          that.input.backgroundUrl = userNew.backgroundUrl
          that.$cookies.set('user', userNew)
          that.$store.commit('editUser', userNew)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #card {
    background-size: cover;
    background-repeat: no-repeat;
  }

  #head {
    margin-top: 40px;
  }

  #name {
    font-style: oblique;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 32px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
</style>
