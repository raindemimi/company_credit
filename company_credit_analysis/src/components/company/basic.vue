<template>
  <div class="box">
    <!-- 工商信息表格开始 -->
    <div class="jibenxinxi">
      <h1>{{ company.name }}</h1>
      <table>
        <thead>
          <h3>基本工商信息</h3>
        </thead>
        <tbody class="top">
          <tr>
            <td>法定代表人</td>
            <td>{{ company.representative }}</td>
          </tr>
          <tr>
            <td>地址</td>
            <td>{{ company.address }}</td>
          </tr>
          <tr>
            <td>所在省份</td>
            <td>{{ company.region }}</td>
          </tr>
          <tr>
            <td>所在城市</td>
            <td>{{ company.city }}</td>
          </tr>
          <tr>
            <td>所在地区</td>
            <td>{{ company.district }}</td>
          </tr>
          <tr>
            <td>经营状态</td>
            <td>{{ company.biz_status }}</td>
          </tr>
          <tr>
            <td>统一社会信用号</td>
            <td>{{ company.credit_code }}</td>
          </tr>
          <tr>
            <td>注册号</td>
            <td>{{ company.register_code }}</td>
          </tr>
          <tr>
            <td>企业电话</td>
            <td>{{ company.phone }}</td>
          </tr>
          <tr>
            <td>企业邮箱</td>
            <td>{{ company.email }}</td>
          </tr>
          <tr>
            <td>注册时间</td>
            <td>{{ company.setup_time }}</td>
          </tr>
          <tr>
            <td>所属行业</td>
            <td>{{ company.industry }}</td>
          </tr>
          <tr>
            <td>经营范围</td>
            <td>{{ company.biz_scope }}</td>
          </tr>
          <tr>
            <td>注册资本</td>
            <td>{{ company.registered_capital }}</td>
          </tr>
          <tr>
            <td>实缴资本</td>
            <td>{{ company.actual_capital }}</td>
          </tr>
          <tr>
            <td>纳税号</td>
            <td>{{ company.taxpayer_code }}</td>
          </tr>
          <tr>
            <td>组织代码</td>
            <td>{{ company.organization_code }}</td>
          </tr>
          <tr>
            <td>英文名</td>
            <td>{{ company.english_name }}</td>
          </tr>
          <tr>
            <td>曾用名</td>
            <td>{{ company.used_name }}</td>
          </tr>
          <tr>
            <td>登记机关</td>
            <td>{{ company.authorization }}</td>
          </tr>
          <tr>
            <td>网址</td>
            <td>
              <a :href="'http://' + company.homepage">{{ company.homepage }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 工商信息表格结束 -->
    <!-- 股东信息表格开始 -->
    <div class="gudong">
      <h3>股东出资信息</h3>
      <el-table :data="shareholder" style="width: 100%" border :header-cell-style="{ background: ' #f8f8f8' }">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column prop="name" label="企业名称" width="180"> </el-table-column>
        <el-table-column prop="member" label="股东名称" width="180"> </el-table-column>
        <el-table-column prop="proportion" label="持股比例"> </el-table-column>
        <el-table-column prop="sub_money" label="认缴出资额"> </el-table-column>
        <el-table-column prop="sub_date" label="认缴出资日期"> </el-table-column>
        <el-table-column prop="real_money" label="实缴出资额"> </el-table-column>
        <el-table-column prop="real_date" label="实缴出资日期"> </el-table-column>
      </el-table>
    </div>
    <!-- 股东信息表格结束 -->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// // 1. 导入 echarts
// import echarts from 'echarts'
// import _ from 'lodash'
export default {
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapState(['company', 'shareholder'])
  },
  created() {},
  mounted() {
    this.getCompany()
    this.getShareholder()
    // // 3. 基于准备好的dom，初始化echarts实例
    // let myChart = echarts.init(document.getElementById('main'))
    // // 4. 准备数据和配置项 合并res.data和options
    // const result = _.merge(this.shareholder.proportion, this.options)
    // // 5. 展示数据
    // myChart.setOption(result)
  },
  watch: {
    // this.getData()
  },
  methods: {
    ...mapActions(['getCompany', 'getShareholder'])
  },
  components: {}
}
</script>

<style scoped lang="css">
/* .box {
  display: flex;
  flex-direction: column !important;
} */
/* 工商信息start */
.jibenxinxi {
  /* height: 400px; */
  margin: 30px 100px;
}
.jibenxinxi h1 {
  text-align: center;
}
.jibenxinxi thead {
  display: flex;
  align-items: flex-start !important;
}
.jibenxinxi table,
.jibenxinxi td {
  border: 1px solid #eeeeee;
  border-collapse: collapse;
  text-align: left;
  height: 30px;
}
.jibenxinxi table td {
  padding: 10px;
}
.jibenxinxi table td:first-child {
  background-color: #f8f8f8;
}
.jibenxinxi td:nth-child(1) {
  width: 200px !important;
}
.jibenxinxi table,
.jibenxinxi thead {
  border: 0;
}
/* 工商信息end */
.gudong {
  margin: 0 100px;
}
</style>
