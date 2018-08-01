import React, { Component } from 'react';
// Provider作为一个容器组件，用来接受Store并且让Store对子组件可用 将store提供给App 
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from './App';

class Root extends Component {
    render () {
        return ( //此时<Provider>里面的子组件<App /> 才可以使用connect方法关联store.
            
            <Provider store={store}>
                <App />  
            </Provider>
        )
    }
}
export default Root