# ES6



## Let、Const 变量声明

### let命令

- 基本用法

let是ES6用来声明变量的命令.用法类似于var,但是所声明的变量,只在let命令所在的代码块内有效.如下:

```javascript
{
  var testVat = 6;
  let testLet = 8;
  console.log("testVat = "+testVat); // testVat = 6
  console.log("testLet = "+testLet); // testLet = 8
}
```

- 在for循环中使用

let 声明的变量具有块级作用域。在每次循环迭代中，for 循环的 let i 变量会在每个新的迭代中重新声明，因此每次循环都会拥有一个新的变量域。

具体来说，使用 let 声明的变量在 for 循环中，每次迭代都会创建一个新的变量绑定。这与 var 的行为不同，var 声明的变量在函数级别上是共享同一个变量的。如下:

```javascript
for (let i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 500);
}
// 输出0 到 9

```

在这个例子中，由于 let 在每次循环中都创建了一个新的绑定，所以每次 setTimeout 回调函数执行时，i 都是不同的，输出将是 0 到 9。

注： 如果每一轮循环的变量i都是重新声明的，那它怎么知道上一轮循环的值，从而计算出本轮循环的值？这是因为JavaScript 引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(() => console.log(i), 500);
}
// 每次输出10

```

在这种情况下，var 声明的 i 变量在整个循环过程中是共享的，所以当 setTimeout 回调函数执行时，i 的值已经变成了 10（循环结束后的值），因此会输出 10 十次。

- 不能重复声明

let 不允许在相同作用域内，重复声明同一个变量，而var 可以

```javascript
//在同一个作用域内var可以重复声明
var test = 'cj';
var test = '11cj';
//let重复声明会报错 SyntaxError: Identifier 'testLet' has already been declared.
let testLet = 'cj';
let testLet = '11cj';

```



- 不存在变量提升

```javascript
//var
console.log(testVar);  // undefined
var testVar = 5;
//let
console.log(testLet);  //  Error in created hook: "ReferenceError: Cannot access 'testLet' before initialization"
let testLet = 5;

```



- 暂时性死区

ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

```javascript
var test = 'cj'; 
if(true){
 test = '11cj';
 let test ;
}
```

以上代码会报错：ReferenceError: Cannot access ‘test’ before initialization



### const命令

- 基本用法

const声明一个只读的常量.一旦声明,常量的值就不能改变.

```javascript
const TEST_CONST = 'cj';
TEST_CONST = '11cj';
//报错  TypeError: Assignment to constant variable

```

const一旦声明变量,就必须立即初始化.

```javascript
const TEST_CONST ;
//报错 SyntaxError:  Missing initializer in const declaration. 

```

其他使用和let是一致的。

- 本质

const实际上是保证变量指向的那个内存地址所保存的数据不得改动过。对于简单的数据类型（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。如下：

```javascript
const TEST_CONST = {
  'name':'11cj',
  'age': 20
};
console.log(TEST_CONST);
TEST_CONST.name = 'cj';
TEST_CONST.other = 'hhh';
console.log(TEST_CONST);

```

是可以通过的	



### var，let和const对比

|    特性    |            var            |      let       |     const      |
| :--------: | :-----------------------: | :------------: | :------------: |
|   作用域   |        函数作用域         |   块级作用域   |   块级作用域   |
|  变量提升  | 有（声明提升+初始化提升） | 有（声明提升） | 有（声明提升） |
|  重复声明  |           允许            |     不允许     |     不允许     |
| 必须初始化 |            否             |       否       |       是       |
|  重新赋值  |           允许            |      允许      |     不允许     |





## 数据功能扩展

### 

### 字符串

#### `includes()、startsWith()、endsWith()`

传统JavaScript只有indexOf()方法用来确定一个字符串是否包含在另一个字符串中，ES6又提供了三个新方法。
includes()：返回布尔值，表示是否找到了参数字符串。
startsWith()：返回布尔值，表示参数字符串是否在原字符串的头部。
endsWith()：返回布尔值，表示参数字符串是否在原字符串的尾部。

```javascript
let s = 'Hello world!';

s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('o') // true

```

这三个方法都支持第二个参数，表示开始搜索的位置。但是使用第二个参数`n`时，`endsWith`的行为与其他两个方法有所不同。它针对前`n`个字符，而其他两个方法针对从第`n`个位置直到字符串结束。

```javascript
let s = 'Hello world!';

s.startsWith('world', 6) // true
s.endsWith('Hello', 5) // true
s.includes('Hello', 6) // false`
```

#### `repeat`

`repeat`方法返回一个新字符串，表示将原字符串重复n次。

```javascript
'x'.repeat(3) // "xxx"
'hello'.repeat(2) // "hellohello"
'na'.repeat(0) // ""

```

参数如果是小数，会被向下取整。
如果repeat的参数是负数或者Infinity，会报错。
0 到-1 之间的小数，则等同于 0，这是因为会先进行取整运算。0 到-1 之间的小数，取整以后等于-0，repeat视同为 0。
参数NaN等同于 0。
如果repeat的参数是字符串，则会先转换成数字。



#### `padStart()`、`padEnd()`。

ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart()`用于头部补全，`padEnd()`用于尾部补全。

```javascript
'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'

'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'

```

- 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串。
- 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串。
- 如果省略第二个参数，默认使用空格补全长度。



#### `模板字符串`

模板字符串是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

- 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
- 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。
- 模板字符串中嵌入变量，需要将变量名写在${}之中。
- 大括号内部可以放入任意的 JavaScript 表达式，可以进行运算，以及引用对象属性。
- 模板字符串之中还能调用函数。
- 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
- 如果模板字符串中的变量没有声明，将报错。



```javascript
var name = "cj",trait = "帅气";
//es
var str = "我叫"+name+",人非常"+trait+",说话又好听";

//es6
var str2 = `我叫 ${name} ,人非常 ${trait} ,说话又好听`;

```





#### `标签模板`

标签模板。模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串。这被称为“标签模板”功能。



```javascript
alert`123`
// 等同于
alert(123)

```



标签模板其实不是模板，而是函数调用的一种特殊形式。“标签”指的就是函数，紧跟在后面的模板字符串就是它的参数。如果模板字符里面有变量，就不是简单的调用了，而是会将模板字符串先处理成多个参数，再调用函数。

```javascript
let a = 5;
let b = 10;

tag`Hello ${ a + b } world ${ a * b }`;
// 等同于
tag(['Hello ', ' world ', ''], 15, 50);

```





### 数组



#### `Number.isFinite()、Number.isNaN()`

1. ES6 在`Number`对象上，新提供了`Number.isFinite()`和`Number.isNaN()`两个方法。

- `Number.isFinite()`用来检查一个数值是否为有限的（finite)

	```javascript
	Number.isFinite(15); // true
	Number.isFinite(0.8); // true
	Number.isFinite(NaN); // false
	Number.isFinite(Infinity); // false
	Number.isFinite(-Infinity); // false
	Number.isFinite('foo'); // false
	Number.isFinite('15'); // false
	Number.isFinite(true); // false
	
	```

	

- `Number.isNaN()`用来检查一个值是否为`NaN`。和全局函数 `isNaN()` 相比，该方法不会强制将参数转换成数字，只有在参数是真正的数字类型，且值为 `NaN` 的时候才会返回 `true`。

