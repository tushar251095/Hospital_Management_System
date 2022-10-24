const express = require("express");
const controller = require("../controllers/doctorController");
const router= express.Router()
const {loginLimiter} = require('../middleware/rateLimiter')
const jwt = require('../middleware/jwt')
//API for categories page
router.post("/generate/schedule",jwt.verifyToken,controller.GenerateSchedule);
router.get("/specality/:id",jwt.verifyToken,controller.GetDoctors);
router.get("/schedule/:id",jwt.verifyToken,controller.GetSchedule);
router.get("/view/appointments",jwt.verifyToken,controller.GetAppointment);
module.exports=router;