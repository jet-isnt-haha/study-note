{
  let arr1: Array<boolean> = [true, false];
  let arr2: boolean[] = [true, false];

  //数组普通类型
  interface X {
    name: string;
  }

  let arr3: X[] = [{ name: "jet" }, { name: "jelly" }];

  //二维数组
  let arr4: number[][] = [[1], [2], [3]];
  let arr5: Array<Array<number>> = [[1], [2], [3]];

  //元组
  let arr6: [number, string, boolean] = [1, "2", true];

  //剩余参数数组
  function a(...args: string[]) {
    console.log(args);
    //定义类数组
    let arr7: IArguments = arguments;
    let arr8: A = arguments;
  }
  //* IArgumens的内部原理
  interface A {
    callee: Function;
    length: number;
    [index: number]: any;
  }
}
