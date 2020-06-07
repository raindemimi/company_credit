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
          <el-button slot="append" @click="route">智能分析</el-button>
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

        <!-- 利润表 -->
        <div class="lrb">
          <h3>
            利润表
          </h3>
          <span>单位：{{ lrb[0].unit }}</span>
          <el-table :data="lrb" border style="width: 100%" stripe="true" :cell-style="cell_style" :header-cell-style="header_style">
            <el-table-column prop="year" label="年度/科目" width="100" fixed> </el-table-column>
            <el-table-column width="100" prop="pre_tax" label="税前利润"> </el-table-column>
            <el-table-column width="100" prop="after_tax" label="税后利润"> </el-table-column>
            <el-table-column width="100" prop="father_profit" label="归属母公司股东利润"> </el-table-column>
            <el-table-column width="100" prop="operating_receipt" label="营业收入"> </el-table-column>
            <el-table-column width="100" prop="other_receipt" label="其它收入"> </el-table-column>
            <el-table-column width="100" prop="sales_expenses" label="销售费用"> </el-table-column>
            <el-table-column width="100" prop="manage_expenses" label="管理费用"> </el-table-column>
            <el-table-column width="100" prop="financial_expenses" label="财务费用"> </el-table-column>
            <el-table-column width="100" prop="sales_cost" label="销售成本"> </el-table-column>
            <el-table-column width="100" prop="gross_margin" label="毛利"> </el-table-column>
            <el-table-column width="100" prop="experience_profit" label="经营溢利"> </el-table-column>
            <el-table-column width="100" prop="ratio" label="应占联营公司业绩"> </el-table-column>
            <el-table-column width="100" prop="net_amount1" label="利息净收入"> </el-table-column>
            <el-table-column width="100" prop="net_amount2" label="手续费及佣金净收入"> </el-table-column>
            <el-table-column width="100" prop="premium_income" label="保费收益"> </el-table-column>
          </el-table>
        </div>
        <!-- 资产负债表 -->
        <div class="zcfzb">
          <h3>
            资产负债表
          </h3>
          <span>单位：{{ zcfzb[0].unit }}</span>
          <el-table :data="zcfzb" border style="width: 100%" stripe="true" :cell-style="cell_style" :header-cell-style="header_style">
            <el-table-column width="100" prop="year" label="年度/科目" fixed> </el-table-column>
            <el-table-column width="100" prop="zichan_total" label="资产合计"> </el-table-column>
            <el-table-column width="100" prop="fuzai_total" label="负债合计"> </el-table-column>
            <el-table-column width="100" prop="quanyi_total" label="权益合计"> </el-table-column>
            <el-table-column width="100" prop="shebei" label="不动产、厂房和设备"> </el-table-column>
            <el-table-column width="100" prop="cunhuo" label="存货"> </el-table-column>
            <el-table-column width="100" prop="yingshou_amount" label="应收账款"> </el-table-column>
            <el-table-column width="100" prop="jiaoyi" label="交易性金融资产"> </el-table-column>
            <el-table-column width="100" prop="cash_thing" label="现金及现金等价物"> </el-table-column>
            <el-table-column width="100" prop="liudong_total" label="流动资产合计"> </el-table-column>
            <el-table-column width="100" prop="yingfu_amount" label="应付账款元"> </el-table-column>
            <el-table-column width="100" prop="yingjiao_amount" label="应交税费"> </el-table-column>
            <el-table-column width="100" prop="liudongfuzai_total" label="流动负债合计"> </el-table-column>
            <el-table-column width="100" prop="feiliudongfuzai_total" label="非流动负债合计"> </el-table-column>
            <el-table-column width="100" prop="mother" label="归属于母公司股东权益"> </el-table-column>
          </el-table>
        </div>
        <!-- 现金流量表 -->
        <div class="xjllb">
          <h3>
            现金流量表
          </h3>
          <span>单位：{{ xjllb[0].unit }}</span>
          <el-table :data="xjllb" border style="width: 100%" stripe="true" :cell-style="cell_style" :header-cell-style="header_style">
            <el-table-column prop="year" label="年度/科目" fixed> </el-table-column>
            <el-table-column prop="cash_net_amount1" label="经营流动现金流量净额"> </el-table-column>
            <el-table-column prop="cash_net_amount2" label="投资活动现金流量净额"> </el-table-column>
            <el-table-column prop="cash_net_amount3" label="融资活动现金流量净额"> </el-table-column>
            <el-table-column prop="cash_add_amount1" label="现金及现金等价物净增加额"> </el-table-column>
            <el-table-column prop="cash_balance" label="现金及现金等价物期初余额"> </el-table-column>
            <el-table-column prop="alter_affect" label="汇率变动对现金及现金等价物影响"> </el-table-column>
            <el-table-column prop="cash_balance_amount" label="现金及现金等价物期末余额"> </el-table-column>
          </el-table>
        </div>
        <!-- 主要经济指标分析 -->
        <div class="economies">
          <h3>
            主要经济能力分析
          </h3>
          <span>单位：{{ economies[0].unit }}</span>
          <el-table :data="economies" border style="width: 100%" stripe="true" :cell-style="cell_style" :header-cell-style="header_style">
            <el-table-column width="60" prop="year" label="年度/科目" fixed> </el-table-column>
            <el-table-column prop="yingyee" label="营业额"> </el-table-column>
            <el-table-column prop="yingyelirun" label="营业利润"> </el-table-column>
            <el-table-column prop="lirun_total" label="利润总额"> </el-table-column>
            <el-table-column prop="jinglirun" label="净利润"> </el-table-column>
            <el-table-column prop="zichan_total" label="资产合计"> </el-table-column>
            <el-table-column prop="fuzai_total" label="负债合计"> </el-table-column>
            <el-table-column prop="quanyi_total" label="权益合计"> </el-table-column>
          </el-table>
        </div>
        <!-- 偿债能力分析表 -->
        <div class="paying">
          <h3>
            偿债能力分析
          </h3>
          <el-table :data="paying" border style="width: 100%" stripe="true" :cell-style="cell_style" :header-cell-style="header_style">
            <el-table-column width="60" prop="year" label="年度/科目" fixed> </el-table-column>
            <el-table-column prop="asset_ratio" label="资产负债率（%）"> </el-table-column>
            <el-table-column prop="share_ratio" label="股东权益比率（%）"> </el-table-column>
            <el-table-column prop="liquidity_ratio" label="流动比率"> </el-table-column>
            <el-table-column prop="quick_ratio" label="速动比率"> </el-table-column>
          </el-table>
        </div>
        <!-- 成本费用分析 -->
        <div class="cost">
          <h3>
            成本费用分析
          </h3>
          <span>单位：{{ cost[0].unit }}</span>
          <el-table :data="cost" border style="width: 100%" stripe="true" :cell-style="cell_style" :header-cell-style="header_style">
            <el-table-column width="60" prop="year" label="年度/科目" fixed> </el-table-column>
            <el-table-column prop="selling_cost" label="销售成本"> </el-table-column>
            <el-table-column prop="selling_expenses" label="销售费用"> </el-table-column>
            <el-table-column prop="admin_expenses" label="管理费用"> </el-table-column>
            <el-table-column prop="financial_expenses" label="财务费用"> </el-table-column>
          </el-table>
        </div>
        <!-- 盈利能力分析 -->
        <div class="profit">
          <h3>
            盈利能力分析
          </h3>
          <el-table :data="profit" border style="width: 100%" stripe="true" :cell-style="cell_style" :header-cell-style="header_style">
            <el-table-column width="60" prop="year" label="年度/科目" fixed> </el-table-column>
            <el-table-column prop="sales" label="销售毛利率（%)"> </el-table-column>
            <el-table-column prop="main" label="主营利润率（%)"> </el-table-column>
            <el-table-column prop="total" label="总资产利润率（%)"> </el-table-column>
            <el-table-column prop="net" label="净资产收益率（%)"> </el-table-column>
            <el-table-column prop="cunhuo" label="存货周转率"> </el-table-column>
            <el-table-column prop="yingshou" label="应收账款周转率（次)"> </el-table-column>
            <el-table-column prop="total_week" label="总资产周转率（次)"> </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>到底部了，没有更多了哦</el-footer>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: {},
  data() {
    return {
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
      economies: []
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
  },
  mounted() {},
  watch: {},
  methods: {
    ...mapActions(['getCompanyByCode']),
    route() {
      this.$router.push('/analyze')
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
</style>
