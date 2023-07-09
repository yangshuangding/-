export function getFirstDayOfMonth () {
  const now = new Date() // 获取当前时间
  const year = now.getFullYear() // 获取当前年份
  const month = now.getMonth() + 1 // 获取当前月份
  const result = `${year}.${month}.01` // 拼接当前月份第一天的字符串
  return result
}

export function getFirstDayOfWeek () {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const time = now.getTime()
  const oneDay = 24 * 60 * 60 * 1000
  const firstDayOfWeekTime = time - (dayOfWeek - 1) * oneDay
  const firstDayOfWeek = new Date(firstDayOfWeekTime)
  const year = firstDayOfWeek.getFullYear()
  const month = (firstDayOfWeek.getMonth() + 1).toString().padStart(2, '0') // 补零
  const day = firstDayOfWeek.getDate().toString().padStart(2, '0') // 补零
  const result = `${year}-${month}-${day}`
  return result
}

export function getFirstDayOfYear () {
  const now = new Date()
  const year = now.getFullYear()
  const firstDayOfYear = new Date(year, 0, 1)
  const firstDayOfYearTimestamp = firstDayOfYear.getTime()
  return { year, firstDayOfYearTimestamp }
}

export function getCurrentTime () {
  const now = new Date()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}
