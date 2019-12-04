<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" id="form">
    <el-form-item label="微博内容" class="item" prop="desc" required>
      <el-input type="textarea" v-model="form.desc" :rows="6"></el-input>
    </el-form-item>
    <!--<el-form-item label="类别" class="item" id="type">
      <el-select v-model="form.type" placeholder="请选择微博类型">
        <el-option label="无" value="无"></el-option>
        <el-option label="搞笑" value="搞笑"></el-option>
        <el-option label="社会" value="社会"></el-option>
        <el-option label="电影" value="电影"></el-option>
        <el-option label="体育" value="体育"></el-option>
        <el-option label="美食" value="美食"></el-option>
        <el-option label="动漫" value="动漫"></el-option>
        <el-option label="生活" value="生活"></el-option>
      </el-select>
    </el-form-item>-->
    <el-form-item label="配图" class="item">
      <el-upload
        class="upload-demo"
        action="string"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-change="handleChange"
        :file-list="form.fileList"
        list-type="picture"
        :auto-upload="false"
      >
        <el-button size="small" type="primary">点击选取</el-button>
        <div slot="tip" class="el-upload__tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item class="item">
      <el-button type="primary" @click="submitForm('form')">立即发布</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'weiboform',
  data () {
    var validateDesc = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入微博内容'))
      } else {
        callback()
      }
    }
    return {
      form: {
        desc: '',
        fileList: []
      },
      rules: {
        desc: [{validator: validateDesc, trigger: 'blur'}]
      }
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleChange (file, fileList) {
      file.status = 'success'
      this.form.fileList = fileList
      console.log(this.form.fileList)
    },
    dateFtt (fmt, date) { // author: meizz
      var o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formdata = new FormData()
          if (this.$store.state.user === '') {
            this.$message.error('未登录')
          } else {
            var user = this.$store.state.user
            formdata.append('authorID', user.id)
            var myDate = new Date()
            var datestr = this.$options.methods.dateFtt('yyyy-MM-dd hh:mm:ss', myDate)
            console.log(datestr)
            formdata.append('date', datestr)
            for (var i = 0; i < this.form.fileList.length; i++) {
              formdata.append('files', this.form.fileList[i].raw)
            }
            formdata.append('content', this.form.desc)
            formdata.append('commentNum', 0)
            formdata.append('zanNum', 0)
            formdata.append('tranNum', 0)
            var that = this
            this.$axios
              .post('http://localhost:8080/blog/postBlog', formdata)
              .then((response) => {
                var res = response.data
                if (res.info === 'success') {
                  let temp = this.$store.state.user
                  let blogNum = this.$store.state.user.blogNum
                  blogNum++
                  temp.blogNum = blogNum
                  that.$cookies.set('user', temp)
                  that.$store.commit('editUser', temp)
                  console.log(this.$store.state.user)
                  that.$message.success('发布成功')
                } else {
                  that.message.error('发布失败')
                }
              })
              .catch(function (error) { // 请求失败处理
                console.log(error)
                that.$message.error('网络错误')
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
  #form {
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  .item {
    margin-bottom: 30px;
  }

  #type {
    margin-right: 750px;
  }
</style>
