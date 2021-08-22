/**
 * @description 導出默認網路配置
 **/
const network = {
  //配後端數據的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  //消息框消失時間
  messageDuration: 3000,
  //最長請求時間
  requestTimeout: 500000,
  //操作正常code，支持String、Array、int多種類型
  successCode: [
    200, // OK
    201, // Created
    202, // Non-Authoritative Information
    203, // No Content
    204, // Reset Content
    205, // Partial Content
  ],
}
module.exports = network
