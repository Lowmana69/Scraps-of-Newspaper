var defineDate = function () {
    var date = new Date();
    var formatDate = "";

    // getMonth() counts the mongths of the year starting at 0
    // January is at 0 index - December is at 11th index
    formatDate += (date.getMonth() + 1) _ "_"; 

    formatDate += date.getDate() + "_";

    formatDate += date.getFullYear();
    
    return formatDate;
}

module.exports = defineDate;