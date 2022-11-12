const express = require("express");
const controller = require("../controllers/patientController");
const router= express.Router()
const {loginLimiter} = require('../middleware/rateLimiter')
const jwt = require('../middleware/jwt')
//API for categories page
router.post("/book/appoitnment",jwt.verifyToken,controller.BookAppointment);
router.get("/get/appoitnments/:status",jwt.verifyToken,controller.GetAppointments);
router.post("/search",jwt.verifyToken,controller.SearchPatient);
router.get("/profile/:id",jwt.verifyToken,controller.GetProfile);
router.get("/history/:id",jwt.verifyToken,controller.GetHistory);
module.exports=router;