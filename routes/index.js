const { Router } = require('express')
const router = Router()
const controllers = require('../controllers')
const restrict = require("../helpers")

// root route 
router.get('/')

// route to upload to imgur with proper body 
// limit of 10mb image 
router.post('/imgur/upload', (req, res) => controllers.uploadToImgur(req, res))

// ==========
//  USER
// ==========

//sign-in
router.post("/signin", (req, res) => controllers.signIn(req, res))

//sign-up
router.post("/signup", (req, res) => controllers.signUp(req, res))

//verify user
router.get('/verifyuser', (req, res) => controllers.verifyUser(req, res))

// ==========
//  Project
// ==========

//get all projects for a user 
router.get("/users/:id", (req, res) => controllers.getProjects(req, res))

//get one project
router.get("/projects/:id", (req, res) => controllers.getProject(req, res))

//add one project
router.post("/projects", restrict, (req, res) => controllers.createProject(req, res))

//edit one project 
router.put("/projects/:id", restrict, (req, res) => controllers.editProject(req, res))

//delete one project 
router.delete("/projects/:id", restrict, (req, res) => controllers.deleteProject(req, res))

// ==========
//  ENTRY
// ==========

//get all entrys for a project
router.get("/projects/:id/entries", (req, res) => controllers.getEntries(req, res))

//get one entry
router.get("/entries/:id", (req, res) => controllers.getEntry(req, res))

//add one entry
router.post("/entries", restrict, (req, res) => controllers.createEntry(req, res))

//edit one entry 
router.put("/entries/:id", restrict, (req, res) => controllers.editEntry(req, res))

//delete one entry 
router.delete("/entries/:id", restrict, (req, res) => controllers.deleteEntry(req, res))

//add one image to an entry 
router.put("/entries/:id/image", restrict, (req, res) => controllers.addImage(req, res))

//remove one image to an entry 
router.delete("/entries/:id/image/:imgInd", restrict, (req, res) => controllers.removeImage(req, res))

module.exports = router