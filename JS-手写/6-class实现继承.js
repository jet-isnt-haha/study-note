class Animal {
    constructor(name) {
        this.name = name
    }
    name = 'aaa'
    gender = 'male'
    getF = function () {
        return 1;
    }
    getName() {
        return this.name
    }
}

class Dog extends Animal {
    constructor(name, age) {
        super(name)
        this.age = age
    }
}
console.log(Animal.getF);
console.log(Animal.getName);
console.log(new Animal('maomao'));
console.log(Object.getOwnPropertyDescriptors(new Animal('maomao').__proto__));
