var chart = null;
var options = {
  keepAspectRatio: true,
  datalessRegionColor: 'PaleGoldenrod'
};
var countriesVisited = ['Country'];
var doMap = function(countries) {
  var x = [];
  $.map(countries, function(el,i) {
    return x.push([el]);
  });
  var visited = x.length;
  var total = availableCountries.length;
  $('#percent').html('<p>'+visited+'/'+total+' '+visited/total+'%</p>');
  return x;
};


var addAndUpdateChart = function(region) {
  if (region) {
    if (countriesVisited.indexOf(region) == -1) {
      countriesVisited.push(region);
    } else {
      countriesVisited.splice(countriesVisited.indexOf(region), 1);
    }

    chart.draw(google.visualization.arrayToDataTable(doMap(countriesVisited)), options);
    saveOnLocalStorage(countriesVisited);
  }
};

var drawRegionsMap = function() {
  chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
  // register the 'select' event handler
  google.visualization.events.addListener(chart, 'regionClick', function (region) {
    // GeoChart selections return an array of objects with a row property; no column information
    addAndUpdateChart(region.region);
  });
  if (localStorage.getItem('countriesVisited')) {
    var arr = JSON.parse(localStorage.getItem('countriesVisited'));
    if (arr && arr.length > 0) {
      countriesVisited = arr;
    }
  } else {
    localStorage.setItem('countriesVisited', JSON.stringify(countriesVisited));
  }
  chart.draw(google.visualization.arrayToDataTable(doMap(countriesVisited)), options);
};

var saveOnLocalStorage = function(countriesVisited) {
  localStorage.setItem('countriesVisited', JSON.stringify(countriesVisited));
};

$( document ).ready(function() {
  $( "#tags" ).autocomplete({
    source: availableCountries,
    select: function( event, ui ) {
      addAndUpdateChart(ui.item.value);
    }
  });
});







