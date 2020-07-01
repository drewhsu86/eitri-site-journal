const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Project = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: false },
  description: { type: String, required: false },
  user: { type: Schema.Types.ObjectId, ref: 'users'},
  entries: [{ type: Schema.Types.ObjectId, ref: 'entries' }]
},
{
  timestamps: true
  })

const Entry = new Schema({
  notes: { type: String, required: false },
  project: { type: Schema.Types.ObjectId, ref: 'projects'},
  images: [{ type: Schema.Types.ObjectId, ref: 'images' }]
},
{
  timestamps: true
})

const Entry = new Schema({
  url: { type: String, required: true },
  altUrl: { type: String, required: false }
},
{
  timestamps: true
})

module.exports = {
  Project: mongoose.model("projects", Project),
  Entry: mongoose.model("entries", Entry),
  Image: mongoose.model("images", Image),
}