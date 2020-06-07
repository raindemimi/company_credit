<template>
  <div>
    <div id="main6" style="width: 1000px;height:600px;"></div>
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
    var myChart = echarts.init(document.getElementById('main6'))
    const res = await this.$http.get('cost/selectByCode', {
      params: {
        code: this.code
      }
    })
    let year = []
    let selling_cost = []
    let selling_expenses = []
    let admin_expenses = []
    let financial_expenses = []
    res.data.forEach(item => {
      year.push(item.year)
      selling_cost.push(item.selling_cost)
      selling_expenses.push(item.selling_expenses)
      admin_expenses.push(item.admin_expenses)
      financial_expenses.push(item.financial_expenses)
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
        right: 0,
        top: 20,
        bottom: 20,
        data: ['销售成本', '销售费用', '管理费用', '财务费用']
      },
      series: [
        {
          name: '销售成本',
          type: 'line',
          data: selling_cost
        },
        {
          name: '销售费用',
          type: 'line',
          data: selling_expenses
        },
        {
          name: '管理费用',
          type: 'line',
          data: admin_expenses
        },
        {
          name: '财务费用',
          type: 'line',
          data: financial_expenses
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
