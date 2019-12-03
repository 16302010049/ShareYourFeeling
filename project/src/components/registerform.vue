<template>
  <el-form ref="form" :model="form" :rules="rules"  label-width="80px" id="form">
     <el-form-item label="头像" prop="imageUrl" required>
       <el-upload
         class="avatar-uploader"
         action="http://localhost:80"
         :show-file-list="false"
         :on-change="beforeAvatarSet"
         :auto-upload="false"
         ref="upload"
         >
         <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar" alt="Your avatar">
         <i v-else class="el-icon-plus avatar-uploader-icon"></i>
       </el-upload>
     </el-form-item>
     <el-form-item label="用户名" prop="name" required>
       <el-input v-model="form.name" class="messageInput" clearable></el-input>
     </el-form-item>
    <el-form-item label="邮箱" prop="mailbox" required>
      <el-input v-model="form.mailbox" class="messageInput" clearable></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex" required>
      <el-select v-model="form.sex" placeholder="请选择性别"  class="fontclass">
        <el-option label="男" value="male"></el-option>
        <el-option label="女" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="生日" prop="birthday" required>
        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
    <el-form-item label="签名" prop="signature" required>
      <el-input v-model="form.signature" class="messageInput" clearable></el-input>
    </el-form-item>
    <el-form-item label="标签" >
      <tags @update="updateTags" :closeable="closeable" :input="form.tags"></tags>
    </el-form-item>
    <el-form-item label="密码" prop="pass" required>
      <el-input type="password" v-model="form.pass" autocomplete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass" required>
      <el-input type="password" v-model="form.checkPass" autocomplete="off" clearable></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')" class="button">立即注册</el-button>
      <el-button @click="resetForm('form')" class="button">重置</el-button>
    </el-form-item>
   </el-form>
</template>

<script>
import Tags from './tags'
export default {
  name: 'registerform',
  components: {Tags},
  data () {
    var validateAvatar = (rule, value, callback) => {
      if (!this.form.imageUrl) {
        console.log('me')
        callback(new Error('未选择头像'))
      } else {
        callback()
      }
    }
    var validateName = (rule, value, callback) => {
      if (value.length === 0 || value.length > 10) {
        console.log(value)
        callback(new Error('用户名应为1到10个字符'))
      } else {
        callback()
      }
    }
    var validateMailbox = (rule, value, callback) => {
      var ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (!ePattern.test(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    var validateSex = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('未选择性别'))
      } else {
        callback()
      }
    }
    var validateBirthday = (rule, value, callback) => {
      if (value === '') {
        console.log(value)
        callback(new Error('未选择生日'))
      } else {
        callback()
      }
    }
    var validateSignature = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('未写签名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
      if (!pPattern.test(value)) {
        callback(new Error('密码至少6位，并且包含数字、大小写字母与特殊字符'))
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      closeable: true,
      form: {
        imageUrl: '',
        name: '',
        mailbox: '',
        sex: '',
        pass: '',
        checkpass: '',
        birthday: '',
        signature: '',
        tags: [],
        file: ''
      },
      rules: {
        imageUrl: [
          {validator: validateAvatar, trigger: 'blur'}
        ],
        name: [
          {validator: validateName, trigger: 'blur'}
        ],
        mailbox: [
          {validator: validateMailbox, trigger: 'blur'}
        ],
        sex: [
          {validator: validateSex, trigger: 'blur'}
        ],
        birthday: [
          {validator: validateBirthday, trigger: 'blur'}
        ],
        signature: [
          {validator: validateSignature, trigger: 'blur'}
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    beforeAvatarSet (file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg'
      const isLt2M = file.raw.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      if (isJPG && isLt2M) {
        this.form.file = file.raw
        this.form.imageUrl = URL.createObjectURL(file.raw)
      }
      return isJPG && isLt2M
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formdata = new FormData()
          formdata.append('file', this.form.file)
          formdata.append('id', 1)
          formdata.append('name', this.form.name)
          formdata.append('mailbox', this.form.mailbox)
          formdata.append('sex', this.form.sex)
          formdata.append('birthday', this.form.birthday)
          formdata.append('signature', this.form.signature)
          formdata.append('tags', JSON.stringify(this.form.tags))
          formdata.append('pass', this.form.pass)
          console.log(formdata.get('file'))
          var that = this
          this.$axios
            .post('http://localhost:8080/user/register', formdata)
            .then((response) => {
              console.log(response)
              var info = response.data
              if (info.info === 'The username is already used') {
                that.$message.error('用户名已存在')
              } else {
                that.$message.success('注册成功')
                that.$router.push('/login')
              }
            })
            .catch(function (error) {
              console.log(error)
              console.log(that.form.name)
              that.$message.error('网络错误')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    updateTags (data) {
      this.form.tags = data
    }
  }
}

</script>

<style scoped>
  #form{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    margin-top: 20px;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .messageInput{

  }
  .fontclass{
    margin-right: 365px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
   }
  .button{
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
</style>
