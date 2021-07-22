/*
 *@FileDescription: 计算设备属性的公用utils
 *@Author: LiXiang
 *@Date: 2021-04-16 15:33:38
 *@ReleaseNote:
*/
/*
 *@Description: 由设备的主子码类型，自动计算出ssid
 *@Params: deviceType: 设备主子码如0b01，也就是ssid的后四位
 return：设备的ssid
*/
export const getSsidByDeviceType = (deviceMainSubType) => {
  console.log('getSsidByDeviceType')
  if (deviceMainSubType) {
    // 1.获取当前年份,如2021年，获取的结果是21
    const thisYear = new Date()
    const prefix = ('' + thisYear.getFullYear()).slice(2)

    // 拼接ssid的16进制字符串
    return '0x' + prefix + deviceMainSubType + '01'
  }
}
