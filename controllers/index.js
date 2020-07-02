const db = require('../db')
const axios = require('axios')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/users")
const { Project, Entry } = require("../models/projects")
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// include this every time db is used 
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// salt rounds for bcrypt
const SALT_ROUNDS = 11

// token key for jwt 
const TOKEN_KEY = process.env.TOKEN_KEY 

// write functions here, all take args req and res from router

// post request to upload to imgur 
// request should consist of base64 and name 
// of an image file 
async function uploadToImgur(req, res) {
  // change header to avoid CORS error 
  res.header('Access-Control-Allow-Origin', '*')
  try {
    const { base64, name } = req.body

    // make an axios call using our imgur api 
    const imgurAPI = axios.create({
      headers: {
        Authorization: 'Client-ID ' + process.env.CLIENT_ID
      }
    })

    const newBody = {
      image: base64,
      name: name,
      title: 'dummy title',
      description: 'dummy desc',
      type: 'base64'
    }

    // post request to imgur API based on their docs
    const response = await imgurAPI.post("https://api.imgur.com/3/upload", newBody)

    res.json(response.data.data)
    
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
}

// ===============================
// 
//  USER - signup, signin, verify
// 
// ===============================

//verify user
const verifyUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    const legit = jwt.verify(token, TOKEN_KEY)
    console.log(legit)
    if (legit) {
      res.json(legit)
    }
  } catch (error) {
    res.status(401).send('Not Authorized')
  }
}

//sign-in
const signIn = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username
      }
      console.log('about to sign')
      const token = jwt.sign(payload, TOKEN_KEY)
      console.log('token')
      return res.status(201).json({ user, token })
    } else {
      res.status(401).send("Invalid Credentials")
    }
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//sign-up
async function signUp(req, res) {
  console.log('in sign up')
  try {
    const { username, password, invite_code } = req.body
    if (invite_code !== process.env.INVITE_CODE) throw { message: "Invalid invite code" }
    const password_digest = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await new User({
      username,
      password_digest
    })
    await user.save()

    const payload = {
      id: user._id,
      username: user.username
    }

    const token = jwt.sign(payload, TOKEN_KEY)

    return res.status(201).json({ user, token })

  } catch (error) {
    console.log("Made it to signUp controller, but there was an error")
    return res.status(400).json({ error: error.message })
  }
}

// ===============================
// 
//  PROJECT - 5 CRUD 
// 
// ===============================

// Get all project of a user id 
// user/id
async function getProjects(req, res) {
  try {
    const userID = req.params.id
    const user = await User.findById(userID).populate('projects')

    const filteredUser = {
      username: user.username,
      userID: user.id,
      projects: user.projects 
    }

    res.json(filteredUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Get a project
async function getProject(req, res) {
  try {
    const id = req.params.id
    const project = await await Project.findById(id).populate('entries')

    res.json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Create a project
async function createProject(req, res) {
  try {
    const userID = getUserID(req)
    const project = await new Project({
      ...req.body,
      user: userID,
      entries: []
    })
    await project.save()

    // also add this project to the user 
    const currUser = await User.findById(userID)
    currUser.projects.push(project['_id'])
    currUser.save()

    res.status(201).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Edit a project
async function editProject(req, res) {
  try {
    const userID = getUserID(req)

    await Project.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, project) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!project) {
        return res.status(404).json({ message: "Project not found!" })
      }
      if (userID.toString() !== project.user.toString()) {
        console.log(project.user)
        console.log(userID)
        return res.status(401).json({ message: "Project does not belong to user!" })
      }
      res.status(200).json(project)
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//delete a project
async function deleteProject(req, res) {
  try {
    const userID = getUserID(req)

    const project = await Project.findById(req.params.id)

    if (userID.toString() !== project.user.toString()) {
      return res.status(401).json({ message: "Project does not belong to user!" })
    }

    const deleted = await Project.findByIdAndDelete(req.params.id)

    if (deleted) {
      return res.status(200).send("Project deleted!")
    }
    throw new Error("Project not found!")
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

// ===============================
// 
//  ENTRY - 5 CRUD 
// 
// ===============================

// Get all entries of a user id 
// user/id
async function getEntries(req, res) {
  try {
    const projectID = req.params.id
    const entries = await Entry.find({project: projectID})

    res.json(entries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Get a entry
async function getEntry(req, res) {
  try {
    const id = req.params.id
    const entry = await Entry.findById(id).populate('project')

    entry.project.entries = null 

    console.log(entry)
    res.json(entry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Create a entry
async function createEntry(req, res) {
  try {
    const userID = getUserID(req)
    
    const entry = await new Entry({
      ...req.body,
      images: []
    })
    await entry.save()

    // also add this entry to the user 
    const currProject = await Project.findById(req.body.project)
    currProject.entries.push(entry['_id'])
    currProject.save()

    res.status(201).json(entry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//Edit a entry
async function editEntry(req, res) {
  try {
    const userID = getUserID(req)

    await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true }, async (error, entry) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!entry) {
        return res.status(404).json({ message: "Entry not found!" })
      }

      const project = await Project.findById(entry.project)

      if (userID.toString() !== project.user.toString()) {
        console.log(entry.user)
        console.log(userID)
        return res.status(401).json({ message: "Entry does not belong to user!" })
      }
      res.status(200).json(entry)
    })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

//delete a entry
async function deleteEntry(req, res) {
  try {
    const userID = getUserID(req)

    const entry = await Entry.findById(req.params.id).populate('project')

    if (userID.toString() !== entry.project.user.toString()) {
      return res.status(401).json({ message: "Entry does not belong to user!" })
    }

    const deleted = await Entry.findByIdAndDelete(req.params.id)

    if (deleted) {
      return res.status(200).send("Entry deleted!")
    }
    throw new Error("Entry not found!")
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

// ===============================
// 
//  IMAGE -> URL PART OF ENTRY 
// 
// ===============================

// PUT REQUEST TO ADD A URL TO AN ENTRY 
async function addImage(req, res) {
  try {
    const id = req.params.id
    const entry = await Entry.findById(id)
    entry.images.push(req.body.imageURL)
    await entry.save()

    res.json(entry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// DELETE REQUEST TO REMOVE A URL TO AN ENTRY 
async function removeImage(req, res) {
  try {
    const id = req.params.id
    const entry = await Entry.findById(id)
    entry.images.splice(parseInt(req.params.imgInd), 1)
    await entry.save()

    res.json(entry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// ===============================
// 
//  NON-ROUTE FUNCTIONS
// 
// ===============================

// function that returns userID from token in request
function getUserID(req) {
  try {
    const token = req.headers.authorization.split(" ")[1]
    console.log("token", token)

    const data = jwt.verify(token, TOKEN_KEY)
    console.log("jwt conversion", data)
    return data.id
  } catch (error) {
    console.log(error)
    return false
  }
}

// export functions to be used in routes 
module.exports = {
  uploadToImgur,
  signIn, signUp, verifyUser,
  getProjects, getProject, createProject, 
  editProject, deleteProject,
  getEntries, getEntry,
  createEntry, editEntry, deleteEntry,
  addImage, removeImage
}