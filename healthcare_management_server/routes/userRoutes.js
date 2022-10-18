const express = require("express");
const controller = require("../controllers/userController");
const router= express.Router()
const {loginLimiter} = require('../middleware/rateLimiter')

//API for categories page
router.post("/register",controller.registerUser);

//API for login page
router.post("/login",loginLimiter,controller.Login);


//API for doctor registartion page
router.post("/doctor/register",controller.registerDoctor);
module.exports=router;