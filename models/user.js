const mongoose = require('mongoose')
const Schema = mongoose.Schema

var UserSchema = new Schema({
  email: {
    type: String,   //  String 要記得大寫
    required: true, //  表示為必填欄位，若缺少此欄位，mongoDB 不會建立此 document 並會回傳 error
    trim: true,     //  去除掉不必要的空白
    unique: true    //  確認這個 email 的值沒有在其他 document 中出現過（也就是沒有相同的 email）
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = mongoose.model('User', UserSchema)



