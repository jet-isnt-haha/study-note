enum Color1 {
  red, //0
  green, //1
  blue, //2
}

enum Color2 {
  red = 1, //1
  green, //2
  blue = 4, //4
}

enum Color3 {
  red = "red",
  green = "green",
  blue, //!
}

enum Color4 {
  red = 1,
  green = "green",
  blue = 2,
}

interface A {
  red: Color1.red;
}

let obj: A = {
  red: Color1.red,
};

const enum Types1 {
  success,
  fail,
}

enum Type {
  success,
}

let success: number = Type.success;

let key = Type[success];
//!字符串不支持反向映射
