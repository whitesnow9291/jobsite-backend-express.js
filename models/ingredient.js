var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ingredient = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  price: {
    type: Number
  },
  label: {
    type: Schema.Types.ObjectId, 
    ref: 'IngredientLabel'
  },
  photo_url: {
    type: String
  }
});

module.exports = mongoose.model('Ingredient', Ingredient, 'ingredients');
