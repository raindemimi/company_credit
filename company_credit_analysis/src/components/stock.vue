<template>
  <div>
    <!-- 基本股票信息 -->
    <el-table :data="stockInfo" stripe style="width: 100%">
      <el-table-column prop="market" label="股票类型"> </el-table-column>
      <el-table-column prop="code" label="股票代码"> </el-table-column>
      <el-table-column prop="name" label="股票名称"> </el-table-column>
      <el-table-column label="上市状况">
        <template slot-scope="scope">
          <el-tag type="success" v-if="(scope.state = 1)">正常上市</el-tag>
          <el-tag type="warning" v-else>非交易状态</el-tag>
          <!-- {{ scope.row }} -->
        </template>
      </el-table-column>
      <el-table-column prop="currcapital" label="流通股本，万股" width="150"> </el-table-column>
      <el-table-column prop="profit_four" label="去年度净利润（亿元）" width="120"> </el-table-column>
      <el-table-column prop="totalcapital" label="总股本，万股" width="150"> </el-table-column>
      <el-table-column prop="mgjzc" label="每股净资产（元）"> </el-table-column>
      <el-table-column prop="listing_date" label="上市日期"> </el-table-column>
    </el-table>
    <div class="today stock">
      <h3>今日股票数据</h3>
      <span>单位：港元</span>
      <el-table :data="todayInfo" stripe style="width: 100%" :header-cell-style="header_style" :cell-style="cell_style">
        <el-table-column prop="todayMax" label="今日最高价" width="150"> </el-table-column>
        <el-table-column prop="todayMin" label="今日最低价" width="150"> </el-table-column>
        <el-table-column prop="closePrice" label="昨日收盘价"> </el-table-column>
        <el-table-column prop="openPrice" label="今日开盘价"> </el-table-column>
        <el-table-column prop="diff_money" label="涨跌金额"> </el-table-column>
        <el-table-column prop="diff_rate" label="涨跌幅度"> </el-table-column>
        <el-table-column prop="downLimit" label="跌停价"> </el-table-column>
        <el-table-column prop="highLimit" label="涨停价"> </el-table-column>
        <el-table-column prop="max52" label="52周最高价"> </el-table-column>
        <el-table-column prop="min52" label="52周最低价"> </el-table-column>
        <el-table-column prop="nowPrice" label="当前价"> </el-table-column>
      </el-table>
      <el-table :data="todayInfo" stripe style="width: 100%" :header-cell-style="header_style" :cell-style="cell_style">
        <el-table-column prop="all_value" label="总市值（亿元）" width="180"> </el-table-column>
        <el-table-column prop="circulation_value" label="流通市值（亿元）"> </el-table-column>
        <el-table-column prop="pb" label="市净率"> </el-table-column>
        <el-table-column prop="pe" label="市盈率(TTM,动态)"> </el-table-column>
        <el-table-column prop="swing" label="振幅"> </el-table-column>
        <el-table-column prop="tradeAmount" label="成交金额（元）" width="180"> </el-table-column>
        <el-table-column prop="tradeNum" label="成交量(股)"> </el-table-column>
        <el-table-column prop="turnover" label="换手率"> </el-table-column>
        <el-table-column prop="tradeNum" label="成交量(股)"> </el-table-column>
      </el-table>
    </div>
    <!-- 历史数据 -->
    <div class="stock">
      <h3>历史股票数据</h3>
      <span>单位：港元</span>
      <el-table :data="history" stripe style="width: 100%" :header-cell-style="header_style" :cell-style="cell_style">
        <el-table-column prop="date" label="日期"> </el-table-column>
        <el-table-column prop="open_price" label="开盘价"> </el-table-column>
        <el-table-column prop="close_price" label="收盘价"> </el-table-column>
        <el-table-column prop="max_price" label="最高价"> </el-table-column>
        <el-table-column prop="min_price" label="最低价"> </el-table-column>
        <el-table-column prop="diff_rate" label="涨跌幅%"> </el-table-column>
        <el-table-column prop="diff_money" label="涨跌额"> </el-table-column>
        <el-table-column prop="trade_num" label="交易手数"> </el-table-column>
        <el-table-column prop="trade_money" label="交易金额（元）" width="180"> </el-table-column>
      </el-table>
    </div>
    <!-- k线图 -->
    <div>
      <h3>k线图</h3>
      <div id="main0" style="width: 1000px;height:600px;"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import echarts from 'echarts'
import _ from 'lodash'
axios.defaults.headers.Authorization = 'APPCODE 4965d137351042fdb0badcba0df62d46'
var date = new Date()
var y = date.getFullYear()
var m = (date.getMonth() + 1).toString().padStart(2, '0')
var n = m - 1
var d = date
  .getDate()
  .toString()
  .padStart(2, '0')
