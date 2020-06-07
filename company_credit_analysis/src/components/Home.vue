<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <img class="avatar" src="../assets/logo.png" alt="头像" />
          <span class="title">企业信用评价系统</span>
        </div>
        <div v-if="token">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar size="small" src="../assets/images/user_image/my.jpg"></el-avatar><span class="mycent">个人中心<i class="el-icon-arrow-down el-icon--right"></i></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="userinfo">用户信息</el-dropdown-item>
              <el-dropdown-item command="comment">评论管理</el-dropdown-item>
              <el-dropdown-item command="exit">用户退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else>
          <el-button type="info" @click="login">登录</el-button>
          <el-button type="info" @click="register">注册</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="top">
          <h1>企业信用评价系统</h1>

          <div class="pre">
            <p>
              该平台为您提供一站式信用信息查询服务，帮助您高效快捷地了解企业的注册信息、历史沿革、股权结构、企业及法人对外投资、法人代表对外任职等信息，同时还会提供涉诉记录、行政处罚等负面记录。
            </p>
          </div>
        </div>

        <div class="search">
          <el-input placeholder="请输入内容" @change="setInput" v-model="inputValue" clearable> </el-input>
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </div>
        <!-- 外链网站组件信息 -->
        <div class="website">
          <div class="box" v-for="item in website" :key="item.id" :class="{ mouseover: id === item.id }" v-on:mouseover="changeActived(item.id)" v-on:mouseout="removeActived" @click="route(item.url)">
            <h1>{{ item.name }}</h1>
            <br />
            <span>{{ item.introdution }}</span>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div>
          <span>联系我们：010-85158328</span>
        </div>
      </el-footer>
    </el-container>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>退出之后将会返回首页，不可查看信息，是否确定退出</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="center">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      id: '',
      inputValue: '',
      token: window.sessionStorage.getItem('token'),
      dialogVisible: false
    }
  },
  computed: {
    ...mapState(['input', 'website'])
  },
  created() {
    this.getWebsite()
  },
  methods: {
    ...mapActions(['getCompanyList', 'getWebsite']),
    register() {
      window.sessionStorage.clear()
      this.$router.push('/register')
    },
    login() {
      this.$router.push('/login')
    },
    setInput() {
      this.search()
      this.$store.commit('initInput', this.inputValue)
    },
    search() {
      this.getCompanyList()
      this.$router.push('/company')
    },
    changeActived(id) {
      this.id = id
    },
    removeActived() {
      this.id = 0
    },
    route(url) {
      window.location.href = url
    },
    handleCommand(command) {
      if (command === 'exit') {
        this.dialogVisible = true
      } else {
        this.$router.push('/user/' + command)
      }
    },
    center() {
      this.dialogVisible = false
      window.sessionStorage.clear()
      this.token = false
    }
  }
}
</script>

<style lang="css" scoped>
.el-header {
  background-color: #eff3f4;
}
.avatar,
.user {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.el-header span {
  margin-left: 15px;
  color: #253f50;
}
.title {
  font-size: 25px;
  font-weight: 700;
}
div {
  display: flex;
  align-items: center;
  font-size: 20px;
}
.el-main {
  /* background-color: blue; */
  margin: 0;
  padding: 0;
}
.top {
  width: 100%;
  height: 600px;
  background-image: url('../assets/images/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.top h1 {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 60px;
}
.top .pre {
  margin: 200px 100px;
  font-size: 30px;
}
.search {
  margin: 50px 100px;
}
.search .el-button {
  width: 100px;
  background-color: #03a9f4;
}
.el-footer {
  /* background-color: yellow; */
  display: flex;
  align-content: center;
  justify-content: center;
}
.el-footer span {
  color: #373d41;
  font-size: 15px;
}
/* flex布局 */
.website {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px;
}
.website .box {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  width: 350px;
  height: 350px;
  padding: 20px;
  box-sizing: border-box;
  color: rgb(68, 67, 67) !important;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  transition: 2s;
}
.box:nth-child(2),
.box:nth-child(5) {
  margin: 50px 50px;
}
.box span {
  color: rgb(68, 67, 67);
}
.mouseover {
  background-color: rgb(146, 255, 219);
  transition: background-color 2s linear;
  cursor: pointer;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.el-avatar {
  margin-top: 6px;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.mycent {
  height: 38px;
  line-height: 38px;
  margin-left: 4px !important;
}
</style>
