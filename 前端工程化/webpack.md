# webpack

打包工具的运行环境是node

## path内置模块

```javascript
const path = require('path')
//当前工作目录绝对路径：C:\Users\76018\Desktop\code\path
```

**path常见API**

- 从路径中获取信息

	- dirname：获取文件的父文件夹；

	- basename：获取文件名；

	- extname：获取文件扩展名；

		```js
		const filepath="C://abc/cba/nba.txt";
		console.log(path.extname(filepath));
		console.log(path.basename(filepath));
		console.log(path.dirname(filepath));
		/*
		.txt
		nba.txt
		C://abc/cba
		*/
		```

		

- 路径的拼接：path.join

	- 如果希望多个路径进行拼接，但在不同的操作系统可能使用的是不同的分隔符；

	- 可以使用path.join

		```javascript
		const path1 = "/760/jet";
		const path2 = "../demo1/demo2/demo.js"
		console.log(path.join(path1,path2)); 
		/*
		\760\demo1\demo2\demo.js
		*/
		```

		

- 拼接绝对路径：path.resolve

	- path.resolve()方法会把一个路径或路径片段的序列解析为一个绝对路径；

		```javascript
		const path1 = "./abc";
		console.log(path.resolve(path1));//C:\Users\76018\Desktop\code\path\abc
		```

	- 给定的路径的序列是从右往左被处理的，后面每个path被依次解析，直到构造完成一个 **绝对路径**

		```javascript
		const path2 = "/jet/aaa";
		console.log(path.resolve(path1,path2));//C:\jet\aaa
		console.log(path.resolve(path2,path1));//C:\jet\aaa\abc
		```

	- 如果在处理完所有给定path的段之后，还没有生成绝对路径，则使用当前工作目录；

		```javascript
		const path3 = "./jet/aaa";
		console.log(path.resolve(path3,path1));//C:\Users\76018\Desktop\code\path\jet\aaa\abc
		```

	- 生成的路径被规范化并删除尾部斜杠，零长度path段被忽略；

		```javascript
		const path4="";
		console.log(path.resolve(path3,path4,path1));//C:\Users\76018\Desktop\code\path\jet\aaa\abc
		```

	- 如果没有path传递段，path.resolve()将返回当前工作目录的绝对路径

		```javascript
		console.log(path.resolve());//C:\Users\76018\Desktop\code\path
		```

		​	

## webpack基础

  **定义**：

​	webpack is a static module bundler for modern JavaScript application



- webpack是一个静态的模块化打包工具，为现代的JavaScript应用程序；
	- 打包bundler：webpack可以帮助我们进行打包，所以它是一个打包工具；
	- 静态static：这样表述的原因是我们最终可以将代码打包成最终的静态资源（部署到静态服务器）；
	- 模块化module：webpack默认支持各种模块化开发，ES Module、CommonJS、AMD等；
	- 现代modern：因为现代前端开发面临的各种问题才催生了webpack的出现和发展；





- webpack的安装目前分为两个：webpack、webpack-cli
- 关系
	- 执行webpack命令，会执行node_modules下的.bin目录下的webpack；
	- webpack在执行时是依赖webpack-cli的，如果没有安装就会报错；
	- 而webpack-cli中代码执行时，才是真正利用webpack进行编译和打包的过程；
	- 所以在安装webpack时，我们需要同时安装webpack-cli（第三方的脚手架事实上是没有使用webpack-cli的，而是类似于自己的vue-service-cli的东西）





**webpack的默认打包**：

- 我们可以通过webpack进行打包，之后运行打包之后的代码

	- 在目录下直接执行webpack命令

- 生成一个dist文件夹，里面存放一个main.js的文件，就是我们打包之后的文件：

	- 这个文件中的代码被压缩和丑化了；
	- 另外我们发现代码依然存在ES6的语法，比如箭头函数、const等，这是因为默认情况下webpack并不清楚我们打包后的文件是否需要转换成ES5之前的语法，后续我们需要通过babel来进行转换和设置；

