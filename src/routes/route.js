const express =require("express");
const router =express.Router();

const employeeController =require("../controllers/employeeController");


router.post("/employeeRecord",employeeController.createEmployeeRecord);
router.put("/updateEmployeeRecord/:employeeDetailId",employeeController.updateRecord);
router.delete("/deleteRecord/:employeeDetailId",employeeController.deleteRecord);

module.exports=router;