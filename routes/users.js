var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");
var constant = require("../config/constants");
var Restaurant = require("../models/restaurant");
var SkillList = require("../models/skill")
router.post('/search', function(req, res) {
  User.find({$or:[ { 'skill_array' : { $in: req.body.searchSkills } },
          {'role': req.body.searchRole}
         ]},function(error, users){

    return res.json({
      success: true,
      data: {users:users} 
    });
  })

})

router.get('/skills', function(req, res){
  SkillList.find({}).select('-_id').exec(function(error, skills){
    return res.json({
    success: true,
      data: {skills:skills} 
    });
  })
})
router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password || !req.body.email) {
    return res.json({success: false, error: constant.errors.user.invalid_params});
  } 
  User.findOne({'email':req.body.email}, function (err, user) {
    if (user) {
      // return res.json({
      //   success: false,
      //   error: constant.errors.user.duplicated_email
      // });
      res.writeHeader(200, {"Content-Type": "text/html"});  
      res.write("<h2>Same account aready exist.</h2>");  
      res.end();  
    } else {
      var newRestaurant = new Restaurant();
      newRestaurant.save();
      var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        company_id: newRestaurant._id
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          console.log(err)
          return res.json({success: false, msg: 'Username already exists.'});
        }

        // return res.json({
        //   success: true,
        //   user: {
        //     email: newUser.email,
        //     username: newUser.username
        //   }
        // });
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write("<h2>Registered Successfully, please confirm on Mobile</h2>");  
        res.end();  
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
        error: constant.errors.user.auth_fail
      });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          // var token = jwt.sign(user, config.secret);
          // return the information including token as JSON
          if (user.status == constant.status.approved) {
            return res.json({success: true, data:{
              restaurant_id: user.company_id
            }});
          } else {
            return res.json({
              success: false,
              error: constants.errors.user.not_approved
            });
          }
        } else {
          return res.json({
            success: false,
            error: constant.errors.user.auth_fail
          });
        }
      });
    }
  });
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
