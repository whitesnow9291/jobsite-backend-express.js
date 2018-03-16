var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../../config/database');
var express = require('express');
var User = require("../../models/user");
var SkillList = require("../../models/skill")
var Restaurant = require("../../models/restaurant");
var ObjectId = require('mongoose').Types.ObjectId; 
var constants = require('../../config/constants');
var router = express.Router();
const authy = require('authy')(constants.twilio.authyKey);

router.post('/sendAuthyToken', function(req, res) {

    let authyId = req.body.authyId
    let email = req.body.email
    let countryCode = req.body.country_code
    let phone = req.body.phone
    
    if (authyId == -1) {
        // Register this user if it's a new user
        authy.register_user(email, phone, countryCode,
            function(err, response) {
            if (err || !response.user) {
                return res.json({success: false, error:constants.errors.invalid_params});
            };
            let authyId = response.user.id;
            sendToken(authyId);
        });
    } else {
        // Otherwise send token to a known user
        sendToken(authyId);
    }

    // With a valid Authy ID, send the 2FA token for this user
    function sendToken(authyId) {

        authy.request_sms(authyId, true, function(err, response) {
            if (err) {
                return res.json({success: false, error:constants.errors.server_error});
            } else {
                return res.json({success: true, data: { authyId: authyId, message: 'successfully sent code.'}});
            }
        });
    }
});
router.post('/verifyAuthyToken', function(req, res) {
    let authyId = req.body.authyId
    let otp = req.body.confirmcode
    authy.verify(authyId, otp, function(err, response) {
        if (err) {
            return res.json({success: false, error: constants.errors.user.verify_failed});
        } else {
            return res.json({success: true, data: { message: 'successfully verified.'}});
        }
    });
});
router.post('/signup', function(req, res) {
  console.log(req.body)
  User.findOne({'email':req.body.email}, function (err, user) {
    if (user) {
      return res.json({
        success: false,
        error: constants.errors.user.duplicated_email
      }); 
    } else {
      var newUser = new User({
        username: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone_number: req.body.phone_number,
        country_code: req.body.country_code,
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({
            success: false,
            error: constants.errors.server_error
          }); 
        }
        return res.json({
          success: true,
          data: {
            user: newUser
          }
        });
      });
    }
  });
});
  
router.post('/signin', function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      return res.json({
        success: false,
        error: constants.errors.user.auth_fail
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          // var token = jwt.sign(user, config.secret);
          // return the information including token as JSON
          return res.json({success: true, data:{
            user: user
          }});
          
        } else {
          return res.json({
            success: false,
            error: constants.errors.user.auth_fail
          });
        }
      });
    }
  });
});
router.post('/update', function(req, res) {
  let user_id = req.body.user._id
  let newuser = req.body.user
  console.log(newuser)
  User.findOne({'email':req.body.user.email}, function (err, user) {
    if (user && user._id!=user_id) {
      return res.json({
        success: false,
        error: constants.errors.user.duplicated_email
      }); 
    } 
    if (user) {
      User.findOneAndUpdate({_id: new ObjectId(user_id)},{$set: newuser}, {new: true}, function(err, newuser){
        if (err) {
          return res.json({
            success: false,
            error: constants.errors.server_error
          });
        } else {
          return res.json({
            success: true,
            data: {user: newuser}
          });
        }
      })
    } else {
      return res.json({
        success: false,
        error: constants.errors0.user.not_found
      }); 
    }
  });
  newuser.skill_array.forEach(function(element) {
    SkillList.findOne({'name':element}, function (err, skill) {
      if (!skill) {
        let newskill = new SkillList({
          name: element
        })
        newskill.save()
      }
    });
  }, this);
});
router.post('/register_company', function(req, res) {
  let company_id = req.body.company_id
  let company_data = req.body.company_data

  Restaurant.update({ _id: new ObjectId(company_id)}, { $set: { company_profile: company_data } }, {}, function(err, restaurant) {
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
  });
});
module.exports = router;
