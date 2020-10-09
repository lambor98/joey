let mc= require("mongodb").MongoClient;
let {host,port,dbname} = require("../config").db;
//获取配置文件中db的值;
let db = null;

mc.connect(`mongodb://${host}:${port}`,(err,client)=>{
    if(!err){
        console.log("登入成功");
        db =client.db(dbname)
    }else{
        console.log("数据库连接失败");
    }
})

module.exports = (collName)=>{
    return db.collection(collName);
}