- 我们发现是可以正常进行打包的，webpack是如何确定我们的入口呢？

	- 我们运行webpack时，webpack会查找当前目录下的src/index.js作为入口；
	- 所以当前项目没有存在src/index.js文件，那么就会报错；

- 也可以通过配置指定入口和出口

	```powershell
	npx webpack --entry ./src/main.js --output-path ./build
	```

- 通常情况，webpack需要打包的项目非常复杂，并且需要配置；

- 可以在根目录下创建webpack.config.js文件，来作为webpack的配置文件；
	如：

	```javascript
	const path = require('path');
	
	module.exports={
	    entry:"./src/main.js",
	    output:{
	        filename:'bundle.js',
	        path:path.resolve(__dirname,'./build')
	    }
	}
	```




**webpack的依赖图**：

- webpack在处理应用程序时，它会根据命令或配置文件找到入口文件；
- 从入口文件开始，会生成一个依赖关系图，这个依赖关系图会包含应用程序中所需的所有模块（比如js、css、图片、字体等）；
- 然后遍历图结构，打包一个个模块（根据文件不同使用不同的loader来解析）；



**css-loader的使用**：

```js
//divEl.js
import '../styles/divEl.css'

const divEl  = document.createElement('div');
divEl.classList = "content";
divEl.textContent = "hello world"
document.body.appendChild(divEl);
//divEl.css
content {
  color: red;
  font-size: 30px;
}
//main.js
import { add } from "./utils/data";
import './components/divEl'
const msg="hello world";
console.log((add(11,22)));
console.log((add(33,44)));
console.log((add(55,66)));

const bar=()=>{
    console.log("barbarbar");
}

//当使用webpack进行打包时出现错
/*
ERROR in ./src/styles/divEl.css 1:8
Module parse failed: Unexpected token (1:8)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> content {
|   color: red;
|   font-size: 30px;
 @ ./src/components/divEl.js 1:0-28
 @ ./src/main.js 2:0-27
*/
```

```js
//webpack的配置文件
const path = require('path');

module.exports={
    entry:"./src/main.js",
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./build')
    }
}
```

- 上面的错误信息告诉我们需要一个loader来加载这个css文件，什么是loader？

	- loader可以用于对模块的源代码进行转
	- 我们可以将css文件也看成是一个模块，我们是通过import来加载这个模块的；
	- 在加载这个模块时，webpack其实并不知道如何对其进行加载，我们必须制定对应的loader来完成这个功能；

	

- 使用loader加载css文件的三种方式：
	- 内联方式；
	- CLI方式（webpack5中不再使用）；
	- 配置方式
- 配置方式表示的意思是在我们的webpack.config.js文件中写明配置信息：
	- module.rules中允许我们配置多个loader（因为我们也会继续使用其他的loader，来完成其他文件的加载）；
	- 这种方式可以更好的表示loader的配置，也方便后期的维护，同时也让你对各个Loader有全局的概览；
- module.rules的配置如下：
	- rules属性对应的值是一个数组：[Rule]
	- 数组中存放的是一个个的Rule，Rule是一个对象，对象中可以设置多个属性；
		- test属性：用于对resource进行匹配的，通常设为正则表达式；
		- use属性：对应的值是一个数组：[UseEntry]
			- UseEntry是一个对象，可以通过对象的属性来设置一些其他属性
				- loader：必须有一个loader属性，对应的值是一个字符串；
				- options：可选属性，值是一个字符串或者对象，值会被传入到loader中；
			- 传递字符串（如 use:['style-loader'])是loader属性的简写方式(如 use:[{loader:'style-loader'}]);
		- loader属性：Rule.use[{loader}]的简写

```js
//webpack的配置文件
//...
 module:{
        rules:[
            {
                //告诉wk匹配什么文件
                test:/\.css$/,
                use:[
                    {loader:"css-loader"}
                ]
            }
        ]
    }

//重新打包
/*
打包成功
*/
```