var dateEnd = y + '-' + m + '-' + d
var dateBegin = y + '-' + n + '-' + d
// console.log('date', dateEnd)
export default {
  props: {},
  data() {
    return {
      // 股票基本信息
      stockInfo: [],
      // 股票实时数据
      todayInfo: [],
      dateEnd,
      dateBegin,
      // 历史数据
      history: [],
      y,
      m,
      d,
      historyK: [],
      // K线数据
      historyData: [],
      historyData2: [],
      arr: [],
      upColor: '#ec0000',
      upBorderColor: '#8A0000',
      downColor: '#00da3c',
      downBorderColor: '#008F28',
      data0: '',
      option: {
        title: {
          text: '腾讯控股',
          left: 0
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 50,
            end: 100
          },
          {
            show: true,
            type: 'slider',
            top: '90%',
            start: 50,
            end: 100
          }
        ]
      }
    }
  },
  computed: {},
  created() {
    this.getStockInfo()
    this.getToday()
    this.getHistory()
    this.getK()
  },
  mounted() {},
  watch: {},
  methods: {
    // 根据名称或编码查询股票信息
    async getStockInfo() {
      await axios
        .get('http://ali-stock.showapi.com/name-to-stockinfo', {
          params: {
            code: '00700'
          }
        })
        .then(res => {
          this.stockInfo = res.data.showapi_res_body.list
          // console.log('股票信息', this.stockInfo)
        })
    },
    // 沪深及港股历史行情
    async getHistory() {
      await axios
        .get('http://ali-stock.showapi.com/sz-sh-stock-history', {
          params: {
            code: '00700',
            begin: this.dateBegin,
            end: this.dateEnd
          }
        })
        .then(res => {
          this.history = res.data.showapi_res_body.list
          console.log('历史数据', this.history)
        })
    },
    getEcharts() {
      var myChart = echarts.init(document.getElementById('main0'))
      var data1 = {
        xAxis: {
          type: 'category',
          data: this.data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax'
        },
        series: [
          {
            name: '日K',
            type: 'candlestick',
            data: this.data0.values,
            itemStyle: {
              color: this.upColor,
              color0: this.downColor,
              borderColor: this.upBorderColor,
              borderColor0: this.downBorderColor
            },
            markPoint: {
              label: {
                normal: {
                  formatter: function(param) {
                    return param != null ? Math.round(param.value) : ''
                  }
                }
              },
              data: [
                {
                  name: 'XX标点',
                  coord: ['2020-3-31', 2300],
                  value: 2300,
                  itemStyle: {
                    color: 'rgb(41,60,85)'
                  }
                },
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest'
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest'
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  valueDim: 'close'
                }
              ],
              tooltip: {
                formatter: function(param) {
                  return param.name + '<br>' + (param.data.coord || '')
                }
              }
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false
                    },
                    emphasis: {
                      label: {
                        show: false
                      }
                    }
                  }
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close'
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close'
                }
              ]
            }
          },
          {
            name: 'MA5',
            type: 'line',
            data: this.calculateMA(5),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA10',
            type: 'line',
            data: this.calculateMA(10),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA20',
            type: 'line',
            data: this.calculateMA(20),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          },
          {
            name: 'MA30',
            type: 'line',
            data: this.calculateMA(30),
            smooth: true,
            lineStyle: {
              opacity: 0.5
            }
          }
        ]
      }
      // 4. 准备数据和配置项 合并res.data和options
      const result = _.merge(data1, this.option)
      // 5. 展示数据
      myChart.setOption(result)
    },
    async getK() {
      var m = this.m
      while (m > 0) {
        var begin = this.y + '-' + m + '-' + '01'
        var end = this.y + '-' + m + '-' + '31'
        await axios
          .get('http://ali-stock.showapi.com/sz-sh-stock-history', {
            params: {
              code: '00700',
              begin: begin,
              end: end
            }
          })
          .then(res => {
            this.historyK.unshift(res.data.showapi_res_body.list.reverse())
            // console.log('看下ia', this.historyK)
          })
        m--
      }
      // console.log('k下', this.historyK)
      // 数组合并
      for (var i = 0; i < this.historyK.length; i++) {
        this.historyData = this.historyData.concat(this.historyK[i])
      }
      // console.log('history', this.historyData)
      this.historyData.forEach(item => {
        //   this.arr[0] = item.date
        //   this.arr[1] = parseFloat(item.open_price)
        //   this.arr[2] = parseFloat(item.close_price)
        //   this.arr[3] = parseFloat(item.min_price)
        //   this.arr[4] = parseFloat(item.max_price)
        //   this.historyData2.push(this.arr)
        this.historyData2.push([item.date, parseFloat(item.open_price), parseFloat(item.close_price), parseFloat(item.min_price), parseFloat(item.max_price)])
      })
      var len = this.historyData2.length
      console.log('len', len)
      this.data0 = this.splitData(this.historyData2, len)
      this.getEcharts()
      // console.log('Kxian', this.historyData2)
    },
    // 实时数据股票价格查询
    async getToday() {
      await axios
        .get('http://ali-stock.showapi.com/batch-real-stockinfo', {
          params: {
            stocks: 'hk00700',
            needIndex: 0
          }
        })
        .then(res => {
          this.todayInfo = res.data.showapi_res_body.list
          console.log('实时数据', this.todayInfo)
        })
    },
    // eslint-disable-next-line no-unused-vars
    cell_style({ row, column, rowIndex, columnIndex }) {
      return 'text-align: center;'
    },
    // eslint-disable-next-line no-unused-vars
    header_style({ row, rowIndex }) {
      return 'text-align: center;background-color:#F7F4F0'
    },
    splitData(rawData) {
      var categoryData = []
      var values = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
      }
      return {
        categoryData: categoryData,
        values: values
      }
    },
    calculateMA(dayCount) {
      var result = []
      for (var i = 0, len = this.data0.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += this.data0.values[i - j][1]
        }
        result.push(sum / dayCount)
      }
      return result
    }
  },
  components: {}
}
</script>

<style scoped lang="css">
.stock span {
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  /* font-weight: bold; */
  margin-right: 20px;
  margin-bottom: 0;
}
</style>
