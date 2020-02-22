//@ts-check

var mongoose = require ("mongoose")
var bcrypt   = require("bcrypt")

var user = new mongoose.Schema({
  email   : { type: String, unique: true, required: true },
  handle  : { type: String, unique: true, required: true },
  password: { type: String, required: true }
})

user.pre('save', async function(next){
  const user = this
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash
  next()
})

user.methods.isValidPassword = async function(password){
  const user = this
  const compare = await bcrypt.compare(password, user.password)
  return compare
}

module.exports = mongoose.model('user', user)
