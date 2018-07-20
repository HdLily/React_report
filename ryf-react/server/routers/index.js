const router = require('koa-router')(); //返回一个路由对象
const User = require('../model/user'); //
const koaBody = require('koa-body'); 
router.get('/', async (ctx) => { //路由由函数中间件组成
    ctx.body = '首页';
});
router.get('/users', async (ctx) => {
    const user = {
        name: 'zk',
        age: 18
    }
    
});

router.post('/user', koaBody(), async (ctx) => {
    // 后端要拿到前端传来的数据 
    // console.log(ctx.request.body);
    const user = await User.build(ctx.request.body).save();
    ctx.body = user;
})

module.exports = router


