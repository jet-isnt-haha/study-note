//! 策略模式的定义是：定义一系列的算法，把它们一个个封装起来，并使它们可以相互替换


//* 一个基于策略模式的程序至少由两部分组成。第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。  第二部分部分是环境类Context，Context接收客户的请求，随后把请求委托给某一个策略类。要做到这点，说明Context中要维持对某个策略对象的引用 。可以解决违反开放-封闭原则的问题。

//1.使用策略模式计算奖金

{
    let performanceS = function () { }
    performanceS.prototype.calculate = function (salary) {
        return salary * 4
    }

    let performanceA = function () { }
    performanceA.prototype.calculate = function (salary) {
        return salary * 3
    }

    let performanceB = function () { }
    performanceB.prototype.calculate = function (salary) {
        return salary * 2
    }


    let Bonus = function () {
        this.salary = null; //原始工资
        this.strategy = null;//绩效等级对应的策略对象
    }

    Bonus.prototype.setSalary = function (salary) {
        this.salary = salary;//设置原始工资
    }

    Bonus.prototype.setStrategy = function (strategy) {
        this.strategy = strategy;//设置员工绩效等级对应的策略对象
    }

    Bonus.prototype.getBonus = function () { //取得奖金数额
        if (!this.strategy) {
            throw new Error('未设置strategy属性');
        }
        return this.strategy.calculate(this.salary); //* 把计算奖金的操作委托给对应的策略对象
    }

    let bonus = new Bonus();
    bonus.setSalary(1000);
    bonus.setStrategy(new performanceS())
    console.log(bonus.getBonus());

    bonus.setStrategy(new performanceA());
    console.log(bonus.getBonus());
}
console.log('1---------------------------------------------------');
//2.JavaScript版本的策略模式

{
    //在JS语言中，函数也是对象，所以更简单和直接的做法是把strategy直接定义为函数

    let strategy = {
        S: function (salary) {
            return salary * 4;
        },
        A: function (salary) {
            return salary * 3;
        },
        B: function (salary) {
            return salary * 2;
        }
    }

    //同样，Context也没必要使用Bonus类来表示，
    let calculateBonus = function (level, salary) {
        return strategy[level](salary);
    }

    console.log(calculateBonus('S', 2000));
    console.log(calculateBonus('A', 1000));
}

console.log('2---------------------------------------------------');


//3.表单校验

{
    let strategies = {
        isNonEmpty: function (value, errorMsg) {//不为空
            if (value === '') {
                return errorMsg;
            }
        },
        minLength: function (value, length, errorMsg) {//限制最小长度
            if (value.length < length) {
                return errorMsg;
            }
        },
        isMobile: function (value, errorMsg) {//手机号码格式
            if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
                return errorMsg;
            }
        }
    }

    let Validator = function () {
        this.cache = [];//保存校验规则
    }

    Validator.prototype.add = function (dom, rule, errorMsg) {
        let ary = rule.split(':'); //把strategy和参数分开
        this.cache.push(function () {//把校验的步骤勇敢空函数包装起来，并且放入cache
            let strategy = ary.shift();//用户挑选的strategy
            ary.unshift(dom.value);//把input的value添加进参数列表
            ary.push(errorMsg);//把errorMsg添加进参数列表
            return strategies[strategy].apply(dom, ary);
        });
    }

    Validator.prototype.start = function () {
        for (let i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
            let msg = validatorFunc();//开始校验，并取得校验后的返回消息
            if (msg) {
                return msg;
            }
        }
    }

    let validatorFunc = function () {
        let validator = new Validator();

        validator.add(registerForm.userName, 'isNonEmpty', '用户名不能为空');
        validator.add(registerForm.password, 'minLength:6', '密码长度不能少于6位');
        validator.add(registerForm.phoneNumber, 'isMobile', '手机号码格式不正确');

        let errorMsg = validator.start();//获得校验结果
        return errorMsg;
    }

    let registerForm = document.getElementById('registerForm');
    registerForm.onsubmit = function () {
        let errorMsg = validatorFunc(); //如果errorMsg由确切的返回值，说明未通过校验
        if (errorMsg) {
            alert(errorMsg);
            return false;//阻止表单提交
        }
    }
}