var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubMenu = new Schema({
  company_id: {
    type: Schema.Types.ObjectId
  },
  menus: [{ type: Schema.Types.ObjectId, ref: 'Menu'}],
  name: {
    type: String
  }
});

module.exports = mongoose.model('SubMenu', SubMenu, 'sub_menus');
