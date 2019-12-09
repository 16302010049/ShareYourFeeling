<template>
    <div>
    <el-form ref="form" :model="form"  :rules="rules" label-width="80px" id="form" :disabled="editable" style="margin-bottom: 20px">
      <el-form-item label="头像" prop="imageurl" required>
        <el-upload
          class="avatar-uploader"
          action="string"
          :show-file-list="false"
          :on-change="beforeAvatarSet"
          :auto-upload="false"
          ref="upload">
          <img v-if="form.imageurl" :src="form.imageurl"  class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="name" required>
        <el-input v-model="form.name" class="messageInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="mailbox" required>
        <el-input v-model="form.mailbox" class="messageInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别"  prop="sex" required>
        <el-select v-model="form.sex" placeholder="请选择性别" class="fontclass" id="sex">
          <el-option label="男" value="male"></el-option>
          <el-option label="女" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="生日"  prop="birthday" required>
        <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="签名" prop="signature" required>
        <el-input v-model="form.signature" class="messageInput" clearable></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <Tags :input="form.tags"  :closeable="closeable" @update="updateTags"></Tags>
      </el-form-item>
      <el-form-item label="密码" prop="pass" required>
        <el-input type="password" v-model="form.pass" autocomplete="off" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input type="password"  v-model="form.checkPass"  auto-complete="off" clearable></el-input>
      </el-form-item>
    </el-form>
      <el-button type="primary" icon="el-icon-edit" @click.native="Edit" v-if="editable">修改</el-button>
      <el-button type="primary" icon="el-icon-success" @click.native="Save('form')" v-if="!editable">保存</el-button>
    </div>
</template>

<script>
import Tags from './tags'

export default {
  name: 'editinforform',
  components: {Tags},
  data () {
    var validateAvatar = (rule, value, callback) => {
      if (!this.form.imageurl) {
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
      imageUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      editable: true,
      form: {
        tags: []
      },
      closeable: false,
      rules: {
        imageurl: [
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
  created () {
    let that = this
    this.$axios
      .get('http://localhost:8080/user/getMyInfo', {params: {userID: this.$store.state.user.id}})
      .then((response) => {
        response.data.checkPass = ''
        that.form = response.data
        that.form.checkPass = that.form.pass
        that.form.tags = JSON.parse(response.data.tags)
        console.log(that.form)
      })
      .catch(function (error) {
        console.log(error)
        that.$message.error('网络错误')
      })
  },
  inject: ['reload'],
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
        this.form.imageurl = URL.createObjectURL(file.raw)
      }
      return isJPG && isLt2M
    },
    Edit () {
      this.editable = false
      this.closeable = true
      console.log('kfkf')
    },
    Save (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var formdata = new FormData()
          if (this.form.file !== undefined) {
            formdata.append('file', this.form.file)
          }
          formdata.append('id', this.$store.state.user.id)
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
            .post('http://localhost:8080/user/editMyInfo', formdata)
            .then((response) => {
              if (response.data.info === 'success') {
                that.$message.success('修改成功')
                let ta = that
                this.$axios
                  .get('http://localhost:8080/user/getMyInfo', {params: {userID: this.$store.state.user.id}})
                  .then((response) => {
                    let userp = response.data
                    ta.$cookies.set('user', userp)
                    ta.$store.commit('editUser', userp)
                  })
                  .catch(function (error) {
                    console.log(error)
                    that.$message.error('网络错误')
                  })
                that.editable = true
                that.closeable = false
                that.reload()
              } else if (response.data.info === '用户名已存在') {
                this.$message.error('用户名已存在')
              } else {
                that.$message.error('修改失败')
              }
            })
            .catch(function (error) {
              console.log(error)
              that.$message.error('网络错误')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    updateTags (data) {
      this.form.tags = data
    }
  }
}
</script>

<style scoped>
  #form {
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

  .fontclass {
    margin-right: 350px;
  }
</style>
