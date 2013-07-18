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
  var visited = Math.max(x.length - 1, 0);
  var total = availableCountries.length;
  $('#percent').html('<p>'+visited+'/'+total+' '+Math.floor((visited/total)*100)+'%</p>');
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

  $('#clear').click(function() {
    countriesVisited = ['Country'];
    chart.draw(google.visualization.arrayToDataTable(doMap(countriesVisited)), options);
    saveOnLocalStorage(countriesVisited);
  });

  $('#list').click(function() {
    var aux = countriesVisited;
    aux.splice(0,1);
    var names = [];
    for (var i = 0; i < aux.length; i++) {
      for (var j = 0; j < availableCountries.length; j++) {
        if (aux[i] == availableCountries[j].value) {
          names.push(availableCountries[j].label);
        }
      }
    }
    if (names.length > 0) {
      alert(names);
    } else {
      alert('Any country visited yet, do not you live anywhere?');
    }
  });
});







