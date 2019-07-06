---
title: exploring npm
date: "2019-07-05"
description: npm 是目前最流行的 Node 包管理工具，在 javaScript 项目开发中得到了广泛使用。
---

npm 是目前默认的 Node 包管理工具，在 javaScript 项目开发中得到了广泛使用。



## node_modules

npm 使用 `npm install` 命令安装模块到`node_modules` 目录下。

```shell
npm install <packageName>
```

> `node_modules` 路径查找机制：默认情况下，模块查找对应的依赖包时，`nodejs` 会尝试从当前模块所在的目录开始，尝试在它的  `node_modules` 文件夹里加载相应的模块，如果没有找到，那么就再向上一级目录移动，直到到达全局安装路径中的 `node_modules` 为止。

### npm 5.x 安装组织 node_modules

* 扁平化安装

  按照 `package.json` 里依赖的顺序依次解析，遇到新的包就将其安装在第一级目录，后续安装时如果遇到一级目录已经存在的包，会按照约定版本进行判断。如果符合版本约定就会忽略，否则会将其依次安装在依赖包的目录下。

* 增加了 `package-lock.json` 文件

  用以精确描述 `node_modules` 目录下所有的包的树状依赖结构，每个包的版本号都是完全精确的。

  ```json
  "glob": {
    "version": "7.1.3",
    "resolved": "https://registry.npmjs.org/glob/-/glob-7.1.3.tgz",
    "integrity": "sha512-vcfuiIxogLV4DlGBHIUOwI0IbrJ8HWPc4MU7HzviGeNho/UJDfi6B5p3sHeWIQ0KGIU0Jpxi5ZHxemQfLkkAwQ==",
    "requires": {
      "fs.realpath": "^1.0.0",
      "inflight": "^1.0.4",
      "inherits": "2",
      "minimatch": "^3.0.4",
      "once": "^1.3.0",
      "path-is-absolute": "^1.0.0"
    }
  }
  ```

  以 `glob` 为例，`package-lock.json` 主要由以下几个字段进行描述：

  * `version` 包唯一的版本号
  * `resolved` 安装源
  * `integrity` hash 值，表明包的完整性，用来验证包是否已经失效
  * `dev` 如果为true，则此依赖关系仅是顶级模块的开发依赖关系或者是一个的传递依赖关系
  * `requires` 该依赖包所需要的依赖项



## 依赖包

### 依赖包的分类

* **dependencies** 业务依赖

  依赖项属于线上的一部分，例如 `react`、`material-ui` 等等，供生产环境使用。

  ```shell
  npm [install|-i] <packageName> [--save|-S]
  ```

  > npm 5.x 之后，直接执行 `npm i <packageName>` 即可

* **devDependencies** 开发依赖

  依赖项只在项目开发时需要，不属于线上代码的一部分，例如 `webpack`、`babel` 等等

  ```shell
  npm [install|-i] <packageName> [--save-dev|-D]
  ```

* peerDependencies 同伴依赖

  提示宿主环境安装插件在 `peerDependencies` 中指定依赖的包。

* bundledDependencies / bundleDependencies 打包依赖

  这种依赖跟 `npm pack` 打包命令相关，必须先在前两种依赖中声明。

* optionalDependencies 可选依赖



### 依赖包的版本号

