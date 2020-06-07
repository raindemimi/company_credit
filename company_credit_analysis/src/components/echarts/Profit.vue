<template>
  <div>
    <div id="main7" style="width: 1000px;height:600px;"></div>
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
    var myChart = echarts.init(document.getElementById('main7'))
    const res = await this.$http.get('profit/selectByCode', {
      params: {
        code: this.code
      }
    })
    let year = []
    let sales = []
    let main = []
    let total = []
    let net = []
    let cunhuo = []
    let yingshou = []
    let total_week = []
    res.data.forEach(item => {
      year.push(item.year)
      sales.push(item.sales)
      main.push(item.main)
      total.push(item.total)
      net.push(item.net)
      cunhuo.push(item.cunhuo)
      yingshou.push(item.yingshou)
      total_week.push(item.total_week)
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
        data: ['销售毛利率（%）', '主营利润率（%）', '总资产利润率（%）', '净资产收益率（%）', '存货周转率', '应收账款周转率（次）', '总资产周转率（次）']
      },
      series: [
        {
          name: '销售毛利率（%）',
          type: 'line',
          data: sales
        },
        {
          name: '主营利润率（%）',
          type: 'line',
          data: main
        },
        {
          name: '总资产利润率（%）',
          type: 'line',
          data: total
        },
        {
          name: '净资产收益率（%）',
          type: 'line',
          data: net
        },
        {
          name: '存货周转率',
          type: 'line',
          data: cunhuo
        },
        {
          name: '应收账款周转率（次）',
          type: 'line',
          data: yingshou
        },
        {
          name: '总资产周转率（次）',
          type: 'line',
          data: total_week
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
