<template>
   <el-container>
   <el-aside width="400px"></el-aside>
   <el-main>
     <div id="post">发表一下想法吧</div>
     <weiboform></weiboform>
   </el-main>
   <el-aside width="400px"></el-aside>
   </el-container>
</template>

<script>
import Weiboform from '../components/weiboform'
export default {
  name: 'post',
  components: {Weiboform}
}
</script>

<style scoped>
 #post{
   font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
   font-size:32px ;
   font-style: oblique;
   color: deepskyblue;
   margin-top: 20px;
   margin-bottom:40px;
 }
</style>
