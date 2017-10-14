vue解放了对DOM的操作，极大地便利了开发。因此把自己练习的vue页面晒出来，有需要的小伙伴可以git clone,和提issue，共同进步。
# 饿了么商家页面点餐系统
技术栈：vue2.0+vue-router+axios+webpack+es6+better-scroll
## 构建
---
vue-cli,so convenient，推荐对vue有一定了解的同学使用，作用如下。  
* 清晰化目录结构  
* 本地调试
* 代码部署
* 热加载
* 单元测试
## 开发
  vue很好的展现了组件化的特点。能够将模块一个一个的封装起来，方便维护，也方便复用。
### vue-axios
　　在看视频的时候，他使用的是vue-resouce,但我将其获取方式用成了vue-axios.因为vue2.0之后，就不再对vue-resource更新，而是推荐使用axios。基于 Promise 的 HTTP 请求客户端，可同时在浏览器和 Node.js 中使用。值得注意的是**接口返回的res并不直接是返回的数据，而是经过axios本身处理过的json对象。真正的数据在res.data里**
附上[vue-axios中文文档](https://segmentfault.com/a/1190000008470355?utm_source=tuicool&utm_medium=referral#articleHeader1>)
### vue-router
用其来创建单页面应用，是非常简单的。用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 vue-router 添加进来，我们需要做的是，将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们
### better-scroll
项目中用了大量的better-scroll方法，值得注意的地方是在获得数据或者数据改动的时候，要在nextTick里执行。附上[git地址](https://github.com/ustbhuangyi/better-scroll)
## sass
个人更喜欢用sass,真心不习惯没有花括号和分号
### vue1.0和vue2.0改动地方
   * 元素和组件v-el变成ref
   * 组件间$broadcast、$dispatch变成$emit、$on
   * 过渡方法由原来的写在元素里面变成了包裹在元素外面
       ```html 
       //1.0
       <div transition></div>
       //2.0
       <transition><div><div></transition>
       ```
## 项目成果

![goods](https://github.com/brightMoonMoon/Vue2.0_Sell_ElemePage/raw/master/static/sell-finish-img/goods.png)
![ratings](https://github.com/brightMoonMoon/Vue2.0_Sell_ElemePage/raw/master/static/sell-finish-img/ratings.png)
![seller](https://github.com/brightMoonMoon/Vue2.0_Sell_ElemePage/raw/master/static/sell-finish-img/seller.png)
===
最后附上非常好的学习vue的blog[技术胖](http://jspang.com/)
