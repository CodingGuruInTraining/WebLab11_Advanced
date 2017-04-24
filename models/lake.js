var mongoose = require('mongoose');

var lakeSchema = new mongoose.Schema({
    lakeName: String,
    runTimes: ArrayList
});

var Lake = mongoose.model('Lake', lakeSchema);

module.exports = Lake;