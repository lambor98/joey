/*
 * @Author: your name
 * @Date: 2020-09-27 20:29:19
 * @LastEditTime: 2020-10-13 12:26:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git项目\joey\server\order.js
 */
let getcoll = require("../db");
const { param} = require("../routes/ajax");
var ObjectID = require('mongodb').ObjectID;

function msg(code,txt,data,count){
    let info ={
        code,
        txt,
        data,
        count
    }
    return  info;
}
module.exports = {

    //提交订单
    submitOrder(req,res){
        function fill(value){
            if(value*1<10){
              return "0"+value
            }else{
              return value
            }
        }
        let obj = req.body
        obj.data.dizhi = obj.data.province+'省(市)'+obj.data.city+'市'+obj.data.area+obj.data.address
        obj.data.jiadian = obj.data.jdBrand+obj.data.jdType
        let date = new Date(obj.data.goTime)
        obj.data.shangmen =date.getFullYear()+'-'+fill((date.getMonth()+1))+'-'+fill(date.getDate())+' '+fill(date.getHours())+':'+fill(date.getMinutes())
        orderType(obj.type,obj.data);
        function orderType (type,data){
            switch(type){
                case 'insert': //插入操作
                    data.orderId= new Date().getTime()
                    data.type = 1
                    data.worker = '无'
                    getcoll("order").insert(data,(err,info)=>{
                        if(!err){
                            res.json(msg(200,'提交成功'))
                        }else{
                            res.json(msg(400,'提交失败'))
                        }
                    })
                    break;
                case 'update'://更新操纵
                    data.upTime = new Date();
                    delete data._id
                    getcoll('order').updateOne({orderId:data.orderId},{$set:{...data}},(err,info)=>{
                        if(!err){
                            res.json(msg(200,'修改成功'))
                        }else{
                            res.json(msg(400,'修改失败'));
                            throw err;
                        }
                    })

                    break;
                case 'delete'://删除操作
                    
                    getcoll('order').remove({'_id':new ObjectID(data._id)},(err,info)=>{
                       if(!err){
                            res.json(msg(200,'删除成功'))
                       }else{
                            res.json(msg(400,'出现错误'))
                           throw err;
                       }
                    })

                    break;
                default:  //查询操作
                    if(!req.session.userObj) res.json(msg(500,'未登录'));
                    let id = req.session.userObj.id;
                    let page = (data.page*1-1)*6;
                    if(data.search.orderId )data.search.orderId *=1 ;
                    if(data.search.orderId=='' )delete data.search.orderId;
                    if(data.search.type)data.search.type*=1;
                    getcoll('order').find({id,...data.search}).skip(page).sort({tjTime:-1}).limit(6).toArray((err,list)=>{
                        if(!err){
                            getcoll('order').find({id,...data.search}).sort({tjTime:-1}).count({},(err,count)=>{
                                if(!err){
                                    res.json(msg(200,'查询成功',list,count))
                                }else throw err;
                            })
                        }else{
                            res.json(msg(400,'出现错误'));
                            throw err;
                        }
                    })
                    break;
            }
        }
       
    },
  

}
