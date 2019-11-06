---
title: React 中的条件渲染
date: "2019-11-06"
description: React 中组件条件渲染的几种方式小结
---

什么是 React 中的条件渲染？

一个组件根据一个或多个条件决定其要返回（渲染）的元素。

## if Else
```jsx
function List({ list }) {
  if (!list) {
    return null
  }

  if (!list.length) {
    return <p>Sorry, the list is empty.</p>
  } else {
    return (
      <div>
        {list.map(item => <ListItem item={item} />)}
      </div>
    )
  }
}
```
可以使用 if 表达式在渲染中提前 return。

## 三目运算符（Ternary Operation）

`condition ? expr1 : expr2`
```jsx
function Item({ item, mode }) {
  const isEditable = mode === 'EDIT'

  return (
    <div>
      {isEditable ? (
        <ItemEdit item={item} />
      ) : (
        <ItemView item={item} />
      )}
    </div>
  )
}
```
使用三目运算符比 if-else 表达式更加简洁明了。

## 逻辑与（&&）运算符

当我们想要根据条件决定是否渲染一个元素时，逻辑与运算符使得那些返回 null 的逻辑书写更加简洁。

在 JavaScript 中，`true && 'Hello World'` 相当于 `'Hello World'`；`false && 'Hello World'` 相当于 `false`。也即，当条件表达式为真，逻辑与`&&` 后面的操作符会成为输出；当条件表达式为假，React 则会忽略并跳过该表达式。
```jsx
function LoadingIndicator({ isLoading }) {
  return (
    <div>
      { isLoading && <p>Loading...</p> }
    </div>
  )
}
```
## Switch Case 操作符

适用于有多个条件渲染时。
```jsx
function Notification({ text, state }) {
  switch(state) {
    case 'info':
      return <Info text={text} />
    case 'warning':
      return ...
    case 'error':
      return ...
    default:
      return null
```
不推荐这种方式，用下面的枚举的方式替代。

## 枚举（enums）
```jsx
const getSpecificNotification = (text) => ({
  info: <Info text={text} />,
  warning: <Warning text={text} />,
  error: <Error text={text} />,
});
function Notification({ state, text }) {
  return (
    <div>
      {getSpecificNotification(text)[state]}
    </div>
  );
}

function FooBarOrFooOrBar({ isFoo, isBar }) {
  const key = `${isFoo}-${isBar}`;
  return (
    <div>
      {{
        ['true-true']: <FooBar />,
        ['true-false']: <Foo />,
        ['false-true']: <Bar />,
        ['false-false']: null,
      }[key]}
    </div>
  );
}

FooBarOrFooOrBar.propTypes = {
  isFoo: React.PropTypes.boolean.isRequired,
  isBar: React.PropTypes.boolean.isRequired,
}
```
## 嵌套条件渲染

尽量避免

可以使用之前的几种方式，但最好是将其拆分成几个更小的自己根据条件渲染的组件。

## 高阶组件（HOC）
```jsx
// HOC declaration
function withLoadingIndicator(Component) {
  return function EnhancedComponent({ isLoading, ...props }) {
    if (!isLoading) {
      return <Component { ...props } />;
    }
    return <div><p>Loading...</p></div>;
  };
}
// Usage
const ListWithLoadingIndicator = withLoadingIndicator(List);
<ListWithLoadingIndicator
  isLoading={props.isLoading}
  list={props.list}
/>
```
## 参考

[All React Conditional Rendering Techniques - RWieruch](https://www.robinwieruch.de/conditional-rendering-react?utm_campaign=Robin%20Wieruch%20-%20A%20Developer%27s%20Newsletter&utm_medium=email&utm_source=Revue%20newsletter)