- 发现可以通过css-loader来加载css文件了
	- 但是发现css在代码中没有生效（页面没有效果）。
	- 原因是css-loader只负责将.css文件进行解析，并不会将解析后的css插入到页面中；
	- 如果希望再完成插入style的操作，就需要style-loader；
	- 在配置文件中添加style-loader
	- loader的执行顺是从右到左，所以style-loader写到css-loader前

```js
//...   
module:{
        rules:[
            {
                //告诉wk匹配什么文件
                test:/\.css$/,
                use:[
                    //use中多个loader的使用顺序是从右到左
                    {loader:"style-loader"},
                    {loader:"css-loader"}
                    
                    //简写一：如果loader只有一个
                    //loader:"css-loader"
                    //简写二：多个loader不需要其他属性时，可以直接写loader字符串形式
                    //use:["style-loader","css-loader"]
                ]
            }
        ]
    }
```



- 处理less文件同理

```js
    {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            }
```



- postcss
	- 是一个通过JavaScript来转换样式的工具；
	- 这个工具可以帮助我们进行一些css的转换和适配，比如自动添加浏览器前缀，css样式的重置；
	- 实现这些功能需要借助PostCSS对应的插件；



- 实现方式：

	- ```js
		//在wk配置文件里配置     
		use:["style-loader","css-loader","postcss-loader"
		                            {loader:"postcss-loader",
		                            options:{
		                                postcssOptions:{
		                                    plugins:[
		                                        "autoprefixer"
		                                    ]
		                                }
		                            }}                    
		                        ]
		```

	- ```js
		//单独配置文件
		//postcss.config.js
		module.exports = {
		        plugins:[
		            "postcss-preset-env"
		            // "autoprefixer"
		        ]
		}
		```

	- 在配置postcss-loader时，不需要使用autoprefixer

	- 可以使用：postcss-preset-env

		- 其是postcss的插件
		- 实现了一些现代CSS特性
		- 也包括自动添加autoprefixer



**图片资源**：

```js
//divEl.js
import avator from '../imgs/qxlarge-dsc-DA5BF658C9727555A15A0CE684DED52A.jpg'
const imgEl = document.createElement('img');
imgEl.src = avator; 
document.body.append(imgEl);
```

```js
//wk配置文件
     {
                test:/\.(png|jpe?g|svg|gif)$/,
                type:"asset"
            }
```

**asset module type**：

- 在wk5之前，加载这些资源需要使用loader，比如raw-loader、url-loader、file-loader；

- wk5开始，我们可以直接使用资源模块类型（asset module type），来代替上面这些loader；



- **asset module type**，通过4种新的模块类型，来替换所有这些loader：
	- asset/resource 发送一个单独的文件并导出URL
		- 之前通过使用file-loader实现
	- asset/inline导出一个资源的data URL
		- 之前通过使用url-loader实现
	- asset/source导出资源的源代码
		- 之前通过使用raw-loader实现
	- asset在导出一个data URL和发送一个单独的文件之间自动选择。
		- 之前使用url-loader，并且配置资源体积限制实现；

```javascript
   {
                test:/\.(png|jpe?g|svg|gif)$/,
                   //打包图片，并且图片有自己的地址，将地址设置到img中
                   //缺点：网络请求会增加
                type:"asset/resource"
       
       			  //将图片进行base64编码，并将直接编码后的源码放到打包的js文件中
       			  //缺点：造成js文件非常大，下载js文件本身消耗实际非常长，造成js代码的下载和解析/执行时间过长
       			type:"asset/inline"
       
       			
       			//合理规范：
       			//对于小图片，可以进行base64编码
       			//对于大图片，单独图片打包，形成url地址，单独的请求url图片      
      			type:"asset",
                 //进行配置
                     parser:{
                    dataUrlCondition:{
                        //不超过maxSize使用base编码
                        //反之则打包图片
                        maxSize:60*1024
                    }
                },
                //图片名称的配置以及路径的设置
                     generator:{
                    //占位符
                    //name：指向原来的图片名称
                    //ext：扩展名
                    //hash：webpack生成的hash
                    //在build文件下的img文件夹下的图片名称为原名称加上前8位哈希值加上后缀
                    filename:"img/[name]_[hash:8][ext]"
                }
            }
```

