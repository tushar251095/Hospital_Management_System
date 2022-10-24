const express = require("express");
const controller = require("../controllers/patientController");
const router= express.Router()
const {loginLimiter} = require('../middleware/rateLimiter')
const jwt = require('../middleware/jwt')
//API for categories page
router.post("/book/appoitnment",jwt.verifyToken,controller.BookAppointment);
router.get("/get/appoitnments",jwt.verifyToken,controller.GetAppointments);
module.exports=router;