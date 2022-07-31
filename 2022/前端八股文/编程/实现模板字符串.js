
// 定义一个字符串
let data = { 
    year: 4, 
    pos: "前端"
};
let str = "我已经有${year}年${pos}开发经验了";
function replace(str){
    // 原理是通过正则匹配，替换原字符串中的变量
    return str.replace(/\$\{([^}])\}/g, (matched,key) => data[key])
}
console.log(replace(str))

