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

//API for add speciality
router.get("/get/doctors",jwt.verifyToken,controller.getDoctors);

//API for add speciality
router.post("/edit/profile",jwt.verifyToken,controller.editProfile);

//API for add speciality
router.get("/get/profile/:id/:user",jwt.verifyToken,controller.getProfile);

//API for add speciality
router.post("/update/hospital/details",jwt.verifyToken,controller.AdminUpdateHospitalDetails);

router.get("/get/hospital/details",jwt.verifyToken,controller.getHospitalDetails);

router.delete("/delete/hospital/details/:id",jwt.verifyToken,controller.deleteHospitaldetails);

router.post("/get/admit",jwt.verifyToken,controller.viewRequest);

router.post('/get/specific/type/speciality',jwt.verifyToken,controller.getSpecificfacilityTypeDetails)

router.post('/save/admit/request',jwt.verifyToken,controller.saveAdmitDetails)
router.get('/get/all/patient',jwt.verifyToken,controller.getAllPatients)

router.delete('/delete/doctor/:id',jwt.verifyToken,controller.deleteDoctorbyID)
module.exports=router;