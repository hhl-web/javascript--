function Foo() {
    Foo.prototype.a = function () {
        console.log(1)
    }
    this.a = function () {
        console.log(2)
    }
}
Foo.a = function () {
    console.log(3)
}
Foo.prototype.a = function () {
    console.log(4)
}
Foo.a() // 3
let obj = new Foo()
obj.a() // 2
Foo.prototype.a() // 1 执行阶段重新赋值(函数重载)，还没执行代码只会初始化AO