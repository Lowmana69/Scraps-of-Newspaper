var mongoose = require('mongoose');

// Created a schema using the Mongoose Function for creating Schemas
var Schema = mongoose.Schema();

/* 

Created Comments Schema. Within the Schema are a few objects
1. Headline ID - Identifying the article that is being saved.
2. Date
3. Notes - Users comments and/or notes for Article

*/

var comments = new Schema({
    _headlineId: {
        type: Schema.Types.ObjecId
        ref: "Headline"
    },
    date: String,
    notes: String
});

var Commentators = mongoose.model("Commentators", comments);

module.exports = Commentators;