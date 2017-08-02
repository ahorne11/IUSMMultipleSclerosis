jQuery(document).ready(function ($) {

  //$('#price_filter').val('0-500');
  //$("#price_slider").slider({
  //  range:true,
  //  min: 0,
  //  max: 500,
  //  values:[0, 500],
  //  step: 5,
  //  slide: function(event, ui) {
  //    $("#price_range_label").html('$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
  //    $('#price_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
  //  }
  //});

$('#status :checkbox').prop('checked', true);

FilterJS(results, "#resultList", {
    template: '#template',
    criterias: [
        { field: 'amount', ele: '#price_filter', type: 'range' },
        { field: 'status', ele: '#status :checkbox' }
    ],
    search: { ele: '#search_box' }
});

});

//updates searched for as you type, hides results if box is empty, shows no results if no results
function edValueKeyPress() {
    var search_box = document.getElementById("search_box");
    var currentText = search_box.value;

    var searchedFor = document.getElementById("searchedFor");
    searchedFor.innerHTML = currentText;

    

    //checks if value is empty, clears results
    if (isEmpty(currentText)) {
        document.getElementById("resultList").style.display = 'none';
        document.getElementById("endOfResults").innerHTML = "";
    }
    if (!isEmpty(currentText)) {
        noResults();
    }


}
//regex to check if input is empty
function isEmpty(str) {
    if (str.replace(/\s/g, "") == "") {
        return true;
    };
};

//reveals search results on click
function showResults() {
    document.getElementById("resultList").style.display = "block";
    var search_box = document.getElementById("search_box");
    var currentText = search_box.value;

    if (isEmpty(currentText)) {
        document.getElementById("resultList").style.display = 'none';
    }

    if (!isEmpty(currentText)) {
        noResults();
    }
    
}

//redirects to new page with data appended in the url
function testJS() {
    var checkForMobile = document.getElementById("checkForMobile");

    //if (checkForMobile.innerHTML == "False") {
        var b = document.getElementById('searchBox').value,
            //url = 'result.html?name=' + encodeURIComponent(b);
            url = 'search.html?name=' + encodeURIComponent(b);

        document.location.href = url;
    //}
    //if (checkForMobile.innerHTML == "True") {
        //var c = document.getElementById('mobile-s').value,
        //        //url = 'result.html?name=' + encodeURIComponent(b);
        //        url = 'search.html?s=' + encodeURIComponent(c);

        //document.location.href = url;
    //}
}

//gets data from url, shows results, noResults runs after .05 seconds
function onLoad() {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    //document.getElementById('here').innerHTML = data.name;
    var query = data.name;

    //get % symbols out of string
    query = query.replace(/\+/g, '%20');
    query = decodeURIComponent(query);

    document.getElementById('searchedFor').innerHTML = query;
    $("#search_box").val(query).trigger('keyup');
    document.getElementById('search_box').focus();
    showResults();
    setTimeout(noResults, 50);
}

//global
var hasResults;

//displays message if there are no results
function noResults() {
    var totalResults = $('#resultList').children();
    var numTotalResults = totalResults.length;
    var numHiddenResults = 0;
    var i = 0;
    var results = document.getElementsByClassName("fjs_item");
    for (i = 0; i < numTotalResults; i++) {
        if (results[i].style.display == 'none') {
            numHiddenResults++;
        }
    }
    if (numHiddenResults == numTotalResults) {
        document.getElementById("endOfResults").innerHTML = "Your search did not match any of our results";
        hasResults = false;
    } else {
        document.getElementById("endOfResults").innerHTML = "End of Results";
        hasResults = true;
    }
}



