const mongoose = require('mongoose');
 
const UserSchema = mongoose.Schema({
    name: String,
    quan: Number,
    prio:Number
});
 
module.exports = mongoose.model('items', UserSchema);