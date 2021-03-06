
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var $street = $("#street");
    var $city = $("#city");
    var imgBase = "https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" //40.720032,-73.988354&fov=90&heading=235&pitch=10"


    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
//https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10
    // YOUR CODE GOES HERE!
    var street = $street.text("").val();
    var city = $city.text("").val();
    //console.log(street);
    
    //set default view
    if ($street.text("").val() =="") {
        var imgParam = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76"
    }
    else {
        var imgParam = imgBase  + street  + "," + city
        $greeting.text("So you want to live at " + street +"? Really, i heard it wasn't that nice...")
    };
    $body.append('<img class="bgimg" src="'+imgParam+'">');

    //NYT AJAX request
    var key =  // key goes here
    var URL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?callback=svc_search_v2_articlesearch&q="+city+"&sort=newest&api-key="+key
    //loop through response and add relvant pieces to ul elment id=nytimes-articles
    $.getJSON(URL, function(data){
        $("#nytimes-header").append(" About "+city.toUpperCase());
        var items = [];
        for(var i = 0; i < data.response.docs.length; i++) {
            var article = data.response.docs[i];
            //console.log(article)
             $("#nytimes-articles").append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>')
        }
        
        console.log(data);
    //adds error handeler of ajax request 
    }).error(function(){
         $("#nytimes-header").append(" Could Not Be Loaded!");

    });

    //wikipedia request
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + city + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;


};

$('#form-container').submit(loadData);

//loadData();