```javascript
Number.isNaN(NaN);        // true
Number.isNaN(Number.NaN); // true
Number.isNaN(0 / 0)       // true

// 下面这几个如果使用全局的 isNaN() 时，会返回 true。
Number.isNaN("NaN");      // false，字符串 "NaN" 不会被隐式转换成数字 NaN。
Number.isNaN(undefined);  // false
Number.isNaN({});         // false
Number.isNaN("blabla");   // false

// 下面的都返回 false
Number.isNaN(true);
Number.isNaN(null);
Number.isNaN(37);
Number.isNaN("37");
Number.isNaN("37.37");
Number.isNaN("");
Number.isNaN(" ");

```



#### `Number.parseInt()`、`Number.parseFloat()`

ES6 将全局方法`parseInt()`和`parseFloat()`，移植到`Number`对象上面，行为完全保持不变。这样做的目的，是逐步减少全局性方法，使得语言逐步模块化。

```javascript
// ES5的写法
parseInt('12.34') // 12
parseFloat('123.45#') // 123.45

// ES6的写法
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45

Number.parseInt === parseInt // true
Number.parseFloat === parseFloat // true

```



#### `Number.isInteger()`。`Number.isInteger()`

用来判断一个值是否为整数。需要注意的是，在 JavaScript 内部，整数和浮点数是同样的储存方法，所以 3 和 3.0 被视为同一个值。

```javascript
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false

```



#### `Math对象的扩展`

ES6 在 Math 对象上新增了 17 个与数学相关的方法。所有这些方法都是静态方法，只能在 Math 对象上调用。

- `Math.trunc`方法用于去除一个数的小数部分，返回整数部分。对于非数值，`Math.trunc`内部使用`Number`方法将其先转为数值。对于空值和无法截取整数的值，返回`NaN`。

```javascript
Math.trunc(4.1) // 4
Math.trunc(4.9) // 4
Math.trunc(-4.1) // -4
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0

```

- `Math.sign`方法用来判断一个数到底是正数、负数、还是零。对于非数值，会先将其转换为数值。它返回五种值，参数为正数，返回`+1`；参数为负数，返回`-1`；参数为 0，返回`0`；参数为-0，返回`-0`;其他值，返回`NaN`。

```javascript
Math.sign(-5) // -1
Math.sign(5) // +1
Math.sign(0) // +0
Math.sign(-0) // -0
Math.sign(NaN) // NaN

Math.sign('')  // 0
Math.sign(true)  // +1
Math.sign(false)  // 0
Math.sign(null)  // 0
Math.sign('9')  // +1
Math.sign('foo')  // NaN
Math.sign()  // NaN
Math.sign(undefined)  // NaN

```



- `Math.cbrt`方法用于计算一个数的立方根。对于非数值，`Math.cbrt`方法内部也是先使用`Number`方法将其转为数值。

```javascript
Math.cbrt(-1) // -1
Math.cbrt(0)  // 0
Math.cbrt(1)  // 1
Math.cbrt(2)  // 1.2599210498948734

```



- `Math.hypot`方法返回所有参数的平方和的平方根。

```java
Math.hypot(3, 4);        // 5
Math.hypot(3, 4, 5);     // 7.0710678118654755
Math.hypot();            // 0
Math.hypot(NaN);         // NaN
Math.hypot(3, 4, 'foo'); // NaN
Math.hypot(3, 4, '5');   // 7.0710678118654755
Math.hypot(-3);          // 3

```



#### `指数运算符`

ES2016 新增了一个指数运算符（`**`）。指数运算符可以与等号结合，形成一个新的赋值运算符（`**=`）。

```javascript
2 ** 2 // 4
2 ** 3 // 8

let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;

```





### 函数

#### `函数参数的默认值。`

基本用法。

```javascript
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```


与解构赋值默认值结合使用。

与解构赋值默认值结合使用。

```javascript
function foo({x, y = 5}) {
  console.log(x, y);
}

foo({}) // undefined 5
foo({x: 1}) // 1 5
foo({x: 1, y: 2}) // 1 2
foo() // TypeError: Cannot read property 'x' of undefined
```

参数默认值的位置。通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

```javascript
// 例一
function f(x = 1, y) {
  return [x, y];
}

f() // [1, undefined]
f(2) // [2, undefined])
f(, 1) // 报错
f(undefined, 1) // [1, 1]

// 例二
function f(x, y = 5, z) {
  return [x, y, z];
}

f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错
f(1, undefined, 2) // [1, 5, 2]
```

函数的length属性。指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。也就是说，指定了默认值后，length属性将失真。fn.length 返回形参个数，arguments.length 返回实参个数。

```javascript
(function (a) {}).length // 1
(function (a = 5) {}).length // 0
(function (a, b, c = 5) {}).length // 2
```


作用域。一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```javascript
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

上面代码中，参数y的默认值等于变量x。调用函数f时，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

```javascript
let x = 1;

function f(y = x) {
  let x = 2;
  console.log(y);
}

f() // 1
```

上面代码中，函数f调用时，参数y = x形成一个单独的作用域。这个作用域里面，变量x本身没有定义，所以指向外层的全局变量x。函数调用时，函数体内部的局部变量x影响不到默认值变量x。

```javascript
var x = 1;

function foo(x = x) {
  // ...
}

foo() // ReferenceError: x is not defined
```

上面代码中，参数x = x形成一个单独作用域。实际执行的是let x = x，由于暂时性死区的原因，这行代码会报错”x 未定义“。

```javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo()//3
console.log(x); //1
```

如果将var x = 3的var去除，函数foo的内部变量x就指向第一个参数x，与匿名函数内部的x是一致的，所以最后输出的就是2，而外层的全局变量x依然不受影响。

```javascript
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```



#### `rest参数。`

ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

rest参数。
ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```javascript
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```


arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子。

arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用Array.prototype.slice.call先将其转为数组。rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。下面是一个利用 rest 参数改写数组push方法的例子。

```javascript
function push(array, ...items) {
  items.forEach(function(item) {
    array.push(item);
    console.log(item);
  });
}

var a = [];
push(a, 1, 2, 3)
```

注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

```javascript
// 报错
function f(a, ...b, c) {
  // ...
}
```

函数的length属性，不包括 rest 参数。

```javascript
(function(a) {}).length  // 1
(function(...a) {}).length  // 0
(function(a, ...b) {}).length  // 1
```

#### `严格模式。`

ES2016规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，那么函数内部就不能显式设定为严格模式，否则会报错。
name属性，返回函数名。

```javascript
function foo() {}
foo.name // "foo"

var f = function () {};
f.name // "f"

var fn1 = function fn2(){};
fn1.name // "fn2"
```

#### `箭头函数`

基本用法，ES6 允许使用“箭头”（=>）定义函数。

```javascript
var f = v => v;
//上面的箭头函数等同于
var f = function(v) {
  return v;
};

```

如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```


如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。

```javascript
var sum = (num1, num2) => { return num1 + num2; }
```

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。

```javascript
// 报错
let getTempItem = id => { id: id, name: "Temp" };

// 不报错
let getTempItem = id => ({ id: id, name: "Temp" });
```



- 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
- 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
- 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用yield命令，因此箭头函数不能用作 Generator 函数。
- this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
- 由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

```javascript
// ES6
function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}

// ES5
function foo() {
  var _this = this;

  setTimeout(function () {
    console.log('id:', _this.id);
  }, 100);
}
//转换后的 ES5 版本清楚地说明了，箭头函数里面根本没有自己的this，而是引用外层的this。
```

