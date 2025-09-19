
function object(o) {
    function F() { }
    F.prototype = o;
    return new F();
}

function inheritPrototype(child, parent) {
    let a = object(parent.prototype)

    a.constructor = child;
    child.prototype = a
}

function Animal(name) {
    this.name = name;
    this.colors = ['black', 'white']
}

Animal.prototype.getName = function () {
    return this.name
}

function Dog(name, age) {
    Animal.call(this, name);
    this.age = age;
}

inheritPrototype(Dog, Animal)


const dog1 = new Dog('aaa', 2);
dog1.colors.push('brown');
const dog2 = new Dog('bbb', 3);

console.log(dog1);
console.log(dog2);

/*  */


Dog.prototype = Object.create(Animal.prototype)
console.log(Dog.prototype);
Dog.prototype.constructor = Dog;
const dog3 = new Dog('ccc', 4)
console.log(Dog.prototype);
console.log(dog3);