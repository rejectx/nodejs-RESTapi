var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  title : String,
  type : {
    type : String,
    enum : ['furniture', 'food', 'clothes']
  },
  url : String,
  quantity : Number,
  price : Number
});

module.exports = mongoose.model('Product', ProductSchema);