#### `函数参数的尾逗号。`

ES2017允许函数的最后一个参数有尾逗号。这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。

```javascript
function clownsEverywhere(
  param1,
  param2,
) { /* ... */ }

clownsEverywhere(
  'foo',
  'bar',
);

```



### 数组

#### `扩展运算符`

1. 扩展运算符是三个点（…）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。该运算符将一个数组变为参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
// [<div>, <div>, <div>]

```

扩展运算符后面还可以放置表达式。

```javascript
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];

```

如果扩展运算符后面是一个空数组，则不产生任何效果。

```javascript
[...[], 1]
// [1]

```

由于扩展运算符可以展开数组，所以不再需要`apply`方法，将数组转为函数的参数了。

```javascript
// ES5 的写法
function f(x, y, z) {
  // ...
}
var args = [0, 1, 2];
f.apply(null, args);

// ES6的写法
function f(x, y, z) {
  // ...
}
let args = [0, 1, 2];
f(...args);

```

取一个数组中的最大值。

```javascript
//es5
Math.max.apply(null,[1,5,2,8]) // 8
//es6
Math.max(...[1,5,2,8])//8
//上面两种方法等同于
Math.max(1,5,2,8)

```

扩展运算符可以用于复制数组。

```javascript
//es5
const a1 = [1, 2];
const a2 = a1.concat();
a2[0] = 2;
a1 // [1, 2]
a2 // [2, 2]

//es6
const a1 = [1, 2];
// 写法一
const a2 = [...a1];
// 写法二
const [...a2] = a1;

```



扩展运算符用于合并数组。

```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]

```



扩展运算符可以与解构赋值结合起来，用于生成数组。

```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list

```

```javascript
const [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]

const [first, ...rest] = [];
first // undefined
rest  // []

const [first, ...rest] = ["foo"];
first  // "foo"
rest   // []

```

```javascript
const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错
```

扩展运算符实现了 Iterator 接口的对象

```javascript
let nodeList = document.querySelectorAll('div');
let array = [...nodeList];

```

#### `Array.from()`

Array.from()方法用于将两类对象转为真正的数组。

- 第一个参数：一个类数组对象，用于转为真正的数组
- 第二个参数：类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。
- 第三个参数：如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。

```javascript
// NodeList对象
let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
  console.log(p);
});

// arguments对象
function foo() {
  var args = Array.from(arguments);
  // ...
}

```

#### `Array.of()`

`Array.of()`方法用于将一组值，转换为数组。这个方法的主要目的，是弥补数组构造函数`Array()`的不足。因为参数个数的不同，会导致`Array()`的行为有差异。

```javascript
//Array
Array() // []
Array(3) // [, , ,]
Array(3, 11, 8) // [3, 11, 8]

Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1

```

#### `copyWithin()`

数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
它接受三个参数。

- target（必需）：从该位置开始替换数据。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数。

这三个参数都应该是数值，如果不是，会自动转为数值。

```javascript
[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

```

#### `find()和findIndex()`

数组实例的find()和findIndex()。这两个方法都可以接受第二个参数，用来绑定回调函数的this对象。
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。

```javascript
[1, 4, -5, 10].find((n) => n < 0)
// -5
[1, 5, 10, 15].find(function(value, index, arr) {
  return value > 9;
}) // 10
//find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

```

findIndex`方法的用法与`find`方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回`-1

```javascript
[1, 5, 10, 15].findIndex(function(value, index, arr) {
  return value > 9;
}) // 2
```

#### `fill()`

数组实例的fill()，fill方法使用给定值，填充一个数组。fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。fill方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```javascript
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

#### `for...of`

for...of是es6引入的作为遍历所有数据结构的统一的方法。一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
数组实例的 entries()，keys() 和 values()用于遍历数组，它们都返回一个遍历器对象，可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。

```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

#### `include()`

数组实例的includes()方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。

```javascript
[1, 2, 3].includes(2)     // true
[1, 2, 3].includes(4)     // false
[1, 2, NaN].includes(NaN) // true

```

该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。

#### `数组的空位`

数组的空位指数组的某一个位置没有任何值。
空位不是undefined，一个位置的值等于undefined，依然是有值的。空位是没有任何值，in运算符可以说明这一点。

```javascript
0 in [undefined, undefined, undefined] // true
0 in [, , ,] // false
```


es5对空位的处理很不一致，大多数情况下会忽略空位。

forEach(), filter(), reduce(), every() 和some()都会跳过空位。
map()会跳过空位，但会保留这个值
join()和toString()会将空位视为undefined，而undefined和null会被处理成空字符串。
es6明确将空位转为undefined。
Array.from方法会将数组的空位，转为undefined，也就是说，这个方法不会忽略空位。

```javascript
Array.from(['a',,'b'])
// [ "a", undefined, "b" ]
```


扩展运算符（...）也会将空位转为undefined。

```javascript
[...['a',,'b']]
// [ "a", undefined, "b" ]
```


copyWithin()会连空位一起拷贝。

```js
[,'a','b',,].copyWithin(2,0) // [,"a",,"a"]
```


fill()会将空位视为正常的数组位置。

```js
new Array(3).fill('a') // ["a","a","a"]
```


for...of循环也会遍历空位。

```js
let arr = [, ,];
for (let i of arr) {
  console.log(1);
}
// 1
// 1
```

上面代码中，数组arr有两个空位，for...of并没有忽略它们。如果改成map方法遍历，空位是会跳过的。
entries()、keys()、values()、find()和findIndex()会将空位处理成undefined。

```js
// entries()
[...[,'a'].entries()] // [[0,undefined], [1,"a"]]

// keys()
[...[,'a'].keys()] // [0,1]

// values()
[...[,'a'].values()] // [undefined,"a"]

// find()
[,'a'].find(x => true) // undefined

// findIndex()
[,'a'].findIndex(x => true) // 0
```



### 对象

#### `属性的简洁表示法`

属性的简洁表示法，ES6 允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
//es6写法
const foo = 'bar';
const baz = {foo};
baz // {foo: "bar"}

// 等同于es5写法
const baz = {foo: foo};

//es6写法
const o = {
  method() {
    return "Hello!";
  }
};

// 等同于es5写法
const o = {
  method: function() {
    return "Hello!";
  }
};
```

#### `属性名表达式`

JavaScript 定义对象的属性，有两种方法。

```js
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;
```

但是，如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。

```js
var obj = {
  foo: true,
  abc: 123
};
```

ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```js
let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```



表达式还可以用于定义方法名。

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello() // hi
```

注意，属性名表达式与简洁表示法，不能同时使用，会报错。

```js
// 报错
const foo = 'bar';
const bar = 'abc';
const baz = { [foo] };

// 正确
const foo = 'bar';
const baz = { [foo]: 'abc'};
```

#### `Object.is()`

Object.is()。ES5 比较两个值是否相等，只有两个运算符：相等运算符（`==`）和严格相等运算符（`===`）。它们都有缺点，前者会自动转换数据类型，后者的NaN不等于自身，以及+0等于-0。JavaScript 缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。
ES6 提出同值相等算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```js
Object.is('foo', 'foo')
// true
Object.is({}, {})
// false
```

不同之处只有两个：一是`+0`不等于`-0`，二是`NaN`等于自身。

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

#### `Object.assign()`

``Object.assign`方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。

```js
const target = { a: 1 };

const source1 = { b: 2 };
const source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target); // {a:1, b:2, c:3}
```

如果只有一个参数，`Object.assign`会直接返回该参数

```js
const obj = {a: 1};
Object.assign(obj) === obj // true
```

由于`undefined`和`null`无法转成对象，所以如果它们作为参数，就会报错。

```js
Object.assign(undefined) // 报错
Object.assign(null) // 报错
```

注意：`Object.assign`可以用来处理数组，但是会把数组视为对象。

```js
Object.assign([1, 2, 3], [4, 5])
// [4, 5, 3]
//把数组视为属性名为 0、1、2 的对象，因此源数组的 0 号属性4覆盖了目标数组的 0 号属性1。
```

1. `Object.keys()`。ES5 引入了`Object.keys`方法，返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键名。

```js
var obj = { foo: 'bar', baz: 42 };
Object.keys(obj)
// ["foo", "baz"]
```

ES2017 引入了跟`Object.keys`配套的`Object.values`和`Object.entries`，作为遍历一个对象的补充手段，供`for...of`循环使用。

```js
let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
  console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
  console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
```

#### `Object.values()`

Object.values方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值。

```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj)
// ["bar", 42]
```


返回数组的成员顺序，下面的代码中，属性名为数值的属性，是按照数值大小，从小到大遍历的，因此返回的顺序是b、c、a。

```js
const obj = { 100: 'a', 2: 'b', 7: 'c' };
Object.values(obj)
// ["b", "c", "a"]
```

#### `Object.entries()`

Object.entries方法返回一个数组，成员是参数对象自身的（不含继承的）所有可遍历（enumerable）属性的键值对数组。

```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj)
// [ ["foo", "bar"], ["baz", 42] ]
```

#### `对象的扩展运算符`

`解构赋值。`

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

由于解构赋值要求等号右边是一个对象，所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。

```js
let { x, y, ...z } = null; // 运行时错误
let { x, y, ...z } = undefined; // 运行时错误
```


解构赋值必须是最后一个参数，否则会报错。

```js
let { ...x, y, z } = obj; // 句法错误
let { x, ...y, ...z } = obj; // 句法错误
```


注意，**解构赋值的拷贝是浅拷贝**，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

```js
let obj = { a: { b: 1 } };
let { ...x } = obj;
obj.a.b = 2; 
console.log(x.a.b); // 2

```

`扩展运算符`
扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。

```js
let z = { a: 3, b: 4 };
let n = { ...z };
n // { a: 3, b: 4 }


```

这等同于使用Object.assign方法。

```js
let aClone = { ...a };
// 等同于
let aClone = Object.assign({}, a);
```





## Set、Map集合

[13. Set 和 Map 数据结构 - Set - 《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》 - 书栈网 · BookStack](https://www.bookstack.cn/read/es6-3rd/spilt.1.docs-set-map.md)





## 解构赋值

[3. 变量的解构赋值 - 《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》 - 书栈网 · BookStack](https://www.bookstack.cn/read/es6-3rd/docs-destructuring.md)

### `用途`

#### **（1）交换变量的值**

```js
let x = 1;
let y = 2;
[x, y] = [y, x];
```

上面代码交换变量`x`和`y`的值，这样的写法不仅简洁，而且易读，语义非常清晰。



#### **（2）从函数返回多个值**

```js
// 返回一个数组
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();
// 返回一个对象
function example() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example();
```



#### **（3）函数参数的定义**

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3]);
// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1});
```



#### **（4）提取 JSON 数据**

```js
let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};
let { id, status, data: number } = jsonData;
console.log(id, status, number);
// 42, "OK", [867, 5309]
```



#### **（5）函数参数的默认值**

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
} = {}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写`var foo = config.foo || 'default foo';`这样的语句。



#### **（6）遍历 Map 结构**

任何部署了 Iterator 接口的对象，都可以用`for...of`循环遍历。Map 结构原生支持 Iterator 接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world
```

