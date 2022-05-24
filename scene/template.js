// function template1(str) {
//     return function (obj) {
//         for (let key in obj) {
//             let reg = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
//             str = str.replace(reg, obj[key])
//         }
//         return str
//     }
// }
// const tpl = template1('<p>hey there {{ name }} {{ name }}</p>')
// const res = tpl({ name: 'Neo' })

// console.log('template', res)


function template2(str) {
    return function (obj) {
        let arr = [];
        let reg = new RegExp(`{{\\s*(.+?)\\s*}}`);
        while (str.length) {
            const res = reg.exec(str);
            if (res) {
                let noMatch = str.slice(0, res.index);
                str = str.slice(res.index);
                arr.push(`_s('${noMatch}')`);
                arr.push(`_getVal('${res[1]}')`);
                str = str.slice(res[0].length);
            } else {
                arr.push(`_s('${str}')`);
                str = ''
            }
        }
        obj._getVal = function (key) {
            return obj[key]
        }
        obj._s = function (val) {
            if (typeof val === 'object') return JSON.stringify(val);
            return val;
        }
        let code = arr.join('+');
        let render = new Function(`with(this){return _s(${code})}`);
        let template = render.call(obj);
        return template;
    }
}


const tpl = template2('<p>hey there {{ name }} {{ name }}</p>')
const res = tpl({ name: 'Neo' })

console.log('template', res)