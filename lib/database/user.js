const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, default: "Suhail_Md" },    
    lastUpdate : { type: String, default: "" },
    users: { type: Object, default: {} },
  });
  
  const UsersDb = mongoose.model('UsersDb', userSchema);
  module.exports = { UsersDb }