```js
// 获取键名
for (let [key] of map) {
  // ...
}
// 获取键值
for (let [,value] of map) {
  // ...
}
```



#### **（7）输入模块的指定方法**

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```







## Promise

- Promise解决的痛点是Promise规范的诞生是应对异步嵌套的问题，解决了回调地狱的痛点

- 业界比较著名的实现是Q和bluebird



### 什么是Promise

Promise 是异步编程的一种解决方案，比传统的异步解决方案【回调函数】和【事件】更合理、更强大。

Promise是ES6新增的语法，是一种异步编程的一种解决方案，Promise本质上是一个绑定了回调的对象。 Promise在一定程度上解决了回调函数的书写结构问题，解决了回调地狱的问题。Promise可以看作是一个状态机，它有三种状态：pending，fulfilled，rejected，其中初始状态是pending，可以通过函数resolve（表示成功）把状态变为fulfilled，或者通过函数reject（表示失败）把状态变为rejected，状态一经改变就不能再次变化。



`Promise`是一个类。当通过 `new`创建 Promise 实例时，需要传入一个回调函数，我们称之为executor

- 这个回调函数会被立即执行，并传入两个回调参数resolve、reject
- 当调用resolve回调函数时，会执行Promise对象的then方法传入的回调
- 当调用reject回调函数时，会执行Promise对象的catch方法传入的回调



Promise是一个状态机，分为三种状态：

- pending：待定状态，执行了executor后，处于该状态
- fulfilled：兑现状态，调用resolve(),Promise的状态更改为fulfilled，且无法再次更改
- rejeted：拒绝状态，调用rejected()后，Promise的状态更改为rejected，且无法再次更改



```js
function request() {
  const flag = Math.random() <= 0.5 ? true : false
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (flag) {
        resolve('成功的消息')
        return
      }
      reject('失败的消息')
    }, 2000)
  })
}

console.log('请求开始')
request()
  .then(msg => console.log(msg), err => console.log(err))


```



### resolve的参数

resolve传入的参数情况：

- 如果传入的普通的值或对象，那么就会被传递到then的参数中
- 如果传入的是一个Promise，那么当前的Promise的状态将会由传入的Promise来决定

```js
const newPromise = new Promise((resolve, reject) => {
  resolve('success')
})

new Promise((resolve, reject) => {
  // 当前 Promise 的状态由传入的 Promise 去决定
  resolve(newPromise)
})
  .then(res => {
    console.log('res', res)
  })
  .catch(err => {
    console.log('err', err)
  })

```

- 如果传入的是一个对象，且对象实现了then方法(thenable),也会执行该then方法，并且该then方法决定后续的状态

```js
new Promise((resolve, reject) => {
  // 如果 resolve 传入的是对象，且该对象实现了 then 方法
  // 则该 Promise 的状态由 then 方法决定
  resolve({
    then(resolve, reject) {
      reject('error')
    },
  })
})
  .then(res => {
    console.log('res', res)
  })
  .catch(err => {
    console.log('err', err)
  })


```



### Promise的实例方法



#### 1.then方法

通过then方法可以对Promise和resolve进行处理。then方法的返回值是一个Promise实例

```js
new Promise(resolve => {
  resolve('你好')
}).then(res => console.log(res)) // 会打印你好
```



##### 多次调用then方法

同一个Promise实例可以调用多个then方法，当Promise中resolve被回调时，所有then方法传入的回调函数都会被调用

```js
const promise = new Promise(resolve => {
  resolve('你好')
})

