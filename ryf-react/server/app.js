const Koa = require('koa');
const cors = require('koa-cors'); //解决跨域问题
const router = require('./routers/index'); 
// 创建一个Koa对象表示Web app本身
const app = new Koa(); //k大写 表示一个类 作为管家,接管应用 


// ctx 上下文环境
// 组件， 中间件: middleware 在后端和服务器之间，为用户提供服务
// const main = ctx => { //
//     ctx.response.body = 'Hello World' //返回响应的信息
// }

// app.use(main); //挂载: app.use 用户通过url来访问
app.use(cors()); //解决跨域问题
    // {
//     origin: 'http://localhost:3000',
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authenticate'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST'],
//     allowMethods: ['Content-Type','Authorization', 'Accept']
// })) //允许跨域访问

app.use(async(ctx, next) => {
    console.log(ctx.request.path + ':' + ctx.request.method);
    await next();
})
app.use(router.routes())
app.listen(3006) // 运行起来
console.log('app started at port 3006...');
