// 表单公用验证
export default class fieldValidator {
  //ip地址验证
  static validateIp (rule, value, callback) {
    const reg = /^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/
    if (value == '' || value == undefined || value == null) {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的ip地址'))
      } else {
        callback()
      }
    }
  }
  // 验证数字范围
  static validateMaxMinNum (rule, value, callback,minVal,maxVal) {
    if(Number.isInteger(Number(value)) && Number(value) >= minVal && Number(value)<=maxVal){
      callback();
    }else{
      callback(new Error("请输入有效数字(" + minVal + "-" + maxVal + ")"));
    }
  }
  // 验证是否合法的最多带两位小数的正数
  static validateTinyNumber (rule, value, callback) {
    const reg = /^[0-9]+(\.[0-9]{1,2})?$/
    if (value == '' || value == undefined || value == null) {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正数(最多两位小数)'))
      } else {
        callback()
      }
    }
  }
  // 验证是否合法的手机号码
  static validatePhone (rule, value, callback) {
    const reg = /^[1][3,4,5,6.7,8,9][0-9]{9}$/
    if (value == '' || value == undefined || value == null) {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
  }
  // 验证必须为正整数
  static validatePlusNumber(rule, value, callback) {
    const reg = /^[1-9]\d*$/
    if (value == '' || value == undefined || value == null) {
      callback()
    } else {
      if (!reg.test(value)) {
        callback(new Error('请输入正整数'))
      } else {
        callback()
      }
    }
  }
}


