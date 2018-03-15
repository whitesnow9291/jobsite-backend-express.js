var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema({
  company_profile: {
    name: {
      type: String
    },
    dining_style: String,
    cuisines: String,
    contact_person: {
      fullname: String,
      title: String
    },
    contact_information: {
      country: String,
      city: String,
      state_province_region: String,
      street_address: String,
      zip_code: String,
      phone_number: String,
      website_address: String
    }
  },
  seating: {
    number_tables: Number,
    table_layout: String
  },
  stripe_account: [{
    email: String,
    password: String
  }],
  opentable_account: [{
    email: String,
    password: String
  }]
});

module.exports = mongoose.model('Restaurant', Restaurant, 'restaurants');
