import Mock from 'mockjs'
import loginAPI from './login'
import table from './table'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/user\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/user\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

// 列表
Mock.mock(/\/table\/list/, 'get', table.getList)

export default Mock
