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
Foo.a() //3
let obj = new Foo()
obj.a() //2
Foo.prototype.a() //1