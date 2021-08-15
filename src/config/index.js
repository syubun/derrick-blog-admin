/**
 * @description 3個子配置，通用配置|主題配置|網絡配置，建議在當前目錄下修改config.js修改配置，會覆蓋默認配置，也可以直接修改默認配置
 */
//默認配置
const { setting, theme, network } = require('./default')
//自定義配置
const config = require('./config')
//導出配置（以自定義配置為主）
module.exports = Object.assign({}, setting, theme, network, config)
