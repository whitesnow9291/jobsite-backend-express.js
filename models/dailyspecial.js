var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DailySpecial = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  menus: [{ type: Schema.Types.ObjectId, ref: 'Menu'}],
  today: Schema.Types.Date,
  name: {
    type: String
  }
});

module.exports = mongoose.model('DailySpecial', DailySpecial, 'daily_specials');