// 同时调用
promise.then(res => console.log(res))
promise.then(res => console.log(res))
promise.then(res => console.log(res))


```



##### then方法传入的回调函数可以有返回值

如果返回值是普通值，那么这个普通值将作为一个新的Promise的resolve的值

```js
const promise = new Promise(resolve => {
  resolve('你好')
})

promise.then(() => 'then').then(res => console.log(res)) // 打印 then
// promise.then(() => 'then') 相当于
promise.then(() => {
  return new Promise(resolve => {
    resolve('then')
  })
})

```

如果返回的是Promise，那么就可以再次调用then方法

```js
const promise = new Promise(resolve => {
  resolve('你好')
})
promise
  .then(() => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('success')
      }, 2000)
    })
  })
  .then(msg => {
    // 2 秒后打印 success
    console.log(msg)
  })

```

如果返回的是一个对象，并且该对象实现了thenable，该then函数有两个参数resolve、reject，则resolve的值将会传递给下一个Promise

```js
const promise = new Promise(resolve => {
  resolve('你好')
})
promise
  .then(() => {
    return {
      then(resolve) {
        return resolve('success')
      },
    }
  })
  .then(msg => {
    // 打印 success
    console.log(msg)
  })

```

##### 小结

![image-20250314102518389](../../AppData/Roaming/Typora/typora-user-images/image-20250314102518389.png)

![image-20250314102529764](../../AppData/Roaming/Typora/typora-user-images/image-20250314102529764.png)

![image-20250314102540299](../../AppData/Roaming/Typora/typora-user-images/image-20250314102540299.png)

![image-20250314102552908](../../AppData/Roaming/Typora/typora-user-images/image-20250314102552908.png)

#### 2.catch方法

除了then方法的第二个参数来捕获reject错误之外，还可以通过catch方法，catch返回一个Promise

```js
const promise = new Promise((resolve, reject) => {
  reject('error')
})

promise.then(undefined, err => {
  // 打印 error
  console.log(err)
})

// 但是这种写法不太符合`promise/a+`规范
promise.catch(err => {
  // 打印 error
  console.log(err)
})

// 下面是符合`promise/a+`规范的写法
promise
  .then(() => {})
  .catch(err => {
    console.log(err)
  })
// 已知 then 方法也可以返回一个 promise，因此在 then 后面追加 catch，以此来捕获 rejected 的情况，更加具有语义化

```

catch方法也是可以多次调用的，只要Promise实例的状态为reject，那么就会调用catch方法

```js
const promise = new Promise((resolve, reject) => {
  reject('error')
})

// 这两个 catch 都会调用
promise.catch(err => {
  console.log(err)
})
promise.catch(err => {
  console.log(err)
})


```



##### catch方法的返回值

catch方法也会返回一个Promise实例，返回值的情况：

- 普通值，将作为resolve的参数

- 返回一个 Promise，如果 catch 里面返回的是 一个新的 Promise，那么后续的 then会等待这个 Promise 解析
-  catch抛出错误，则这个 Promise变成 rejected，进入下一个 catch。

#### 3.finally方法

finally是ES9新增的一个特性，无论一个Promise实例是fulfilled或rejected，finally都会执行

finally不接收参数

```js
const promise = new Promise((resolve, reject) => {
  reject('error')
})

promise
  .then(res => {
    console.log('res:', res)
  })
  .catch(err => {
    console.log(('err', err))
  })
  .finally(() => {
    console.log('finally code execute')
  })

```



### Promise的类方法



#### 1.resolve方法

如果想要将一个现成的数据转换为一个Promise实例，那么可以：

```js
const foo={
    name:'alex',
}

function bar(obj){
    return new Promise(resolve=>{
        resolve(obj)
    })
}

bar(foo).then(res=>{
    console.log(res)
})
```

还可以直接类方法resolve(),使用Promise.resolve()相当于new Promise(resolve=>{ resolve() })

```js
function bar(obj) {
  return Promise.resolve(obj)
}
```

resolve参数形态：

- 参数本身是Promise
- 参数是原始值/对象
- 参数是一个thenable

#### 2.reject方法



与Promise.resolve()方法逻辑基本相同，只不过Promise.reject相当于创建一个Promise实例，并且rejected了

```js
Promise.reject('error').catch(error => {
  console.log('error', error)
})
```

>注意：与Promise.resolve()不同的是，Promise.reject()无论传递什么参数都会原样输出

```js
Promise.reject(
  new Promise(resolve => {
    resolve('hello')
  })
).catch(err => {
  // 原样打印 Promise 实例
  console.log('err', err)
})
```



#### 3.all方法

Promise.all()接收一个Promise[],返回一个Promise实例，当所有的Promise执行完毕并且都是fulfilled时，该实例的状态才会变为fulfilled，只要队列中有一个实例的状态是rejected，那么该实例的状态也会变成rejected

如果Promise队列中所有的实例状态都是fulfilled，那么Promise.all()返回的实例状态就会变成fulfilled，并且resolve()的参数是一个数组，按照顺序放置队列中的每一个Promise成功后的结果

```js
let i = 0
function genPromise() {
  return new Promise(resolve => {
    resolve(`success${(i = i + 1)}`)
  })
}

const promiseArr = [genPromise(), genPromise(), genPromise()]

Promise.all(promiseArr).then(res => {
  // [ 'success1', 'success2', 'success3' ]
  console.log('res', res)
})

```

如果队列中Promise实例有一个是rejected，那么Promise.all()返回的实例就会变成rejected状态，并且reject()参数是队列中第一个rejected的返回值

```js
const promiseArr = [
  genPromise(),
  new Promise((resolve, reject) => {
    reject('error1')
  }),
  new Promise((resolve, reject) => {
    reject('error2')
  }),
]

Promise.all(promiseArr)
  .then(res => {})
  .catch(err => {
    // error 1
    console.log(err)
  })

```



#### 4.allSettled方法

all方法是有缺陷的，如果在Promise队列中有一个状态是rejected，那么我们就无法获取到其他fulfilled以及pending的Promise实例了。

针对这一情况，在ES11中新增了一个API

Promise.allSettled()

- 该方法返回的Promise实例，会在所有Promise实例执行完毕后，状态方可变为fulfilled，并且只会是fulfilled

- 无论队列中的Promise实例的状态如何，都能获取到结果

- 打印的结果，会包含状态与值/原因

```js
const promiseArr = [
  new Promise((resolve, reject) => {
    resolve('success1')
  }),
  new Promise((resolve, reject) => {
    reject('error')
  }),
  new Promise((resolve, reject) => {
    resolve('success2')
  }),
]

Promise.allSettled(promiseArr).then(res => {
  // res [
  //   { status: 'fulfilled', value: 'success1' },
  //   { status: 'rejected', reason: 'error' },
  //   { status: 'fulfilled', value: 'success2' }
  // ]
  console.log('res', res)
})

```



#### 5.race方法

Promise.race()同样接收一个Promise队列，返回一个Promise实例。该方法会对队列任务完成情况进行监听，如果某一个任务最先完成fulfilled/rejected，那么返回的实例的状态也会变成对应的fulfilled/rejected，同时获取到最先完成的结果

```js
const promiseArr = [
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success1')
    }, 1000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, 2000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success2')
    }, 3000)
  }),
]

Promise.race(promiseArr)
  .then(res => {
    console.log('res', res)
  })
  .catch(err => {
    console.log('err', err)
  })
