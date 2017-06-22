const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const uuid = require('uuid')

var PaletteSchema = new Schema({
  colors: [
    {
      // _id: {
      //   type: String,
      //   default: function () {
      //     return uuid.v4()
      //   }
      // },
      name: {
        type: String,
        default: null
      },
      hexColor: {
        type: String,
        validate: {
          validator: function (v) {
            return /^#[0-9A-F]{6}$/i.test(v)
          },
          message: 'Invalid HexColor. HexColor only support capital case characters'
        }
      }
    }
  ],
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

module.exports = mongoose.model('Palette', PaletteSchema)
