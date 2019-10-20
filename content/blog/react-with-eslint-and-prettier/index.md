---
title: React 项目中集成 eslint 与 prettier
date: "2019-10-20"
description: An introduction of building a react project with eslint and prettier integration.
---

An introduction of building a react project with eslint and prettier integration.

## Eslint

目标：检验代码、保证代码的一致性，避免错误。

作用：提供了 ECMAScript 规范的代码校验，我们可以使用开源的配置方案，这里采用的是 `eslint-config-airbnb` 。

使用的几个插件：

- eslint-plugin-import 校验 import/export 语法，防止错误拼写文件路径和导出名称
- eslint-plugin-jsx-a11y 提供 jsx 元素可访问性校验
- eslint-plugin-react 校验 react
- eslint-plugin-react-hooks 根据 Hooks API 校验 Hooks 的使用

  ./node_muodules/bin/eslint --init

根据项目的需求，选择相应的配置，执行完毕后根目录下会多一个 `./eslintrc.js` 文件。

可以在此文件中声明你想要的规则。

Eslint 在配置中有一个 extends 的配置项，作用是将其他人写好的规则集成到 eslint 中，后面的规则优先级大于前面的规则。

例如：

```js
// .eslintrc.js
'extends': ['react-app', 'airbnb', 'plugin:prettier/recommended']
```

这三个规则的优先级就是 prettier > airbnb > react-app，以此类推。

## Prettier

用途：统一代码风格。

使用的插件：

- eslint-config-prettier
- eslint-plugin-prettier

在 extends 中配置 `plugin:prettier/recommended` 相当于同时配置了

```js
  'extends': ['prettier'],
  'plugins': ['prettier'],
  'rules': { 'prettier/prettier': 'error' }
```

## 提交时校验代码

- husky 处理 pre-commit、pre-push 等 githooks 的工具
- lint-staged 对 git 暂存区的代码，运行 linters 的工具
- commitlint 对提交信息进行规范约束

安装与参考配置：

```shell
yarn add --dev husky lint-staged @commitlint/cli @commitlint/config-conventional
```

```js
// commitlint.config.js
module.exports = { extends: ['@commitlint/config-conventional'] }
```

`@commitlint/config-conventional` 是遵从 angular 团队规范的 commit spec。

```json
// package.json
{
	...
	"husky": {
		"hooks": {
			"pre-commit": "lint-staged",
			"commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
		}
	},
	"lint-staged": {
		"src/*.{js, jsx, ts,tsx}": [
			"node_modules/.bin/prettier --write",
			"node_modules/.bin/eslint --fix",
			"git add"
		],
		"src/*.{css, scss, less, json, html, md, markdown}": [
			"node_modules/.bin/prettier --write",
			"git add"
		]
	}
	...
}
```

### 参考

[如何在 React 项目中整合 Eslint 和 Prettier](https://juejin.im/post/5d7b9863e51d456212049214)

[react 配置 eslint+airbnb+Prettier](https://juejin.im/post/5d3da1556fb9a07ed6581b82)

[优雅的提交你的 Git Commit Message](https://juejin.im/post/5afc5242f265da0b7f44bee4)
