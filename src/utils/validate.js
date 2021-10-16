/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判讀是否為外鏈
 * @param path
 * @returns {boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 校驗密碼是否小於6位
 * @param value
 * @returns {boolean}
 */
export function isPassword(value) {
  return value.length >= 6
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否為數字
 * @param value
 * @returns {boolean}
 */
export function isNumber(value) {
  const reg = /^[0-9]*$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是名稱
 * @param value
 * @returns {boolean}
 */
export function isName(value) {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]+$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否為IP
 * @param ip
 * @returns {boolean}
 */
export function isIP(ip) {
  const reg =
    /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是傳統網站
 * @param url
 * @returns {boolean}
 */
export function isUrl(url) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是小寫字母
 * @param value
 * @returns {boolean}
 */
export function isLowerCase(value) {
  const reg = /^[a-z]+$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是大寫字母
 * @param value
 * @returns {boolean}
 */
export function isUpperCase(value) {
  const reg = /^[A-Z]+$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是大寫字母開頭
 * @param value
 * @returns {boolean}
 */
export function isAlphabets(value) {
  const reg = /^[A-Za-z]+$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是字符串
 * @param value
 * @returns {boolean}
 */
export function isString(value) {
  return typeof value === 'string' || value instanceof String
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是數組
 * @param arg
 * @returns {arg is any[]|boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是端口號
 * @param value
 * @returns {boolean}
 */
export function isPort(value) {
  const reg =
    /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是手機號
 * @param value
 * @returns {boolean}
 */
export function isPhone(value) {
  const reg = /^1\d{10}$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是身份證號(第二代)
 * @param value
 * @returns {boolean}
 */
export function isIdCard(value) {
  const reg =
    /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否是郵箱
 * @param value
 * @returns {boolean}
 */
export function isEmail(value) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否中文
 * @param value
 * @returns {boolean}
 */
export function isChina(value) {
  const reg = /^[\u4E00-\u9FA5]{2,4}$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否為空
 * @param value
 * @returns {boolean}
 */
export function isBlank(value) {
  return (
    value == null ||
    false ||
    value === '' ||
    value.trim() === '' ||
    value.toLocaleLowerCase().trim() === 'null'
  )
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否為固話
 * @param value
 * @returns {boolean}
 */
export function isTel(value) {
  const reg =
    /^(400|800)([0-9\\-]{7,10})|(([0-9]{4}|[0-9]{3})([- ])?)?([0-9]{7,8})(([- 轉])*([0-9]{1,4}))?$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否為數字且最多兩位小數
 * @param value
 * @returns {boolean}
 */
export function isNum(value) {
  const reg = /^\d+(\.\d{1,2})?$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷經度 -180.0～+180.0（整數部分為0～180，必須輸入1到5位小數）
 * @param value
 * @returns {boolean}
 */
export function isLongitude(value) {
  const reg = /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷緯度 -90.0～+90.0（整數部分為0～90，必須輸入1到5位小數）
 * @param value
 * @returns {boolean}
 */
export function isLatitude(value) {
  const reg = /^[-|+]?([0-8]?\d{1}\.\d{1,5}|90\.0{1,5})$/
  return reg.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description rtsp校驗，只要有rtsp://
 * @param value
 * @returns {boolean}
 */
export function isRTSP(value) {
  const reg =
    /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  const reg1 =
    /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):[0-9]{1,5}/
  const reg2 =
    /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\//
  return reg.test(value) || reg1.test(value) || reg2.test(value)
}

/**
 * @author chuzhixin 1204505056@qq.com
 * @description 判斷是否為json
 * @param value
 * @returns {boolean}
 */
export function isJson(value) {
  if (typeof value == 'string') {
    try {
      var obj = JSON.parse(value)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
}
