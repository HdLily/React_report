- 使用rewire 定制webpack 工作流 scripts 目录
改了npm script
  1. stylus
  2. alias
  3. autoprefixer


  - yarn add react-router-dom 把路由对应的东西挂载到页面
  - 跨组件交流 => redux

  - 我们创建一个Redux存储区,它只能使用redux作为参数来构造.存储在Redux存储区中的数据可以被直接访问,但只能通过提供的redux进行更新.

  ### Reducers
  - Reducer用来处理Action触发的对状态的更改。
  - 所以一个reducer函数会接受oldState和action两个参数，返回一个新的state:(oldState, action) => newState.一个简单的reducer可能类似这样

  ## Store
  - 有了Action和Reducer, Store的作用就是链接这两种， store的作用有这么几个：

  1. Hold住整个应用的State状态树
  2. 提供了一个getState()方法获取State
  3. 提供了一个dispatch()方法发送action更改State
  4. 提供了一个subscribe()方法注册回调函数监听State的更改
