const Sequelize = require('sequelize');
// 数据库 sequelize
// koa 数据json object 对obj进行增删改查
const sequelize = new Sequelize('antd', 'root', '1234567', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: true, //该值一定要写true,否则后续使用sql会出问题,例如使用￥like模糊查询会出现invalid value问题
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false
    }
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connect has been established successfully.');
    })
    .catch(err => {
        console.log('Unable to connect to the database;', err);
    })
module.exports = sequelize