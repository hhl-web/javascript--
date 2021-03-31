function cycle (target) {
  var map = new WeakMap()
  function _cycle (obj) {
    if (!map.has(obj)) map.set(obj, obj);
    let keys = Object.keys(obj);
    for (let i = 0, len = keys.length; i < len; i++) {
      if (typeof obj[keys[i]] === 'object') {
        if (map.has(obj[keys[i]])) {
          obj[keys[i]] = '$'
          continue;
        } else {
          map.set(obj[keys[i]], obj[keys[i]])
        }
        _cycle(obj[keys[i]]);
      }
    }
  }
  _cycle(target);
  return target;
}


function anotherFn(){/*...*/};
var anotherObj={
  c:true,
}
var anotherArr=[];
var myObj={
  a:2,
  b:anotherObj,
  c:anotherArr,
  d:anotherFn,
}
anotherArr.push(anotherObj,myObj)
var obj=cycle(myObj);
console.log(obj);