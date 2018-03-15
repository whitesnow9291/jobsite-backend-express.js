var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/database');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();

var ObjectId = require('mongoose').Types.ObjectId; 
var User = require("../../models/user");
var constant = require("../../config/constants");
var Restaurant = require("../../models/restaurant");
var mailgun = require('mailgun-js')({apiKey: constant.mailgun.api_key, domain: constant.mailgun.DOMAIN});

router.post('/load_all_user', function(req, res) {
  User.find({}).select('-__v').populate({path: 'company_id'}).exec(function(err, users){
    return res.json({success: true, data: {user: users} })
  });
});
router.post('/change_user_status', function(req, res) {
  let user_id = req.body.user_id
  let status = req.body.status

  User.findOneAndUpdate({_id: new ObjectId(user_id)},{$set: {status: status}}, {new: true}, function(err, user){
    sendMailToUser(user);
    if (err) {
      return res.json({
        success: false,
        error: constants.errors.server_error
      });
    } else {
      return res.json({
        success: true,
        data: {}
      });
    }
  })
  function sendMailToUser(user) {
    let email = user.email
    let subject = 'Your account updated'
    let frommail = constant.frommail
    let status = user.status
    let html = ''
    if (status == constant.status.approved) {
      html = '<p>Your account Approved</p>'
    } else {
      html = '<p>Your account Rejected</p>'
    }
    var data = {
      from: 'DinnerBell <postmaster@sandboxb6dc863d91b44d9eb9d2fc5802a0c365.mailgun.org>',
      to: email,
      subject: subject,
      html: html
    };
    
    mailgun.messages().send(data, function (error, body) {
      console.log(body);
    });
  }
});


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
