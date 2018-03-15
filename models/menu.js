var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Menu = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  ingredients: [
    { type: Schema.Types.ObjectId, ref: 'Ingredient'}
  ],
  portion_size: [
    {
      title: {
        type: String
      },
      weight: {
        type: Number
      },
      calories: {
        type: Number
      },
      price: {
        type: Number
      }
    }
  ],
  spice_options: [String],
  questions: [String],
  details: {
    title: {
      type: String
    },
    description: {
      type: String
    },
    label: {
      type: Schema.Types.ObjectId, 
      ref: 'FoodLabel'
    },
    price: Number,
    photo_urls: [String]
  }
});

module.exports = mongoose.model('Menu', Menu, 'menus');
