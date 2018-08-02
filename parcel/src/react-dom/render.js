import { setAttribute } from './dom';


function _render(vnode) {
    if (typeof vnode === 'string') {
        const textNode = document.createTextNode(vnode);
        return textNode
    }
    if(typeof vnode.tag === 'function') {  //如果tag是一个组件
        // 在jsx 标签 <Counter /> 
        // 普通标签就会来到_render
        // 不是普通， function Component
        // 实例化， 生成周期 render 方法
        // console.log(vnode);
        const component = createComponent(vnode.tag, vnode.attrs);
        setComponentProps(component, vnode.attrs);
        return component.base;
    }
        
    
    if (vnode.attrs) {
        Object.keys(vnode.attrs).forEach(key => {
            const value = vnode.attrs[key];
            // 不是简单的setAttribute 而是 onClick className { obj }
            setAttribute(dom, key, value);
            // if (key === 'className') key = 'class';
            // dom.setAttribute(key, vnode.attrs[key]);
        });
    }
    const dom = document.createElement(vnode.tag);
    vnode.children.forEach(child => render(child, dom));
    return dom;
}

function setComponentProps (component, props) {
    renderComponent(component); //渲染出来
}

export function renderComponent(component) { //既可以内用，又可以提供给外界
    let base;
    const renderer = component.render(); //
    base = _render(renderer); //转变成真实的Dom
    component.base = base; //
} 

function createComponent(component, props) { //实例化
    // console.log(component, props);
    let inst;
    if(component.prototype && component.prototype.render) {
        inst = new component(props);
    }
    return inst;
}

export function render (vnode, container) {
    return container.appendChild(_render(vnode));
}