```js
//也可以在output位置设置
   output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'./build'),
        //一般不采用
        assetModuleFilename:"xxx"
    },
```

 

**babel**:

```js
         {
                test:/\.js$/,
                use:["babel-loader"]
            }
//同理需要babel插件的配置，可以创建独立的文件进行配置
```

```js
//babel.config.js
module.exports={
    // plugins:[
    //     //babel的插件位置
    // ],
    presets:[
        //使用babel预设
        "@babel/preset-env"
    ]
}
```

- 手动安装插件要管理大量的babel插件，可以直接给webpack提供一个preset，wk会根据我们的预设来加载对于的插件列表，并传递给babel
- 常见的三个预设：
	- env
	- react
	- Typescript

 



**resolve模块解析**：

- resolve用于设置模块如何被解析：
	- 在开发中我们会有各种各样的模块依赖，这些模块可能来自于自己编写的代码，也可能来自第三方库；
	- resolve可以帮助webpack从每个require/import语句中，找到需要引入到合适的模块代码；
	- webpack使用enhanced-resolve来解析文件路径；
- webpack能解析三种文件路径：
- 绝对路径
	- 由于已经获得文件的绝对路径，因此不需要再做进一步解析。
- 相对路径
	- 在这种情况下，使用import或require的资源文件所处的目录，被认为是上下文目录；
	- 在import/require给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径；
- 模块路径
	- 在resolve.modules中指定的所有目录检索模块；
		- 默认值是['node_modules']，所以默认会从node_modules中查找文件；
	- 我们可以通过设置别名的方式来替换初始模块路径；



**具体过程**：

- 如果是一个文件：

	- 如果文件具有扩展名，则直接打包文件；
	- 否则，将使用resolve.extensions选项作为文件扩展名解析；

- extensions是解析到文件时自动添加扩展名：

	- 默认值是['wasm','js','json']（版本不同可能会有不同的默认值）

	- 所以如果我们代码中想要添加加载.vue或jsx或ts文件时，必须写上扩展名；

		```js
		module.exports={
		    entry:"./src/main.js",
		    output:{
		        filename:'bundle.js',
		        path:path.resolve(__dirname,'./build')
		    },
		    resovle:{
		        extensions:[".js",".json",".vue",".jsx",".ts","tsx"]
		    },
		    module:{
		        rules:[
		            //...
		```

