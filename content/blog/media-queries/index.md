---
title: 媒体查询 Media Queries
date: "2020-09-10"
description: CSS 和 JavaScript 中使用媒体查询
---

> 根据设备的大致类型以及特定参数来修改网站和应用程序

## CSS 中的 `@media`
```css
@media (max-width: 1240px) {
	body {
	  background-color: tomato;
	}
}
```

## JavaScript 中的 `matchMedia()`
> 返回一个新的   [MediaQueryList](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaQueryList) 对象，表示指定的媒体查询字符串解析后的结果。
```js
// Create a media condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(min-width: 768px)')


// Check if the media query is true
if (mediaQuery.matches) {
  // Then trigger an alert
  alert('Media Query Matched!')
}
```

* matches 只读的布尔值属性，当文档匹配当前的媒体查询内容时返回 true。

## 监听媒体查询状态变化
MediaQueryList 上有 addListener() 及与之对应的 removeListener() 方法，接受回调函数作为参数，当媒体查询状态改变时触发。
```js
// Create a condition that targets viewports at least 768px wide
const mediaQuery = window.matchMedia('(min-width: 768px)')


function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    console.log('Media Query Matched!')
  }
}

// Register event listener
mediaQuery.addListener(handleTabletChange)

// Initial check
handleTabletChange(mediaQuery)
```

## “过时”的方法
监听 window 上的 resize 事件，根据 window.innerWidth 的值作出响应。
```js
function checkMediaQuery() {
  // If the inner width of the window is greater then 768px
  if (window.innerWidth > 768) {
    // Then log this message to the console
    console.log('Media Query Matched!')
  }
}

// Add a listener for when the window resizes
window.addEventListener('resize', checkMediaQuery);
```

[Working with JavaScript Media Queries | CSS-Tricks](https://css-tricks.com/working-with-javascript-media-queries/)




