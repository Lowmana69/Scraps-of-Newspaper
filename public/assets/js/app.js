import { isTSExpressionWithTypeArguments } from "@babel/types";
import { CoverageSummary } from "istanbul-lib-coverage";

$(document).ready(function () {
    var newsArticles = $('.article-container');
    $(document).click('.btn-saved', handleArticleSave);
    $(document).click('.scraps-new', handleArticleScraps);

    initializePage();

    function intializePage() {
        newsArticles.empty();
        $.get('/api/headlines?saved=false')
            .then(funciton(data) {
                if(data && data.length) {
                    renderScrapings(data);
                } else {
                    renderUnavailable();
                }
            });
    }

    function renderScrapings(articles) {
        var articleList = [];

        for(var i = 0; i < articles.length; i++){
            articleList.push(createList(articles[i]));
        }
        newsArticles.append(articleList);
    }

    function articleList(articles) {
        var list = 
        $([
            "<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h3>",
            article.headline,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "</h3>",
            "</div>",
            "<div class='panel-body'>",
            article-summary,
            "</div>",
            "</div>",
            "</div>",
            "</div>"
        ].join(""));

        list.data('_id', article._id);
        return list;
    }

    function renderUnavailable() {
       var empty =  
        $([
            "<div class='alert alert-warning text-center'>",
            "<h4>Oops, No News is Good News, Check Back Again</h4>",
            "</div>",
            "<div class='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>What do You want to do Now?</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class='scrape-new'>Try Scraping Again!</a></h4>",
            "<h4><a href='/saved'>Send to Saved Scrapings</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        articleList.append(empty);
    }

    function handleArticleSave() {
        var scrapingsSaved = $(this).parents('.panel').data();
        scrapingsSaved.saved = true;

        $,ajax({
            method: "PATCH",
            url: '/api/headlines',
            data: scrapingsSaved
        }).then(function (data) {
            if(data.ok) {
                initializePage();
            }
        });
    }

    function handleArticleScraps() {
        $.get('/api/fetch')
            .then(function(data) {
                initializePage();
                bootbox.alert("<h3 class='text-center m-top-80'>" + data.message + "</h3>");
            });
    }
});