import React from 'react';
// react 模板, react-dom
import ReactDOM from 'react-dom';
import './index.css'; //一切皆可打包
import App from './App';
// import registerServiceWorker from './registerServiceWorker'; //接收浏览器端

// ReactDOM 渲染组件
ReactDOM.render(<App />, document.getElementById('root')); //做组件式开发
// registerServiceWorker();
