const mongoose = require("mongoose");

const employeeSchema =new mongoose.Schema({

"employeeName":{
    type:String,
    require:true
},
"employeeId":{
    type:String,
    require:true
},
"employeeImage":{
    type:String,
    require:true
},
"isDeleted":{
    type:Boolean,
    default:false
}

},{timestamps:true});

module.exports=mongoose.model("employeeDetail",employeeSchema)