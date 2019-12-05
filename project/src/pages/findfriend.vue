<template>
      <el-container>
        <el-aside width="300px">
        </el-aside>
        <el-main>
          <el-row>
            <div id="tagtitle">请在下方添加期望的标签:</div>
           </el-row>
          <el-row>
          <tags @update="updateTags" :input="tags" :closeable="closeable"></tags>
          </el-row>
          <el-row>
            <div id="find">
            根据您的标签找的匹配的人如下：
            </div>
          </el-row>
          <peoplecard v-for="cardInput in cardInputs" :key="cardInput" :input="cardInput"></peoplecard>
          <el-pagination
            @current-change = "handlePageChange"
            background
            layout="prev, pager, next"
            :page-count="pageSize" id="pages">
          </el-pagination>
        </el-main>
        <el-aside width="300px"></el-aside>
      </el-container>
</template>

<script>
import Tags from '../components/tags'
import Peoplecard from '../components/peoplecard'
export default {
  name: 'findfriend',
  components: {Peoplecard, Tags},
  created () {
    let req = {
      userID: this.$store.state.user.id,
      pageNum: 1,
      pageSize: 4
    }
    this.cardInputs = []
    var that = this
    this.$axios
      .post('http://localhost:8080/user/getPageUser', req)
      .then((response) => {
        that.pageSize = response.data.totalPage
        that.cardInputs = response.data.content
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  data () {
    return {
      cardInputs: [],
      tags: [],
      closeable: true,
      pageSize: 0
    }
  },
  methods: {
    updateTags (data) {
      this.tags = data
      let req = {
        userID: this.$store.state.user.id,
        pageNum: 1,
        pageSize: 4,
        tags: JSON.stringify(this.tags)
      }
      this.cardInputs = []
      var that = this
      this.$axios
        .post('http://localhost:8080/user/getPageUserTags', req)
        .then((response) => {
          that.pageSize = response.data.totalPage
          that.cardInputs = response.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    handlePageChange (val) {
      let req = {
        userID: this.$store.state.user.id,
        pageNum: val,
        pageSize: 4,
        tags: JSON.stringify(this.tags)
      }
      this.cardInputs = []
      var that = this
      this.$axios
        .post('http://localhost:8080/user/getPageUserTags', req)
        .then((response) => {
          that.pageSize = response.data.totalPage
          that.cardInputs = response.data.content
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
  #tagtitle{
    font-style: oblique;
    color: #409EFF;
    font-size: 30px;
    margin-bottom: 20px;
  }
  #find{
    font-style: oblique;
    color: #409EFF;
    font-size: 30px;
    margin-top: 20px;
  }
  #pages{
    margin-top: 30px;
  }
</style>
