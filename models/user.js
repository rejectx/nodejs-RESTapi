var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName : String,
  lastName : String,
  money : Number
});

module.exports = mongoose.model('User', UserSchema);
