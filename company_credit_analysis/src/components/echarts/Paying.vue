<template>
  <div>
    <div id="main5" style="width: 1000px;height:600px;"></div>
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
    var myChart = echarts.init(document.getElementById('main5'))
    const res = await this.$http.get('paying/selectByCode', {
      params: {
        code: this.code
      }
    })
    let year = []
    let asset_ratio = []
    let share_ratio = []
    let liquidity_ratio = []
    let quick_ratio = []
    res.data.forEach(item => {
      Number(item.asset_ratio, item.share_ratio)
      year.push(item.year)
      asset_ratio.push(item.asset_ratio)
      share_ratio.push(item.share_ratio)
      liquidity_ratio.push(item.liquidity_ratio)
      quick_ratio.push(item.quick_ratio)
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
        data: ['资产负债率', '股东权益比率', '流动比率', '速动比率']
      },
      series: [
        {
          name: '资产负债率',
          type: 'line',
          data: asset_ratio
        },
        {
          name: '股东权益比率',
          type: 'line',
          data: share_ratio
        },
        {
          name: '流动比率',
          type: 'line',
          data: liquidity_ratio
        },
        {
          name: '速动比率',
          type: 'line',
          data: quick_ratio
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
