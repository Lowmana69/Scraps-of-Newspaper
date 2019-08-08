module.exports = function(router) {
    // Renders the Homepage
    router.get("/", function(req, res) {
        res.render("home");
    });

    // Renders the Saved Page
    router.get("/saved", (req, res) {
        res.render("saved");
    });
}