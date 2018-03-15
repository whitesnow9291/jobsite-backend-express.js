var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodLabel = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  color: {
    type: String
  }
});

module.exports = mongoose.model('FoodLabel', FoodLabel, 'food_labels');
