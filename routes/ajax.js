var express = require('express');
var router = express.Router();
let getColl=require("../db");
let user = require("../server/user");
let main = require("../server/main");
let order = require("../server/order");

router.post("/register",(req,res)=> {   //注册api
    user["register"](req,res);
})

router.post("/login",(req,res)=> {  //登录API
    user["login"](req,res);
})
router.post("/confirmLog",(req,res)=> {  //验证登录API
    user["confirmLog"](req,res);
})
router.post("/loginOut",(req,res)=> {  //登出API
    user["loginOut"](req,res);
})
router.get("/cityList",(req,res)=> {  //获取省市联动
    main["cityList"](req,res);
})

router.get("/applianceList",(req,res)=> {  //获取家电种类
    main["applianceList"](req,res);
}) 
router.post("/submitOrder",(req,res)=>{ //用户提交维修订单
    order["submitOrder"](req,res);
})
router.post("/uploadPic",(req,res)=>{ //上传图片
    user["uploadPic"](req,res);
})
router.post("/employeeApply",(req,res)=>{ //维修工注册
    user["employeeApply"](req,res);
})
router.post("/findUser",(req,res)=>{ 
    user["findUser"](req,res);
})
router.post("/updateUser",(req,res)=>{ 
    user["updateUser"](req,res);
})
router.post("/checkPwd",(req,res)=>{ 
    user["checkPwd"](req,res);
})
router.post("/updatePwd",(req,res)=>{ 
    user["updatePwd"](req,res);
})
router.post("/orderTip",(req,res)=>{ 
    order["orderTip"](req,res);
})





module.exports = router;