采用 [semver](https://semver.org/lang/zh-CN/) 规范作为依赖版本管理方案，格式一般为：**主版本号.次版本号.修订号(x.y.z)**

* 主版本号 major version

  可能是颠覆性的改动，导致可能会与低版本的 API 或者用法不兼容。

* 次版本号 minor version

  改动通常兼容同一个大版本内的 API 和用法。

  > 如果大版本号是 0，表示处于开发初始阶段，一切都可能被改变。

* 修订号 patch

  一般用于修复 bug 和细微的变更，通常要保持向前兼容。

常见的版本格式：

* ''1.2.3'' 精确版本号

* "^1.2.3" ^ 能够兼容除了最左侧非 0 版本号之外的其他变化

* "~1.2.3" ~ 如果列出了次版本号，那么只兼容补丁的修改；如果没有列出次版本号，那么兼容 2、3 位的修改

* "1.x"、"1.X"、"1.*"、"1"、"\*"

  > "\*" 、"x" 或者 （空） 表示可以匹配任何版本。 
  >
  >  "1.x", "1.\*" 和 "1" 表示匹配主版本号为 "1" 的所有版本，因此等价于 ">= 1.0.0 < 2.0.0"。 
  >
  >  "1.2.x", "1.2.\*" 和 "1.2" 表示匹配版本号以 "1.2" 开头的所有版本，因此等价于 ">= 1.2.0 < 1.3.0"。

* 带预发布关键词的版本号

  > alpha(α)：预览版，或者叫内部测试版；一般不向外部发布，会有很多bug；一般只有测试人员使用。  beta(β)：测试版，或者叫公开测试版；这个阶段的版本会一直加入新的功能；在alpha版之后推出。  rc(release candidate)：最终测试版本；可能成为最终产品的候选版本，如果未出现问题则可发布成为正式版本。



### 依赖包的版本管理

```shell
# 更新某模块主版本下的最新版本
npm install <packageName>

# 更新到指定版本号
npm install <packageName@x.x.x>

# 卸载某个模块
npm uninstall <packageName>
```

> 升级和卸载依赖包时，尽量通过命令实现，避免手动修改 `package.json` 中的版本号，**一定不要手动修改 `package-lock.json`**



## npm scripts 脚本

npm 可以在 `package.json` 文件中，使用 `scripts` 字段定义脚本命令。

```json
{
  "scripts": {
    "build": "node build.js"
  }
}
```

### 基本原理

每次执行 `npm run` 时，会自动新建一个 Shell，在这个 Shell 中执行指定的脚本命令。

> `npm run`  新建的 Shell，会将当前目录中的 node_modules/.bin 子目录加入 `PATH` 变量中，执行结束后再将 `PATH` 变量恢复原样。

因此，当前目录的 `node_modules/.bin` 子目录中的所有脚本，都可以直接使用脚本名调用，而不需要加上路径。

> `PATH`环境变量，是告诉系统，当要求系统运行一个程序而没有告诉它程序所在的完整路径时，系统除了在当前目录下面寻找此程序外，还应到哪些目录下去寻找。



### 传参

除了第一个可执行的命令，以空格分割的任何字符串（除了一些 shell 的语法）都是参数，并且都能通过`process.argv` 属性访问。

> process.argv属性返回一个数组，这个数组包含了启动node进程时的命令行参数。第一个元素为启动node 进程的可执行文件的绝对路径名[process.execPath](https://link.juejin.im?target=http%3A%2F%2Fnodejs.cn%2Fapi%2Fprocess.html%23process_process_execpath)，第二个元素为当前执行的JavaScript文件路径。剩余的元素为其他命令行参数。

```shell
npm run serve --params     # 参数params将转化成process.env.npm_config_params = true
npm run serve --params=123 # 参数params将转化成process.env.npm_config_params = 123
npm run serve -params      # 等同于--params参数

npm run serve -- --params  # 将--params参数添加到process.env.argv数组中
npm run serve params       # 将params参数添加到process.env.argv数组中
npm run serve -- params    # 将params参数添加到process.env.argv数组中
```



### 通配符

npm 脚本即 Shell 脚本，所以可以使用 Shell 通配符。

```shell
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

`*` 表示任意文件名，`**` 表示任意一层子目录。



### 多命令运行

#### 串行执行

```shell
npm run script1 && npm run script2
```

> 只要一个命令执行失败，则整个脚本终止。



#### 并行执行

多个任务可以同时的平行执行，使用 `&` 符号来连接。

```shell
npm run script1 & npm run script2
```



### env 环境变量

执行 `npm scripts` 时，`npm` 会设置一些特殊的 `env` 环境变量。`package.json` 中的所有字段都会被设置为以 `npm_package_` 开头的环境变量。例如使用 ```process.env.npm_package_name``` 可以获取到 `package.json` 中 `name` 字段的值。```process.env.npm_lifecycle_event``` 表示当前正在运行的脚本名称。

> 这些环境变量都只能在 npm run 的脚本执行环境内拿到。



### 指令钩子

npm 脚本有 `pre` 和 `post` 两个钩子。例如：`build` 脚本命令的钩子就是 `prebuild` 和 `postbuild`。

在执行  `npm run build` 命令时，就会依次执行 `npm run prebuild`、`npm run build`、`npm run postbuild`。

可以结合 `process.env.npm_lifecycle_event` 一起使用。



## npm 配置项

### 优先级

1. Command Line

2. env 环境变量

3. npmrc 文件

   * 项目级

     只作用在本项目下，其他项目中不生效。

   * 用户级

     `~/.npmrc`  使用 `npm config get userconfig` 可以查看存放的路径。

   * 全局级

     `$PREFIX/etc/npmrc` 使用 `npm config get globalconfig` 可以查看存放的路径。



### npm config 指令

* set

```shell
# 如果 key 不存在，那么会将新增到配置中；如果省略 value，那么会将 key 设置为 true
npm config set <key> <value> [-g|--global]

# 指定 npm 包来源
npm config set registry <url>
```

* get

```shell
npm config get <key>
```

* delete

```shell
npm config delete <key> # 不能删除项目级的 .npmrc 文件里的配置项
```

* list

```shell
npm config list [-l|--json] # 查看所有配置项
```

* edit

```shell
npm config edit [-g|--global] # 编辑器中打开配置文件
```

更多默认配置参见[npm config](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Fmisc%2Fconfig)



## npm 工程管理

### 项目版本号管理

`package.json` 中的 `version` 字段代表的是该项目的版本号。

尽量使用 `npm version` 指令来自动更新 `version`

```shell
npm version (v)1.2.3  # 显示设置版本号为 1.2.3 
npm version major  # 大版本号加 1，其余版本号归 0
npm version minor  # 小版本号加 1，修订号归 0
npm version patch  # 修订号加 1
```



还可以创建预发布版本：

```shell
# 当前版本号为 1.2.3
npm version prepatch  # 版本号变为 1.2.4-0，也就是 1.2.4 版本的第一个预发布版本
npm version preminor  # 版本号变为 1.3.0-0，也就是 1.3.0 版本的第一个预发布版本
npm version premajor  # 版本号变为 2.0.0-0，也就是 2.0.0 版本的第一个预发布版本
npm version prerelease  # 版本号变为 2.0.0-1，也就是使预发布版本号加一
```



**在 git 环境中，执行 npm version 修改版本号之后，还会默认执行 git add -> git commit -> git tag 操作**

其 commit message 默认是自动修改完成的版本号，可以通过添加 -m/—message 选项来自定义 commit message：

```shell
npm version minor -m "feat(version): upgrade to %s for reasons" # %s 会自动替换为新版本号
```

如果不想在 git 仓库中打上版本 tag，可以在指令中使用 `--no-git-tag-version`

如果想默认不影响 git 仓库，可以在 npm 设置中禁止：

```shell
npm config set git-tag-version false # 不自动打 tag
npm config set commit-hooks false    # 不自动 commit
```



### 域级包管理

`package.json` 中的依赖有两种形式：

```json
"devDependencies": {
  "@commitlint/cli": "^7.2.1",
  "commitizen": "^3.0.4"
}
```

以 `@` 开头的包名，是一个[域级包](https://docs.npmjs.com/misc/scope#publishing-public-scoped-packages-to-the-public-npm-registry)，作用是将一些 packages 集中在一个命名空间下，一方面可以集中管理，另一方面也可以防止与其他依赖包产生命名冲突。



#### 域级包的发布

* 在项目的 package.json 的 name 属性中添加 scope 相关的声明，可以通过指令添加：

```shell
npm init --scope=scopeName -y
```

package.json 变为：

```json
{
  "name": "@scopeName/package"
}
```

* 由于用 `@` 声明了该包，npm 会将其认定为私有包，而在 npm 上托管私有包需要收费，所以可以在发布时添加`--access=public` 参数告知 `npm` 这不是私有包。

```shell
npm publish --access=public
```

> 安装域级包时需要按照域级包全名来安装。



## 其它

### 模块全局化

假设你在开发一个模块 `A`，同时需要在另外一个项目 `B` 中测试它，当然你可以将该模块的代码拷贝到需要使用它的项目中，但这也不是理想的方法，可以在模块 `A` 的目录下执行：

```shell
npm link
```

`npm link` 命令通过链接目录和可执行文件，实现任意位置的`npm`包命令的全局可执行。

`npm link` 主要做了两件事：

1. 为目标 `npm` 模块创建软链接，将其链接到全局 `node` 模块安装路径 `/usr/local/lib/node_modules/`
2. 为目标 `npm `模块的可执行 `bin` 文件创建软链接，将其链接到全局 `node` 命令安装路径 `/usr/local/bin/`



### 依赖锁定

`npm` 默认安装模块时，会通过脱字符 `^` 来限定所安装模块的主版本号。可以配置 `npm` 通过波浪符 `~` 来限定安装模块版本号：

```shell
npm config set save-prefix="~"
```

也可以配置仅安装精确版本号的模块

```shell
npm config set save-exact true
```



### 参考

* [前端工程化（5）：你所需要的npm知识储备都在这了](https://juejin.im/post/5d08d3d3f265da1b7e103a4d)

* [npm 模块安装机制简介](http://www.ruanyifeng.com/blog/2016/01/npm-install.html)
* [npm scripts 使用指南](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)