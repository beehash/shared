### javascript 之探秘 This



<p style="font-size: 18px;"> javascript 中的 this 是我们常常碰到的，但是，你真的够了解它嘛？</p>

<p style="font-size: 12px;">
或许你经常会碰到一些尴尬的场面，设计程序时，因为对this不够了解，在程序设计中丢失掉原本预想的对象；<br></p>
<p style="font-size: 14px;">在程序运行中，随着代码量的增加，在运行程序时，this却指向另一个位置；<br></p>
<p style="font-size: 16px;">另外，this 也常常会出现在面试题中；</p>

让我们来揭开它的神秘面纱 👉



##### 人工GPS导航仪
<li style="font-size: 12px;">this的误解</li>
<li style="font-size: 18px;">改变this指向</li>
<li style="font-size: 14px;">绑定优先级</li>
<li style="font-size: 16px;">小例子</li>



## 1、this的误解

- 误解 1 ： 指向自身

- 误解 2 ：它的作用域


### 误解 1 : 指向自身
<p style="font-size: 16px;">
让我们来看下这道题，它真的指向自身么？<br><br>
</p>

![这张图片](https://beehash.github.io/shared/images/21.4.15.1.png)


<p style="font-size: 18px;">打印输出：3</p>
<p style="font-size: 14px;">
这里输出 3 出自 arguments.length<br><br>
你可以看见 this 并非指向自身了<br><br>
因为 arguments[0] 这个表达式已经静悄悄地改变了this的指向为 arguments对象了。 
</p>


### 误解 2：它的作用域
<p style="font-size: 16px;">
this指向的是当前对象所在的作用域。 <br><br>
</p>

![另一张图片](https://beehash.github.io/shared/images/21.4.15.3.png)


输出  `ƒ big() { [native code] }`
<p style="font-size: 18px;"> 这道题第一步就改变了 this 的指向。<br>而且输出的内容是 String 对象中的原生 big 方法。<br>因为 call 方法改变了 this 的指向为 变量 big ，是一个字符串对象。
</p>
<p style="font-size: 14px;"> 这里涉及了一个 `call` 和 `隐式绑定` 间的优先级问题。call 赢了，所以 this 绑定到了 big 这个变量上了。</p>


#### 小结


 <p style="font-size: 18px;"> 事实上，javascript 有两个作用域， 一个是 <span class="hljs-emphasis">词法作用域</span>，对象在定义的时候的作用域。<br></p>
<p style="font-size: 14px;"> 另一个是 <span class="hljs-emphasis">动态作用域</span>，所指的是对象在被使用时的作用域。<br><br></p>
<p style="font-size: 14px;">javascript 虽然是编译型语言，但是和大多数编译型语言不一样，它的执行作用域是在运行时指定的，不同的运行环境，他的执行作用域是有可能改变的。<br><br></p>
<p style="font-size: 12px">因此，this 指向问题，不能看 this 的词法作用域，而应该看它的绑定对象是谁。<br><br></p>
<p style="font-size: 16px">接下来介绍给大家的是 javascript 中的 this 是依据什么来的，先介绍javascript 绑定this的几种方式<br><br>
 </p>



## 2、 改变 this 的指向

<p style="font-size: 14px;">有多少种方式可以改变this的指向？</p>

<li style="font-size: 14px;">new 绑定</li>

<li style="font-size: 18px;">call、apply 绑定</li>

<li style="font-size: 14px;">bind 绑定</li>

<li style="font-size: 12px;">隐式绑定</li>

<li style="font-size: 16px;">默认绑定</li>


### 2.1 new 绑定
<p style="font-size: 20px">new 实例化一个函数时，经历了哪些过程？</p>

<li style="font-size: 16px;">创建一个对象object</li>
<li style="font-size: 14px;">设置原型链</li>
<li style="font-size: 12px;">让构造函数中的this指向object，并执行构造函数的方法体</li>
<li style="font-size: 18px;">返回一个对象</li>


### 2.2 call、apply

```
func.call(this, [arguments]);
func.apply(object, arguments);
```

<p style="font-size: 14px">call 、apply 方式除了用法上有一些区别外，效果都是为 func 绑定 this 执行环境，并执行函数。<br><br>
属于硬绑定，即强制改变 this 的上下文环境
</p>


### 2.3 bind 绑定

```
var function aaa () {
    resturn this.count;
}
var obj  = {
    count: 3,
};
var p = aaa.bind(obj;

p(); // 输出 3
```

<p style="font-size: 14px">与call 、apply 略有不同的是，bind 只是改变函数的 this 指向，不会执行该函数。</p>


### 2.4 隐式绑定
<p style="font-size: 14px">隐式绑定是我们常见的绑定方式。</p>

```
function test () {
  console.log(this.a);
}
var obj = {
  a: 3,
  test,
};
obj.test(); // 输出 3
```

<p style="font-size: 12px;">foo 函数中的 this 被隐式绑定到了 obj 上。实质上是运用了 apply 方式绑定到了 obj 上</p>


### 2.5 默认绑定

```
var a = 6;
```
<p style="font-size: 14px">打印输出：</p>

<li style="font-size: 18px">this.a   // 输出 6</li>

<p style="font-size: 14px">在这里默认绑定全局作用域的对象global</p>

<p style="font-size: 14px"><span class="hljs-emphasis">Note：</span>  默认绑定在 es5 严格模式下， 没有效果</p>



## 3、绑定优先级

<p style="font-size: 12px;">上述绑定改变this指向的方法也有优先级。</p>

![另二张图片](https://beehash.github.io/shared/images/21.4.15.4.png)


#### this 的依据来源
    
    在非严格模式下，正常条件下，
    在我们不直接手动调用 bind 、 call 、apply 这三种强制绑定的方式时

    javascript 有 默认绑定、隐式绑定、new 绑定来帮助我们静悄悄改变 this 的指向。

    并且这种绑定也存在优先级。这也是this的神秘之处。
    
    当只存在一种绑定情形时，this = 绑定的对象。
    当存在几种绑定情形时，this = 优先级最大的指定的绑定对象。



## 4、小例子

```
function Foo(){
 // funcI
 getName = function() {
     alert(1);
 };

 return this;
}

// funcII
Foo.getName = function() {
    alert(2);
};

// funcIII
Foo.prototype.getName = function(){
    alert(3);
};

// funcIV
var getName = function(){
    alert(4);
};

// funcV
function getName(){
    alert(5);
}
```


> 请写出以下输出结果：<!-- .element: style="font-size: 16px" -->

提示： <!-- .element: class="hljs-emphasis" style="font-size: 12px" --> 
这道题中定义了多种 getName 方法，解题关键在于分析中每一道题中的 getName 代指的哪一个. <!-- .element: style="font-size: 12px" -->

- ①　Foo.getName(); <!-- .element: style="font-size: 16px" --><br>
- ②　getName(); <!-- .element: style="font-size: 16px" --><br>
- ③　Foo().getName(); <!-- .element: style="font-size: 16px" --><br>
- ④　getName(); <!-- .element: style="font-size: 16px" --><br>
- ⑤　new Foo.getName(); <!-- .element: style="font-size: 16px" --><br>
- ⑥　new Foo().getName(); <!-- .element: style="font-size: 16px" --><br>
- ⑦　new new Foo().getName(); <!-- .element: style="font-size: 16px" --><br>


- ①　funcII <!-- .element: style="font-size: 16px;" -->
- ②　funcIV <!-- .element: style="font-size: 16px;" -->
- ③　funcI <!-- .element: style="font-size: 16px;" -->
- ④  funcI <!-- .element: style="font-size: 16px;" -->
- ⑤  Foo.getName  (funcII) ->  new () // 2   <!-- .element: style="font-size: 16px;" -->
- ⑥  new Foo() -> ().getName() (funcIII) // 3  <!-- .element: style="font-size: 16px;" -->
- ⑦  new Foo() -> new ().getName()  (funcIII) // 3  <!-- .element: style="font-size: 16px;" -->



### In the End

<p style="font-size:30px">本期分享到此结束， 想看更多内容，请访问我的博客主页 https://blog.zswindfly.top[此地址不存在]， 后期加上。</p> > _ *