// 最终打印 res success1
// 如果第二个任务最先完成，那么就会打印 err error

```



#### 6.any方法

Promise.any()是ES12新增的特性，和Promise.race()类似,区别在于：

- any方法会等待一个fulfilled状态，才会决定返回Promise实例的状态
- 如果队列中所有的实例都是rejected状态，那也需要等到所有执行完毕后才会决定返回的Promise实例的状态

```js
const promiseArr = [
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success1')
    }, 2200)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('error')
    }, 2000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success2')
    }, 3000)
  }),
]

Promise.any(promiseArr)
  .then(res => {
    console.log('res', res)
  })
  .catch(err => {
    console.log('err', err)
  })
// 遇到第一个 fulfilled，就会转变返回的 Promise 实例的状态
// 如果所有的都是 rejected，那么只有所有执行完毕后，返回的 Promise 实例才会转变
// 并且会抛出一个错误：[AggregateError: All promises were rejected]


```

简单理解来说，Promise.any()会等待一个fulfilled的Promise，如果队列中没有fulfilled，那么就会返回一个错误。



### Promise使用总结

- 首先初始化一个Promise对象，可以通过两种方法创建，这两种方式都会返回一个Promise对象
	- new Promise(fn)
	- Promise.resolve(fn)
- 然后调用上一步返回的Promise对象的then方法，注册回调函数
	- then中的回调函数可以有一个参数，也可以不带参数。如果then中的回调函数依赖上一步的返回结果，那么要带上参数。比如

```js
new Promise(fn)

.then(fn1(value){

//处理value

})


```

- 最后注册catch异常处理函数，处理前面回调中可能抛出的异常。





## Symbol

[ES6之Symbol详解引言 当你第一天去上班，愉快的打开项目的代码仓库，发现前辈留下的代码简直是“屎山”成百上千的变量 - 掘金](https://juejin.cn/post/7446964810090971155?searchId=2025031512420709402546E3B261252A6A)

### 什么是Symbol

Symbol是ES6引入的一种新的==**基本数据类型**==，用于表示一个独一无二的值。它通常被用作对象属性的键，确保属性不会与其他键发生冲突。它是JavaScript中的第七种数据类型，与undefined、null、Number、String、Boolean、BigInt（大整数）并列。



你可以这样创建一个Symbol值：

```js
const a = Symbol(); 
console.log(a); //Symbol()
```



使用Symbol函数可以生成一个Symbol类型的值，但是你不能在调用Symbol时使用new关键字，不但因为Symbol是基本数据类型，而不是对象，而且其并没有像（String和Number）有对应的包装对象（即有对应的构造函数）。比如下面的写法是错误的：

```js
//报错，Symbol is not a constructor
const a = new Symbol();
```

使用Symbol()创建一个Symbol类型的值并赋给a变量后，你就得到了一个在内存独一无二的值。现在除了通过变量a，任何人在任何作用域内都无法重新创建出这个值。例如当你这样写：

```js
const b =Symbol()
```

尽管a和b都是使用Symbol创建出来的，但是它们在内存中看起来却是这样的：

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/a8a3c16c622f47e991a0f49351a578a0~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg54uC54Kr5LiA56KX5aSn57Gz6aWt:q75.awebp?rk3s=f64ab15b&x-expires=1742209058&x-signature=lbKu1WNzAlJeq2lagcFsDMxtgFc%3D)

每个Symbol值都是唯一的，即使传入相同的描述字符串，也不会相等。

```js
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(sym1 === sym2); // false
```

尽管sym1和sym2传入的字符串是一样的但是sym1和是sym2依旧是执行两个不同的地址。



实际上，a变量拿到了内存中某块内存的唯一引用（这里所说的引用，其实就是该内存的地址），如果不借助a变量，你不可能再得到这个地址。因此

```js
a!==b//a和b持有的是两块内存的引用
const c=a;//手动把a里保存的地址保存在c变量中
a===c//c和a现在指向同一块内存，因为它们保存了同样的地址
```

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/9a276640ffae452cb82e69cd0caf588d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg54uC54Kr5LiA56KX5aSn57Gz6aWt:q75.awebp?rk3s=f64ab15b&x-expires=1742209058&x-signature=N0oqal1ibq6EyoE4MC8OlVNXqKQ%3D)

这种行为有着与对象遵循相同的规则。

```js
var a={}
var b={}

a!==b//a和b各自被分配了不同的内存，因此它们保存了不同的地址
//借助变量a，变量c拿到了a指向的那个对象地址，因此两者相等
var c=a
a===c
```

但是对于同为基本数据类型的字符串来说，它却不遵循类似的规则。

```js
var a="123"
var b="123"

a===b//返回true，两者在常量区引用同一个字符串
```

我们首先通过变量a在内存中创建了字符串“123”，然后在不借助变量a的情况下，又通过var b = "123"拿到了对“123”这个字符串的引用，两者指向内存中的同一块内存地址。

![image.png](https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/05a818b96bab4bebb9bb39a28c371587~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg54uC54Kr5LiA56KX5aSn57Gz6aWt:q75.awebp?rk3s=f64ab15b&x-expires=1742209058&x-signature=UY7Ex%2Fq%2FbemiT5m1JNMJubEZVgo%3D)

因此我们说，a无法确保别的变量无法拿到它保存的地址（前提是不通过a）。但是对于var a = Symbol()这样的语句，a变量内保存的值是唯一的，因为除了借助a变量，你永远无法得到a中保存的值。这也是Symbol的本质





### Symbol的作用

上面我们说到，Symbol只是标记一块内存，不能与其他数据类型进行运算，那么新增这样一种数据类型有什么用呢？

```js
let name="张三";
const classRoom ={
         "cy":1,
         "cy":2,
         [name]:"猛男",
         [Symbol('Mark')]:{grade: 50,gender: 'male'},
         [Symbol('olivia')]:{grade: 80,gender:'female'},
         [Symbol('olivia')]:{grade: 80,gender:'female'},     
    }
    console.log(classRoom);
    输出结果
    cy：2
    [Symbol(Mark)]:{grade: 50,gender: 'male'},
    [Symbol(olivia)]:{grade: 80,gender:'female'},
    [Symbol(olivia)]:{grade: 80,gender:'female'}, 

```

在上面的代码中，字符串类型的属性很容易就被覆盖了"cy"的输出结果就为2 而用symbol类型的变量作为键则不会被覆盖，就像 [Symbol('olivia')]:{grade: 80,gender:'female'}, 和[Symbol('olivia')]:{grade: 80,gender:'female'}, 虽然他们都用了"olivia"作为键名但是下一个并不会覆盖掉上一个。



### Symbol的语法规范



#### 1.基本语法

上面介绍到，使用如下语法即可创建一个Symbol变量：

```js
var a= Symbol();
```

由于Symbol不是继承自Object，因此不可以使用new关键字来生成Symbol变量。使用上述语句创建的变量a，在控制台中进行输出时会显示为Symbol()。假如有另一个变量：

```js
var b = Symbol();
console.log(a);//Symbol() 
console.log(b); //Symbol()
```

变量a和变量b并不是同一个值，但它们在控制台的输出却是一样的，这样不利于我们区分两个变量。为此，我们可以在调用Symbol的时候传入一个字符串作为对当前Symbol变量的描述：

```js
var a = Symbol("11");
var b = Symbol("22");
console.log(s); //Symbol("11")
console.log(b); //Symbol("22")
```

如果你希望得到一个Symbol的描述符，可以借助Symbol原型上的description属性（Symbol.prototype.description）：

```js
const a= Symbol("symbol");
console.log(a.description); //symbol
```

Symbol还可以显式的转化为字符串或布尔值，但是不能转化为数值：

```js
let sym = Symbol('My symbol');
String(sym) // 'Symbol(My symbol)'
sym.toString() // 'Symbol(My symbol)'

