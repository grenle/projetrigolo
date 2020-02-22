//@ts-check

const express  = require('express')
const router   = express.Router()

const log     = require('../utils/log')
const randinc = require('../utils/randinc')
const Word    = require('../models/word')

router.get('/', function(req, res){
  log('GET /api/words')
  Word.find().countDocuments()
  .then( wordCount => Word.find({}, 'word')
  .limit(1)
  .skip(randinc(0, wordCount)))
  .then( words => res.json(words[0]) )
})

module.exports = router