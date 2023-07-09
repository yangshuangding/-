export function getFirstDayOfMonth () {
  const now = new Date() // 获取当前时间
  const year = now.getFullYear() // 获取当前年份
  let month = now.getMonth() + 1 // 获取当前月份
  if (month < 10) {
    month = '0' + month
  }
  const simple = `${year}-${month}-01`
  const result = `${year}-${month}-01 00:00:00` // 拼接当前月份第一天的字符串
  return { result, simple }
}
export function getMyTime () {
  let time = ''
  const date = new Date()
  const y = String(date.getFullYear())
  let m = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let min = date.getMinutes()
  let s = date.getSeconds()

  if (m < 10) {
    m = '0' + m
  }
  if (d < 10) {
    d = '0' + d
  }
  if (h < 10) {
    h = '0' + h
  }
  if (min < 10) {
    min = '0' + min
  }
  if (s < 10) {
    s = '0' + s
  }
  const simpleTime = y + '-' + m + '-' + d
  time += y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
  return { time, simpleTime }
}

export function getFirstDayOfWeek () {
  const now = new Date() // 获取当前时间
  const dayOfWeek = now.getDay() // 获取今天是本周的第几天（0 表示周日，1 表示周一，以此类推）
  const time = now.getTime() // 获取当前时间的时间戳
  const oneDay = 24 * 60 * 60 * 1000 // 一天的毫秒数
  const firstDayOfWeekTime = time - (dayOfWeek - 1) * oneDay // 计算出当前周第一天的时间戳
  const firstDayOfWeek = new Date(firstDayOfWeekTime) // 创建一个 Date 对象，用于格式化输出
  const year = firstDayOfWeek.getFullYear() // 获取当前年份
  const month = firstDayOfWeek.getMonth() + 1 // 获取当前月份
  const day = firstDayOfWeek.getDate() // 获取当前日期
  const result = `${year}-${month}-${day}` // 将结果拼接成字符串
  return result
}

export function getFirstDayOfYear () {
  const now = new Date()
  const year = now.getFullYear()
  const firstDayOfYear = new Date(year, 0, 1)
  const firstDayOfYearTimestamp = firstDayOfYear.getTime()
  return { year, firstDayOfYearTimestamp }
}
