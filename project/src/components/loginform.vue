<template>
  <div>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="fontclass">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="form.name" clearable ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" autocomplete="off" clearable></el-input>
    </el-form-item>
  </el-form>
    <el-button type="primary" id="loginbutton" @click.native="submitForm('form')">登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'loginform',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        password: ''
      },
      usr: {},
      rules: {
        name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, validator: validatePass, trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var that = this
          this.$axios
            .post('http://localhost:8080/login', {name: that.form.name, password: that.form.password})
            .then((response) => {
              console.log(response)
              that.usr = response.data
              if (that.usr) {
                that.$options.methods.loginin(that)
              } else {
                that.$message.error('用户名或密码错误')
              }
            })
            .catch(function (error) { // 请求失败处理
              console.log(error)
              console.log(that.form.name)
              that.$message.error('网络错误')
              that.$options.methods.loginin(that)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    loginin (context) {
      context.$cookies.set('login', '2')
      context.$store.commit('editLogin', '2')
      console.log(context.$store.state.haslogin)
      context.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .fontclass{
    margin-top: 30px;
  }
  #loginbutton{
    width: 350px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
