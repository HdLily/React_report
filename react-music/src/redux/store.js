// 1. store 单一状态树
// createStore 单一状态树
// reducer 消消乐 从reduce概念而来 = state + mutation 可以接受外部的 纯函数
import { createStore } from 'redux';
import reducer from './reducers';

const store = createStore(reducer);
export default store;
