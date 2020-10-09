let getcoll = require("../db");
let city = require("../tool/cityList.js");
let appliance = require("../tool/applianceList.js")

module.exports = {
    cityList(req,res){
       res.json(city)
    },
    applianceList(req,res){
        res.json(appliance)
    }

}