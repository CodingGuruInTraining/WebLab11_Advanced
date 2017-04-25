var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lakeSchema = new mongoose.Schema({
    lakeName: { type: String, required: true, unique: true },
    runTimes: { type: Number, required: true, min: 1 }
});

var Lake = mongoose.model('Lake', lakeSchema);

module.exports = Lake;