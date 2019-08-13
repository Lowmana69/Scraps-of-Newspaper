var axios = require('axios');
var cheerio = require('cheerio');

var scraps = function (cb) {

   // Axios to request from NY Times
    axios.get("https://www.nytimes.com/").then(function(response) {
       
        // Cheerio package to load the response data 

        var $ = cheerio.load(response.data);

        var articles = [];

        $(".theme-summary").each(function(i, element) {
           
           // Trim all white spaces from article titles and the summary
           //.theme-summary is the PARENT
           // .story-heading & .summary are the CHILDREN

            var head = $(this).children(".story-heading").text().trim();
            var sum = $(this).children(".summary").text().trim();

            // Both head & summary must be TRUE

            if(head && sum) {
                
                // REGEX the whitespace along with the trim method
                var headTrimmer = head.replace(/(\r\n|\n|\r\t|\s+)/gm, " ").trim();
                var sumTrimmer = sum.replace(/(\r\n|\n|\r\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headliner: headTrimmer,
                    summation: sumTrimmer
                };

                articles.push(dataToAdd);
            }
        });

        cb(articles);
    
    });
};

module.exports = scraps;