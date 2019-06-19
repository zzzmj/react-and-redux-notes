做一个复杂一些的Todo应用。

开始一个新应用的时候，有几件事是需要考虑清楚的
1. 代码文件的组织结构
2. 确定模块的边界
3. Store的状态树设计

## 1. 代码文件的组件结构

不应该按照MVC的方式，相同类型文件放一起。

更好的做法是按功能划分

```js
todoList/  
    actions.js  
    actionTypes.js  
    index.js  
    reducer.js  
    views/    
        component.js    
        container.js
filter/  
    actions.js  
    actionTypes.js  
    index.js  
    reducer.js  
    views/    
        component.js    
        container.js
```

每个基本功能对应的其实就是一个功能模块，每个功能模块对应一个目录，这个例子中分别是todoList和filter，每个目录下包含同样名字的角色文件：
- actionTypes.js定义action类型；
- actions.js定义action构造函数，决定了这个功能模块可以接受的动作；
- reducer.js定义这个功能模块如何相应actions.js中定义的动作；
- views目录，包含这个功能模块中所有的React组件，包括傻瓜组件和容器组件；
- index.js这个文件把所有的角色导入，然后统一导出。

## 2. 模块接口

统一使用export的方式，不使用export default。

## 3. 状态树的设计

前两个任务像是规矩，这个就得需要思考一下。

设计状态树要遵循几个原则
1. 一个模块控制一个状态节点。
2. 避免冗余数据。
3. 树形结构扁平，不要把状态树写的太深。

## 4. Todo应用

Todo应用看上去有三个功能
- 待办事项的列表。
- 增加待办事项的输入框和按钮。
- 待办事项过滤器，可以选择过滤不同状态的待办事项。

好好做-。-，TodoList写起来也挺费劲的

## 5. 安装扩展

- React Devtools，可以检视React组件的树形结构
- Redux Devtools，可以检视Redux数据流，可以将Store状态跳跃到任何
一个历史状态，也就是所谓的“时间旅行”功能

除了React Devtools是浏览器自带的
其他两个扩展都需要在项目中引入

Redux Devtools用法
```js
const middlewares = []
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, {}, composeEnhancers(applyMiddleware(...middlewares)))
```
