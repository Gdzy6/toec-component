/*
  *@Description:  多数字的input string 格式转换
  格式： (1,2,3) (2,3-5,6) (4-5)多种逗号或连字符隔开的组合
  注意：inputStr，要去掉最外层的括号
  *@Params:
    inputStr: 需要转换的原始string
    返回数据： 转换后的array

  */

//经度坐标正则
const rulesForLongtitudeRegExp = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,9})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,9}|180)$/

//纬度坐标正则
const rulesForLatitudeRegExp = /^(\-|\+)?([0-8]?\d{1}\.\d{0,9}|90\.0{0,9}|[0-8]?\d{1}|90)$/
//手机号校验方法
const rulesForYearRegExp = /^[0-9]{4}$/
//车牌验证
const rulesForPlateNumberRegExp=/(^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,使,领,A-Z]{1}[A-Z]{1}[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,蒙,桂,宁,新,藏,澳,军,海,航,警]{0,1}[0-9,A-Z]{4}[A-Z,0-9,挂,学,警,港,澳][D,F]{1})|(^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,蒙,桂,宁,新,藏,澳,军,海,航,使,领,A-Z]{1}[A-Z]{1}[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,蒙,桂,宁,新,藏,澳,军,海,航,警]{0,1}[0-9,A-Z]{4}[A-Z,0-9,挂,学,警,港,澳])$/
const rulesForVinRegExp= /^[0-9,A-Z,a-z]{1,17}$/
const rulesFortelNumberRegExp=  /^[0-9,-]{7,11}$/
const rulesForphoneNumberRegExp=  /^[1][3,4,5,7,8][0-9]{9}$/
//身份证
const rulesForIdentityRegExp = /(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
//MAC
const rulesForMacRegExp=  /([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}/
//小程序版本
const rulesForMiniVersionRegExp= /^[0-9,A-Z,a-z,.]{1,10}$/
//小程序版本
const rulesForMiniAppIDRegExp= /^[0-9,A-Z,a-z]{1,20}$/
//小程序appid验证方法
const _validateForMiniApp = MiniApp => {
  let result = ''
  if (MiniApp.length>20) {
    result = '小程序APPID最大长度为20个字符'
  }else if(!rulesForMiniAppIDRegExp.test(MiniApp)){
      result = '小程序APPID格式不正确，仅支持数字、字母'
    }
    return result
  }
//小程序版本验证方法
const _validateForMiniVersion = MiniVersion => {
  let result = ''
  if (MiniVersion.length>10) {
    result = '小程序版本最大长度为10个字符'
  }else if(!rulesForMiniVersionRegExp.test(MiniVersion)){
      result = '小程序版本格式不正确，仅支持数字、字母和英文“.”'
    }
    return result
  }
  //app版本验证方法
const _validateForAPPVersion = APPVersion => {
  let result = ''
  if (APPVersion.length>10) {
    result = 'APP版本最大长度为10个字符'
  }else if(!rulesForMiniVersionRegExp.test(APPVersion)){
      result = 'APP版本格式不正确，仅支持数字、字母和英文“.”'
    }
    return result
  }
//mac验证方法
const _validateForMAC = MACStr => {
  let result = ''
  if (!rulesForMacRegExp.test(MACStr)){
      result = 'MAC格式不正确，请输入类似00-00-00-00-00-00的格式'
    }
    return result
  } 
//vin验证方法
const _validateForIdentity = identityStr => {
  let result = ''
  if (identityStr.length > 18) {
    result = '长度大于18，身份证/护照的长度不大于18'
  } else if (!rulesForIdentityRegExp.test(identityStr)) {
    result = '身份证/护照格式不正确，请输入争取的身份证/护照的格式'
  }
  return result
}
//vin验证方法
const _validateForVin = vinStr => {
  let result = ''
  if (vinStr.length>17) {
      result = '长度大于17，vin的长度小于17'
    } else if(!rulesForVinRegExp.test(vinStr)){
      result = 'VIN格式不正确，仅支持数字和字母组合'
    }
    return result
  } 
//车牌验证方法
const _validateForPlateNumber = plateNumberStr => {
  let result = ''
  if (plateNumberStr.length > 10) {
    result = '长度大于10，车牌的长度不大于10'
  } else if (!rulesForPlateNumberRegExp.test(plateNumberStr)) {
    result = '车牌格式不正确，请输入“津A12345”的格式'
  }
  return result
}
//年份验证方法
const _validateForYear = YearStr => {
  let result = ''
  if (YearStr.length>4) {
    
        result = '车型年份最大长度为4个字符'
     
     
    } else if(!rulesForYearRegExp.test(YearStr)){
      result = '车型年份格式不正确、仅支持数字'
    }
    return result
  } 
  // 手机号校验方法
const _validateForPhoneNumber = phoneNumberStr => {
  let result = ''
  if (phoneNumberStr.length>11) {
    
        result = '联系电话最大长度为11个字符'
     
     
    } else if(!rulesForphoneNumberRegExp.test(phoneNumberStr)){
      result = '车主电话格式不正确，仅支持数字'
    }
    return result
  } 
// 电话以及手机号校验方法
const _validateForTelNumber = phoneNumberStr => {
  let result = ''
  if (phoneNumberStr.length>11) {
    
        result = '联系电话最大长度为11个字符'
     
        rulesForphoneNumberRegExp
    } else if(!rulesFortelNumberRegExp.test(phoneNumberStr)){
      result = '联系电话格式不正确，仅支持数字和英文“-”'
    }
    return result
  } 
  

const _validateForLongtitudeLatitude = positionStr => {
  let result = ''
  if (positionStr.includes(',')) {
    const positionArr = positionStr.split(',')
    if (
      positionArr &&
      positionArr instanceof Array &&
      positionArr.length === 2
    ) {
      // 校验经度
      const longtitude = positionArr[1]
      const latitude = positionArr[0]
      if (!rulesForLongtitudeRegExp.test(longtitude)) {
        result = '经度格式不正确，范围是0-180，小数点后最多9位'
      }
      if (!rulesForLatitudeRegExp.test(latitude)) {
        result = '纬度格式不正确，范围是0-90，小数点后最多9位'
      }
    } else {
      result = '请用英文逗号分隔经纬度坐标'
    }
  } else {
    result = '请用英文逗号分隔经纬度坐标'
  }

  return result
}

const generalValidator = {
   //app版本
   validateForAppVersion: (AppVersion, callback) => {
    
    let result = ''
    if (AppVersion) {
      result = _validateForAPPVersion(AppVersion)
    }
    if (result) {
      return callback(new Error(result))
    } else {
    
      return callback()
    }
  },
  //小程序版本
  validateForMiniVersion: (MiniVersion, callback) => {
    
    let result = ''
    if (MiniVersion) {
      result = _validateForMiniVersion(MiniVersion)
    }
    if (result) {
      return callback(new Error(result))
    } else {
    
      return callback()
    }
  },
   //小程序APPID
   validateForMiniAPPID: (MiniApp, callback) => {
    
    let result = ''
    if (MiniApp) {
      result = _validateForMiniApp(MiniApp)
    }
    if (result) {
      return callback(new Error(result))
    } else {
    
      return callback()
    }
  },

  validateForMac: (mac, callback) => {
    
    let result = ''
    if (mac) {
      result = _validateForMAC(mac)
    }
    if (result) {
      return callback(new Error(result))
    } else {
    
      return callback()
    }
  },
  //  //mac护照验证
  //  valiForMac: (Mac, callback) => {
    
  //   let result = ''
  //   if (Mac) {
  //     result = _validateForMAC(Mac)
  //   }
  //   if (result) {
  //     return callback(new Error(result))
  //   } else {
    
  //     return callback()
  //   }
  // },
  //身份证护照验证
  validateForIdentity: (Identity, callback) => {
    let result = ''
    if (Identity) {
      result = _validateForIdentity(Identity)
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },
  //vin验证
  validateForVin: (vin, callback) => {
    let result = ''
    if (vin) {
      result = _validateForVin(vin)
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },
  validateForNumList: (numStr, callback) => {
    let result = ''
    const regExp = /^\d([,, ]\d)*$/
    if (regExp.test(numStr)) {
      let numList = numStr.split(',')
      if (new Set(numList).size !== numList.length) {
        result = '不能填写重复元素'
      }
    } else {
      result = '填写格式应该符合1,2,3格式，单数字之间逗号隔开'
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },

  transformForMultiNum: inputStr => {
    if (inputStr.trim()) {
      // 校验数值范围
      const singleNumStr = inputStr.match(/\d+/g)
      // 单值情况  d1,d2,d3
      // 注意：这里也会把多值情况匹配出来，也就是1-10，会匹配1和10
      if (singleNumStr) {
        const finalValArray = singleNumStr.map(p => parseInt(p))
        // 多值情况 d1-d2,d3-d4
        const multiValArray = inputStr.match(/\d+-\d+/g)
        if (Array.isArray(multiValArray) && multiValArray.length > 0) {
          multiValArray.forEach(p => {
            const multiVal = p.split('-')
            const startIndex = Math.min(
              parseInt(multiVal[1]),
              parseInt(multiVal[0])
            )
            const endIndex = Math.max(
              parseInt(multiVal[1]),
              parseInt(multiVal[0])
            )
            for (let index = startIndex; index <= endIndex; index++) {
              finalValArray.push(index)
            }
          })
        }

        // 最后，单值和多值的并集，去重，排序
        return [...new Set(finalValArray)].sort((a, b) => a - b)
      }
    } else {
      return []
    }
  },

  /*
     *@Description: validator: 针对一组数据的最大值，最小值，length
     *@Params:
        data: 需要验证的数据
        min: 验证的最小值
        max: 验证的最大值
        length: data是一个数组，数组的最大长度
    */
  validatorForValueScope: (
    originData,
    minVal,
    maxVal,
    minLen,
    maxLen,
    callback
  ) => {
    let data = null
    let result = null
    // 1.检测originData类型
    if (originData && originData instanceof Array) {
      data = [...originData]
    } else if (originData && typeof originData === 'number') {
      // 转为array
      data = []
      data.push(originData)
    } else {
      result = '输入内容不包含有效数值'
    }

    // 2.统一进行检测
    if (data) {
      if (data.length > maxLen || data.length < minLen) {
        result = '输入内容长度不符合要求'
      } else {
        // 检测数值范围
        if (
          data.some(num => parseInt(num) > maxVal || parseInt(num) < minVal)
        ) {
          result = '数值范围不符合要求'
        }
      }
    }

    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },

  // @ApiDescription: 校验一个数字，最大值和最小值
  // validatorForValue(): {

  // },
  //年份验证
  validateForYear: (yearNumber, callback) => {
    // 先校验是否英文逗号隔开，一共两个数值
    let result = ''
    if (yearNumber) {
      result = _validateForYear(yearNumber)
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },

  //车牌验证
  validateForPlateNumber: (plateNumber, callback) => {
    // 先校验是否英文逗号隔开，一共两个数值
    let result = ''
    if (plateNumber) {
      result = _validateForPlateNumber(plateNumber)
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },
  validateForTelNum: (phoneNumber, callback) => {
    // 先校验是否英文逗号隔开，一共两个数值
    let result = ''
    if (phoneNumber) {
      result = _validateForTelNumber(phoneNumber)
    }
    if (result) {
    
      return callback(new Error(result))
    } else {
    
      return callback()
    }
  },
  validateForrCellPhoneNum: (phoneNumber, callback) => {
    // 先校验是否英文逗号隔开，一共两个数值
    let result = ''
    if (phoneNumber) {
      result = _validateForPhoneNumber(phoneNumber)
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },
  // 手机号验证rules
  rulesForCellPhoneNum: {
    message: '输入正确手机号码',
    trigger: 'blur',
    pattern: /^[1][3,4,5,7,8][0-9]{9}$/
  },
  // 手机号验证rules必须填
  rulesForCellPhoneNumNeed: {
    required: true,
    message: '输入正确手机号码',
    trigger: 'blur',
    pattern: /^[1][3,4,5,7,8][0-9]{9}$/
  },
  // 只能含有数字和英文
  rulesForNumAndAlpha: {
    pattern: /^[A-Za-z0-9]*$/
  },

  // 密码校验，数字, 字母，符号中的任意两种组合，长度6，20
  rulesForPassword: {
    pattern: /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
  },

  // 车型年份验证rules
  rulesForVehicleYear: {
    message: '输入正确车型年份',
    trigger: 'blur',
    pattern: /^[0-9]{4}$/
  },
  // IP地址验证rules
  rulesForIpv4Address: {
    required: true,
    message: '输入正确ip地址',
    trigger: 'blur',
    type: 'string',
    pattern: /^([1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/
  },
  // IP地址验证rules非必填
  rulesForIpv4AddressChoose: {
    required: false,
    message: '输入正确ip地址',
    trigger: 'blur',
    type: 'string',
    pattern: /^([1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])(\.([1-9]?\d|1\d{2}|2[0-4]\d|25[0-5])){3}$/
  },
  // mac地址验证rules
  rulesForMac: {
    required: true,
    message: '输入正确mac地址',
    trigger: 'blur',
    type: 'string',
    pattern: /([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}/
  },
  // mac地址验证rules非必填
  rulesForMacChoose: {
    required: false,
    message: '输入正确mac地址',
    trigger: 'blur',
    type: 'string',
    pattern: /([A-Fa-f0-9]{2}-){5}[A-Fa-f0-9]{2}/
  },
  // 一个或多个数字，英文逗号分隔校验
  rulesForMultiNumbers: {
    pattern: /^\d([,, ]\d)*$/,
    trigger: 'blur'
  },
  validateForNumber: (val, max, min, callback) => {
    let result = true
    if (typeof val === 'number') {
      if (val > max || val < min) {
        result = false
      }
    }
    if (result) {
      return callback()
    } else {
      return callback(new Error(result))
    }
  },

  // 纯数字检验
  validateCheckFigure: (digit, callback) => {
    let result = true
    if (typeof digit === 'number') {
      digit = '' + digit
    }
    if (typeof digit === 'string' && digit !== '') {
      digit = digit.trim()
      // let re = /^[0-9]+.?[0-9]*$/;
      let re = /^[0-9]{1,3}$/
      let digitList = digit.split('')
      digitList.forEach(item => {
        if (!re.test(item)) {
          result = false
        }
      })
    }
    if (result) {
      return callback()
    } else {
      return callback(new Error(result))
    }
  },
  //经纬度坐标校验validator
  //positionStr:格式是12.345556, 34.556777----中间是英文逗号隔开
  validateForLongtitudeLatitue: (positionStr, callback) => {
    // 先校验是否英文逗号隔开，一共两个数值
    let result = ''
    if (positionStr) {
      result = _validateForLongtitudeLatitude(positionStr)
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback()
    }
  },

  //道路中心点坐标校验，2-32个点位，
  //格式是12.2345, 23.3333; 23.345, 56.3444;
  //经纬度仍然是英文逗号，每个点之间是分号隔开
  validateForCenterPiontList: (pointListStr, callback) => {
    console.log('中心点')
    let result = ''
    // 至少两个点位，那么至少有一个分号
    if (pointListStr) {
      if (pointListStr.includes(';')) {
        const pointList = pointListStr.split(';')
        if (pointList.length > 32 || pointList.length < 2) {
          result = '至少2个点，最多32个点位'
        }
        if (pointList && pointList instanceof Array && pointList.length >= 2) {
          //每个点位再进行经纬度的校验即可
          for (let idx = 0; idx < pointList.length; idx++) {
            const curStr = pointList[idx].trim()
            let curValid = _validateForLongtitudeLatitude(curStr)
            if (curValid) {
              result += '第' + (idx + 1) + '点位坐标错误:' + curValid + ';'
            }
          }
        } else {
          result =
            '至少包含2个点位，每个点由经纬度构成，经纬度中间英文逗号分隔；点与点之间用英文分号分隔'
        }
      } else {
        result =
          '至少包含2个点位，每个点由经纬度构成，经纬度中间英文逗号分隔；点与点之间用英文分号分隔'
      }
    }
    if (result) {
      return callback(new Error(result))
    } else {
      return callback('')
    }
  },
  //车牌验证
  rulesForPlateNumber: {
    required: true,
    message: '输入正确车牌',
    trigger: 'blur',
    type: 'string',
    pattern: /^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,使,领,A-Z]{1}[A-Z]{1}[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,警]{0,1}[0-9,A-Z]{4}[A-Z,0-9,挂,学,警,港,澳]$/

    //pattern: /^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,警][A-Z][0-9,A-Z]{5}$/
  },
  //车牌验证非必填
  rulesForPlateNumberChoose: {
    required: false,
    message: '输入正确车牌',
    trigger: 'blur',
    type: 'string',
    pattern: /^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,使,领,A-Z]{1}[A-Z]{1}[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,警]{0,1}[0-9,A-Z]{4}[A-Z,0-9,挂,学,警,港,澳]$/

    //pattern: /^[京,津,渝,沪,冀,晋,辽,吉,黑,苏,浙,皖,闽,赣,鲁,豫,鄂,湘,粤,琼,川,贵,云,陕,秦,甘,陇,青,台,内蒙古,桂,宁,新,藏,澳,军,海,航,警][A-Z][0-9,A-Z]{5}$/
  },
  //vin验证
  rulesForVinNumber: {
    required: false,
    message: '输入正确的VIN格式',
    trigger: 'blur',
    type: 'string',
    pattern: /^[0-9,A-Z,a-z]{1,17}$/
  },
  //身份证验证
  rulesForIdentityNumber: {
    required: false,
    message: '输入正确的身份证或护照格式',
    trigger: 'blur',
    type: 'string',
    pattern: /(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
  },
  // 一般的enum类型的rules
  rulesForEnumType: (msg, enumList) => {
    return {
      required: true,
      message: msg,
      trigger: 'blur',
      type: 'enum',
      enum: enumList
    }
  }
}
export default generalValidator
