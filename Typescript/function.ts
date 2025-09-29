{
  function add1(a: number = 10, b: number = 20): number {
    return a + b;
  }

  const add2 = (a: number, b: number): number => a + b;

  //ts 可以定义this 的类型 在js中无法使用 ，必须是第一个参数定义this的类型
  interface Obj {
    user: number[];
    add: (this: Obj, num: number) => void;
  }
  let obj: Obj = {
    user: [1, 2, 3],
    add(this: Obj, num: number) {
      this.user.push(num);
    },
  };

  //函数重载
  let user: number[] = [1, 2, 3];

  function findNum(id: number): number[];
  function findNum(add: number[]): number[];
  function findNum(): number[];
  function findNum(ids?: number | number[]): number[] {
    if (typeof ids == "number") {
      return user.filter((v) => v == ids);
    } else if (Array.isArray(ids)) {
      user.push(...ids);
      return user;
    } else {
      return user;
    }
  }
}
