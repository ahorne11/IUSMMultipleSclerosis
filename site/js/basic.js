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

//my stuff
function edValueKeyPress() {
    var search_box = document.getElementById("search_box");
    var currentText = search_box.value;

    var searchedFor = document.getElementById("searchedFor");
    searchedFor.innerHTML = currentText;

    //checks if value is empty, clears results
    if (isEmpty(currentText)) {
        document.getElementById("resultList").style.display = 'none';
    }

}
//regex to check if input is empty
function isEmpty(str) {
    if (str.replace(/\s/g, "") == "") {
        return true;
    };
};

function showResults() {
    document.getElementById("resultList").style.display = "block";
    var search_box = document.getElementById("search_box");
    var currentText = search_box.value;

    if (isEmpty(currentText)) {
        document.getElementById("resultList").style.display = 'none';
    }
}


function testJS() {
    var b = document.getElementById('searchBox').value,
        //url = 'result.html?name=' + encodeURIComponent(b);
        url = 'search.html?name=' + encodeURIComponent(b);

    document.location.href = url;
}

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
    document.getElementById('searchedFor').innerHTML = query;
    console.log(query);
    $("#search_box").val(query).trigger('keyup');
    document.getElementById('search_box').focus();
    showResults();
}


