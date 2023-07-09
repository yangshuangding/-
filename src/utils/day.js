import dayjs from 'dayjs'
const quarterOfYear = require('dayjs/plugin/quarterOfYear')// day.js季度插件
dayjs.extend(quarterOfYear)
export function quickTime (key) {
  let start = ''
  let end = ''
  switch (key) {
    case '本年度':
      start = dayjs().startOf('year').format('YYYY-MM-DD')
      end = dayjs().endOf('year').format('YYYY-MM-DD')
      break
    case '上一年度':
      start = dayjs().add(-1, 'year').startOf('year').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'year').endOf('year').format('YYYY-MM-DD')
      break
    case '下一年度':
      start = dayjs().add(1, 'year').startOf('year').format('YYYY-MM-DD')
      end = dayjs().add(1, 'year').endOf('year').format('YYYY-MM-DD')
      break
    case '上半年':
      start = dayjs().startOf('year').format('YYYY-MM-DD')
      end = dayjs().endOf('year').subtract(6, 'month').format('YYYY-MM-DD')
      break
    case '下半年':
      start = dayjs().startOf('year').add(6, 'month').format('YYYY-MM-DD')
      end = dayjs().endOf('year').format('YYYY-MM-DD')
      break
    case '本季度':
      start = dayjs().startOf('quarter').format('YYYY-MM-DD')
      end = dayjs().endOf('quarter').format('YYYY-MM-DD')
      break
    case '上一季度':
      start = dayjs().add(-1, 'quarter').startOf('quarter').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'quarter').endOf('quarter').format('YYYY-MM-DD')
      break
    case '下一季度':
      start = dayjs().add(1, 'quarter').startOf('quarter').format('YYYY-MM-DD')
      end = dayjs().add(1, 'quarter').endOf('quarter').format('YYYY-MM-DD')
      break
    case '本月':
      start = dayjs().startOf('month').format('YYYY-MM-DD')
      end = dayjs().endOf('month').format('YYYY-MM-DD')
      break
    case '上月':
      start = dayjs().add(-1, 'month').startOf('month').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'month').endOf('month').format('YYYY-MM-DD')
      break
    case '下月':
      start = dayjs().add(1, 'month').startOf('month').format('YYYY-MM-DD')
      end = dayjs().add(1, 'month').endOf('month').format('YYYY-MM-DD')
      break
    case '本周':
      start = dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD')
      end = dayjs().endOf('week').add(1, 'day').format('YYYY-MM-DD')
      break
    case '上周':
      start = dayjs().add(-1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD')
      break
    case '下周':
      start = dayjs().add(1, 'week').startOf('week').add(1, 'day').format('YYYY-MM-DD')
      end = dayjs().add(1, 'week').endOf('week').add(1, 'day').format('YYYY-MM-DD')
      break
    case '今天':
      start = dayjs().format('YYYY-MM-DD')
      end = dayjs().format('YYYY-MM-DD')
      break
    case '昨天':
      start = dayjs().add(-1, 'day').format('YYYY-MM-DD')
      end = dayjs().add(-1, 'day').format('YYYY-MM-DD')
      break
    case '明天':
      start = dayjs().add(1, 'day').format('YYYY-MM-DD')
      end = dayjs().add(1, 'day').format('YYYY-MM-DD')
      break
    case '过去7天':
      start = dayjs().add(-7, 'day').format('YYYY-MM-DD')
      end = dayjs().format('YYYY-MM-DD')
      break
    case '过去30天':
      start = dayjs().add(-30, 'day').format('YYYY-MM-DD')
      end = dayjs().format('YYYY-MM-DD')
      break
    case '未来7天':
      start = dayjs().format('YYYY-MM-DD')
      end = dayjs().add(7, 'day').format('YYYY-MM-DD')
      break
    case '未来30天':
      start = dayjs().format('YYYY-MM-DD')
      end = dayjs().add(30, 'day').format('YYYY-MM-DD')
      break
    default:
  }
  return [start, end]
}
