<template>
  <div>
    <div id="main4" style="width: 1000px;height:600px;"></div>
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
    var myChart = echarts.init(document.getElementById('main4'))
    const res = await this.$http.get('economies/selectByCode', {
      params: {
        code: this.code
      }
    })
    let year = []
    let yingyee = []
    let yingyelirun = []
    let lirun_total = []
    let jinglirun = []
    let zichan_total = []
    let fuzai_total = []
    let quanyi_total = []
    res.data.forEach(item => {
      Number(item.yingyee, item.yingyelirun, item.lirun_total, item.jinglirun, item.zichan_total, item.fuzai_total, item.quanyi_total)
      year.push(item.year)
      yingyee.push(item.yingyee)
      yingyelirun.push(item.yingyelirun)
      lirun_total.push(item.lirun_total)
      jinglirun.push(item.jinglirun)
      zichan_total.push(item.zichan_total)
      fuzai_total.push(item.fuzai_total)
      quanyi_total.push(item.quanyi_total)
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
        data: ['营业额', '营业利润', '利润总额', '	净利润', '资产合计', '负债合计', '权益合计']
      },
      series: [
        {
          name: '营业额',
          type: 'line',
          data: yingyee
        },
        {
          name: '营业利润',
          type: 'line',
          data: yingyelirun
        },
        {
          name: '利润总额',
          type: 'line',
          data: lirun_total
        },
        {
          name: '净利润',
          type: 'line',
          data: jinglirun
        },
        {
          name: '资产合计',
          type: 'line',
          data: zichan_total
        },
        {
          name: '负债合计',
          type: 'line',
          data: fuzai_total
        },
        {
          name: '权益合计',
          type: 'line',
          data: quanyi_total
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
