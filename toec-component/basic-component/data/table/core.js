export function getTableFields(list) {
  // console.log('getTableFields')
  return list.map(i => {
    if (typeof i.table === 'boolean' && !i.table) {
      return false
    } else if (Object.prototype.toString.call(i.table) === '[object Object]' && Object.keys(i.table).length) {
      // 为了兼容一些方法需要取column中的property，所以需要给每一项增加prop
      return {
        sort: 0,
        ...i,
        ...i.table,
        prop: i.key
      }
    } else {
      const temp = {
        sort: 0,
        ...i,
        prop: i.key
      }
      // console.log(`temp:`, temp)
      return temp
    }
  }).sort((a, b) => a.sort - b.sort)
}
