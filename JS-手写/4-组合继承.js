//组合继承

//组合继承结合了原型链和盗用构造函数，将两者的优点集中了起来。基本的思路是使用原型链继承原型上的属性和方法，而通过盗用构造函数继承实例属性。这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性。

function Animal(name){
    this.name = name;
    this.colors = ['black','white'];
}

Animal.prototype.getName = function(){
    return this.name;
}

function Dog(name,age){
    Animal.call(this,name);
    this.age = age;
}

Dog.prototype = new Animal();
//将new Animal()这个对象附上属性constructor并指向构造函数Dog，使子类的constructor的name为其构造函数的name
Dog.prototype.constructor = Dog

const dog1 = new Dog('aaa',2);
dog1.colors.push('brown');
const dog2 = new Dog('bbb',3);

console.log(dog1);
console.log(dog2);
/* 
打印结果：
Dog { name: 'aaa', colors: [ 'black', 'white', 'brown' ], age: 2 }
Dog { name: 'bbb', colors: [ 'black', 'white' ], age: 3 }
*/

/* 
    组合继承已经相对完善了，但是依然没有解决
    至少调用两次父类构造函数的问题
*/