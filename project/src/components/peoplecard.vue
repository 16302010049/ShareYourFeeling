<template>
    <el-card id="card">
      <el-row>
        <el-col :span="2">
        <el-avatar :size="60" :src="input.imageurl" style="cursor: pointer;" @click.native="jumpToSelf"></el-avatar>
        </el-col>
        <el-col :span="4">
          <el-row>
            <div style="text-align: left">{{input.name}}</div>
          </el-row>
          <el-row>
            <div style="text-align: left">
              关注 {{input.guanNum}}|粉丝 {{input.fansNum}}|微博 {{input.blogNum}}
            </div>
          </el-row>
          <el-row>
            <div style="text-align: left">
              {{input.signature}}
            </div>
          </el-row>
        </el-col>
        <el-col :span="14">
          <div style="color: white">
            space
          </div>
        </el-col>
        <div v-if="input.type==='guanzhu'">
        <el-col :span="4">
          <el-row v-if="!hasguanzhu">
            <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="guanzhu">关注</el-button>
          </el-row>
          <el-row v-if="hasguanzhu">
            <el-button type="danger" icon="el-icon-circle-close" size="small" @click="quguan">取关</el-button>
          </el-row>
          <el-row class="letter">
          <el-button type="primary" icon="el-icon-message" size="small" :disabled="!hasguanzhu">私信</el-button>
          </el-row>
        </el-col>
        </div>
        <div v-if="input.type==='nearby'">
          <el-col :span="4">
            <el-row v-if="!hasguanzhu">
              <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="guanzhu">关注</el-button>
            </el-row>
            <el-row v-if="hasguanzhu">
              <el-button type="danger" icon="el-icon-circle-close" size="small" @click="quguan">取关</el-button>
            </el-row>
            <el-row class="letter">
              <el-button type="primary" icon="el-icon-message" size="small" :disabled="!hasguanzhu">私信</el-button>
            </el-row>
          </el-col>
        </div>
        <div v-if="input.type==='fans'">
          <el-col :span="4">
            <el-row v-if="!hasguanzhu">
              <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="guanzhu">关注</el-button>
            </el-row>
            <el-row v-if="hasguanzhu">
              <el-button type="danger" icon="el-icon-circle-close" size="small" @click="quguan">取关</el-button>
            </el-row>
            <el-row class="letter">
              <el-button type="primary" icon="el-icon-message" size="small" >私信</el-button>
            </el-row>
          </el-col>
        </div>
      </el-row>
    </el-card>
</template>

<script>
export default {
  name: 'peoplecard',
  data () {
    return {
      hasguanzhu: this.input.hasgz
    }
  },
  props: ['input'],
  methods: {
    guanzhu () {
      this.hasguanzhu = true
    },
    quguan () {
      this.hasguanzhu = false
    },
    jumpToSelf () {
      this.$router.push({path: '/self', query: {isme: '0'}})
    }
  }
}
</script>

<style>
  #card{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-style: oblique;
    margin-top: 10px;
  }
  .letter{
    margin-top: 5px;
  }
</style>
