/* eslint-disable no-unused-vars */
<template>
  <div class="box">
    <el-container>
      <el-header>
        <div>
          <span class="top_title">企业信用评价系统</span>
        </div>
        <div class="search">
          <el-input placeholder="请输入内容" v-model="companyByCode.company_name" clearable disabled> </el-input>
          <el-button slot="append" @click="showDrawer">查看评论</el-button>
        </div>
      </el-header>
      <el-main>
        <h1 class="title">{{ companyByCode.company_name }}</h1>
        <!-- 企业上市基本信息 -->
        <div class="information">
          <h3>企业信息</h3>
          <table>
            <tbody>
              <tr>
                <td>股票名称</td>
                <td>{{ companyByCode.stock_name }}</td>
              </tr>
              <tr>
                <td>股票类型</td>
                <td>{{ companyByCode.stock_type }}</td>
              </tr>
              <tr>
                <td>股票代码</td>
                <td>{{ companyByCode.code }}</td>
              </tr>
              <tr>
                <td>上市日期</td>
                <td>{{ companyByCode.date }}</td>
              </tr>
              <tr>
                <td>所属行业</td>
                <td>{{ companyByCode.industry }}</td>
              </tr>
              <tr>
                <td>董事会主席</td>
                <td>{{ companyByCode.chair }}</td>
              </tr>
              <tr>
                <td>证券事务代表</td>
                <td>{{ companyByCode.representative }}</td>
              </tr>
              <tr>
                <td>员工人数</td>
                <td>{{ companyByCode.member_number }}</td>
              </tr>
              <tr>
                <td>年结日</td>
                <td>{{ companyByCode.final_date }}</td>
              </tr>
              <tr>
                <td>注册地址</td>
                <td>{{ companyByCode.regist_address }}</td>
              </tr>
              <tr>
                <td>公司总部</td>
                <td>{{ companyByCode.company_address }}</td>
              </tr>
              <tr v-if="companyByCode.url">
                <td>企业网址</td>
                <td>
                  <a :href="'http://' + companyByCode.url">{{ companyByCode.url }}</a>
                </td>
              </tr>
              <tr>
                <td>电话</td>
                <td>{{ companyByCode.phone }}</td>
              </tr>
              <tr>
                <td>传真</td>
                <td>{{ companyByCode.fax }}</td>
              </tr>
              <tr>
                <td>电邮</td>
                <td>{{ companyByCode.email }}</td>
              </tr>
              <tr>
                <td>核数师</td>
                <td>{{ companyByCode.auditor }}</td>
              </tr>
              <tr>
                <td>法律顾问</td>
                <td>{{ companyByCode.legal_adviser }}</td>
              </tr>
              <tr>
                <td>主营业务</td>
                <td>{{ companyByCode.main_business }}</td>
              </tr>
              <tr>
                <td>企业简介</td>
                <td>{{ companyByCode.company_info }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="企业财务数据分析" name="first"
            ><!-- 利润表 -->
            <div class="lrb">
              <h3>
                利润表
              </h3>
              <!-- <router-view></router-view> -->
              <router-view name="lrb"></router-view>
              <!-- <lrb></lrb> -->
            </div>
            <!-- 资产负债表 -->
            <div class="zcfzb">
              <h3>
                资产负债表
              </h3>
              <!-- <router-view></router-view> -->
              <router-view name="zcfzb"></router-view>
            </div>
            <!-- 现金流量表 -->
            <div class="xjllb">
              <h3>
                现金流量表
              </h3>
              <router-view name="xjllb"></router-view>
            </div>
            <!-- 主要经济指标分析 -->
            <div class="economies">
              <h3>
                主要经济能力分析
              </h3>
              <router-view name="economies"></router-view>
            </div>
            <!-- 偿债能力分析表 -->
            <div class="paying">
              <h3>
                偿债能力分析
              </h3>
              <router-view name="paying"></router-view>
            </div>
            <!-- 成本费用分析 -->
            <div class="cost">
              <h3>
                成本费用分析
              </h3>
              <router-view name="cost"></router-view>
            </div>
            <!-- 盈利能力分析 -->
            <div class="profit">
              <h3>
                盈利能力分析
              </h3>
              <router-view name="profit"></router-view></div
          ></el-tab-pane>
          <el-tab-pane label="股票情况" name="second">
            <router-view name="stock2"></router-view>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <el-footer>到底部了，没有更多了哦</el-footer>
    </el-container>

    <!-- 抽屉框 -->
    <el-drawer title="评论" :visible.sync="visible" :direction="direction">
      <el-container>
        <el-mian class="drawer">
          <div v-for="(item, index) in comment" :key="index" class="comment">
            <div class="avatar">
              <el-avatar size="small" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <span class="nickname">{{ item.nickname }}</span>
              <span class="del" @click="del(item.id)">X</span>
            </div>
            <div class="conent">
              {{ item.conent }}
            </div>
            <div class="date">{{ item.date | dateFormat }}</div>
            <hr />
          </div>
        </el-mian>
        <el-footer>
          <div class="bottom">
            <el-input placeholder="请输入内容" v-model="inputText" @change="upload"></el-input>
            <el-button type="primary" @click="upload">发送</el-button>
          </div>
        </el-footer>
      </el-container>
    </el-drawer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {
      userinfo: [],
      token: window.sessionStorage.getItem('token'),
      activeName: 'first',
      // 利润表
      lrb: [],
      // 资产负债表
      zcfzb: [],
      // 现金流量表
      xjllb: [],
      // 偿债能力分析表
      paying: [],
      // 成本费用分析表
      cost: [],
      // 盈利能力分析表
      profit: [],
      // 主要经济指标表
      economies: [],
      // 控制抽屉框的显示与隐藏
      visible: false,
      direction: 'rtl',
      comment: [],
      inputText: ''
    }
  },
  computed: {
    ...mapState(['code', 'companyByCode'])
  },
  created() {
    this.getCompanyByCode()
    this.getLrbList(this.code)
    this.getZcfzbList(this.code)
    this.getXjllbList(this.code)
    this.getPayingList(this.code)
    this.getCostList(this.code)
    this.getProfitList(this.code)
    this.getEconomiesList(this.code)
    this.getUser()
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['getCompanyByCode']),
    async getUser() {
      await this.$http
        .get('user/selectByToken', {
          params: {
            token: this.token
          }
        })
        .then(res => {
          this.userinfo = res.data[0]
          console.log('用户信息', this.userinfo)
        })
    },
    // 获取利润表
    async getLrbList(code) {
      await this.$http
        .get('lrb/selectByCode', {
          params: {
            code: code
          }
        })
        .then(data => {
          this.lrb = data.data
          // console.log(this.lrb)
        })
    },
    // 获取资产负债表
    async getZcfzbList(code) {
      await this.$http
        .get('zcfzb/selectByCode', {
          params: {
            code: code
          }
        })
        .then(data => {
          this.zcfzb = data.data
          // console.log(this.zcfzb)
        })
    },
    // 获取现金流量表
    async getXjllbList(code) {
      await this.$http
        .get('xjllb/selectByCode', {
          params: {
            code: code
          }
        })
        .then(data => {
          this.xjllb = data.data
          // console.log(this.xjllb)
        })
    },
    // 获取偿债能力分析表
    async getPayingList(code) {
      await this.$http
        .get('paying/selectByCode', {
          params: {
            code: code
          }
        })
        .then(data => {
          this.paying = data.data
          // console.log(this.paying)
        })
    },
    // 获取成本费用分析表
    async getCostList(code) {
      await this.$http
        .get('cost/selectByCode', {
          params: {
            code: code
          }
        })
        .then(data => {
          this.cost = data.data
          // console.log(this.cost)
        })
    },
    // 获取盈利能力分析表
    async getProfitList(code) {
      await this.$http
        .get('profit/selectByCode', {
          params: {
            code: code
          }
        })
        .then(data => {
          this.profit = data.data
          // console.log(this.profit)
        })
    },
    // 获取主要经济指标表
    async getEconomiesList(code) {
      await this.$http
        .get('economies/selectByCode', {
          params: {
            code: code
          }
        })
        .then(data => {
          this.economies = data.data
          console.log(this.economies)
        })
    },
    // 设置单元格样式
    // eslint-disable-next-line no-unused-vars
    cell_style({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center;'
    },
    // eslint-disable-next-line no-unused-vars
    header_style({ row, rowIndex }) {
      return 'text-align: center;background-color:#F7F4F0'
    },
    showDrawer() {
      this.$http
        .get('comment/selectByCom', {
          params: {
            company: '腾讯控股'
          }
        })
        .then(res => {
          this.comment = res.data
          console.log('dddd', this.comment)
        })
      this.visible = true
    },
    async del(id) {
      await this.$http
        .post('comment/deleteComment', {
          id: id
        })
        .then(res => {
          console.log('删除结果', res)
          if (res.status) {
            this.$message.success('删除评论成功')
            this.showDrawer()
          }
        })
    },
    getData() {
      const dt = new Date()
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1).toString().padStart(2, '0')
      const d = dt
        .getDate()
        .toString()
        .padStart(2, '0')
      const hh = dt
        .getHours()
        .toString()
        .padStart(2, '0')
      const mm = dt
        .getMinutes()
        .toString()
        .padStart(2, '0')
      const ss = dt
        .getSeconds()
        .toString()
        .padStart(2, '0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    upload() {
      console.log('eee', this.getData())
      this.$http
        .post('comment/addComment', {
          conent: this.inputText,
          date: this.getData()
          // nickname: this.userinfo.nickname,
          // username: this.userinfo.username
          // username:this.$store.state.
        })
        .then(res => {
          console.log('wwww', res)
          this.showDrawer()
        })
      this.inputText = ''
    }
  },
  components: {}
}
</script>

