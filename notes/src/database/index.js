import Loki from 'lokijs';

// 通过 lokijs 新建一个数据库，对localStorage的封装
// db 配置，初始化，连接及数据查询
// db 句柄 代表着数据库，new 的过程得到了此数据库
// 数据库名（一个项目一个库) -> collections (table 的别称) -> rows (数据记录) -> columns (列名)
// sql 查询，典型的异步操作，用 promise 来封装。异步原因：连接数据库要时间，查询要时间，返回结果要路上的时间
export const db = new Loki('notes', { 
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 3000,
    persistenceMethod: 'localStorage'
})

function databaseInitialize() {
    // collection 数据集合（数据表）
    const notes = db.getCollection('notes');
    if (notes == null){
        db.addCollection('notes');
    }
}

export function loadCollection(collection) {
    // 加载某个数据表 --> 异步操作，用promise封装
    return new Promise((resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(collection) || db.addCollection(collection);
            resolve(_collection);
        })
    }))
}