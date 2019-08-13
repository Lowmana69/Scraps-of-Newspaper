import { truncate } from "fs";


$(document).ready(function () {
    var newsArticles = $('.article-container');
    $(document).click('.btn.saved', handleCommentsSave);
    $(document).click('.btn.delete', handleArticleDelete);
    $(document).click('.btn.comments', handleScrapsComments);
    $(document).click('.btn.comments-delete', handleCommentsDelete);


    initializePage();

    function intializePage() {
        newsArticles.empty();
        $.get('/api/headlines?saved=true')
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

    function handleArticleDelete() {
        var scrapingDelete = $(this).parents('.panel').data();

        $.ajax({
            method: "DELETE",
            url: '/api/headlines/' + scrapingDelete._id;
        }),then(function(data) {
            if(data.ok) {
                initializePage();
            }
         });
    }

    function handleScrapsComments() {
        var currentScrapings = $(this).parents('.panel').data();
        $.get('/api/comments/' + currentScrapings._id).then(function(data) {
            var modal = [
                "<div class='container-fluid text-center'>",
                "<h4>Comments For Scraps: ",
                currentScrapings._id,
                "</4>",
                "<ul class='list-group comment-container>",
                "</ul>",
                "<textarea placeholder='New Comment' rows='4' cols='60'></textarea>",
                "<button class='btn btn-success save'>Save Comment</button>",
                "</div>"
            ].join("");

            bootbox.dialog({
                message: modal,
                closeButton: true
            });

            var commentsGather = {
                _id: currentScrapings._id,
                comments: data || []
            };

            $('.btn.save').data('comments', commentsGather);

            renderCommentsList(commentsGather);
        });
    }

        function handleCommentsSave() {
            var commentsGather;
            var newComment = $('.bootbox-body textarea').val().trim();

            if(newComment) {
                commentsGather = {
                    _id: $(this).data('article')._id,
                    comments: newComment
                }

                $.post('/api/comments', commentsGather)
                    .then(function() {
                        bootbox.hideAll();
                    });
            }
        }

        function renderCommentsList() {
            var renderedComments = [];
            var currentComment;

            if(!data.comments.length) {
                currentComment = [
                    "<li class='list-group-item'>",
                    "Not a Single Comment",
                    "</li>"
                ].join("");
            } else {
                for(var i = 0; i < data.comments.length; i++) {
                    currentComment = $([
                        "<li class='list-group-item comments>",
                        data.comments[i].commentsGather,
                        "<button class'btn btn-danger comment-delete'>x</button>",
                        "</li>"
                    ]).join("");

                    currentComment.children('button').data('_id', data.comments[i]._id);
                    renderedComments.push(currentComment);
                }
            }

            $('.comment-container').append(renderedComments);
        }

        function handleArticleDelete() {
            var deleteComment = $(this).data('_id');

            $.ajax({
                method: "DELETE",
                url: '/api/comments/' + deleteComment
            }).then(function() {
                bootbox.hideAll();
            });
        }
});