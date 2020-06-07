<template>
  <div>
    <div id="main" style="width: 1000px;height:600px;"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
import _ from 'lodash'
export default {
  props: {},
  // eslint-disable-next-line no-undef
  // name: lrb,
  data() {
    return {
      options: {
        // title: {
        //   text: '利润表'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '2%',
          right: '18%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: []
      }
    }
  },
  computed: {
    ...mapState(['code'])
  },
  created() {},
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    const res = await this.$http.get('lrb/selectByCode', {
      params: {
        code: this.code
      }
    })
    // console.log(res.data)
    let pre_tax = []
    let after_tax = []
    let father_profit = []
    let year = []
    let operating_receipt = []
    let other_receipt = []
    let sales_expenses = []
    let manage_expenses = []
    let financial_expenses = []
    let sales_cost = []
    let gross_margin = []
    let experience_profit = []
    let ratio = []
    let net_amount1 = []
    let net_amount2 = []
    let premium_income = []
    res.data.forEach(item => {
      Number(
        item.pre_tax,
        item.after_tax,
        item.father_profit,
        item.operating_receipt,
        item.other_receipt,
        item.sales_expenses,
        item.manage_expenses,
        item.financial_expenses,
        item.sales_cost,
        item.gross_margin,
        item.experience_profit,
        item.ratio,
        item.net_amount1,
        item.net_amount2,
        item.premium_income
      )
      pre_tax.push(item.pre_tax)
      after_tax.push(item.after_tax)
      father_profit.push(item.father_profit)
      operating_receipt.push(item.operating_receipt)
      other_receipt.push(item.other_receipt)
      sales_expenses.push(item.sales_expenses)
      manage_expenses.push(item.manage_expenses)
      financial_expenses.push(item.financial_expenses)
      sales_cost.push(item.sales_cost)
      gross_margin.push(item.gross_margin)
      experience_profit.push(item.experience_profit)
      ratio.push(item.ratio)
      net_amount1.push(item.net_amount1)
      net_amount2.push(item.net_amount2)
      premium_income.push(item.premium_income)
      year.push(item.year)
    })
    // console.log(pre_tax)
    // eslint-disable-next-line no-undef
    // let other_receipt = this.number_arr(res.data, other_receipt)
    var data1 = {
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 0,
        top: 20,
        bottom: 20,
        data: [
          '税前利润',
          '税后利润',
          '归属母公司股东利润',
          '营业收入',
          '其它收入',
          '销售费用',
          '管理费用',
          '财务费用',
          '销售成本',
          '毛利',
          '经营溢利',
          '应占联营公司业绩',
          '利息净收入',
          '手续费及佣金净收入',
          '保费收益'
        ]
      },
      series: [
        {
          name: '税前利润',
          type: 'line',
          data: pre_tax
        },
        {
          name: '税后利润',
          type: 'line',
          data: after_tax
        },
        {
          name: '归属母公司股东利润',
          type: 'line',
          data: father_profit
        },
        {
          name: '营业收入',
          type: 'line',
          data: operating_receipt
        },
        {
          name: '其它收入',
          type: 'line',
          data: other_receipt
        },
        {
          name: '销售费用',
          type: 'line',
          data: sales_expenses
        },
        {
          name: '管理费用',
          type: 'line',
          data: manage_expenses
        },
        {
          name: '财务费用',
          type: 'line',
          data: financial_expenses
        },
        {
          name: '销售成本',
          type: 'line',
          data: sales_cost
        },
        {
          name: '毛利',
          type: 'line',
          data: gross_margin
        },
        {
          name: '经营溢利',
          type: 'line',
          data: experience_profit
        },
        {
          name: '应占联营公司业绩',
          type: 'line',
          data: ratio
        },
        {
          name: '利息净收入',
          type: 'line',
          data: net_amount1
        },
        {
          name: '手续费及佣金净收入',
          type: 'line',
          data: net_amount2
        },
        {
          name: '保费收益',
          type: 'line',
          data: premium_income
        }
      ],
      xAxis: [
        {
          name: '年份',
          data: year
        }
      ],
      yAxis: [
        {
          name: res.data[0].unit
        }
      ]
    }

    // 4. 准备数据和配置项 合并res.data和options
    const result = _.merge(data1, this.options)
    // 5. 展示数据
    myChart.setOption(result)
    // console.log(res)
  },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style scoped lang="scss"></style>
