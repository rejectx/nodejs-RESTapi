var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  product: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  quantity : Number,
  createdOn : Date
});

module.exports = mongoose.model('Order', OrderSchema);
