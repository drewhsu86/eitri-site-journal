const { Router } = require('express')
const router = Router()
const controllers = require('../controllers')
const restrict = require("../helpers")

// root route 
router.get('/')

// route to upload to imgur with proper body 
// limit of 10mb image 
router.post('/imgur/upload', (req, res) => controllers.uploadToImgur(req, res))

//sign-in
router.post("/signin", (req, res) => controllers.signIn(req, res))

//sign-up
router.post("/signup", (req, res) => controllers.signUp(req, res))

//verify user
router.get('/verifyuser', (req, res) => controllers.verifyUser(req, res))

//get all projects for a user 
router.get("/user/:id", (req, res) => controllers.getProjects(req, res))

//get one project
router.get("/projects/:id", (req, res) => controllers.getProject(req, res))

//add one project
router.post("/projects", restrict, (req, res) => controllers.createProject(req, res))

//edit one project 
router.put("/projects/:id", restrict, (req, res) => controllers.editProject(req, res))

//delete one project 
router.delete("/projects/:id", restrict, (req, res) => controllers.deleteProject(req, res))



module.exports = router