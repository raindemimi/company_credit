import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 搜索框输入的值
    input: '',
    // 根据搜索框查询数据库获得的企业信息数组
    companyList: [],
    // 上市企业的数据
    company2List: [],
    // 企业保存在数据库中的id
    id: -1,
    // 根据id查询的企业数据
    company: {},
    // 根据code查询到的上市企业数据
    companyByCode: {},
    // 股东信息
    shareholder: [],
    // 外链网站信息
    website: [],
    // 上市企业股票代码
    code: '00700'
    // 上市公司利润表数据
    // lrbList: []
  },

  mutations: {
    initInput (state, input) {
      state.input = input
    },
    initCompany (state, company) {
      state.company = company
    },
    initCompanyByCode (state, companyByCode) {
      state.companyByCode = companyByCode
    },
    initCompanyList (state, list) {
      state.companyList = list
    },
    initCompany2List (state, list) {
      state.company2List = list
    },
    getCompanyById (state, id) {
      state.id = id
    },
    getCompanyCode (state, code) {
      state.code = code
    },
    initShareholder (state, shareholder) {
      state.shareholder = shareholder
    },
    initWebsite (state, website) {
      state.website = website
    }
    // initLrbList (state, lrbList) {
    //   state.lrbList = lrbList
    // }
  },

  actions: {
    // 获取企业信息 根据输入的关键字
    getCompanyList (context) {
      // eslint-disable-next-line no-unused-vars
      axios
        .post('company/selectCompanyByName', {
          name: context.state.input
        })
        .then(({ data }) => {
          // console.log(data)
          context.commit('initCompanyList', data)
        })
    },
    // 根据关键词查找企业信息
    getCompany2List (context) {
      axios
        .get('company2/selectByName', {
          params: {
            company_name: context.state.input
          }
        })
        .then(({ data }) => {
          // console.log(data)
          context.commit('initCompany2List', data)
        })
    },
    // 根据id获取企业工商信息
    getCompany (context) {
      axios
        .post('company/selectCompanyById', {
          id: context.state.id
        })
        .then(({ data }) => {
          console.log(data[0])
          context.commit('initCompany', data[0])
        })
    },
    getShareholder (context) {
      axios
        .post('shareholder/selectShareById', {
          id: context.state.id
        })
        .then(({ data }) => {
          console.log(data)
          context.commit('initShareholder', data)
        })
    },
    // 获取网站信息
    getWebsite (context) {
      axios.get('website/selectWebsite').then(({ data }) => {
        console.log(data)
        context.commit('initWebsite', data)
      })
    },
    // 根据企业股票代码获取企业信息
    getCompanyByCode (context) {
      axios
        .get('company2/selectByCode', {
          params: {
            code: context.state.code
          }
        })
        .then(({ data }) => {
          // console.log(data)
          context.commit('initCompanyByCode', data[0])
        })
    }
    // getLrbList (context) {
    //   axios
    //     .get('lrb/selectByCode', {
    //       params: {
    //         code: context.state.code
    //       }
    //     })
    //     .then(data => {
    //       console.log(data)
    //       context.commit('initLrbList', data)
    //     })
    // }
  },

  modules: {}
})
