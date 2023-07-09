import Mock from 'mockjs'
import TableAPI from './table'
import QuestionsAPI from './questions'

Mock.setup({
  timeout: '500'
})
Mock.mock(/\/table\/list\.*/, 'get', TableAPI.list)
Mock.mock(/\/questions\/randoms\.*/, 'get', QuestionsAPI.list)
Mock.mock(/\/questions\/randoms\.*/, 'delete', QuestionsAPI.delete)

fetch('/table/list.ewr').then((res) => {
  console.log(
    res.json().then(
      (res) => console.log(res),
      (err) => console.log(err)
    )
  )
  // res.json().then((a) => {
  //   console.log(a)
  // })
})
