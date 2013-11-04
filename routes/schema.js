/**
 * Created by santiago on 10/10/13.
 */

var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');
mongoose.connect('localhost', 'Backbone');
//autoIncrement.initialize(mongoose.connection);


var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    id: Number,
    firstname: String,
    lastname: String,
    age: Number
});

// Person.plugin(autoIncrement.plugin, 'Person');
var Person = mongoose.model('Person', PersonSchema);

exports.Person = Person;
