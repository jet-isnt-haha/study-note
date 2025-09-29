{
  //ecmascript类型定义
  let num: Number = new Number(1);

  let data: Date = new Date();
  let reg: RegExp = new RegExp(/\w/);
  let error: Error = new Error();
  let xhr: XMLHttpRequest = new XMLHttpRequest();

  let divs1: NodeList = document.querySelectorAll("div");
  let divs2: NodeListOf<HTMLDivElement | HTMLElement> =
    document.querySelectorAll("div");

  let local: Storage = localStorage;
  let lo: Location = location;
  let promise: Promise<number> = new Promise((r) => r(1));
  let cookie: string = document.cookie;
}
