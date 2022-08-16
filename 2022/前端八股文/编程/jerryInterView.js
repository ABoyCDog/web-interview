// In an integer array, there are 100 distinct numbers from 1 to 100 and one duplicated number (101 numbers in total). 
// How to find the duplicated number?

// let duplicatedFn = function (arr) {
//     // let hashMap = {};
//     // for(let i = 0; i < arr.length; i++) { // 这里可以使用of就行，不需要下标
//     //     if(!hashMap[arr[i]]) {
//     //         hashMap[arr[i]] = arr[i];
//     //     } else {
//     //         return arr[i];
//     //     }
//     // }
//
//
//     for(let i = 0; i < arr.length; i++) {
//         for(let j = i + 1; j < arr.length; j++) { // 这里可以使用findIndex
//             if(arr[i] === arr[j]) return arr[i]
//         }
//     }
// }
// duplicatedFn([1,2,3,3])

// Write a program that outputs all possibilities to put + or - or nothing between the numbers 1, 2, ..., 9 (in this order) such that the result is always 100. 
// For example: 1 + 2 + 34 – 5 + 67 – 8 + 9 = 100.

// 思路： 主要分两步，第一步是可以把所有的表达式罗列出来，第二步是可以通过js的eval()方法去计算表达式结果并筛选出结果为100的
// 递归实现 入参数(1, +, '1+')
let resArr = [];
function template(num, str, res) {
    if(num === 9) {
        resArr.push(res + num + str);
        return;
    }
    template(num + 1, '+', res + num + str);
    template(num + 1, '-', res + num + str);
    template(num + 1, '', res + num + str);
}

template(1, '+', '')
console.log(resArr);
