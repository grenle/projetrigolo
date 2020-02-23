const Word    = require('../models/word')
const randinc = require('./randinc')

module.exports = function getword(){
  return Word.find().countDocuments()
  .then( wordCount => Word.find({}, 'word')
  .limit(1)
  .skip(randinc(0, wordCount)))
  .then( words => words[0] )
}