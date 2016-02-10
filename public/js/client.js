var Report = function(location){
  this.url = '/reports/' + location;
  this.data;
}

Report.prototype = {

  get: function(callback){
    var that = this;
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    request.onload = function(){
      that.data = JSON.parse(request.responseText);
      callback();
    }
    request.send(null);
  }
}




window.onload = function() {

  var form = document.querySelector('#locationSearch');
  var input = document.querySelector('#locationInput');
  var reportView = document.querySelector('#reportDisplay');
  var storedReportsView = document.querySelector('#storedReports');

  var reports = JSON.parse( localStorage.getItem('reports') ) || []

  var displayReports = function() {
    storedReportsView.innerHTML = '';

    for (report in reports) {
      var data = reports[report];

      var li = document.createElement('li');
      li.innerHTML = "<img src='" + "http://openweathermap.org/img/w/" + data.weather.icon + ".png" + "'>" + data.weather.main + data.weather.temp + '<button class="removeReport" data-id="' + report + '">Remove Report</button>';

      storedReportsView.appendChild(li);
      }

    }

form.onsubmit = function(event) {
    event.preventDefault();
    var location = input.value;
    var currentReport = new Report(location);

    currentReport.get(function(){
      var data = currentReport.data;
      var reportDisplay = "<h3> In " + data.name + "</h3><h4> the forecast is : " + data.weather[0].main + "</h4><button id='addCity'>Add to list</button>";
      reportView.innerHTML = reportDisplay;

      document.querySelector('#addReport').onclick = function(){
        reports.push(data);
        localStorage.setItem('reports', JSON.stringify(reports));
        displayReports();
      }



    });
  }

  displayReports();

}



