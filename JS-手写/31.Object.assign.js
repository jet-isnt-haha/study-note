
const person = {
    name: 'jet',
    age: 20
}

const p = Object.assign(person, { name: 'jelly', gender: 'male' })
console.log(p);

Object.myAssign = function (target, ...source) {
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }

    let ret = Object(target);
    source.forEach(function (obj) {
        if (obj != null) {
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    ret[key] = obj[key]
                }
            }
        }

    })
    return ret;
}