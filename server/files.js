let getcoll = require("../db");
const {param} = require("../routes/ajax");
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
    
}
