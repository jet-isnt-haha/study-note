{
  //联合类型
  let phone: number | string = 123456;

  let fn = function (type: number | boolean): boolean {
    return !!type;
  };

  interface People {
    name: string;
    age: number;
  }

  interface P {
    sex: number;
  }
  //交叉类型
  const foo = (bar: People & P): void => {
    console.log(bar);
  };

  //类型断言(类型断言不能滥用)
  let fn2 = function (num: number | string): void {
    console.log((num as string).length);
  };
  let fn3 = function (num: number | string): void {
    console.log((<string>num).length);
  };
  let fn4 = function (num: any): boolean {
    return num as boolean;
  };
}
