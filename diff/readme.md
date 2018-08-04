react上提供 createElement方法
react-dom 上提供 render方法
虚拟dom在内存
真实dom在界面上

1 jsx(react-jsx-plugin) -> vnode(createElement)->DOM(render)

2. component(render 的第三种方式。react-jsx vnode.tag function Counter) -> 标签化组件
-> Counter(extends)->Component类-> render(jsx)->reactDOM.render()

3. 响应式setState() 为了达到DOM的更新，将整个DOM片断都替换掉了。
a. 新生成整个的组件DOM树， 重新挂载 100行DOM html
b. 只将setState关联的那一小段DOM,在原来的DOM的基础做一下修改， 将修改反映到DOM上，1行
n:1 html树，DOM开销是一般计算开销的100-1000倍
重绘： replaceChild
重排

React DOM diff 算法
需求是： 减少DOM操作

setState 对应的DOM 部分
setState 返回一个新的vnode -> 跟旧的DOM 对比
将新的内存 (虚拟) DOM 旧的DOM 对比？ 
都是一颗树， 采用算法， 就可以比较出差异点， 在相差的地方 进行真实DOM的操作
