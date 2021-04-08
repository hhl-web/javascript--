// 一是要保存函数的上下文信息
// 二是实现一个完善的迭代方法，使得多个 yield 表达式按序执行，从而实现生成器的特性。

function* example(){
  yield 1;
  yield 2;
  yield 3;
  return;
}
var iter=example();  //生成器对象
iter.next();
iter.next();
iter.next();

// 模拟
// 迭代器
function gen$(_context){
  while(1){
    switch(_context.prev = _context.next){
      case 0:
        _context.next=1;
        return 1;
      case 1:
        _context.next =2;
        return 2;
      case 2:
        _context.next=3;
        return 3;
      case 3:
      case 'end':
        return _context.stop();
    }
  }
}
// 上下文
var context ={
  next:0,
  prev:0,
  done:false,
  stop:function stop(){
    this.done =true;
  }
}

let gen =function(){
  return {
    next:function(){
      value =context.done ?undefined:gen$(context);
      done =context.done;
      return{
        value,
        done
      }
    }
  }
}

  var g=gen();  //生成器对象
  g.next();
  g.next();
  g.next();