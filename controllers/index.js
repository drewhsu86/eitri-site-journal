const db = require('../db')
const axios = require('axios')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// include this every time db is used 
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// write functions here, all take args req and res from router

// post request to upload to imgur 
// request should consist of base64 and name 
// of an image file 
async function uploadToImgur(req, res) {
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

// export functions to be used in routes 
module.exports = {
  uploadToImgur
}