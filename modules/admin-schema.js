const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let adminSchema = new Schema({
  
    name: String,
    password: String,
    
});

module.exports = adminSchema;