// set up connection to mongodb url using mongoose 
const mongoose = require('mongoose')

// we specify the database name/variable here 
let MONGODB_URI = process.env.EITRI_JOURNAL || 'mongodb://127.0.0.1:27017/eitriJournalDatabase'

// mongoose connection: boilerplate 
mongoose
    .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to MongoDB.')
    })
    .catch(e => {
        console.error('Connection error', e.message)
    })

// export the mongoose connection as db 
const db = mongoose.connection

module.exports = db