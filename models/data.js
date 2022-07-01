const mongoose = require('mongoose'); 

const dataSchema = mongoose.Schema({
    message: String
})

module.exports = mongoose.model('Data', dataSchema);