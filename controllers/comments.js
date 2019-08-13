var Comments =  require('../models/Comments');
var date = require('../scripts/dates');

module.exports = {
    get: function(data, cb) {
        Comments.find({
            _headlineId: data._id;
        }, cb);
    },

    save: function(data, cb) {
        var newComments = {
            _headlineId: data._id,
            date: date(),
            comments: data.comments
        };

        Comments.create(comments, function(err, doc) {
            if(err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },

    delete: function(data, cb) {
        Comments.remove({
            _id: data._id
        }, cb);
    }
};