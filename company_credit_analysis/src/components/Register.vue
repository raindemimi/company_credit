<template>
  <el-main>
    <el-form :model="ReginForm" ref="ReginForm" :rules="rule" class="regform" label-width="0">
      <h3>用户注册</h3>

      <el-form-item prop="username">
        <el-input type="text" v-model="ReginForm.username" placeholder="用户名"> </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="ReginForm.password" placeholder="密码"> </el-input>
      </el-form-item>

      <el-form-item prop="confirmpassword">
        <el-input type="password" v-model="ReginForm.confirmpassword" placeholder="确认密码"> </el-input>
      </el-form-item>

      <el-form-item prop="email">
        <el-input type="email" v-model="ReginForm.email" placeholder="电子邮箱"> </el-input>
      </el-form-item>

      <el-form-item prop="tel">
        <el-input type="text" v-model.number="ReginForm.tel" placeholder="电话号码"> </el-input>
      </el-form-item>

      <el-form-item prop="name">
        <el-input type="text" v-model="ReginForm.name" placeholder="昵称"> </el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="success" class="submitBtn" round @click.native.prevent="submit" :loading="logining">
          注册
        </el-button>
        <el-button type="primary" class="resetBtn" round @click.native.prevent="reset">
          重置
        </el-button>
        <hr />
        <p>已经有账号，马上去<span class="to" @click="tologin">登录</span></p>
      </el-form-item>
    </el-form>
  </el-main>
</template>
<script>
export default {
  data() {
    let confirmpasswordCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码是必须的'))
      } else if (value !== this.ReginForm.password) {
        return callback(new Error('两次输入的密码不一致'))
      } else {
        return callback()
      }
    }
    let telCheck = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('电话号码是必须的'))
      } else if (!Number.isInteger(value)) {
        return callback(new Error('电话号码必须是数字'))
      } else if (value.toString().length !== 11) {
        return callback(new Error('电话号码必须是11位数字'))
      } else {
        callback()
      }
    }
    return {
      ReginForm: {
        username: '',
        password: '',
        confirmpassword: '',
        tel: '',
        email: '',
        name: ''
      },
      logining: false,
      rule: {
        username: [
          {
            required: true,
            max: 7,
            min: 5,
            message: '用户名是必须的，长度为5-7位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码是必须的！',
            trigger: 'blur'
          }
        ],
        confirmpassword: [
          {
            required: true,
            validator: confirmpasswordCheck,
            trigger: 'blur'
          }
        ],
        tel: [
          {
            required: true,
            validator: telCheck,
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入正确的电子邮件格式(xxx@xxx.com)',
            trigger: 'blur'
          }
        ],
        name: [
          {
            required: true,
            max: 12,
            min: 2,
            message: '昵称是必须的，最好是汉字',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // ...
    submit() {
      this.$refs.ReginForm.validate(valid => {
        if (valid) {
          this.logining = true
          console.log('开始写入后台数据！')
        } else {
          console.log('submit err')
        }
      })
    },
    reset() {
      this.$refs.ReginForm.resetFields()
    },
    tologin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.el-main {
  background-color: #2b4b6b;
}
.regform {
  margin: 20px auto;
  width: 400px;
  background-color: #fff;
  padding: 30px 30px 0 30px;
}
.submitBtn {
  width: 65%;
}
.to {
  color: #fa5555;
  cursor: pointer;
}
hr {
  margin-top: 20px;
}
h3,
p {
  text-align: center;
}
</style>
