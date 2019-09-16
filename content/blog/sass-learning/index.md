---
title: sass 概述
date: "2019-09-16"
description: sass 是现在非常流行的 css 预处理器，本文介绍了一些 sass 的基础用法。
---

sass 是现在非常流行的 css 预处理器，本文介绍了一些 sass 的基础用法。

## 使用变量

sass 使用`$`来标识变量。比如 `$basic-border: 1px solid black;`

变量可以在 css 规则块定义之外存在。如果变量定义在块内，就只能在块内使用。

```scss
  $red-color: red;
  .nav {
    $nav-width: 100px;
    width: $nav-width;
    color: $red-color;
  }
```

sass 中声明变量时，也可以引用其他变量

```scss
  $highlight-color: #777;
  $highlight-border: 1px solid $highlight-color;
  .highlight {
    border: $highlight-border;
  }
```

## 嵌套 css

例如：

```scss
  .article {
    .title {
      font-size: 20px;
    }

    .body {
      color: black;

      .quote {
        color: #777;
      }
    }
  }
```

这样避免了既重复写选择器，又使得样式的可读性变得更高。

### 父选择器标识符 &

一般情况下，sass 会在解开一个嵌套规则时，将父选择器通过一个空格连接到子选择器的前面。但这种方式在写`:hover`这样的伪类时便不能达到想要的效果。

解决方法是使用父选择器标识符`&`。当包含父选择器标识符的嵌套规则被打开时，它不会像后代选择器那样进行拼接，而是`&`被父选择器直接替换.

```scss
  a {
    color: blue;
    &:hover {
      color: red;
    }
  }

  /*编译后*/
  a { color: blue;}
  a:hover { color: red;}
```

父选择器标识符还可以用于在父选择器之前添加选择器。

```scss
  .select {
    color: red;
    body & {
      color: blue;
    }
  }

  /*编译后*/
  .select { color: red; }
  body .select { color: green; }
```

### 群组选择器嵌套

```scss
  .container {
    h1, h2, h3 {
      margin: 0;
    }
  }
  /*编译后*/
  .container h1, .container h2, .container h3 {
    margin: 0;
  }
```

### >、+ 和 ~ 子组合选择器和同层组合选择器

* `>` 选择一个元素下紧跟的直接子元素
* `+` 选择一个元素后面紧跟的同层指定元素
* `~` 选择一个元素后所有的同层指定元素

### 嵌套属性

规则是：把属性名从中划线`-`的地方断开，在根属性后边添加一个冒号`:`，紧跟一个`{ }`块，把子属性部分写在这个`{ }`块中。

```scss
  item {
    border: {
      style: solid;
      width: 1px;
      color: #777;
    }
  }
```

## 导入 sass 文件

1. 使用 sass 部分文件
  sass 局部文件的文件名以下划线开头。这样，sass 就不会在编译时单独编译这个文件输出 css，而只把这个文件用作导入。比如要导入一个`_night-sky.scss`的文件，只需要在样式表中写`@import 'night-sky'`。

2. 默认变量值
  一般情况下，你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。
  使用 sass 的`!default`标签可以设置变量的默认值，如果该变量被声明赋值了就使用声明的值，否则使用默认值。

    ```scss
      $fancy-width: 400px !default;
      .fancy {
        width: $fancy-width;
      }
    ```

3. 嵌套导入
  跟原生的 css 不同，sass 允许`@import`命令写在 css 规则内。这种导入方式下，生成对应的 css 文件时，局部文件会被直接插入到 css 规则内导入它的地方。

4. 原生的 css 导入

## 注释

sass 另外提供了一种不同于 css 标准注释格式`/* ... */`的注释语法，即静默注释，其内容不会出现在生成的 css 文件中。静默注释的语法跟 JavaScript、Java 等类 C 的语言中单行注释的语法相同，它们以`//`开头，注释内容直到行末。

```scss
  body {
    color: #333; // 这种注释内容不会出现在生成的css文件中
    padding: 0; /* 这种注释内容会出现在生成的css文件中 */
  }
```

## 混合器

> 通过 sass 的混合器实现大段样式的重用。

混合器使用`@mixin`标识符定义，这个标识符给一大段样式赋予一个名字，这样就可以通过引用这个名字重用这段样式。

```scss
  @mixin rounded-corners {
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
  }
```

然后就可以在样式表中通过`@include`来使用这个混合器，`@include`调用会把混合器中的所有样式提取出来放在`@include`被调用的地方。

```scss
  .notice {
    background-color:green;
    @include rounded-corners;
  }
```

1. 是否使用混合器
  判断一组属性是否应该组合成一个混合器，一条经验法则就是能否为这个混合器想出一个好的名字。。。

2. 混合器中的 css 规则
  混合器中除了可以包含属性，还可以包含 css 规则。

3. 混合器的传参
  混合器并不一定总得生成相同的样式。可以通过在`@include`混合器时给混合器传参，来定制混合器生成的精确样式。

    ```scss
      @mixin link-colors($normal, $hover, $visited) {
        color: $normal;
        &:hover { color: $hover; }
        &:visited { color: $visited; }
      }

      a {
        @include link-colors(blue, red, green);
      }
    ```

    sass允许通过语法`$name: value`的形式指定每个参数的值。

    ```scss
      a {
        @include link-colors(
          $normal: blue;
          $hover: red;
          $visited: green;
        )
      }
    ```

4. 默认参数
  为了在`@include`混合器时不必传入所有的参数，我们可以给参数指定一个默认值。参数默认值使用`$name: default-value`的声明形式，默认值可以是任何有效的 css 属性值，甚至是其他参数的引用。

## 选择器继承

选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式。

```scss
  //通过选择器继承继承样式
  .error {
    border: 1px red;
    background-color: #fdd;
  }
  .seriousError {
    @extend .error;
    border-width: 3px;
  }
```

