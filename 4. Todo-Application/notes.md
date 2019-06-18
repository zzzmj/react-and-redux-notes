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

统一使用export的方式，不使用export default

## 3. 状态树的设计

前两个任务像是规矩，这个就得需要思考一下。