let sym2 = Symbol();
Boolean(sym2) // true

```



#### 2.Symbol属性的遍历

以Symbol类型的变量作为对象属性时，该属性不会出现在for … in、for … of循环中，也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

```js
const obj = {
  [Symbol('a')]: 'valueA',
  key1: 'value1'
};
console.log(Object.keys(obj));               // ['key1']
```

但该属性并不是私有属性，它可以被专门的Object.getOwnPropertySymbols()方法遍历出来。该方法返回一个数组，包含了当前对象的所有用作属性名的Symbol值

```js
const obj = {
[Symbol('a')]: 'valueA',
[Symbol('b')]: 'valueB' };
console.log(Object.getOwnPropertySymbols(obj)); // [Symbol(a), Symbol(b)]


```

另外，[ES6新增](https://link.juejin.cn/?target=https%3A%2F%2Fso.csdn.net%2Fso%2Fsearch%3Fq%3DES6%E6%96%B0%E5%A2%9E%26spm%3D1001.2101.3001.7020)的Reflect.ownKeys()方法可以遍历出所有的常规键名和Symbol键名。语法为:

```js
const sym1 = Symbol('key1');
const sym2 = Symbol('key2');
const obj = {
    [sym1]: 'value1',
    [sym2]: 'value2',
    normalKey: 'value3',
};

// 打印所有属性和值
Reflect.ownKeys(obj).forEach(key => {
    console.log(key.toString(), obj[key]);
});
// 输出:
// normalKey value3
// Symbol(key1) value1
// Symbol(key2) value2

```







### 总结

Symbol提供了一种优雅的方式来创建唯一标识符，特别适合用于对象属性键，以避免命名冲突并增强代码的安全性和可维护性。在现代JavaScript开发中，特别是在构建复杂的应用程序或参与大规模协作项目时，合理运用Symbol可以显著提升代码质量和开发效率。





## Decorators

[30. Decorator - 《阮一峰 ECMAScript 6 (ES6) 标准入门教程 第三版》 - 书栈网 · BookStack](https://www.bookstack.cn/read/es6-3rd/docs-decorator.md)





## Generator



### 定义

Generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同





#### Generator函数

指向Generator函数会返回一个遍历器对象，可以依次遍历Generator函数内部的每一个状态



形式上，Generator函数是一个普通函数，但是有两个特征：

- function关键字与函数名之间有一个星号
- 函数体内部使用yield表达式，定义不同的内部状态

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
```



### 使用

Generator函数会返回一个遍历器对象，即具有Symbol.iterator属性，并且返回给自己

```js
function* gen(){
  // some code
}

var g = gen();

g[Symbol.iterator]() === g
// true
```

通过yield关键字可以暂停generator函数返回的遍历器对象的状态

```js
function* helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}
var hw = helloWorldGenerator();
```

上述存在三个状态：hello、world、return

通过next方法才会遍历到下一个内部状态，其运行逻辑如下：

- 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
- 下一次调用next方法时，再继续往下执行，直到遇到下一个yield表达式
- 如果没有再遇到新的yield表达式，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
- 如果该函数没有return语句，则返回的对象的value属性值为undefined

```js
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

done用来判断是否存在下一个状态，value对应状态值

yield表达式本身没有返回值，或者说总是返回undefined

通过调用next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值

```js
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}

var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

正因为Generator函数返回Iterator对象，因此我们还可以通过for...of进行遍历

```js
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5
```

原生对象没有遍历接口，通过Generator函数为它加上这个接口，就能使用for...of进行遍历了

```js
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);

  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}

let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);
}
// first: Jane
// last: Doe
```



### 异步解决方案

yield表达式可以暂停函数执行，next方法用于恢复函数执行，这使得Generator函数非常适合将异步任务同步化

```js
const gen = function* () {
  const f1 = yield readFile('/etc/fstab');
  const f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
```

#### 各个异步操作的区别

- `promise`和`async/await`是专门用于处理异步操作的
- `Generator`并不是为异步而设计出来的，它还有其他功能（对象迭代、控制输出、部署`Interator`接口...）
- `promise`编写代码相比`Generator`、`async`更为复杂化，且可读性也稍差
- `Generator`、`async`需要与`promise`对象搭配处理异步情况
- `async`实质是`Generator`的语法糖，相当于会自动执行`Generator`函数
- `async`使用上更为简洁，将异步代码以同步的形式进行编写，是处理异步编程的最终方案



### 使用场景

Generator是异步解决的一种方案，最大的特点则是将异步操作同步化表达出来

```js
function* loadUI() {
  showLoadingScreen();
  yield loadUIDataAsynchronously();
  hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next()

// 卸载UI
loader.next()
```

包括redux-saga中间件也充分利用了Generator特性

```js
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

function* fetchUser(action) {
   try {
      const user = yield call(Api.fetchUser, action.payload.userId);
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

function* mySaga() {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
```

还能利用Generator函数，在对象上实现Iterator接口

```js
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}

let myObj = { foo: 3, bar: 7 };

for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);
}

// foo 3
// bar 7
```

# ES7



## includes

Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。ES2016引入了该方法。
 includes() 方法用来判断一个数组是否包含一个指定的值，如果是返回 true，否则false。
 includes()方法，
 在字符串中使用时，相当于indexOf()，查询成功返回true，失败返回false
 'abc'.includes('ab') // true
 'abc'.includes('d') // false
 在数组中使用时，可以查询某个元素是否包含在数组中（只能查询Number，String类型的元素）
 [1 , 2, 3].includes(0)  // false
 ['1' , '2', '3'].includes('1')  // true

```js
[1, 2, 3].includes(2)  // true
[1, 2, 3].includes(4) // false
[1, 2, NaN].includes(NaN) // true
```

该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，如果这时它大于数组长度(比如第二个参数为-4， 但数组长度为3)，则会重置为0开始。

```js
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -1); // true
```

没有该方法之前，我们通常使用数组的indexOf方法，检查是否包含某个值。

```js
if (arr.indexOf(el) !== -1) {
    // ...
}
```

indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1,表达起来不够直观。二是，它内部使用严格相等运算符进行判断，这会导致对NaN的误判。

```jsx
[NaN].indexOf(NaN) // -1
```

includes使用的是不一样的判断算法，就没有这个问题。

```js
[NaN].includes(NaN) // true
```

另外，Map和Set数据结构有一个has方法需要注意与includes区分。

-Map结构的has方法，是用来查找键名的，比如Map.prototype.has(key),
 WeakMap.prototype.has(key), Reflect.has(target, propertyKey)

-Set结构的has方法，是用来查找值的，比如Set.prototype.has(value),
 WeakSet.prototype.has(value)





## 指数操作符

指数运算又叫幂运算，在aⁿ(a≠0)中a为底数，n为指数，指数位于底数的右上，指数运算表示指数个底数相乘。

