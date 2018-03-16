var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillList = new Schema({
  name: {
    type: String
  },
});

module.exports = mongoose.model('SkillList', SkillList, 'skills');
