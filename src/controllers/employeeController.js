const employeeModel = require("../models/employeeModel");
const aws = require("../awsConfigs/aws");
const validator = require("../validator/validation");
const e = require("express");

const createEmployeeRecord = async function (req, res) {
    try {
        let data = req.body;
        let files = req.files;
        let { employeeName, employeeId } = data;

        if (validator.isEmptyBody(data)) {
            return res.status(404).send({ status: false, msg: "data is Mandatory" })
        }


        if (!validator.isValid(employeeName)) {
            return res.status(400).send({ status: false, msg: " employeeName is required" })
        }

        if (!validator.isValid(employeeId)) {
            return res.status(400).send({ status: false, msg: "employeeId is required" })
        }


        let employeeImage = await aws.uploadFile(files[0])
        if (!employeeImage) {
            return res.status(400).send({ status: false, msg: "upload error" })
        }
        const newData = {
            "employeeName": employeeName,
            "employeeId": employeeId,
            "employeeImage": employeeImage

        }
        let employeeRecord = await employeeModel.create(newData);
        return res.status(201).send({ status: true, msg: "EmployeeRecord created Succesfully", data: employeeRecord })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

}


const updateRecord = async function (req, res) {
    try {
        let employeeDetailId = req.params.employeeDetailId;
        let employeeData = await employeeModel.findById(employeeDetailId);
        if (!employeeData) {
            return res.status(404).send({ status: false, msg: "employeeDetail Id is invalid" })
        }
        let updateData = req.body;
        employeeData.employeeName = updateData.employeeName;
        employeeData.employeeId = updateData.employeeId;
        employeeData.employeeImage = updateData.employeeImage;
        employeeData.save();
        return res.status(200).send({ status: true, msg: "employeedata updated succesfully" })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}


const deleteRecord =async function (req,res){
    try{
        let employeeDetailId = req.params.employeeDetailId;
        let employeeData = await employeeModel.findById(employeeDetailId);
        if (!employeeData) {
            return res.status(404).send({ status: false, msg: "employee data not found" })
        }
       employeeData.isDeleted=true;
       employeeData.save();
       res.status(200).send({status:true,msg:"employee Data deleted Succesfully"})

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}



module.exports.createEmployeeRecord = createEmployeeRecord;
module.exports.updateRecord=updateRecord;
module.exports.deleteRecord=deleteRecord;
