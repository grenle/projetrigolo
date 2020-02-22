//@ts-check

const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
  word: String,
  difficulty: Number
})

module.exports = mongoose.model('Word', wordSchema)