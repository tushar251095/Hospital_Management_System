const express = require("express");
const controller = require("../controllers/doctorController");
const router= express.Router()
const {loginLimiter} = require('../middleware/rateLimiter')
const jwt = require('../middleware/jwt')
//API for categories page
router.post("/generate/schedule",jwt.verifyToken,controller.GenerateSchedule);
router.get("/specality/:id",jwt.verifyToken,controller.GetDoctors);
router.get("/schedule/:id",jwt.verifyToken,controller.GetSchedule);
router.post("/view/appointments",jwt.verifyToken,controller.GetAppointment);
router.put("/appointment/cancel/:id",jwt.verifyToken,controller.cancelAppointment);
router.get("/get/patient/:id",jwt.verifyToken,controller.GetPatient);
router.post("/update/patient/details",jwt.verifyToken,controller.updatePateintDetails);
router.put("/update/admitStatus",jwt.verifyToken,controller.admitStatus);
router.post("/update/round/details",jwt.verifyToken,controller.updateDoctorRounds);
router.put("/discharge/patient",jwt.verifyToken,controller.dischargeStatus);

module.exports=router;