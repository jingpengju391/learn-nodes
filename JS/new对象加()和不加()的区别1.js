class Person {
    constructor(x){
        this.name = x
    }
}

console.log(new Person)
console.log(new Person())

console.log(new Person() === new Person)


class Person {
    constructor(x){
        this.name = x
    }

    output(){
        console.log(this.name)
    }
}

const p1 = new Person

const p2 = new Person('2222')



console.log(p1.output())
console.log(p2.output())

console.log(new Person() === new Person)