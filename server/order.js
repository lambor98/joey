let getcoll = require("../db");

function msg(code,txt,data){
    let info ={
        code,
        txt,
        data
    }
    return  info;
}
module.exports = {

    //提交订单
    submitOrder(req,res){
        let data = req.body
        getcoll("order").insert(data,(err,info)=>{
            if(!err){
                res.json(msg(200,'提交成功'))
            }else{
                res.json(msg(500,'提交失败'))
            }
        })
    }
}
