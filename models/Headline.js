var mongoose = require('mongoose');

// Created a schema using the Mongoose Function for creating Schemas
var Schema = mongoose.Schema();

/* 

Created Headliner Schema. Within the Schema are a few objects
1. Headline - For Headline of News (Unique)
2. Summary - A Brief Summary of the News
3. Date
4. Saved - Saving News Articles

*/

var headliner = new Schema({
    headline: {
        type: String,
        required: true,
        unique: true
    },
    summary: {
        type: String,
        required: true
    },
    date: String,
    saved: {
        type: Boolean,
        default: false
    }
});

var Headliner = mongoose.model("Headline", headliner);

module.exports = Headliner;
