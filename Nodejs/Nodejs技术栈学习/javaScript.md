# JavaScript



## this

[原作者](https://zhuanlan.zhihu.com/p/42145138)

想要理解this需记住两点：

1. **this永远指向一个对象**
2. **this的指向完全取决于函数调用的位置**



例:

```js
function foo() {
    console.log(this.a);
}
var obj2 = {
    a: 2,
    fn: foo
};
var obj1 = {
    a: 1,
    o1: obj2
};
obj1.o1.fn(); // 2
```



this使用最频繁的情况,最常见的基本情况为:对象中的方法，事件绑定 ，构造函数 ，定时器，函数对象的call()、apply() 方法；



### 事件绑定中的this

事件绑定共有三种方式：行内绑定、动态绑定、事件监听



行内绑定的两种情况：

```html
<input type="button" value="按钮" onclick="clickFun()">
<script>
    function clickFun(){
        this // 此函数的运行环境在全局window对象下，因此this指向window;
    }
</script>

<input type="button" value="按钮" onclick="this">
<!-- 运行环境在节点对象中，因此this指向本节点对象 -->
```

当事件触发时，属性值就会作为JS代码被执行，当前运行环境下没有`clickFun`函数，因此浏览器就需要跳出当前运行环境，在整个环境中寻找一个叫`clickFun`的函数并执行这个函数，所以函数内部的this就指向了全局对象window；如果不是一个函数调用，直接在当前节点对象环境下使用this，那么显然this就会指向当前节点对象；



动态绑定与事件监听：

```html
<input type="button" value="按钮" id="btn">
<script>
    var btn = document.getElementById('btn');
    btn.onclick = function(){
        this ;  // this指向本节点对象
    }
</script>
```

因为动态绑定的事件本就是为节点对象的属性(事件名称前面加'on')重新赋值为一个匿名函数，因此函数在执行时就是在节点对象的环境下，this自然就指向了本节点对象；

事件监听中this指向的原理与动态绑定基本一致，所以不再阐述；



### 构造函数中的this

```js
function Pro(){
    this.x = '1';
    this.y = function(){};
}
var p = new Pro();
```

![image-20250308154406018](../../AppData/Roaming/Typora/typora-user-images/image-20250308154406018.png)

new 一个构造函数并执行函数内部代码的过程就是这个五个步骤，当 JS 引擎指向到第3步的时候，会强制的将this指向新创建出来的这个对象





### window定时器的this

```js
var obj = {
    fun:function(){
        this ;
    }
}

setInterval(obj.fun,1000);      // this指向window对象
setInterval('obj.fun()',1000);  // this指向obj对象
```

`setInterval()` 是window对象下内置的一个方法，接受两个参数，第一个参数允许是一个函数或者是一段可执行的 JS 代码，第二个参数则是执行前面函数或者代码的时间间隔；

在上面的代码中，`setInterval(obj.fun,1000)` 的第一个参数是`obj`对象的`fun` ，因为 JS 中函数可以被当做值来做引用传递，实际就是将这个函数的地址当做参数传递给了 `setInterval` 方法，换句话说就是 `setInterval` 的第一参数接受了一个函数，那么此时1000毫秒后，函数的运行就已经是在window对象下了，也就是函数的调用者已经变成了window对象，所以其中的this则指向的全局window对象；

而在 `setInterval('obj.fun()',1000)` 中的第一个参数，实际则是传入的一段可执行的 JS 代码；1000毫秒后当 JS 引擎来执行这段代码时，则是通过 `obj` 对象来找到 `fun` 函数并调用执行，那么函数的运行环境依然在 对象 `obj` 内，所以函数内部的this也就指向了 `obj` 对象；



### 函数对象的call()、apply()方法

函数作为对象提供了`call()`，`apply()` 方法，他们也可以用来调用函数，这两个方法都接受一个对象作为参数，用来指定本次调用时函数中this的指向；

call()方法

> call方法使用的语法规则
> 函数名称.call(obj,arg1,arg2...argN);
> 参数说明:
> obj:函数内this要指向的对象,
> arg1,arg2...argN :参数列表，参数与参数之间使用一个逗号隔开

```js
var lisi = {names:'lisi'};
var zs = {names:'zhangsan'};
function f(age){
    console.log(this.names);
    console.log(age);
    
}
f(23);//undefined

//将f函数中的this指向固定到对象zs上；
f.call(zs,32);//zhangsan
```

**apply()方法**

> 函数名称.apply(obj,[arg1,arg2...,argN])
> 参数说明:
> obj :this要指向的对象
> [arg1,arg2...argN] : 参数列表，要求格式为数组

```js
var lisi = {name:'lisi'}; 
var zs = {name:'zhangsan'}; 
function f(age,sex){
    console.log(this.name+age+sex); 
}
//将f函数中的this指向固定到对象zs上；
f.apply(zs,[23,'nan']);
```

**注意：call和apply的作用一致，区别仅仅在函数实参参数传递的方式上**

这个两个方法的最大作用基本就是用来强制指定函数调用时this的指向





## 函数

[原作者]([JavaScript函数详解 - 知乎](https://zhuanlan.zhihu.com/p/50533420))

### 函数的5种声明

1.具名函数

```js
function f(x,y){
   return x+y
}
f.name // 'f'
```

2.匿名函数

```js
var f;
f = function(x,y){
   return x+y
}
f.name // 'f'
```

3.具名函数赋值

```js
var f;
f = function f2(x,y){ return x+y }
f.name // 'f2'
console.log(f2) // 报错
```

4.window.Function [函数对象](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=函数对象&zhida_source=entity)

```js
var f = new Function('x','y','return x+y')
f.name // "anonymous" 匿名
```

5.箭头函数

```js
var sum = (x,y) => x+y;
```

### **return**

每个函数都有 return
如果你不写 return，就相当于写了 return undefined



### 词法作用域

![image-20250308155655575](../../AppData/Roaming/Typora/typora-user-images/image-20250308155655575.png)

![image-20250308155703442](../../AppData/Roaming/Typora/typora-user-images/image-20250308155703442.png)

编译型语言，编译步骤分为：词法分析、语法分析、语义检查、代码优化和字节生成。
而[解释型语言](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=解释型语言&zhida_source=entity)，通过词法分析和语法分析得到语法分析树后，就可以开始解释执行了。

js执行过程：

1. 读入第一个代码段（js执行引擎并非一行一行地执行程序，而是一段一段地分析执行的）
2. 做[词法分析](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=3&q=词法分析&zhida_source=entity)和语法分析，有错则报语法错误（比如括号不匹配等），报错后不再向后执行
3. 对【var】变量和【function】定义做“[预解析](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=预解析&zhida_source=entity)“（永远不会报错的，因为只解析正确的声明）
4. 执行代码段，有错则报错（比如变量未定义）
5. 如果还有下一个代码段，则读入下一个代码段，重复步骤2
6. 结束



上面的过程，我们主要是分成两个阶段

**javascript解析**：就是通过语法分析和预解析构造合法的[语法分析树](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=2&q=语法分析树&zhida_source=entity)。
**javascript执行**：执行具体的某个function，JS引擎在执行每个函数实例时，都会创建一个执行环境（ExecutionContext）和活动对象（activeObject）（它们属于宿主对象，与函数实例的生命周期保持一致）

```js
var a = 10;
function fn1(){
    var a = 20;
    foo()  
};
function  foo(){
    console.log(a)
}

fn1()
 //10 foo作用域在window
```



### **执行上下文**

每调用一个函数，就会创建一个新的执行上下文。

上下文建立过程：

1. 声明变量，函数，确定arguments对象，参数
2. 做词法分析形成语法分析树，建立[作用域链](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=作用域链&zhida_source=entity)
3. 确定this的值
4. 变量赋值，函数引用，执行其它代码



```js
var a = 10;
var b = {
    a:20,
    fn(){
        foo();
    },
    fn1(){
        console.log(this.a)
    }
}
function foo(){
    console.log( this.a )
}
b.fn()
```

第一步：

var a,b,foo;

第二步：

![img](https://pic1.zhimg.com/v2-a91c050f8c3627606b0f16b28a0e7588_1440w.jpg)

第三步：

全局环境内this为window

b.fn 和 b.fn1内this为b

foo内this为window

第四步：

```js
a = 10;
b = {
    a:20,
    fn(){
        foo(); 
    },
    fn1(){
        console.log(this.a)
    }    
}
function foo(){
    console.log( this.a )
}

b.fn1() // 20
b.fn()  // 10 foo this指向window，所以引用的a是全局变量
```

题外：如果 let a = 10， foo > this.a 返回**undefined**

因为let存在[块级作用域](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=块级作用域&zhida_source=entity)，所以let a=10 仅在[全局window](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=全局window&zhida_source=entity)下有意义





### js的变量提升

执行代码前,先变量提升



![image-20250308161636175](../../AppData/Roaming/Typora/typora-user-images/image-20250308161636175.png)

例2:

```js
var i= 10;
function a(){
    alert(i);
    var i = 2;
    alert(i);
}
a() 
//var i = 2;变量提升 为 var i; alert(i); i = 2;alert(i)
// undefined 2
```

![image-20250308162001069](../../AppData/Roaming/Typora/typora-user-images/image-20250308162001069.png)



### this 和 arguments

设计this的初衷是js必须长得像java。
**[this 就是 call 的第一个参数！call 的其他参数统称为 arguments](https://zhuanlan.zhihu.com/p/23804247)**
当传参为undefined时，this为window（除严格模式下是undefined）：

![image-20250308162432856](../../AppData/Roaming/Typora/typora-user-images/image-20250308162432856.png)

this 是call的第一个参数，且一般是对象或undefined,**this让函数有一个可依托的对象**，每个函数都有两个对象，如果不传this就是window，如果传的不是对象，就会帮你**转换为对象**（除严格模式），不传argument就是空数组，arguments是一个**[伪数组](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=伪数组&zhida_source=entity)**



```js
function f(){
    console.log(this)
    console.log(arguments)
}
f.call() // window,[]
f.call({name:'frank'}) // {name: 'frank'}, []
f.call({name:'frank'},1) // {name: 'frank'}, [1]
f.call({xxx:'yyy'},1,2) // {xxx: 'yyy'}, [1,2]
```



转为对象：

![image-20250308162613818](../../AppData/Roaming/Typora/typora-user-images/image-20250308162613818.png)

1. 希望里面的函数和外面的函数 this是一样的，需要使用[箭头函数](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=2&q=箭头函数&zhida_source=entity)
2. function本身一定有this，每次进入函数，一定把他弄到callStack里面，确定一个this，没传也会给你一个this，就是window，如果不想指定this，就使用箭头函数，因为没有this，且永远无法指定，this是每次进入一个函数都会被传一个值的变量，不是普通变量
3. 编译器打印的this是global, *global*对象是单体内置对象,即不依赖宿主环境的对象,而window对象依赖*浏览器*。
4. 箭头函数不可以做构造函数，没有this，arguments
5. 箭头函数也不能指定this



![image-20250308163043894](../../AppData/Roaming/Typora/typora-user-images/image-20250308163043894.png)



关于arguments的length：

![image-20250308163201468](../../AppData/Roaming/Typora/typora-user-images/image-20250308163201468.png)

此外：局部变量i和形参i指向同一个存储地址

```js
function fn(i){
   console.log(i);
   console.log(arguments[0]);
   var i = 2;
   console.log(i);
   console.log(arguments[0]);
}
fn(1); // 1 1 2 2 
```





### 不同场景的this指向

1. fn() 里面的 this 就是 window
2. fn() 是 [strict mode](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=strict+mode&zhida_source=entity)，this 就是 undefined
3. a.b.c.fn() 里面的 this 就是 a.b.c
4. new Fn() 里面的 this 就是新生成的实例
5. () => console.log(this) 里面 this 跟外面的 this 的值一模一样
6. $("#btn").on("click",function(){ 事件监听里面的this是监听的那个DOM对象，就是#btn})
7. 使用[事件委托](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=事件委托&zhida_source=entity)的事件监听里面的this仍然是开头绑定的DOM对象
8. setInterval，settimeout 里面的this是window



改变this指向通过 apply，call ，bind



### call apply bind

函数调用的本质 call,call原意为调用

语法：f.call(asThis, input1,input2)

其中 asThis 会被当做 this，[input1,input2] 会被当做 arguments

**fn.call(asThis, p1,p2) 是函数的正常调用方式,而fn（p1,p2）是[语法糖](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=语法糖&zhida_source=entity)。**

当你不确定参数的个数时，就使用 apply 。



没有call的世界:

```js
var name = 'lili'
var person = {
    name:'alias',
    sayName(){
        console.log(this.name)
    }
}

person.sayName() // 'alias'

var fn = person.sayName;
fn(); // lili
```

如果用call:

```js
var fn = person.sayName;
fn.call(person); // alias
```



call 和 apply 是直接调用函数，而 **bind 则是返回一个新函数**（并没有调用原来的函数），这个新函数会 call 原来的函数，call 的参数由你指定。



举例:错误示范:

```js
var view = {
   element:$('#card'),
   bindEvent(){
      this.element.onclick = function(){
          this.click();
      }
   },
   click(){}
}
```

这里this.element.onclick 里面的this是element，如果需要调用click方法，

第一种:	

```js
var view = {
   element:$('#card'),
   bindEvent(){
      this.element.onclick = function(){
          view.click();
      }
   },
   click(){}
}
```

第二种使用bind:

```js
var view = {
   element:$('#card'),
   bindEvent(){
      this.element.onclick = this.click.bind(this)
   },
   click(){}
}
```





### call stack(栈)

**js是单线程语言，执行函数1进入新环境时会做一个记号,return后从这里退出，如果函数1里面还有函数2，再做一个记号，**这些记号就保存在栈里面，这个栈就叫做[调用栈](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=调用栈&zhida_source=entity)，出来的时候先退出函数2，再退出函数1，这就是**调用堆栈**。



1.普通调用

```js
function a(){
    console.log('a')
  return 'a'  
}
function b(){
    console.log('b')
    return 'b'
}
function c(){
    console.log('c')
    return 'c'
}
a.call()
b.call()
c.call()
// 执行a.call() （入栈），进入a，执行  console.log('a')打印a，遇到return退出( 出栈 )
// 执行b.call() （入栈），进入b，执行  console.log('b')打印b，遇到return退出( 出栈 )
// 执行c.call() （入栈），进入c，执行  console.log('c')打印c，遇到return退出( 出栈 )
```



2.嵌套堆栈1>2>3

![image-20250308165118516](../../AppData/Roaming/Typora/typora-user-images/image-20250308165118516.png)

a.call() >>进入a(栈1),

b.call() >>进入b(栈3),

c.call() >>进入c(栈5)，

其中a先进去最后出来，出来次序为栈5>栈3>栈1



3.递归

```js
 function sum(n){
    if(n==1){
        return 1
    }else{
        return n + sum.call(undefined, n-1)
    }
}
sum.call(undefined,4)
```

![image-20250308165327891](../../AppData/Roaming/Typora/typora-user-images/image-20250308165327891.png)

**[栈溢出](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=栈溢出&zhida_source=entity)**：超出最大栈数则溢出报错



### ==闭包(closure)==

如果一个函数，使用了它范围外的变量，那么（这个函数+这个变量）就叫做闭包。

#### 什么是闭包

\#[MDN](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)的解释：闭包是函数和声明该函数的词法环境的组合。

\#javascript高程三的定义：闭包是指有权访问另一个函数作用域中的变量的函数。

\#简单说：如果一个函数，使用了它范围外的变量，那么【这个函数+这个变量】就叫做闭包

#复杂说:函数1里面再套一个函数2,最终return函数2,函数2用到函数1的变量.当调用函数1时,函数2再作用域链中搜索变量a,最终在函数1找到并执行相应程序.一般来说,函数执行完之后,局部活动对象(变量a)会被销毁,但是闭包又有所不同.即使函数1执行完也不会被销毁,因为函数2执行时已经将变量a引入自己的作用域链,所以a会一直在内存中,直到函数2被销毁,所以,这也是 **慎用闭包**的原因(比普通函数占用更多的内存).

```js
function 函数1(){ 
   let a = 1; 
   function 函数2(){ 
      a++; 
      return a; 
   } 
   return 函数2； 
} 

let res = 函数1(); 
let temp = res(); // 2 
```

一个很经典的闭包反例:

```js
function fn(){ 
   var res = []; 
   for(var i = 0 ; i < 5 ; i++){ 
      res[i] = function(){ 
         console.log(i) 
      }
   } 
   return res; 
} 

var foo = fn(); 
foo[0](); //5 
foo[1](); //5 
foo[2](); //5 
```

这个函数返回一个[函数数组](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=1&q=函数数组&zhida_source=entity)，表面上看，每一项都打印自己的索引值，但实际都是5。因为每个函数的作用域链都引用着i（注意，i是函数fn内定义的），也就是同一个i，当fn()返回res后，i就是5了，所以每次打印前i已经是5了，只是[内部函数](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=1&q=内部函数&zhida_source=entity)没有执行看不到而已。

解决这个问题有两种办法：

（一）创建一个匿名函数强制让闭包符合预期

```js
function fn(){ 
  var res = []; 
  for(var i = 0 ; i < 5 ; i++){ 
     res[i] = function(num){ 
       return function(){ 
          console.log(num);
       } 
     }(i) 
   } 
   return res; 
} 

var foo = fn(); 
foo[0](); //0 
foo[1](); //1 
foo[2](); //2 
```

（二）let 的块级作用域

```js
function fn(){ 
   var res = []; 
   for(let i = 0 ; i < 5 ; i++){ 
      res[i] = function(){ 
         console.log(i) 
      } 
    }     return res; 
} 
var foo = fn(); 
foo[0](); //0 
foo[1](); //1 
foo[2](); //2 
```

let 不同于 var 在于 let存在[块级作用域](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=2&q=块级作用域&zhida_source=entity)，每次创建一个新的i，而var是全局的，只有一个。



#### 为什么使用闭包

> 闭包是一种重用一个变量，又保护变量不被污染的机制

[全局变量](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=1&q=全局变量&zhida_source=entity)和局部变量都具有不可兼得的优缺点。

- 全局变量: 优: 可重用, 缺: 易被污染
- [局部变量](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=2&q=局部变量&zhida_source=entity): 优: 仅函数内可用，不会被污染，缺: 不可重用



#### **如何使用闭包**

1. 用外层函数包裹要保护的变量和内层函数。
2. 外层函数将[内层函数](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=2&q=内层函数&zhida_source=entity)返回到外部。
3. 调用外层函数，获得内层函数的对象，保存在外部的变量中——形成了闭包。

#### **何时使用闭包**

1.凡是用到**回调**的地方，都可能有闭包。

> 回调：被当做参数的函数就是回调，[同步回调](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=1&q=同步回调&zhida_source=entity)（forEach，sort），异步回调（setTimeout，setInterval）

回调不会立即执行，要么用户触发执行，要么浏览器触发执行，是的，有时候调用一个函数并不需要它立即执行。

（一）javascript是事件驱动型的，绑定函数触发事件，这里[绑定函数](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=2&q=绑定函数&zhida_source=entity)可以理解为调用一个回调，addEventListener（）的第二个参数就是一个函数

这里区分一下DOM0，DOM2的事件处理程序，DOM0是将函数赋值给事件处理程序属性 ，DOM2将函数作为参数，都是为了未来的某个时间执行，DOM2是DOM0的重写版本，所以DOM0是隐式回调。

比如切换标签卡，[链接](https://link.zhihu.com/?target=http%3A//js.jirengu.com/tucot/edit)

```js
function toggle(str){
  return function(){ //闭包 用到参数str
      [...content].forEach((item,i)=>{
        item.classList.remove("active");
      });          
      document.querySelector(`#${str}`).classList.add("active");
  }
}

[...toggleBar].forEach((item,i)=>{
  item.addEventListener("click",toggle(item.classList[0]))
})
```

比如切换页面字号：[链接](https://link.zhihu.com/?target=http%3A//js.jirengu.com/vuqev/1/edit%3Fhtml%2Cjs%2Coutput)

```js
function toggleSize(num){
  return function(){  //闭包 用到参数num 
    box.style.fontSize = num + 'px';
  }
}

let button = document.querySelectorAll("button");
[...button].forEach((item,i)=>{
  let size = item.id.slice(-2);
  item.onclick = toggleSize(size)；
  // 同 item.addEventListener("click",toggleSize(size))
})
```

2.setTimeOut 与 setIterval 的第一个参数就是函数

比如：5秒后改变指定元素样式

```js
function changeStyle(eleStyle, key, value) {
   return (function () { // 闭包 引用参数
      eleStyle[key] = value;
   });
}
var  fn= changeStyle(box.style, "color", "red");
setTimeout(fn, 5000);
```

比如每隔5秒打印一次当前值(或者进行一些操作)：

```js
function timeKeep(val){
  return function(){ //闭包
     console.log(val)
  }
}
let val = $("input").val();
setInterval(timeKeep(val))
```

3. 重构数组方法 sort

比如 根据对象某一属性排序

```js
function compareFn(key) {
  return function(obj1, obj2) { //闭包
    let value1 = obj1[key];
    let value2 = obj2[key];
    if (typeof value1 === "number") {
      return value1 - value2
    }else{
      return value1.localeCompare(value2)
    }
  }
}
let person = [{
  name: "aaa",
  age: 18,
  score: 99
}, {
  name: "周",
  age: 14,
  score: 98
}, {
  name: "李",
  age: 20,
  score: 100
}, {
  name: "xbc",
  age: 21,
  score: 97
}]
person.sort(compareFn("name"));
console.log(person)
```

（二）[封装](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=1&q=封装&zhida_source=entity)相关功能集

封装一系列具有相关功能的方法供使用

闭包的本意就是将数据对象和操作它的方法关联（包）起来，基于这样的原理，使用闭包就加强了函数的封装性。

比如封装localStorge

```js
function Storage(key){
   return {
      save:function(json){  //闭包
         window.localStorage.setItem(key, JSON.stringify(json));
      },
      get:function(){       //闭包
         retrun JSON.parse(window.localStorage.getItem(key)|| "[]");
      },
      clear:function(){     //闭包
         window.localStorage[key].clear();
      }
   }
}

let storage = Storage("json");
let goods = storage.get();
```

(三) 模拟私有方法

比如 日期格式化为 xxxx-xx-xx xx:xx:xx

```js
function formate(date) {
  let str = ""
  let day = date.toLocaleDateString();
  let time = date.toTimeString()

  function pad(num, n) { //私有方法
    return (Array(n).join(0) + num).slice(-n)
  }

  function formateDay() { // 闭包
    day = day.split("/");
    return day[0] + '-' + pad(day[1], 2) + '-' + pad(day[2],2)

  }
  function formateTime(){ //闭包
     return time.slice(0,8);
  }
  str = formateDay() + " " + formateTime();
  return str;
}
let date = new Date();
console.log(formate(date));
```

#### **为什么慎用闭包**

闭包形成的原因是外层函数调用后，外层函数的函数作用域对象无法释放，被内层函数引用着，无法自动释放内存。

#### **闭包与内存泄露没有关系**

**我并没有在js高程三和MDN或者阮一峰老师的文章中看到闭包会导致内存泄露的问题，只说到**由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，**在IE中可能导致内存泄露。是IE的问题，IE不能回收，不是闭包的问题，闭包只是占内存多而已。**

内存泄漏的概念：不再用到的内存，没有及时释放，就叫做内存泄漏（[memory leak](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=1&q=memory+leak&zhida_source=entity)），参考：[JavaScript 内存泄漏教程](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2017/04/memory-leak.html)

内存泄漏是指你向系统申请分配内存进行使用(new)，可是使用完了以后却不归还(delete)，结果你申请到的那块内存你自己也不能再访问，而系统也不能再次将它分配给需要的程序。

【不再用到】：可是我们明明需要[外部作用域](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=1&q=外部作用域&zhida_source=entity)的变量！

【无法访问】：虽然无法直接访问，但可以间接访问啊！

基于以上：闭包与[内存泄露](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=6&q=内存泄露&zhida_source=entity)无关。



> **总结：闭包无处不在，可能你用了但是不知道那就是闭包。**

Appendix:

[方应杭：「每日一题」JS 中的闭包是什么？](https://zhuanlan.zhihu.com/p/22486908)

MDN:[闭包](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

[阮一峰](https://zhida.zhihu.com/search?content_id=9950948&content_type=Article&match_order=2&q=阮一峰&zhida_source=entity)：

[http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html](https://link.zhihu.com/?target=http%3A//www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html)

end~

**[原作者]([关于闭包的理解 - 知乎](https://zhuanlan.zhihu.com/p/49001559))**

### 柯里化/高阶函数

#### **柯里化**

简单说：返回函数的函数，参数比原函数少一个参数

应用：柯里化可以将真实计算拖延到最后再做, 可以做[惰性求值](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=惰性求值&zhida_source=entity)

\>>柯里化：将 f(x,y) 变成 f(x=1)(y) 或 f(y=1)(x)

```js
  //柯里化之前
  function sum(x,y){
      return x+y
  }
  //柯里化之后
  function addOne(y){
      return sum(1, y)
  }
  //柯里化之前
  function Handlebar(template, data){
      return template.replace('{{name}}', data.name)
  }
  //柯里化之后
  function Handlebar(template){
      return function(data){
          return template.replace('{{name}}', data.name)
      }
  }
```



#### 高阶函数

wiki:在数学和计算机科学中，[高阶函数](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=4&q=高阶函数&zhida_source=entity)是至少满足下列一个条件的函数：

1.接受一个或多个函数作为输入：forEach sort map filter reduce

2.输出一个函数：bind, lodash.curry

fn.bind.call(fn,1,2,3)

3.不过它也可以同时满足两个条件：Function.prototype.bind

应用：将函数任意的组合

![image-20250308170920652](../../AppData/Roaming/Typora/typora-user-images/image-20250308170920652.png)



### 回调callback

名词形式：被当做参数的函数就是回调
动词形式：调用这个回调

注意**回调跟异步没有任何关系**

1. [同步回调](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=1&q=同步回调&zhida_source=entity) eg: arr.forEach(function(){})
2. 异步回调 eg: setTimeout(f, 1000) >> setTimeout("console.log(1)",1000)>>字符串其实就是一个函数



### 构造函数

返回对象的函数就是[构造函数](https://zhida.zhihu.com/search?content_id=10290843&content_type=Article&match_order=4&q=构造函数&zhida_source=entity)
一般首字母大写，使用：

```js
function Gouzao(){}; 
let gouzao = new Gouzao();
gouzao // {}
```

new是语法糖，只是少几行代码。





柯里化测试题：

请写出一个柯里化其他函数的函数 curry，这个函数能够将接受多个参数的函数，变成多个接受一个参数的函数，具体见示例（这是 lodash.curry 的文档示例）：

```js
function curry(???){
    ???
    return ???
}
var abc = function(a, b, c) {
  return [a, b, c];
};

var curried = curry(abc);

curried(1)(2)(3);
// => [1, 2, 3]

curried(1, 2)(3);
// => [1, 2, 3]

curried(1, 2, 3);
// => [1, 2, 3]
```

答案：

```js
function curry(func , fixedParams){
    if ( !Array.isArray(fixedParams) ) { fixedParams = [] }
    return function(){
        let newParams = [...arguments]; // 新传的所有参数
        if ( (fixedParams.length+newParams.length) < func.length ) {
            return curry(func , fixedParams.concat(newParams));
        }else{
            return func.apply( undefined,  fixedParams.concat(newParams));
        }
    };
}
```





## 对象（Object）

[原作者]([深入理解JavaScript——Object（对象） - 知乎](https://zhuanlan.zhihu.com/p/556955018))

- 引用类型指的是 object
- object 包括内置对象、宿主对象、自定义对象
- 内置对象中有 Object、Function、Array、String、Number、Boolean 等原生对象构造函数
- 在 JavaScript 中，一切皆对象（除 undefined、null 外）

无论是内置对象，还是自定义对象，都是基于 Object 来创建，其中的原理是[原型继承](https://zhida.zhihu.com/search?content_id=211900885&content_type=Article&match_order=1&q=原型继承&zhida_source=entity)，所以笔者喜欢称 Object.prototype 为“始祖巨人”，一切力量源于尤弥尔

我们看看 Object 是什么，它能做什么，并将其扩展，连接 Object 相关的各个知识点。知识列表如下：

- 属性与方法
- 如何创建对象
- 如何拷贝对象
- 对象继承的秘密——原型
- 继承的九种方法



### **属性与方法**

> JavaScript 对象可以从一个称为原型的对象里继承属性。对象的方法通常是继承的属性。这种”原型式继承“（prototypal inheritance）是 JavaScript 的核心特征

可以看下这个例子

```js
var johan = { name: 'johan' };
console.dir(johan);
```

![image-20250309165732604](../../AppData/Roaming/Typora/typora-user-images/image-20250309165732604.png)



能看出，我们使用对象字面量的方法创建了一个对象实例 johan，并赋予了一个属性 name，值为 johan，当打印日志时，发现多了一个对象`[[Prototype]]`，并且这个对象中有很多对象

这是因为「对象字面量」创建的实例，在底层已经做了「隐式继承」的操作，它和 `new Object('johan')` 是一个意思，除此之外，如果使用 new ，会进行原型继承，`[[prototype]]` 正是继承 Object 的原型（即 Object.prototype）

这里，不妨多说一句，实例是继承 Object.prototype，而不是 Object，原型才会被继承，构造函数是个空壳，不信，你答应 Object 和 Object.prototype，看看内容



`console.dir(Object)`如下图所示：![image-20250309170412002](../../AppData/Roaming/Typora/typora-user-images/image-20250309170412002.png)

`console.dir(Object.prototype)`如下图所示

![image-20250309170425856](../../AppData/Roaming/Typora/typora-user-images/image-20250309170425856.png)

#### **静态方法**

- `Object.assign()`：通过复制一个或多个对象来创建一个新的对象
- `Object.create()`：使用指定的原型对象和属性创建一个新对象
- `Object.defineProperty()`：给对象添加一个属性并指定该属性的配置
- `Object.defineProperties()`：给对象添加多个属性并分别指定它们的配置
- `Object.entries()`：返回给定对象自身可枚举属性的 `[key, value]` 数组
- `Object.keys()`：返回一个包含所有给定对象自身可枚举属性名称的数组
- `Object.values()`：返回给定对象自身可枚举值的数组



#### 实例属性

- `Object.prototype.constructor`：一个引用值，指向 Object 构造函数
- `Object.prototype.__proto__`：指向一个对象，当一个 object 实例化时，使用该对象作为实例化对象的原型



#### 实例方法

- `Object.prototype.hasOwnProperty()`：返回一个布尔值，用于表示一个对象自身是否包含指定的属性，该方法并不会查找原型链上继承来的属性
	- 用 `hasOwnProperty` 就能检测出，它能区别自身属性与继承属性
- `Object.prototype.isPrototypeOf()`：返回一个布尔值，用于表示该方法所调用的对象是否在指定对象的原型链中
- `Object.prototype.toString()`：返回一个代表该对象的字符串。
- `Object.prototype.valueOf()`：返回指定对象的原始值

更多信息可以查看 **[MDN](https://link.zhihu.com/?target=https%3A//developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)**



### 如何创建对象

有三种方法。对象直接量、关键字 new、 Object.create 函数来创建对象



#### **对象直接量**

创建一个新对象的最简单的方法，就是用对象直接量，就如使用以下语句：

```js
var obj = {};
{}` 表示的 `new Object()
```

#### **关键字 new**

使用 new 创建新对象，一般要跟随一个函数调用。这里的函数称为构造函数（constructor），构造函数用以初始化一个新创建的对象。例如：

```js
var obj = new Object(); // 效果如同 var obj = {}
```

更多内容，可查看这篇 [new 做了什么](https://zhuanlan.zhihu.com/p/557764439)

#### **Object.create**

此方法是 ECMAScript 5 定义了，它牵扯到原型、继承等方面的知识。简单来说，它创造了一个新对象，其中第一个参数就是这个对象的原型。而第二个可选参数，是对其属性的更多描述。例如：

```js
var obj = Object.create({ name: 'johan', age: 23 }); // obj 继承了属性name 和 age
var obj2 = Object.create(null); // obj2 不继承任何属性和方法
var obj3 = Object.create(Object.prototype); // 与 {} 和 new Object() 一个意思
```

更多内容，可查看这篇 [Object.create](https://zhuanlan.zhihu.com/p/559527875)

之所以将 new 和 Object.create 单独拿出来说，是因为两则都是比较重要的知识点，非一两句就能说明白

了解 Object 是如何创造的之后，我们看看如何赋值





### 如何拷贝对象

赋值是简单的，但赋值后的再赋值，就会引起源对象被修改

```js
var o1 = { name: 'johan' };
var o2 = o1;
o2.name = 'elaine';
console.log(o1); // {name: 'elaine'}
console.log(o2); // {name: 'elaine'}
```

之前文章也说过，因为 Object 是引用类型，引用类型的拷贝拷贝的是引用地址，所以当 o2 被修改时，o1 也随之被修改

针对如何拷贝对象，这篇文章[拷贝的秘密](https://zhuanlan.zhihu.com/p/560276058)会对其进行说明



### 对象继承的秘密**——原型**

要想解释 JavaScript 中为什么大多数元素都是对象，就必须先知道原型。JavaScript 是一门基于原型的语言——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层，以此类推。这种关系常被称为原型链

有关原型和原型链的知识，会归纳总结为一篇——[原型](https://zhuanlan.zhihu.com/p/561882773)



### 继承的九种方法

原型是实现继承的方法之一，当然 JavaScript 还有其他的方法，总共九种

- 原型链继承
- 盗用构造函数
- 组合继承（原型链+盗用构造函数）
- 原型式继承
	- Object.create
	- Object.setPrototypeOf
- 寄生式继承
- 寄生式组合继承
	- Object.create + 盗用构造函数
	- Object.setPrototypeOf + 盗用构造函数
- 类继承

具体的文章会在[继承](https://zhuanlan.zhihu.com/p/562628436)说明







## 原型

[原作者]([javascript - 彻底搞懂JS原型与原型链 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000042725370))

原型和原型链都是来源于对象而服务于对象的概念，所以我们要先明确一点：

**JavaScript中一切引用类型都是对象，对象就是属性的集合。**

`Array类型`、`Function类型`、`Object类型`、`Date类型`、`RegExp类型`等都是引用类型。

也就是说 **数组是对象、函数是对象、正则是对象、对象还是对象。**

### 原型和原型链是什么

上面我们说到对象就是属性（property）的集合，有人可能要问不是还有方法吗？其实方法也是一种属性，因为它也是`键值对`的表现形式，具体见下图。

![img](https://segmentfault.com/img/remote/1460000042725373)

可以看到`obj`上确实多了一个`sayHello`的属性，值为一个函数，但是问题来了，`obj`上面并没有`hasOwnProperty`这个方法，为什么我们可以调用呢？这就引出了 **原型**。

每一个对象从被创建开始就和另一个对象关联，从另一个对象上继承其属性，这个`另一个对象`就是 **原型**。

当访问一个对象的属性时，先在对象的本身找，找不到就去对象的原型上找，如果还是找不到，就去对象的原型（原型也是对象，也有它自己的原型）的原型上找，如此继续，直到找到为止，或者查找到最顶层的原型对象中也没有找到，就结束查找，返回`undefined`。

**这条由对象及其原型组成的链就叫做原型链。**

现在我们已经初步理解了原型和原型链，到现在大家明白为什么数组都可以使用`push`、`slice`等方法，函数可以使用`call`、`bind`等方法了吧，因为在它们的原型链上找到了对应的方法。



OK，**总结一下**：

1. **原型存在的意义就是组成原型链**：引用类型皆对象，每个对象都有原型，原型也是对象，也有它自己的原型，一层一层，组成原型链。
2. **原型链存在的意义就是继承**：访问对象属性时，在对象本身找不到，就在原型链上一层一层找。说白了就是一个对象可以访问其他对象的属性。
3. **继承存在的意义就是属性共享**：好处有二：一是代码重用，字面意思；二是可扩展，不同对象可能继承相同的属性，也可以定义只属于自己的属性。



### 创建对象

对象的创建方式主要有两种，一种是`new`操作符后跟函数调用，另一种是字面量表示法。

目前我们现在可以理解为：所有对象都是由`new`操作符后跟函数调用来创建的，字面量表示法只是语法糖（即本质也是`new`，功能不变，使用更简洁）。

```javascript
// new操作符后跟函数调用
let obj = new Object()
let arr = new Array()

// 字面量表示法
let obj = { a: 1}
// 等同于
let obj = new Object()
obj.a = 1

let arr = [1,2]
// 等同于
let arr = new Array()
arr[0] = 1
arr[1] = 2
```

`Object`、`Array`等称为构造函数，不要怕这个概念，构造函数和普通函数并没有什么不同，只是由于这些函数常被用来跟在`new`后面创建对象。`new`后面调用一个空函数也会返回一个对象，**任何一个函数都可以当做构造函数**。

所以构造函数更合理的理解应该是`函数的构造调用`。

`Number`、`String`、`Boolean`、`Array`、`Object`、`Function`、`Date`、`RegExp`、`Error`这些都是函数，而且是原生构造函数，在运行时会自动出现在执行环境中。

构造函数是为了创建特定类型的对象，这些通过同一构造函数创建的对象有相同原型，共享某些方法。举个例子，所有的数组都可以调用`push`方法，因为它们有相同原型。

我们来自己实现一个构造函数：

```javascript
// 惯例，构造函数应以大写字母开头
function Person(name) {
  // 函数内this指向构造的对象
  // 构造一个name属性
  this.name = name
  // 构造一个sayName方法
  this.sayName = function() {
    console.log(this.name)
  }
}

// 使用自定义构造函数Person创建对象
let person = new Person('logan')
person.sayName() // 输出：logan
```

**总结一下**：**构造函数用来创建对象，同一构造函数创建的对象，其原型相同。**





### `__proto__`与`prototype`

万物逃不开真香定律，初步了解了相关知识，我们也要试着来理解一下这些头疼的单词，并且看一下指来指去的箭头了。

上面总结过，每个对象都有原型，那么我们怎么获取到一个对象的原型呢？那就是对象的`__proto__`属性，指向对象的原型。

上面也总结过，引用类型皆对象，所以引用类型都有`__proto__`属性，对象有`__proto__`属性，函数有`__proto__`属性，数组也有`__proto__`属性，只要是引用类型，就有`__proto__`属性，都指向它们各自的原型对象。

![img](https://segmentfault.com/img/remote/1460000042725374)

`__proto__`属性虽然在ECMAScript 6语言规范中标准化，但是不推荐被使用，现在更推荐使用`Object.getPrototypeOf`，`Object.getPrototypeOf(obj)`也可以获取到`obj`对象的原型。本文中使用`__proto__`只是为了便于理解。

```javascript
Object.getPrototypeOf(person) === person.__proto__ // true
```

上面说过，构造函数是为了创建特定类型的对象，那如果我想让`Person`这个构造函数创建的对象都共享一个方法，总不能像下面这样吧：

**错误示范**

```javascript
// 调用构造函数Person创建一个新对象personA
let personA = new Person('张三')
// 在personA的原型上添加一个方法，以供之后Person创建的对象所共享
personA.__proto__.eat = function() {
    console.log('吃东西')
}
let personB = new Person('李四')
personB.eat() // 输出：吃东西
```

但是每次要修改一类对象的原型对象，都去创建一个新的对象实例，然后访问其原型对象并添加or修改属性总觉得多此一举。既然构造函数创建的对象实例的原型对象都是同一个，那么构造函数和其构造出的对象实例的原型对象之间有联系就完美了。

![img](https://segmentfault.com/img/remote/1460000042725375)

这个联系就是`prototype`。每个函数拥有`prototype`属性，指向使用`new`操作符和该函数创建的对象实例的原型对象。

```javascript
Person.prototype === person.__proto__ // true
```

![img](https://segmentfault.com/img/remote/1460000042725376)

看到这里我们就明白了，如果想让`Person`创建出的对象实例共享属性，应该这样写：

**正确示范**

```javascript
Person.prototype.drink = function() {
    console.log('喝东西')
}

let personB = new Person('张三')
personB.drink() // 输出：喝东西
```

OK，惯例，**总结一下**：

1. 对象有`__proto__`属性，函数有`__proto__`属性，数组也有`__proto__`属性，只要是引用类型，就有`__proto__`属性，指向其原型。
2. 只有函数有`prototype`属性，只有函数有`prototype`属性，只有函数有`prototype`属性，指向`new`操作符加调用该函数创建的对象实例的原型对象。
3. 参考视频讲解：[进入学习](https://link.segmentfault.com/?enc=QarbOCcCs392dqR8raBmQw%3D%3D.LwfnwLrhtlcZkDanZrI9HKk1Teao6jZ%2FsSTsE8SW0sgQZXrV3pjdce9brWzYSPZM)





### 原型链顶层

原型链之所以叫原型链，而不叫原型环，说明它是有始有终的，那么原型链的顶层是什么呢？

拿我们的`person`对象来看，它的原型对象，很简单

```javascript
// 1. person的原型对象
person.__proto__ === Person.prototype
```

接着往上找，`Person.prototype`也是一个普通对象，可以理解为`Object`构造函数创建的，所以得出下面结论，

```javascript
// 2. Person.prototype的原型对象
Person.prototype.__proto__ === Object.prototype
```

`Object.prototype`也是一个对象，那么它的原型呢？这里比较特殊，切记！！！

```javascript
Object.prototype.__proto__ === null
```

我们就可以换个方式描述下 **原型链** ：由对象的`__proto__`属性串连起来的直到`Object.prototype.__proto__`（为`null`）的链就是原型链。

在上面内容的基础之上，我们来模拟一下js引擎读取对象属性：

```javascript
function getProperty(obj, propName) {
    // 在对象本身查找
    if (obj.hasOwnProperty(propName)) {
        return obj[propName]
    } else if (obj.__proto__ !== null) {
    // 如果对象有原型，则在原型上递归查找
        return getProperty(obj.__proto__, propName)
    } else {
    // 直到找到Object.prototype，Object.prototype.__proto__为null，返回undefined
        return undefined
    }
}
```







### `constructor`

回忆一下之前的描述，构造函数都有一个`prototype`属性，指向使用这个构造函数创建的对象实例的**原型对象**。

这个**原型对象**中默认有一个`constructor`属性，指回该构造函数。

```javascript
Person.prototype.constructor === Person // true
```

之所以开头不说，是因为这个属性对我们理解原型及原型链并无太大帮助，反而容易混淆。

![img](https://segmentfault.com/img/remote/1460000042725377)







### 函数对象的原型链

之前提到过引用类型皆对象，函数也是对象，那么函数对象的原型链是怎么样的呢？

对象都是被构造函数创建的，函数对象的构造函数就是`Function`，注意这里`F`是大写。

```javascript
let fn = function() {}
// 函数（包括原生构造函数）的原型对象为Function.prototype
fn.__proto__ === Function.prototype // true
Array.__proto__ === Function.prototype // true
Object.__proto__ === Function.prototype // true
Function.prototype`也是一个普通对象，所以`Function.prototype.__proto__ === Object.prototype
```

这里有一个特例，`Function`的`__proto__`属性指向`Function.prototype`。

**总结一下：函数都是由`Function`原生构造函数创建的，所以函数的`__proto__`属性指向`Function`的`prototype`属性**



### 分析总结

![img](https://segmentfault.com/img/remote/1460000042725378)

有点乱？没事，我们先将之前的知识都总结一下，然后慢慢分析此图：

**知识点**

1. 引用类型都是对象，每个对象都有原型对象。
2. 对象都是由构造函数创建，对象的`__proto__`属性指向其原型对象，构造函数的`prototype`属性指向其创建的对象实例的原型对象，所以对象的`__proto__`属性等于创建它的构造函数的`prototype`属性。
3. 所有通过字面量表示法创建的普通对象的构造函数为`Object`
4. 所有原型对象都是普通对象，构造函数为`Object`
5. 所有函数的构造函数是`Function`
6. `Object.prototype`没有原型对象

OK，我们根据以上六点总结来分析上图，先从左上角的`f1`、`f2`入手：

```javascript
// f1、f2都是通过new Foo()创建的对象，构造函数为Foo，所以有
f1.__proto__ === Foo.prototype
// Foo.prototype为普通对象，构造函数为Object，所以有
Foo.prototype.__proto === Object.prototype
// Object.prototype没有原型对象
Object.prototype.__proto__ === null
```

然后对构造函数`Foo`下手：

```javascript
// Foo是个函数对象，构造函数为Function
Foo.__proto__ === Function.prototype
// Function.prototype为普通对象，构造函数为Object，所以有
Function.prototype.__proto__ === Object.prototype
```

接着对原生构造函数`Object`创建的`o1`、`o2`下手：

```javascript
// o1、o2构造函数为Object
o1.__proto__ === Object.prototype
```

最后对原生构造函数`Object`和`Function`下手：

```javascript
// 原生构造函数也是函数对象，其构造函数为Function
Object.__proto__ === Function.prototype
// 特例
Function.__proto__ === Function.prototype
```



### 举一反三

#### 1. `instanceof`操作符

平常我们判断一个变量的类型会使用`typeof`运算符，但是引用类型并不适用，除了函数对象会返回`function`外，其他都返回`object`。我们想要知道一个对象的具体类型，就需要使用到`instanceof`。

```javascript
let fn = function() {}
let arr = []
fn instanceof Function // true
arr instanceof Array // true
fn instanceof Object // true
arr instanceof Object // true
```

为什么`fn instanceof Object`和`arr instanceof Object`都返回`true`呢？我们来看一下MDN上对于`instanceof`运算符的描述：

> instanceof运算符用于测试构造函数的prototype属性是否出现在对象的原型链中的任何位置

也就是说`instanceof`操作符左边是一个对象，右边是一个构造函数，在左边对象的原型链上查找，直到找到右边构造函数的prototype属性就返回`true`，或者查找到顶层`null`（也就是`Object.prototype.__proto__`），就返回`false`。
我们模拟实现一下：

```javascript
function instanceOf(obj, Constructor) { // obj 表示左边的对象，Constructor表示右边的构造函数
    let rightP = Constructor.prototype // 取构造函数显示原型
    let leftP = obj.__proto__ // 取对象隐式原型
    // 到达原型链顶层还未找到则返回false
    if (leftP === null) {
        return false
    }
    // 对象实例的隐式原型等于构造函数显示原型则返回true
    if (leftP === rightP) {
        return true
    }
    // 查找原型链上一层
    return instanceOf(obj.__proto__, Constructor)
}
```

现在就可以解释一些比较令人费解的结果了：

```javascript
fn instanceof Object //true
// 1. fn.__proto__ === Function.prototype
// 2. fn.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype
arr instanceof Object //true
// 1. arr.__proto__ === Array.prototype
// 2. arr.__proto__.__proto__ === Array.prototype.__proto__ === Object.prototype
Object instanceof Object // true
// 1. Object.__proto__ === Function.prototype
// 2. Object.__proto__.__proto__ === Function.prototype.__proto__ === Object.prototype
Function instanceof Function // true
// Function.__proto__ === Function.prototype
```

**总结一下：`instanceof`运算符用于检查右边构造函数的`prototype`属性是否出现在左边对象的原型链中的任何位置。其实它表示的是一种原型链继承的关系。**



#### 2. `Object.create`

之前说对象的创建方式主要有两种，一种是`new`操作符后跟函数调用，另一种是字面量表示法。

其实还有第三种就是ES5提供的`Object.create()`方法，会创建一个新对象，第一个参数接收一个对象，将会作为新创建对象的原型对象，第二个可选参数是属性描述符（不常用，默认是`undefined`）。具体请查看Object.create()。

我们来模拟一个简易版的`Object.create`：

```javascript
function createObj(proto) {
    function F() {}
    F.prototype = proto
    return new F()
}
```

我们平常所说的空对象，其实并不是严格意义上的空对象，它的原型对象指向`Object.prototype`，还可以继承`hasOwnProperty`、`toString`、`valueOf`等方法。

如果想要生成一个不继承任何属性的对象，可以使用`Object.create(null)`。

如果想要生成一个平常字面量方法生成的对象，需要将其原型对象指向`Object.prototype`：

```javascript
let obj = Object.create(Object.prototype)
// 等价于
let obj = {}
```

#### 3. `new`操作符

当我们使用`new`时，做了些什么？

1. 创建一个全新对象，并将其`__proto__`属性指向构造函数的`prototype`属性。
2. 将构造函数调用的this指向这个新对象，并执行构造函数。
3. 如果构造函数返回对象类型Object(包含Functoin, Array, Date, RegExg, Error等)，则正常返回，否则返回这个新的对象。

依然来模拟实现一下：

```javascript
function newOperator(func, ...args) {
    if (typeof func !== 'function') {
        console.error('第一个参数必须为函数，您传入的参数为', func)
        return
    }
    // 创建一个全新对象，并将其`__proto__`属性指向构造函数的`prototype`属性
    let newObj = Object.create(func.prototype)
    // 将构造函数调用的this指向这个新对象，并执行构造函数
    let result = func.apply(newObj, args)
    // 如果构造函数返回对象类型Object，则正常返回，否则返回这个新的对象
    return (result instanceof Object) ? result : newObj
}
```

#### 4. `Function.__proto__ === Function.prototype`

其实这里完全没必要去纠结鸡生蛋还是蛋生鸡的问题，我自己的理解是：`Function`是原生构造函数，自动出现在运行环境中，所以不存在自己生成自己。之所以`Function.__proto__ === Function.prototype`，是为了表明`Function`作为一个原生构造函数，本身也是一个函数对象，仅此而已。





## 正则

正则表达式（Regular Expression，简称RegExp）是一种强大而灵活的模式匹配工具，广泛应用于字符串的搜索、匹配和替换等操作。JavaScript作为一门流行的编程语言，内置支持正则表达式，提供了丰富的功能和语法。本文将深入探讨JavaScript中的正则表达式，从基础概念到高级应用，帮助读者全面了解并熟练运用这一重要的工具。

![img](https://ucc.alicdn.com/z3pojg2spmpe4_20240318_2fd89210ae88487abce6f3791018bc06.png?x-oss-process=image/resize,w_1400/format,webp)

### 1. 正则表达式基础

#### 1.1 什么是正则表达式？

正则表达式是一种描述字符模式的方法，用于匹配字符串中的字符组合。它由字面值字符和元字符（metacharacters）组成，通过组合形成模式。正则表达式是一种强大的工具，可以进行文本搜索、替换、提取和验证等操作。

#### 1.2 创建正则表达式

在JavaScript中，可以使用字面量或构造函数创建正则表达式。

##### 使用字面量：

```javascript
const pattern = /ab+c/;
```

##### 使用构造函数：

```javascript
const pattern = new RegExp('ab+c');
```

两者创建的正则表达式对象是等效的。

#### 1.3 正则表达式的基本语法

正则表达式由普通字符和元字符组成。普通字符（例如字母、数字）表示它们自身，而元字符具有特殊含义。以下是一些基本的元字符：

- `.`: 匹配除换行符以外的任意字符。
- `^`: 匹配输入的开始。
- `$`: 匹配输入的结束。
- `*`: 匹配前面的字符零次或多次。
- `+`: 匹配前面的字符一次或多次。
- `?`: 匹配前面的字符零次或一次。
- `\`: 转义字符，用于匹配字面值。

### 2. 正则表达式的模式匹配

#### 2.1 基本匹配

最简单的正则表达式是由普通字符组成的模式，用于精确匹配字符串。

```javascript
const pattern = /hello/;
const text = 'Hello, World!';

console.log(pattern.test(text)); // 输出: false
```

#### 2.2 元字符的使用

元字符赋予正则表达式更灵活的匹配能力。

- `.`: 匹配任意字符。

```javascript
const pattern = /h.llo/;
const text = 'hello';

console.log(pattern.test(text)); // 输出: true
```

- `^` 和 `$`: 分别匹配字符串的开头和结尾。

```javascript
const pattern = /^hello$/;
const text = 'hello';

console.log(pattern.test(text)); // 输出: true
```

#### 2.3 重复匹配

通过使用 `*`、`+`、`?` 实现匹配重复次数。

- `*`: 匹配前面的字符零次或多次。

```javascript
const pattern = /go*gle/;
const text = 'ggle';

console.log(pattern.test(text)); // 输出: true
```

- `+`: 匹配前面的字符一次或多次。

```javascript
const pattern = /go+gle/;
const text = 'ggle';

console.log(pattern.test(text)); // 输出: false
```

- `?`: 匹配前面的字符零次或一次。

```javascript
const pattern = /colou?r/;
const text1 = 'color';
const text2 = 'colour';

console.log(pattern.test(text1)); // 输出: true
console.log(pattern.test(text2)); // 输出: true
```

#### 2.4 字符类

使用 `[]` 定义字符类，匹配字符集中的任意一个字符。

```javascript
const pattern = /[aeiou]/;
const text = 'hello';

console.log(pattern.test(text)); // 输出: true
```

#### 2.5 范围和排除

通过在字符类中使用 `-` 表示范围，使用 `^` 在字符类内表示排除。

- `[a-z]`: 匹配任意小写字母。
- `[^0-9]`: 匹配任意非数字字符。

```javascript
const pattern1 = /[a-z]/;
const pattern2 = /[^0-9]/;
const text = 'Hello123';

console.log(pattern1.test(text)); // 输出: true
console.log(pattern2.test(text)); // 输出: true
```

### 3. 正则表达式的高级应用

#### 3.1 分组和引用

通过 `()` 实现分组，可以对分组应用重复操作，并在模式后面引用分组匹配的内容。

```javascript
const pattern = /(\w+)\s(\w+)/;
const text = 'John Doe';

const match = text.match(pattern);

console.log(match[0]); // 输出: John Doe
console.log(match[1]); // 输出: John
console.log(match[2]); // 输出: Doe
```

#### 3.2 零宽断言

零宽断言用于匹配字符串的某个位置，而不消耗字符。

- `(?=...)`: 正向肯定查找。
- `(?!)`: 正向否定查找。
- `(?<=...)`: 反向肯定查找。
- `(?<!)`: 反向否定查找。

```javascript
const pattern1 = /\d(?=px)/; // 匹配数字后面是'px'
const pattern2 = /\d(?!px)/; // 匹配数字后面不是'px'
const pattern3 = /(?<=\$)\d+/; // 匹配'$'后面的数字
const pattern4 = /(?<!\$)\d+/; // 匹配'$'前面的数字

const text = '10px $20';

console.log(text.match(pattern1)); // 输出: 1
console.log(text.match(pattern2)); // 输出: 0
console.log(text.match(pattern3)); // 输出: 20
console.log(text.match(pattern4)); // 输出: 10
```

#### 3.3 替换和捕获组

正则表达式不仅可以用于匹配，还可以用于替换和捕获。

##### **替换**

使用 `replace()` 方法进行替换。

```javascript
const pattern = /apple|orange/;
const text = 'I have an apple and an orange.';

const replacedText = text.replace(pattern, 'fruit');

console.log(replacedText); // 输出: I have an fruit and an fruit.
```

##### **捕获组**

使用捕获组可以在匹配中提取指定部分。

```javascript
const pattern = /(\d{4})-(\d{2})-(\d{2})/;
const text = 'Date: 2022-02-28';

const match = text.match(pattern);

console.log(match[0]); // 输出: 2022-02-28
console.log(match[1]); // 输出: 2022
console.log(match[2]); // 输出: 02
console.log(match[3]); // 输出: 28
```

#### 3.4 贪婪与非贪婪匹配

正则表达式默认是贪婪匹配，即尽可能多地匹配字符。在量词后面加上 `?` 可以转为非贪婪匹配，即尽可能少地匹配字符。

```javascript
const pattern1 = /\d+/; // 贪婪匹配
const pattern2 = /\d+?/; // 非贪婪匹配

const text = '12345';

console.log(text.match(pattern1)[0]); // 输出: 12345
console.log(text.match(pattern2)[0]); // 输出: 1
```

#### 3.5 RegExp 对象的属性和方法

JavaScript 的 RegExp 对象提供了丰富的属性和方法，用于操作和查询正则表达式。

- `source`: 返回正则表达式的模式文本。
- `flags`: 返回正则表达式的标志。
- `test(str)`: 测试字符串是否匹配正则表达式，返回布尔值。
- `exec(str)`: 在字符串中执行正则表达式，返回匹配的结果。

```javascript
const pattern = /\d+/g;
const text = 'Hello 123, World 456!';

console.log(pattern.source); // 输出: \d+
console.log(pattern.flags); // 输出: g

console.log(pattern.test(text)); // 输出: true

let match;
while ((match = pattern.exec(text)) !== null) {
   
   
  console.log(match[0]); // 输出: 123 和 456
}
```

#### 3.6 正则表达式的应用场景

正则表达式在许多场景中都有着广泛的应用，其中包括但不限于：

- 字符串的匹配和搜索。
- 表单验证，如邮箱、电话号码等格式。
- 数据提取和处理，如日志分析。
- 替换和修改文本内容。

### 4. 结语

JavaScript 正则表达式是一项强大而灵活的技术，能够在字符串操作中提供精确、高效的解决方案。本文详细介绍了正则表达式的基础概念、模式匹配、高级应用以及在实际编程中的常见应用场景。深入理解和熟练使用正则表达式，将为编程工作中的字符串处理带来便利和效率。

通过学习和实践，读者可以逐渐掌握正则表达式的语法和应用技巧，将其运用到日常开发中。正则表达式虽然初学时可能显得复杂，但一旦掌握，将成为编程中的得力工具，帮助解决各种字符串处理的问题。

