var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Theme = new Schema({
  name: {
    type: String
  },
  colors_menu: String,
  colors_staff: String,
  fonts: String,
  typesize: {
    global_size: {
      type: Number
    },
    site_title: {
      type: Number
    },
    site_subtitle: {
      type: Number
    },
    navigation: {
      type: Number
    },
    page_title: {
      type: Number
    },
    content: {
      type: Number
    }
  },
  logo_url: {
    type: String
  },
  background_url: {
    type: String
  },
  currency_format: {
    type: String
  },
  price_format: {
    type: String
  },
  layout: {
    align: String,
    thumbnail: Boolean
  },
  video: {
    demensions: {
      width: Number,
      height: Number
    },
    supported_format: String,
    maxfile_weight: Number,
    video_url: String
  },
  company_id: {
    type: Schema.Types.ObjectId
  }
});

module.exports = mongoose.model('Theme', Theme, 'themes');
