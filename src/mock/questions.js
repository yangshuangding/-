
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const list = []
for (let i = 0; i < 178; i++) {
  const mock = Mock.mock({
    id: /[a-z][0-9]{20}/,
    addTime: '@datetime',
    userName: '@cname',
    'questionIDs|2-5': [
      { number: /[a-z][0-9]{20}/, 'id|18-25': 1 }
    ],
    'accuracyRate|50-100': 1,
    'totalSeconds|300-3000': 1,
    'questionType|1': ['1', '2', '3']
  })
  list.push(mock)
}

export default {
  list: config => {
    console.log(config)
    const { page = 1, pagesize = 20, keyword = '' } = param2Obj(config.url)
    const filterList = list.filter(item => item.id.includes(keyword))
    const data = filterList.slice((page - 1) * pagesize, page * pagesize)
    return {
      counts: filterList.length,
      pagesize: pagesize,
      page: page,
      items: data
    }
  },
  // 删除
  delete: config => {
    const body = JSON.parse(config.body)
    const index = list.findIndex(item => item.id === body.id)
    list.splice(index, 1)
    return {}
  }
}
