const router = require('koa-router')(); //返回一个路由对象
const User = require('../model/user'); //
const koaBody = require('koa-body'); //用来从POST请求的数据体里面提取键值树
router.get('/', async (ctx) => { //路由由函数中间件组成，
    ctx.body = '首页';
});

router.get('/users', async (ctx, next) => {   // 第一个api接口:获取所有的用户列表
    const user = await User.findAll ({
        where: {
            isdelete: 0
        }
    })
    ctx.body = user;
}) //发送get请求



router.post('/user', koaBody(), async (ctx) => { //添加api
    // 后端要拿到前端传来的数据 
    // console.log(ctx.request.body);
    const user = await User.build(ctx.request.body).save();
    ctx.body = user;
})

router.put('/user/:id', koaBody(), async (ctx) => { //编辑用户
    const body = ctx.request.body;
    const user = await User.findById(ctx.params.id);
    await user.update({...body})
    ctx.body = user;
})

router.delete('/user/:id', async (ctx) => { // 删除用户
    const user = await User.findById(ctx.params.id).then((user) => user);
    user.isdelete = 1;
    await user.save();
    ctx.body = { success: true }
})

router.post('/user-search', koaBody(), async(ctx) => {
    const body = ctx.request.body;
    const user = await User.findAndCount({
        where: {
            isdelete: 0, username: {
                $like: `%${body.search}%`
            }
        },
        limit: body.limit,
        offset: body.offset
    });
    ctx.body = user;
})
module.exports = router


