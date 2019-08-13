// Import Controller Files, Comments & Headlines

var headlineControls = require('../controllers/headlines');
var commentsControls = require('../controllers/');

// Import Scraps

var scraps = require('../scripts/scraping');


module.exports = function(router) {
    // Renders the Homepage
    router.get("/", function(req, res) {
        res.render("home");
    });

    // Renders the Saved Page
    router.get("/saved", (req, res) {
        res.render("saved");
    });

    router.get("/api/fetch", (req, res) => {
        headlineControls.fetch((err, docs) {
            if(!docs || docs.insertedCount === 0) {
                res.json({
                    message: "No News is Good News";
                });
            } else {
                res.json({
                    message: "New Article added: " + docs.insertedCount + " YAY!";  
                });
            }
        });
    });

    router.get('/api/headlines', (req, res) => {
        var queryList = {};
        if (req.query.saved) {
            query = req.query;
        }

        headlineControls.get(queryList, (data) => {
            res.json(data);
        });
    });

    router.delete('/api/headlines/:id', (req, res) => {
        var queryIdentified = {};
        queryIdentified._id = req.params.id;
        headlineControls.delete(queryIdentified, function(err, data) {
            res.json(data);
        });
    });

    router.patch('/api/headlines', (req, res) => {
        headlineControls.update(req.body, function(err, data) {
            res.json(data);
        });
    });

    router.get('/api/comments/:headline_id?', (req, res) => {
        var query = {};
        if(req.params.headlines_id) {
            query._id = req.params.headlines_id;
        }

        commentsControls.get(query, function(err, data) {
            res.json(data);
        });
    });

    router.delete('/api/comments/:id', (req, res) => {
        var query = {};
        query._id = req.params.id;
        commentsControls.delete(query, function(err, data) {
            res.json(data);
        });
    });

    router.post('/api/comments', (req, res) => {
        commentsControls.save(req.body, function(data) {
            res.json(data);
        });
    });
}