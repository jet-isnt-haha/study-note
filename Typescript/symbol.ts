{
  let a1: symbol = Symbol(1);
  let a2: symbol = Symbol("1");
  let a3: symbol = Symbol(undefined);

  // for Symbol for 全局symbol寻找是否有注册过这个key，若没有则去注册一个，若有则直接使用
  console.log(Symbol.for("jet") === Symbol.for("jet"));

  let obj = {
    name: 1,
    [a1]: 111,
    [a2]: 222,
  };
  console.log(obj);
}
