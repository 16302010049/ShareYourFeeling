<template>
  <el-container>
    <el-aside width="300px"></el-aside>
    <el-main>
  <div id="diwei">请在下方地图进行定位</div>
  <baidu-map class="map" center="北京" @ready = "init">
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true"  @locationError="handleError" @locationSuccess="handleSuccess"/>
  </baidu-map>
    <el-row id="latlngInfo">
      <el-col :span="3">
        <div style="color:white">space</div>
      </el-col>
      <el-col :span="2">
        <div>纬度:</div>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="未定位"
          v-model="latInput"
          :disabled="true">
        </el-input>
      </el-col>
      <el-col :span="1">
        <div style="color:white">space</div>
      </el-col>
      <el-col :span="2">
        <div>经度:</div>
      </el-col>
      <el-col :span="4">
        <el-input
          placeholder="未定位"
          v-model="lngInput"
          :disabled="true">
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" icon="el-icon-search" :disabled="!isDing" @click="searchNearBy">附近的人</el-button>
      </el-col>
    </el-row>
    <peoplecard v-for="cardInput in cardInputs" :key="cardInput" :input="cardInput"/>
    <el-pagination
      :current-page.sync="currentPage"
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
import Peoplecard from '../components/peoplecard'

export default {

  name: 'nearby',
  components: {Peoplecard},
  data () {
    return {
      latInput: '',
      lngInput: '',
      isDing: false,
      cardInputs: [],
      pageSize: 1,
      currentPage: 1
    }
  },
  methods: {
    init ({Bmap, map}) {
      map.enableScrollWheelZoom(true)
    },
    handleError (StatusCode) {
      this.$message.error(StatusCode)
    },
    handleSuccess (res) {
      if (this.$store.state.user.id === undefined) {
        this.$message.error('未登录')
        return
      }
      console.log(res)
      this.latInput = res.point.lat
      this.lngInput = res.point.lng
      var that = this
      let req = {
        userID: this.$store.state.user.id,
        lat: this.latInput,
        lng: this.lngInput
      }
      this.$axios
        .post('http://localhost:8080/geo/addGeo', req)
        .then((response) => {
          if (response.data.info === 'success') {
            that.$message.success('更新定位信息成功')
            this.isDing = true
          } else {
            that.$message.error('更新定位信息失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    searchNearBy () {
      var that = this
      let req = {
        userID: this.$store.state.user.id,
        pageNum: 1,
        pageSize: 4
      }
      this.$axios
        .post('http://localhost:8080/geo/getNearBy', req)
        .then((response) => {
          if (response.data) {
            that.cardInputs = response.data.content
            that.pageSize = response.data.totalPage
            that.currentPage = 1
          } else {
            that.$message.error('获取附近的人失败')
          }
        })
        .catch(function (error) {
          console.log(error)
          that.$message.error('网络错误')
        })
    },
    handlePageChange (val) {
      var that = this
      let req = {
        userID: this.$store.state.user.id,
        pageNum: val,
        pageSize: 4
      }
      this.$axios
        .post('http://localhost:8080/geo/getNearBy', req)
        .then((response) => {
          if (response.data) {
            that.cardInputs = response.data.content
            that.pageSize = response.data.totalPage
          } else {
            that.$message.error('获取附近的人失败')
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
  .map {
    margin-top: 15px;
    width: 100%;
    height: 400px;
  }
  #diwei{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size:30px ;
    font-style: oblique;
    color: deepskyblue;
    margin-top: 20px;
    margin-bottom:20px;
  }
  #latlngInfo{
    margin-top: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size:25px ;
    font-style: oblique;
    color: deepskyblue;
  }
  #pages{
    margin-top: 30px;
  }
</style>
