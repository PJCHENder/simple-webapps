const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
  email: {
    type: String,   //  String 要記得大寫
    validate: {
      validator: function (v) {
        let regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        return regex.test(v)
      },
      message: 'Username must be a email, {VALUE} is not a valid email'
    },
    required: true, //  表示為必填欄位，若缺少此欄位，mongoDB 不會建立此 document 並會回傳 error
    unique: true    //  確認這個 email 的值沒有在其他 document 中出現過（也就是沒有相同的 email）
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  facebookId: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('User', UserSchema)
