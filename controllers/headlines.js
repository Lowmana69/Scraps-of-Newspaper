// Import Script Files, Scraps & Date
var scraps = require('../scripts/scraping');
var date = require('../scripts/dates');

// Import the Models Files, Headliners & Comments
var Headline = require('../models/Headline');
var Comments = require('../models/Comments');

module.exports = {
    fetch: function(cb) {
        scraps(function(data) {
            var newsArticles = data;
            for(var i = 0; i < newsArticles.length; i++) {
                newsArticles[i].data = data();
                newsArticles[i].saved = false;
            }

            Headline.collection.insertMany(newsArticles, {ordered:fasle}, function(err, docs){
                cb(err, docs);
            });
        });
    },

    delete: function(query, cb) {
        Headling.remove(query, cb);
    },

    get: function(query, cb) {
        Headline.find(query)
        .sort({_id: -1})
        .exec({function(err, doc)
            cb(doc);
        });
    },

    update: function(query, cb) {
        Headline.update({_id: query._id}, {$set: query}, {}, cb);
    }
}