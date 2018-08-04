import {renderComponent} from '../react-dom/render'
class Component {
    constructor (props={}) {
        this.isReactComponent = true;
        this.state = {};
        this.props = props;
    }
    setState(stateChange) {
        // 做新的状态的更替
        Object.assign(this.state, stateChange); //基础类有的子类可以不写
        // 更新DOM
        renderComponent(this);
    }
}



export default Component;  //基础类