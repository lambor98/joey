const { get } = require("http");
let getcoll = require("../db");
const { sort } = require("../tool/applianceList");

function msg(code,txt,data){
    let info ={
        code,
        txt,
        data
    }
    return  info;
}

module.exports = {
     //注册
     register(req,res){
         let data = req.body;
         let {uname,pwd,tel} = data;
         let user = getcoll("user");
         let unreg=/^[a-z$_]{1}[0-9a-z$_]{5,9}$/ig;
         let pwreg=/[a-z0-9$_]{6,12}/ig;
         let flag1 =unreg.test(uname);
         let flag2 =pwreg.test(pwd);
         if(flag1 && flag2){
             user.find({uname}).toArray((err,list)=>{
                    if(list[0]){
                        res.json(msg(500,"账号已存在"))
                    }else{
                        user.find({}).sort({id:-1}).limit(1).toArray((err,list)=>{
                            let id = null;
                            if(list[0]){
                               id= (list[0].id)*1+1
                            }else{
                                id =10000001
                            }
                            user.insert({id,uname,pwd,tel,type:1,rgTime:new Date()},(err,info)=>{
                                if(!err){
                                    res.json(msg(200,"注册成功"));
                                }else{
                                    res.json(msg(500,"注册失败"));
                                }
                            })
                           
                        })
                       
                    }
             })
         }else{
             res.json(msg(500,"账号不符合要求"));
         }

     },
     //登录
     login(req,res){
        let data = req.body;
        let {uname,pwd} = data;
        getcoll("user").find({uname}).toArray((err,list)=>{
            if(list[0] && list[0].pwd == pwd){
                req.session.userObj=list[0]
                console.log(req.session.userList)
                res.json(msg(200,"登陆成功",req.session.userObj));
                
            }else{
                res.json(msg(500,"用户名密码错误")); 
            }
        })
        // console.log(req.body)
     },
     //验证登录
     confirmLog(req,res){
         if( req.session.userObj){
            let username = req.session.userObj.uname
            let uname = req.body.uname
            console.log(username+"+"+uname)
            if(uname == username){
               res.json(msg(200))
            }else{
               res.json(msg(400))
            }
         }else{
            res.json(msg(400))
         }
     },
     //登出
     loginOut(req,res){
        req.session.userObj = null
        res.json(msg(200))
     },
     uploadPic(req,res){
        let {fileName,base64,fileType} = req.body;
        let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        // console.log(base64Data)
        let dataBuffer = new Buffer.from(base64Data, 'base64');
        require('fs').writeFile('./images/idPic/'+fileName+'.'+fileType, dataBuffer, function(err) {
            if(err){
                res.json(msg(500,'上传失败'))
            }else{
                res.json(msg(200,'成功',{fileName:fileName+"."+fileType}))
            }
        });
     },
    employeeApply(req,res){ //维修工注册
        let data = req.body;
        console.log(data)
        getcoll('employeeApply').find({}).sort({id:-1}).limit(1).toArray((err,list)=>{
            let id = null;
            if(list[0]){
               id= (list[0].id)*1+1
            }else{
                id =10000001
            }
            data.id = id
            data.type = 2
            data.rgTime = new Date();
            getcoll('employeeApply').insert(data,(err,info)=>{
                if(!err){
                    res.json(msg(200,'申请成功'));
                }else{
                    res.json(msg(500,'提交失败'));
                }
            })
        })
       
    },
    findUser(req,res){
        let {id} = req.body;
        // console.log(req.body)
        getcoll('user').find({id}).toArray((err,list)=>{
            if(list[0]){
                res.json(msg(200,'',list[0]))
            }else{
                res.json(msg(500,'不存在该用户'))
            }
        })
        
    },
    updateUser(req,res){
        let data = req.body;
        let id = data.id
        let tel = data.tel
        let qq = data.qq
        let realName = data.realName
        let wechat = data.wechat
        console.log(data)
        getcoll('user').update({id},{$set:{tel,qq,realName,wechat}},(err,info)=>{
            if(!err){
                res.json(msg(200,'修改成功'));
            }else{
                res.json(msg(500,'修改失败'));
            }
        })
    }
}