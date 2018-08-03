import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    code: 200,
    data: {
      roles: ['admin'],
      token: 'admin',
      introduction: '我是超级管理员',
      avatar: 'http://i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
      name: 'Super Admin'
    }
  },
  editor: {
    code: 200,
    data: {
      roles: ['editor'],
      token: 'editor',
      introduction: '我是编辑',
      avatar: 'http://i2.letvimg.com/lc07_img/201701/05/20/58/avatar5.png',
      name: 'Normal Editor'
    }
  }
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: config => {
    return {
      code: 200,
      data: {}
    }
  }
}
