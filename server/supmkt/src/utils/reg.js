/**
*工具函数
*/
// 验证密码 return true/false ==> 首字母开头且大写 长度3-6之间 只能包含字符 数字
export function pwdReg(value) {
    // 正则
    const reg = /^[A-Z][a-z0-9]+$/;
    return reg.test( value )

}