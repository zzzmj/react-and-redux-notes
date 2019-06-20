## 1. React组件访问服务器

代理功能访问API，在package.json中添加上
```js
"proxy": "http://www.weather.com.cn/",
```

访问天气接口
```js
import React from 'react';

//TODO: change to your city code according to http://www.weather.com.cn/
const cityCode = 101010100;

class Weather extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {weather: null};
  }

  componentDidMount() {
    const apiUrl = `/data/cityinfo/${cityCode}.html`;
    fetch(apiUrl).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }

      response.json().then((responseJson) => {
        this.setState({weather: responseJson.weatherinfo});
      }).catch((error) => {
          console.log('错误')
        this.setState({weather: null});
      });
    }).catch((error) => {
        console.log('xx')
      this.setState({weather: null});
    });
  }

  render() {
    if (!this.state.weather) {
      return <div>暂无数据</div>;
    }

    const {city, weather, temp1, temp2} = this.state.weather;

    return (
      <div>
        {city} {weather} 最低气温 {temp1} 最高气温 {temp2}
      </div>
    )
  }
}

export default Weather;
```

访问失败了。拷的程墨老师的源码。

## 2. Redux通信

显然将状态交给组件管理不好，将状态交给Redux管理是更好的办法

但Redux的数据流是同步操作，驱动Redux流程的是action对象，每一
个action对象被派发到Store上之后，同步地被分配给所有的reducer函数，每
个reducer都是纯函数，纯函数不产生任何副作用，自然是完成数据操作之后
立刻同步返回，reducer返回的结果又被同步地拿去更新Store上的状态数
据，更新状态数据的操作会立刻被同步给监听Store状态改变的函数，从而
引发作为视图的React组件更新过程。

整个过程Redux马不停蹄的同步执行，那应该在哪里插入访问服务器的异步操作呢？

这个时候我们用到一个中间件`redux-thunk`

**thunk是一个计算机编程的术语，表示辅助调用另一个子程序的子程序**

![](http://ww1.sinaimg.cn/large/006PpBLoly1g4328g1vdpj31bw0ksgp9.jpg)

从图中我们可以看到，在action到达store的途中，如果存在中间件，是要经过中间件的。

redux-thunk的工作是检查action对象是不是函数
- 如果不是函数就放行，完成普通action对象的生命周期，而
- 如果发现action对象是函数，那就执行这个函数，并把Store的dispatch函数和getState函数作为参数传递到函数中去，处理过程到此为止，不会让这个异步action对象继续往前派发到reducer函数。

举例
```js
// 一个增加1的action
const increment = () => ({  
    type: ActionTypes.INCREMENT,
})

// 1秒后执行增加1的action，这是个异步操作
const incrementAsync = () => {  
    return (dispatch) => {    
        setTimeout(() => {      
            dispatch(increment());    
        }, 1000);
    };
};
```

因为incrementAsync返回的是一个新函数，被dispatch函数派发之后，会被redux-thunk中间件执行，于是setTimeout函数就会发生作用，在1秒之后利用参数dispatch函数派发出同步action构造函数increment的结果。

**这就是异步action的工作原理**


中间件的详细原理请看第九章