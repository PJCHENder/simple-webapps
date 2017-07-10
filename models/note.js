const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const uuid = require('uuid')

var NoteSchema = new Schema({
  noteContent: {
    type: String,
    default: ''
  },
  user: {
    ref: 'User',
    type: Schema.ObjectId
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Note', NoteSchema)