<style scoped lang="css">
.box .title {
  /* 水平居中 */
  display: table;
  margin: auto;
  font-size: 30px;
  padding-top: 40px;
}
.el-main {
  padding: 80px 150px;
}
table,
tr,
td {
  border: 1px solid #eeeeee;
  border-collapse: collapse;
}
table td {
  padding: 10px;
}
table td:first-child {
  width: 20%;
  background-color: #fafafa;
}
.lrb .el-table-column {
  /* font-size: 14px; */
  /* margin: 0; */
  text-align: center !important;
}
div span {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  font-weight: bold;
  margin-right: 20px;
  margin-bottom: 0;
}
div h1 {
  margin-top: 30px;
}
.el-table {
  margin-bottom: 40px;
}

.el-drawer {
  z-index: 900;
  /* padding-top: 30px; */
}
.el-tabs {
  margin-top: 30px;
}
.comment {
  margin-left: 30px;
}
.drawer {
  overflow: auto !important;
  height: 470px;
  margin-bottom: 30px !important;
}
.avatar {
  font-size: 12px;
  display: flex;
}
.nickname {
  padding-top: 4px;
  color: black;
  font-size: 15px;
}
.conent {
  padding: 20px;
}
.date {
  display: flex;
  justify-content: flex-end;
  font-size: 8px;
  padding-right: 20px;
}
.bottom {
  display: flex;
  margin: 20px;
  position: absolute;
  width: 91%;
  bottom: 0;
  overflow: hidden;
  padding-right: 40px;
}
.clear {
  clear: both;
}
.del {
  cursor: pointer;
}
</style>
