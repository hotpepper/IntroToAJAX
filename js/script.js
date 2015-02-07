
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
    if ($street.text("").val() =="") {
        var imgParam = "https://maps.googleapis.com/maps/api/streetview?size=600x300&location=46.414382,10.013988&heading=151.78&pitch=-0.76"
    }
    else {
        var imgParam = imgBase  + $street.text("").val()  + "," + $city.text("").val()
    }
    
    //$("body").append("<img src = https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10>")
    
    $body.append('<img class="bgimg" src="'+imgParam+'">');

    return false;
};

$('#form-container').submit(loadData);

//loadData();
