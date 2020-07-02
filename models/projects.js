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
  project: { type: Schema.Types.ObjectId, ref: 'projects' },
  images: [{ type: String }]
},
{
  timestamps: true
})


module.exports = {
  Project: mongoose.model("projects", Project),
  Entry: mongoose.model("entries", Entry)
}