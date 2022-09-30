const express = require("express");
const controller = require("../controllers/userController");
const router= express.Router()


//API for categories page
router.post("/register",controller.registerUser);

//API for test page
router.get("/test",controller.test);



module.exports=router;