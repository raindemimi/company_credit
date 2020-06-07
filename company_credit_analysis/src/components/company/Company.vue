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

      <el-main>
        <!-- 普通企业信息导航 -->
        <table :class="{ box: id === item.id }" v-for="item in companyList" :key="item.id" v-on:mouseover="changeActived(item.id)" @click="route(item.id)" v-on:mouseout="removeActived">
          <thead>
            <tr>
              <td colspan="2">
                <h4>{{ item.name }}</h4>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>企业状态</td>
              <td>{{ item.biz_status }}</td>
            </tr>
            <tr>
              <td>法人代表</td>
              <td>{{ item.representative }}</td>
            </tr>
            <tr>
              <td>注册资本</td>
              <td>{{ item.registered_capital }}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{ item.phone }}</td>
            </tr>
            <tr>
              <td>邮箱</td>
              <td>{{ item.email }}</td>
            </tr>
            <tr>
              <td>企业地址</td>
              <td>{{ item.address }}</td>
            </tr>
            <tr v-if="item.homepage">
              <td>企业网址</td>
              <td>
                <a :href="'http://' + item.homepage">{{ item.homepage }}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- 上市企业信息导航 -->
        <table
          v-show="company2List ? (active = true) : (active = false)"
          :class="{ box: id === item.id }"
          v-for="item in company2List"
          :key="item.code"
          v-on:mouseover="changeActived(item.id)"
          @click="company2_route(item.code)"
          v-on:mouseout="removeActived"
        >
          <thead>
            <tr>
              <td colspan="2">
                <h4>{{ item.company_name }}</h4>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>企业状态</td>
              <td>已上市</td>
            </tr>
            <tr>
              <td>董事会主席</td>
              <td>{{ item.chair }}</td>
            </tr>
            <tr>
              <td>股票名称</td>
              <td>{{ item.stock_name }}</td>
            </tr>
            <tr>
              <td>股票代码</td>
              <td>{{ item.code }}</td>
            </tr>
            <tr>
              <td>股票类型</td>
              <td>{{ item.stock_type }}</td>
            </tr>
            <tr>
              <td>邮箱</td>
              <td>{{ item.email }}</td>
            </tr>
            <tr>
              <td>电话</td>
              <td>{{ item.phone }}</td>
            </tr>
            <tr>
              <td>企业地址</td>
              <td>{{ item.company_address }}</td>
            </tr>
            <tr v-if="item.url">
              <td>企业网址</td>
              <td>
                <a :href="'http://' + item.url">{{ item.url }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </el-main>
      <el-footer><span>到底了哦，没有更多信息了哈</span></el-footer>
    </el-container>
    <!-- <el-button @click="getCompanyList">获取</el-button> -->
    <!-- <el-button @click="getCompany">获取2</el-button> -->
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
export default {
  props: {},
  data() {
    return {
      active: false,
      id: -1,
      inputValue: this.$store.state.input
    }
  },
  computed: {
    ...mapState(['companyList', 'company2List'])
  },
  created() {
    this.getCompanyList()
    this.getCompany2List()
    // console.log(this.company2List)
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['getCompanyList', 'getCompany2List']),
    ...mapMutations(['getCompanyById', 'getCompanyCode']),
    // 设置鼠标经过表格高亮事件
    changeActived(id) {
      this.id = id
    },
    removeActived() {
      this.id = 0
    },
    route(id) {
      this.getCompanyById(id)
      this.$router.push('/basic')
    },
    setInput() {
      this.$store.commit('initInput', this.inputValue)
    },
    search() {
      this.getCompanyList()
    },
    company2_route(code) {
      this.getCompanyCode(code)
      this.$router.push('/stock')
    }

    // async getCompany() {
    //   const res = await this.$http.post('selectCompany', {
    //     name: '腾讯'
    //   })
    //   console.log(res)
    // }
  },
  components: {}
}
</script>

<style scoped lang="css">
.el-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.el-header {
  top: 0%;
}
.el-main {
  margin-top: 80px;
  width: 1000px;
  border: 1px solid #eee;
  padding: 0;
  margin-bottom: 80px;
}
table {
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #eee;
  width: 100%;
  padding: 10px;
  /* text-align: center; */
  /* border-collapse: collapse; */
}
table:nth-child(2n) {
  background-color: #eec;
}
table:last-child {
  border-width: 0;
}
table tr td:first-child {
  width: 30%;
}
.box {
  background-color: #eecccc !important;
}
</style>
