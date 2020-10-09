var express = require('express');
var router = express.Router();
let getColl=require("../db");
let user = require("../server/user")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.get("/register",(req,res)=> {
//   user["register"](req,res);
// })

module.exports = router;
