jQuery(document).ready(function($) {

  $('#price_filter').val('0-500');
  $("#price_slider").slider({
    range:true,
    min: 0,
    max: 500,
    values:[0, 500],
    step: 5,
    slide: function(event, ui) {
      $("#price_range_label").html('$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
      $('#price_filter').val(ui.values[0] + '-' + ui.values[1]).trigger('change');
    }
  });

  $('#status :checkbox').prop('checked', true);

  FilterJS(services, "#service_list", {
    template: '#template',
    criterias:[
      {field: 'amount', ele: '#price_filter', type: 'range'},
      {field: 'status', ele: '#status :checkbox'}
    ],
    search: { ele: '#search_box' }
  });

});

function showResults() {
    document.getElementById("service_list").style.display = "block";
}

//

function search() {
    console.log(document.getElementById("searchBox").value);
}

//new stuff
function testJS() {
    var b = document.getElementById('searchBox').value,
        url = 'result.html?name=' + encodeURIComponent(b);

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
    document.getElementById('here').innerHTML = data.name;
}