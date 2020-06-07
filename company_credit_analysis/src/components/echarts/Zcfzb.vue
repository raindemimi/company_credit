<template>
  <div>
    <div id="main2" style="width: 1000px;height:600px;"></div>
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
        //   text: '资产负债表'
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
    var myChart = echarts.init(document.getElementById('main2'))
    const res = await this.$http.get('zcfzb/selectByCode', {
      params: {
        code: this.code
      }
    })
    let year = []
    let zichan_total = []
    let fuzai_total = []
    let quanyi_total = []
    let shebei = []
    let cunhuo = []
    let yingshou_amount = []
    let jiaoyi = []
    let cash_thing = []
    let liudong_total = []
    let yingfu_amount = []
    let yingjiao_amount = []
    let liudongfuzai_total = []
    let feiliudongfuzai_total = []
    let mother = []
    res.data.forEach(item => {
      Number(
        item.zichan_total,
        item.fuzai_total,
        item.quanyi_total,
        item.shebei,
        item.cunhuo,
        item.yingshou_amount,
        item.jiaoyi,
        item.cash_thing,
        item.liudong_total,
        item.yingfu_amount,
        item.yingjiao_amount,
        item.liudongfuzai_total,
        item.feiliudongfuzai_total,
        item.mother
      )
      year.push(item.year)
      zichan_total.push(item.zichan_total)
      fuzai_total.push(item.fuzai_total)
      quanyi_total.push(item.quanyi_total)
      shebei.push(item.shebei)
      cunhuo.push(item.cunhuo)
      yingshou_amount.push(item.yingshou_amount)
      jiaoyi.push(item.jiaoyi)
      cash_thing.push(item.cash_thing)
      liudong_total.push(item.liudong_total)
      yingfu_amount.push(item.yingfu_amount)
      yingjiao_amount.push(item.yingjiao_amount)
      liudongfuzai_total.push(item.liudongfuzai_total)
      feiliudongfuzai_total.push(item.feiliudongfuzai_total)
      mother.push(item.mother)
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
        data: [
          '资产合计',
          '负债合计',
          '权益合计',
          '不动产、厂房和设备',
          '存货',
          '应收账款',
          '交易性金融资产',
          '现金及现金等价物',
          '流动资产合计',
          '应付账款元',
          '应交税费',
          '流动负债合计',
          '非流动负债合计',
          '归属于母公司股东权益'
        ]
      },
      series: [
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
        },
        {
          name: '不动产、厂房和设备',
          type: 'line',
          data: shebei
        },
        {
          name: '存货',
          type: 'line',
          data: cunhuo
        },
        {
          name: '应收账款',
          type: 'line',
          data: yingshou_amount
        },
        {
          name: '交易性金融资产',
          type: 'line',
          data: jiaoyi
        },
        {
          name: '现金及现金等价物',
          type: 'line',
          data: cash_thing
        },
        {
          name: '流动资产合计',
          type: 'line',
          data: liudong_total
        },
        {
          name: '应付账款元',
          type: 'line',
          data: yingfu_amount
        },
        {
          name: '应交税费',
          type: 'line',
          data: yingjiao_amount
        },
        {
          name: '流动负债合计',
          type: 'line',
          data: liudongfuzai_total
        },
        {
          name: '非流动负债合计',
          type: 'line',
          data: feiliudongfuzai_total
        },
        {
          name: '归属于母公司股东权益',
          type: 'line',
          data: mother
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
  methods: {
    // eslint-disable-next-line no-unused-vars
    number_arr(data, name) {
      let arr = []
      data.forEach(item => {
        Number(item.name)
        arr.push(item.name)
      })
      return arr
    }
  },
  components: {}
}
</script>

<style scoped lang="scss"></style>
