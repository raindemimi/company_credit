<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <span class="top_title">企业信用评价系统</span>
        </div>
        <div class="search">
          <el-input placeholder="请输入内容" v-model="inputValue" @change="setInput" clearable> </el-input>
          <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
        </div>
      </el-header>
      <el-container class="connent">
        <el-aside width="200px">
          <el-menu :unique-opened="true" active-text-color="#ffd04b" text-color="#fff" :collapse-transition="false" :router="true" background-color="#545c64" default-active="1">
            <el-menu-item index="1" @click="userInfo">
              <i class="el-icon-user-solid"></i>
              <span slot="title">用户信息</span>
            </el-menu-item>
            <el-menu-item index="2" @click="comment">
              <i class="el-icon-s-comment"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="exit">
              <i class="el-icon-s-unfold"></i>
              <span slot="title">用户退出</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
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
import { mapActions } from 'vuex'
export default {
  props: {},
  data() {
    return {
      inputValue: this.$store.state.input,
      dialogVisible: false
    }
  },
  computed: {},
  created() {
    this.getCompanyList()
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['getCompanyList']),
    setInput() {
      this.$store.commit('initInput', this.inputValue)
    },
    search() {
      this.getCompanyList()
      this.$router.push('/company')
    },
    userInfo() {
      this.$router.push('/user/userinfo')
    },
    comment() {
      this.$router.push('/user/comment')
    },
    exit() {
      this.$router.push('/user/userinfo')
      this.dialogVisible = true
    },
    center() {
      this.dialogVisible = false
      window.sessionStorage.clear()
      this.$router.push('/')
    }
  },
  components: {}
}
</script>

<style scoped>
.el-aside {
  height: 800px;
  /* box-sizing: border-box; */
  background-color: #4f5860;
}
.el-aside .el-menu {
  /* 解决侧边栏和导航框出现边框不一致的情况 */
  border-right: none;
}
.connent {
  margin-top: 80px;
}
</style>
