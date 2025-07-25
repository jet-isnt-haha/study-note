//借助构造函数实现继承
function Animal(name) {
    this.name = name;
    this.getName = function () {
        return this.name;
    }
}
/* Animal.prototype.getName = function(){
    return this.name;
} */
function Dog(name) {
    Animal.call(this, name);
}

Dog.prototype = new Animal();

//解决构造函数实现继承解决了原型链继承的两个问题
/* 
    1.引用类型共享问题
    2.传参问题
*/
//但是由于方法必须定义在构造函数中，所以会导致每次创建子类实例都会创建一边方法

console.log(Dog.prototype);
/* 
    还会创建一个没有赋值的多余的原型对象
    * 原因Dog.prototype = new Animal();
    * 并且至少会调用两次父类构造函数
    Dog.prototype = new Animal();
      Animal.call(this,name);
*/

const dog1 = new Dog('aaa');
console.log(dog1.getName());

const dog2 = new Dog('bb');
console.log(dog2.getName());

const dog3 = new Dog('c');
console.log(dog3.getName());