```js
// (2 ** 3) === (2 * 2 * 2)
let a = 2 ** 3
// (2 ** 3) === (2 * 2 * 2 * 2)
let b = 2 ** 4
console.log(a)//8
console.log(b)//16

```

要注意的一点是这个运算符的一个特点是右结合，而不是常见的左结合。多个指数运算符连用时，是从最右边开始计算的。
如：

```js
// 相当于 2 ** (3 ** 2);
let c = 2 ** 3 ** 2
// (2 ** 2 ** 3) === 2 ** (2 ** 3) === 2 ** 8
let d = 2 ** 2 ** 3
console.log(c)//512
console.log(d)//256

```







# ES8

## async-await

[详解ES6中的async/await-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1623173)

[ES6中的async、await - 知乎](https://zhuanlan.zhihu.com/p/659558381)

[ES8中 async 和await的用法详细的总结-CSDN博客](https://blog.csdn.net/qq_34645412/article/details/145712442) 

- async：声明异步函数，函数会返回一个 Promise。
- await：等待 Promise 的结果，能够暂停 async 函数的执行，直到 Promise 完成。
- async/await 使得异步代码更加简洁、可读，避免了回调地狱。
- 在处理多个异步操作时，await 可以与 Promise.all() 配合使用，实现并行执行。
- 异常处理使用 try/catch，更易于捕获和处理异步代码中的错误。
- 通过 async 和 await，你可以像编写同步代码一样编写异步代码，使代码更加简洁、易于维护和调试。





## Object.values(),Object.keys()，Object.entries(),Object.getOwnPropertyDescriptors()

[ES8对象方法扩展： Object.values(),Object.keys()，Object.entries(),Object.getOwnPropertyDescriptors()用法详细总结_object.asign-CSDN博客](https://blog.csdn.net/qq_34645412/article/details/145712931)



### Obejct.values()

#### 用法

Object.values()方法返回一个给定对象的所有 **可枚举属性的值**的数组。这个方法对对象的属性进行遍历，返回属性值的数组。

```js
const obj ={a:i,b:2,c:3}
const values =Object.values(obj)
clg(values)//[1,2,3]
```

- 参数：接收一个对象作为参数
- 返回值：返回一个数组，包含对象的所有可枚举属性的值。



#### 使用场景

Object.values()常用于当你只关心对象的值时，特别是在处理对象数据时，可以快速获得所有属性值，简化了遍历过程。

```js
const person ={name:'john',ageL30,job:'Developer'}

//获取所有属性值
clg(values)

const hasAgeAbove25 =Object.values(person).some(value=>value>25)
clg(hasAgeAbove25)//true
```



### Object.key()



#### 用法

Object.keys()方法返回一个给定对象的可枚举属性的名称（即键）的数组。该方法的返回数组中的元素为字符串类型

```js
const obj={a:1,b:2,c:3}
const keys=Object.keys(obj)
clg(keys)//['a','b','c']
```

- 参数：接收一个对象作为参数
- 返回值：返回一个数组，包含对象的所有可枚举属性的名称（键）。



#### 使用场景

Object.keys()方法常用于获取对象的所有属性名，适用于遍历对象的属性，查找特定属性的场景。

```js
const person ={name:'Alice',age:25,job:'Engineer'}

//获取所有属性名称
const keys=Object.keys(person)
clg(keys)//['name','age','job']

//遍历对象的键
Object.keys(person).forEach(key=>{
clg(`${key}:${person[key]}`)
})
```



### Object.entries()



#### 用法

Object.entries()方法返回一个给定对象的所有可枚举属性的键值对的数组，每个元素是一个数组，包含键（属性名）和对应的值。

```js
const obj ={a:1,b:2,c:3}
const entries =Object.entries(obj)
clg(entries)
//[['a',1],['b',2],['c',3]]
```

- 参数：接收一个对象作为参数
- 返回值：返回一个二维数组，数组中的每个元素是一个包含键和值的子数组。



#### 使用场景

Object.entries()用于需要同时访问对象的键和值的情况。它可以用来遍历对象的所有属性，并且提供了更方便的访问键值对的方式。

```
const person={name:'john',age:30,job:'Developer'}

//获取对象的键值对数组
const entries =Object.entries(person)
clg(entries) // [['name', 'John'], ['age', 30], ['job', 'Developer']]

Object.entries(person).forEach(([key,value])=>{
clg(`${key}: ${value}`)
})
```

- 例子：将对象转换为Map

​	Object.entries()返回的键值对数组非常适合转换为Map对象，因为Map对象也是由键值对构成。

```js
const obj ={a:1,b:2,c:3}
const map =new Map(Object.entries(obj))
clg(map)//Map{'a'=>1,'b'=>2,'c'=>3}
```



### Object.getOwnPropertyDescriptors()

####  用法

Object.getOwnPropertyDescriptors() 方法返回一个对象，该对象包含了所有 自有属性 的描述符。每个属性的描述符是一个对象，描述了属性的 value、writable、enumerable、configurable 、get 、set 方法等特性。


```js
const obj = { a: 1, b: 2 };
const descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);
/*
{
  a: { value: 1, writable: true, enumerable: true, configurable: true },
  b: { value: 2, writable: true, enumerable: true, configurable: true }
}
*/

```

- 参数：接受一个对象作为参数。
- 返回值：返回一个对象，其中每个属性描述符包括 value、writable、enumerable 和 configurable。



#### 使用场景

Object.getOwnPropertyDescriptors() 方法常用于获取对象属性的详细描述信息，特别是在实现对象的复制、冻结或其他类似操作时非常有用。

例子：复制对象
通过 Object.getOwnPropertyDescriptors() 可以复制一个对象，保留其属性的描述符（包括 getter/setter 等）。

```js
const obj = {
  a: 1,
  get b() { return this.a + 1; }
};

const descriptors = Object.getOwnPropertyDescriptors(obj);
const newObj = Object.create(Object.getPrototypeOf(obj), descriptors);
console.log(newObj);  // { a: 1, b: 2 }

```

- 例子：冻结对象
- Object.getOwnPropertyDescriptors() 可以结合 Object.defineProperties() 来实现深拷贝或冻结对象等操作。

```js
const person = { name: 'John', age: 30 };

// 获取属性描述符
const descriptors = Object.getOwnPropertyDescriptors(person);

// 创建一个新的对象，保留属性描述符，且不可修改
const newPerson = Object.create(Object.getPrototypeOf(person), descriptors);
Object.freeze(newPerson); // 冻结对象
console.log(Object.isFrozen(newPerson)); // true

```

### 总结

- Object.values()

返回对象所有属性的值，适用于只关心对象的值的场景。

常用于查找符合条件的值，或者进行统计等操作。

- Object.keys()

返回对象所有属性的名称，适用于遍历对象的属性名。

常用于枚举属性，或者获取属性名进行其他处理。

- Object.entries()

返回对象所有属性的键值对，适用于同时需要键和值的场景。

可与 Map 等结构结合使用，简化代码。

- Object.getOwnPropertyDescriptors()

获取对象的属性描述符，适用于需要操作对象的属性特性时。Object.asign()只会复制对象的属性，描述符静态方法等不会被复制
可用于对象的深拷贝、冻结、保护等复杂操作。

> 这些方法使得 JavaScript 在操作对象时变得更加简洁和灵活，能够帮助开发者更高效地进行数据处理和属性操作。通过合理使用这些方法，可以显著提高代码的可读性和维护性。 
