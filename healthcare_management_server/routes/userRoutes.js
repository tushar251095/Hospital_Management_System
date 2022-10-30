const express = require("express");
const controller = require("../controllers/userController");
const router= express.Router()
const {loginLimiter} = require('../middleware/rateLimiter')
const jwt = require('../middleware/jwt')
//API for categories page
router.post("/register",controller.registerUser);

//API for login page
router.post("/login",loginLimiter,controller.Login);


//API for doctor registartion page
router.post("/doctor/register",controller.registerDoctor);

//API for add speciality
router.post("/add/speciality",controller.addSpecialities);

//API for add speciality
router.get("/get/specialities",jwt.verifyToken,controller.geAllSpecialities);

module.exports=router;