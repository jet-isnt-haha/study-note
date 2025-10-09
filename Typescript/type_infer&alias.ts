{
  type s = string;

  let str: s = "jet";

  //extends 在这里是包含的意思
  //左侧的值 会作为右侧类型的子类型
  //any unkonw
  //Object
  //Number String Boolean
  //number string boolean
  //1 'test' true
  //never
  type num = 1 extends number ? 1 : 0;
}
