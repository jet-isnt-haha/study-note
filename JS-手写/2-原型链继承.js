//原型链继承
function Animal(){
    this.colors =['black','white'];
    this.name="aaa";
}

Animal.prototype.getColor=function(){
    return this.colors;
}

function Dog(){

}

Dog.prototype=new Animal();

const dog1 = new Dog();

dog1.colors.push('brown');
//不是读取原型链上的name而是自己创建一个name属性并赋值
dog1.name = "jet"
console.log(dog1);
//打印结果为Animal { name: 'jet' }，只能打印自身有的属性，并且其constructor的name为Animal不是Dog
const dog2 = new Dog();

console.log(dog2.colors);
console.log(dog2.name);
//原型链继承存在的问题
/* 
    1.原型中包含的引用类型属性将被所有实例共享；
    2.子类在实例化的时候不能给父类构造函数传参
    3.子类创建的实例不能遍历出父类的属性以及其consonstructor的name是父类的consonstructor的name
*/