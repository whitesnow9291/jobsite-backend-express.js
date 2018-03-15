var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IngredientCategory = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String
  },
  ingredients: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('IngredientCategory', IngredientCategory, 'ingredient_categories');
