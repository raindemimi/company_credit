<template>
  <div>
    <el-card>
      <el-form label-width="80px" label-position="top">
        <el-form-item label="用户名称">
          <el-input v-model="userinfo.nickname" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户登录名">
          <el-input v-model="userinfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户密码">
          <el-input type="password" v-model="userinfo.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userinfo.email" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userinfo.tel" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      userinfo: [],
      token: window.sessionStorage.getItem('token')
    }
  },
  computed: {},
  created() {
    this.getUser()
  },
  mounted() {},
  watch: {},
  methods: {
    async getUser() {
      await this.$http
        .get('user/selectByToken', {
          params: {
            token: this.token
          }
        })
        .then(res => {
          this.userinfo = res.data[0]
          // console.log('用户信息', this.userinfo)
        })
    }
  },
  components: {}
}
</script>

<style scoped>
.el-form-item {
  width: 800px;
}
.el-card {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>
