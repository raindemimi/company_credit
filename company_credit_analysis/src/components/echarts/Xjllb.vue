<template>
  <div>
    <div id="main3" style="width: 1000px;height:600px;"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import echarts from 'echarts'
import _ from 'lodash'
export default {
  props: {},
  // eslint-disable-next-line no-undef
  // name: zcfzb,
  data() {
    return {
      options: {
        // title: {
        //   text: '现金流量表'
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
          right: '20%',
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
        ]
      }
    }
  },
  computed: {
    ...mapState(['code'])
  },
  created() {},
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main3'))
    const res = await this.$http.get('xjllb/selectByCode', {
      params: {
        code: this.code
      }
    })
    let year = []
    let cash_net_amount1 = []
    let cash_net_amount2 = []
    let cash_net_amount3 = []
    let cash_add_amount1 = []
    let cash_balance = []
    let alter_affect = []
    let cash_balance_amount = []
    res.data.forEach(item => {
      Number(item.cash_net_amount1, item.cash_net_amount2, item.cash_net_amount3, item.cash_add_amount1, item.cash_balance, item.alter_affect, item.cash_balance_amount)
      year.push(item.year)
      cash_net_amount1.push(item.cash_net_amount1)
      cash_net_amount2.push(item.cash_net_amount2)
      cash_net_amount3.push(item.cash_net_amount3)
      cash_add_amount1.push(item.cash_add_amount1)
      cash_balance.push(item.cash_balance)
      alter_affect.push(item.alter_affect)
      cash_balance_amount.push(item.cash_balance_amount)
    })
    // console.log(pre_tax)
    // eslint-disable-next-line no-undef
    // let other_receipt = this.number_arr(res.data, other_receipt)
    var data1 = {
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
      ],
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: -40,
        top: 20,
        bottom: 20,
        data: [
          '经营流动现金流量净额',
          '投资活动现金流量净额',
          '融资活动现金流量净额',
          '现金及现金等价物净增加额',
          '现金及现金等价物期初余额',
          '汇率变动对现金及现金等价物影响',
          '现金及现金等价物期末余额'
        ]
      },
      series: [
        {
          name: '经营流动现金流量净额',
          type: 'line',
          data: cash_net_amount1
        },
        {
          name: '投资活动现金流量净额',
          type: 'line',
          data: cash_net_amount2
        },
        {
          name: '融资活动现金流量净额',
          type: 'line',
          data: cash_net_amount3
        },
        {
          name: '现金及现金等价物净增加额',
          type: 'line',
          data: cash_add_amount1
        },
        {
          name: '现金及现金等价物期初余额',
          type: 'line',
          data: cash_balance
        },
        {
          name: '汇率变动对现金及现金等价物影响',
          type: 'line',
          data: alter_affect
        },
        {
          name: '现金及现金等价物期末余额',
          type: 'line',
          data: cash_balance_amount
        }
      ]
    }

    // 4. 准备数据和配置项 合并res.data和options
    const result = _.merge(data1, this.options)
    // 5. 展示数据
    myChart.setOption(result)
    // console.log(res)
  }
}
</script>

<style scoped lang="scss"></style>
