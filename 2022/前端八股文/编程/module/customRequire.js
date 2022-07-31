// 浏览器本身是没有模块化的相关处理的，在es6之前就是没有语言层面的模块化的，也就是需要通过第三方库实现模块化的。因为node自带模块化规范，环境里面自带的封装。
// commonjs是在nodejs环境下独有的一套规范，其中是通过 required 函数进行模块导入，通过module.exports来进行模块化的导出的

const path = require('path');
const fs = require('fs');
const vm = require('vm');

function customRequire(pathToModule) {
    const pathToModuleAbs = path.resolve(__dirname, pathToModule);
    const content = fs.readFileSync(pathToModuleAbs, 'utf-8');

    const functionWrapper = [
        '(function funcWrapper(require, module, exports, __dirname, __filename) {\n',
        '})',
    ];
    const result = `${functionWrapper[0]}${content}${functionWrapper[1]}`
    const script = new vm.Script(result);
    const func = script.runInThisContext();

    const m = { exports: {}};
    func(customRequire, m, m.exports);
    
    return m.exports;
}

const requireResult = customRequire('./test.js');
console.log(requireResult);

