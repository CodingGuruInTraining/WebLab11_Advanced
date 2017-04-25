var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var lakeSchema = new mongoose.Schema({
    lakeName: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
    runTimes: [ { type: Number, required: true, min: 1 } ]
});

var Lake = mongoose.model('Lake', lakeSchema);
lakeSchema.plugin(uniqueValidator);

module.exports = Lake;