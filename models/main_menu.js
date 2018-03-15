var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MainMenu = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  submenus: [{ type: Schema.Types.ObjectId, ref: 'SubMenu'}],
  name: {
    type: String
  },
  from_at: {
    type: Number
  },
  to_at: {
    type: Number
  }
});

module.exports = mongoose.model('MainMenu', MainMenu, 'main_menus');