- 如果是一个文件夹：

	- 会在文件夹中根据resolve.mainFiles配置选项中指定的文件顺序查找；
		- resolve.mainFiles的默认值是['index'](一般不读这个配置选项进行修改）；
		- 再根据resolve.extension来解析扩展名；

- 配置alias：

	- 特别当我们项目的目录结构比较深的时候，或者一个文件的路径可能需要../../../这种路径片段；

	- 我们可以给某些常见的路径起一个别名

		```js
		    resovle:{
		        extensions:[".js",".json",".vue",".jsx",".ts","tsx"],
		        alias:{
		            "@":path.resolve(__dirname,"./src")
		        },
		    },
		```




**插件（Plugin）**：

- Loader是用于特定的模块类型进行转换；
- Plugin可以用于执行更加广泛的任务，比如打包优化、资源管理、环境变量注入等；



**CleanWebpackPlugin**：

- 每一次修改配置，重新打包时，都需要手动删除dist文件夹
	- 借助CleanWebpackPlugin解决

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');  


plugins:[
        new CleanWebpackPlugin()
    ],
```



**HtmlWebpackPlugin**：

- 目前不规范的地方：
	- HTML文件是编写根目录下的，而最终打包的dist文件夹是没有index.html文件的。
	- 在进行项目部署时，必然也需要有对应的入口文件index.html;
	- 需要对index.html进行打包处理；
- 使用插件HtmlWebpackPlugin

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');


   plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'aaa'
        })
    ],
```



- 运行后发现自动在dist文件夹中生成了index.html的文件：
	- 该文件中也自动添加了我们打包的bundle.js文件；
	-  默认情况下是根据ejs的一个模板进行生成的；
	- 在html-webpack-plugin的源码中，有一个default_index.ejs模块



- 自定义HTML模板

	- 比如添加一个noscript标签，在用户的JavaScript被关闭时，给予响应的提示；

	- 比如开发vue或react项目时，需要一个可以挂载后续组件的根标签<div id = "app"></div>

	- 在配置HtmlWebpackPlugin时，可以添加如下配置：

		- template：指定我们要使用的模块所在的路径；

		- title：在进行htmlWebpackPluign.option.title读取时，就会读到该信息；

			```js
			   new HtmlWebpackPlugin({
			            title:'aaa',
			            template:"./index.html"//指定根目录下的html文件作为dist文件夹下的html文件
			        })
			```





**DefinePlugin**：

- DefinePluign允许在编译时创建配置的全局常量，是一个webpack内置的插件：

```js
const {DefinePlugin} = require('webpack');

new DefinePlugin({
            jet:"'jet6666'"//""内的语句会被当做js代码执行相当于eval();
        })


//另一个文件
console.log(jet);//jet6666
console.log(process.env.NODE_ENV);//DefinePlugin的默认配置 
```





**Mode配置**：

- Mode配置选项，可以告知webpack使用相应模式的内置优化
	- 默认值是production
	- 可选值有：'none'|'development'|'production';
- 选项的区别
	- development：会将DefinePlugin中的process.env.NODE_ENV的值设置为development，为模块和chunk启用有效的名
	- production：会将DefinePlugin中的process.env.NODE_ENV设置为production，为模块和chunk启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludeChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin和TerserPlugin。
	- none：不使用任何默认优化选项



**webpack搭建本地服务器**：

- 为了完成自动编译，webpack提供了几种可选的方式：
	- webpack watch mode；
	- webpack-dev-server（重点）
	- webpack-dev-middleware



- webpack-dev-server

```js
//安装后在package.json文件下的script选项配置
"serve": "webpack serve --config wk.config.js"
```

- webpack-dev-server在编译后不会写入到任何输出文件，而是将bundle文件保留在内存中



**模块热替换（HMR）**：

- HMR
	- 全称为 Hot Module Replacement，模块热替换；
	- 其指在应用程序运行过程中，替换、添加、删除模块，而无需重新刷新整个页面；
- HMR通过如下方法提高开发速度：
	- 不重新加载整个页面，这样可以保留某些应用程序的状态不丢失；
	- 只更新需要变化的内容，节省开发时间；
	- 修改了css、js源代码，会立即在浏览器更新，相当于直接在浏览器的devtool中直接修改样式；
- 如何使用
	- 默认情况下，webpack-dev-server已经支持HMR，我们只需开启即可（默认已经开启）
	- 在不开启HMR情况下，当我们修改了源代码之后，整个页面会自动刷新，使用的live reloading

```js
//配置文件内
    devServer:{
        hot:true
    }

//浏览器内看到[HMR] Waiting for update signal from WDS...
```

- 但发现修改某个模块后依然会刷新整个页面

	- 原因是要去指定哪些模块发生更新时，进行HMR; 

		```js
		if(module.hot){
		    module.hot.accept("./util.js",()=>{
		        clg("aaaa");` `
		    })
		}
		```



- 在框架中HMR是自动开启的不需要手动操作API





**devServer配置**：

```js
    devServer:{
        hot:true,
        host:"0.0.0.0",
        port:8888,
        open:true,
        compress:true
        //...
    }
```

