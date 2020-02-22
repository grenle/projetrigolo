const express = require('express')
const router = express.Router()

const User = require('../models/user')
const log  = require('../utils/log')

module.exports = router.post('/', function(req, res){
    log('POST /api/users/');
    const user = new User({
        email: req.body.email,
        avatar: req.body.avatar,
    });
    user.save(function (err, userDb) {
        if(err !== null) {
            log('saving user err', err)
            res.json({
                success: false,
                message: err.toString()
            });
            return
        }
        res.json({
            success: true,
            data: userDb
        })
    })
})