<template>
  <div>
    <div id="main0" style="width: 1000px;height:600px;"></div>
    <div>{{ historyData2 }}</div>
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
var d = date
  .getDate()
  .toString()
  .padStart(2, '0')
export default {
  props: {},
  data() {
    return {
      arr: [],
      history: [],
      y,
      m,
      d,
      historyK: [],
      // K线数据
      historyData: [],
      historyData2: [],
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
  created() {
    this.getK()
  },
  mounted() {},
  watch: {},
  methods: {
    splitData(rawData, len) {
      console.log('qqq', rawData)
      var categoryData = []
      var values = []
      for (var i = 0; i < len; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
      }
      console.log('split', values, categoryData)
      return {
        categoryData: categoryData,
        values: values
      }
    },
    calculateMA(dayCount) {
      var result = []
      for (var i = 0, len = 82; i < len; i++) {
        if (i < dayCount) {
          result.push('-')
          continue
        }
        var sum = 0
        for (var j = 0; j < dayCount; j++) {
          sum += this.data0.values[i - j][1]
        }
        console.log('cal')
        result.push(sum / dayCount)
      }
      console.log('calaaaa', result)

      return result
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
      this.historyData2 = []
      this.historyData.forEach(item => {
        // this.arr[0] = item.date
        // this.arr[1] = parseFloat(item.open_price)
        // this.arr[2] = parseFloat(item.close_price)
        // this.arr[3] = parseFloat(item.min_price)
        // this.arr[4] = parseFloat(item.max_price)
        // console.log('bbbb', this.arr)
        this.historyData2.push([item.date, parseFloat(item.open_price), parseFloat(item.close_price), parseFloat(item.min_price), parseFloat(item.max_price)])
        // console.log('aaaaa', this.historyData2)
      })
      // console.log('Kxian', this.historyData2)
      var len = this.historyData2.length
      console.log('len', len)
      this.data0 = this.splitData(this.historyData2, len)
      this.getEcharts()
    }
  },
  components: {}
}
</script>

<style scoped lang="scss"></style>
