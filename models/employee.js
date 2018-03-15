var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = new Schema({
  name: {
    type: String
  },
  role: {
    type: String
  },
  company_id: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Employee', Employee, 'employees');
