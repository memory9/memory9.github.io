---
title: Flexbox 布局
date: "2019-05-16"
description: Flex 是 Flexible Box 的缩写，意为弹性布局。Flex 布局适用于应用程序的组件和小规模布局。
---

Flex 是 Flexible Box 的缩写，意为弹性布局。Flex 布局适用于应用程序的组件和小规模布局。

# 基本概念

采用 Flex 布局的元素称为 flex 容器（flex container），而其子元素则称为 flex 项目（flex items）。

<!--more-->

![flex box](https://i.loli.net/2018/07/26/5b598f7be9d37.png)

容器中有两根轴，分别是主轴（main axis）和交叉轴（cross axis）。

项目默认沿着主轴排列，一个项目占据的主轴空间为 main size，占据的交叉轴空间为 cross size。

# 容器属性

* `flex-direction` 决定主轴的方向

  * row（默认值）：水平，从左到右
  * row-reverse：水平，从右往左
  * column：垂直，从上到下
  * column-reverse：垂直，从下往上

* `flex-wrap` 决定当一条轴线排不下时，如何换行

  * nowrap：不换行
  * wrap：换行，顺序从上到下
  * wrap-reverse：换行，从下往上（即第一行在下）
    ![wrap-reverse-demo](https://i.loli.net/2018/07/26/5b5995094f110.png)

* `flex-flow` 为 flex-direction 和 flex-wrap 的合并形式

  ```css
    flex-flow: <'flex-direction> || <'flex-wrap'>
  ```

  默认值是 row nowrap

* `justify-content` 定义项目在主轴上的对齐方式

  * flex-start：左对齐
  * flex-end：右对齐
  * center：居中
  * space-between：两端对齐，flex-item 之间的间距相等
  * space-around：每个 flex-item 两侧间隔相等，则项目之间的间隔是与边框间隔的两倍。

* `align-items` 定义项目在交叉轴上如何对齐

  * flex-start：交叉轴起点对齐
  * flex-end：交叉轴终点对齐
  * center：交叉轴中点对齐
  * baseline：项目的第一行文字的基线对齐
  * stretch（默认值）：项目将拉伸撑满整个容器

* `align-content` 定义多根轴线的对齐方式

  * flex-start：与交叉轴起点对齐
  * flex-end：与交叉轴终点对齐
  * center：与交叉轴的中点对齐
  * space-between：与交叉轴两端对齐，轴线之间间隔平均分布
  * space-around：每根轴线两侧的间隔都相等
  * stretch（默认值）：轴线占满整个交叉轴
    ![align-content-demo](https://i.loli.net/2018/07/27/5b5a812c5d469.png)

# 项目属性

* `order` 定义项目的排列顺序。数值越小越靠前，默认是0
* `flex-grow` 定义项目的放大比例，默认是0
* `flex-shrink` 定义项目的缩小比例，默认为1，即如果剩余空间不足，该项目将缩小
* `flex-basis` 定义项目占据的主轴空间（main size），浏览器根据该属性，计算主轴是否有多余空间。默认值是 auto
* `flex` 是 [<'flex-grow'><'flex-shrink'><'flex-basis'>] 的简写。默认值是 0 1 auto。快捷值：auto（1 1 auto）和 none（0 0 auto）
* `align-self` 允许单个项目有不同的对齐方式，可以覆盖 align-items 属性，默认值是 auto，表示继承父元素的 align-items 属性，如果没有父元素则等同于 stretch

------

参考示例：
  [骰子的布局](https://codepen.io/LandonSchropp/pen/KpzzGo)

参考来源：
  [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
  [阮一峰 Flex 布局教程：语法篇](
