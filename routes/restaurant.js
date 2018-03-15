var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var constants = require('../config/constants');

var ObjectId = require('mongoose').Types.ObjectId; 
var User = require("../models/user");
var Employee = require("../models/employee");
var FoodLabel = require("../models/food_label");
var IngredientCategory = require("../models/ingredient_category");
var IngredientLabel = require("../models/ingredient_label");
var Ingredient = require("../models/ingredient");
var MainMenu = require("../models/main_menu");
var Menu = require("../models/menu");
var Restaurant = require("../models/restaurant");
var SubMenu = require("../models/sub_menu");
var Theme = require("../models/theme");
router.post('/getInitData', function(req, res) {
  let company_id = req.body.restaurant_id
  let data = {}
  let employees = Employee.find({company_id: new ObjectId(company_id) }).select('-__v -company_id').exec();

  // employees.then(function(employee_data){
  //   data.employees = employee_data
  // })
  let themes = Theme.find({company_id: new ObjectId(company_id) }).select('-__v -company_id').exec();
  // themes.then(function(themes_data){
  //   data.themes = themes_data
  //   for (let i = 0; i < themes_data.length; i++) {
  //     data.themes[i].logo_url = req.getUrl + 'restaurant_photos/' + data.themes[i].logo_url
  //     data.themes[i].background_url = req.getUrl + 'restaurant_photos/' + data.themes[i].background_url
  //   };
  // })
  let restaurants = Restaurant.findOne({_id: new ObjectId(company_id) }).select('-__v -company_id').exec();
  // restaurants.then(function(restaurants_data){
  //   data.restaurants = restaurants_data
  // })

  let menus = MainMenu.find({company_id: new ObjectId(company_id) }).select('-__v -company_id')
    // .populate('submenus','-__v -company_id')
    // .populate('menus','-__v -company_id')
    .populate({path:'submenus',select:'-__v -company_id',
     populate: {path:'menus',select:'-__v -company_id'
     ,populate: [{path:'details.label',select:'-__v -company_id'}, {path:'ingredients',select:'-__v -company_id',populate: {path:'label',select:'-__v -company_id'}}]
    }}).sort({from_at:1})
    .exec();
  // menus.then(function(menus_data){
  //   data.menus = menus_data
  // })
  Promise.all([employees, themes, restaurants, menus]).then(function(values) {
    data.employees = values[0]
    data.themes = values[1]
    data.restaurants = values[2]
    data.menus = values[3]
    return res.json({success: true, data: data});
  }).catch(reason => { 
    return res.json({success: false, error:constants.errors.server_error});
  });;
  //return res.json({success: true, data:data});
});

router.get('/test', function(req,res){
  MainMenu.find({})
  .populate('submenus')
  .exec(function(error, posts) {
    return res.json({success: true, data:error});
  })
})

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
