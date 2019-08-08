var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');

var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();

require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.urlencoded({extended: false}));

// Have every request go through the middleware
app.use(router);

var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(db, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("mongoose connection is successful");
    }
});

app.listen(PORT, () => {
    console.log("Listening to port:" + PORT);
})

