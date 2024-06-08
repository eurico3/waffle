var btc
//var times
document.addEventListener('DOMContentLoaded', function () {

    // Connect to the socket server.
    var socket = io.connect();

    // Receive details from server
    socket.on("updateData", function (msg) {
      console.log("Received Data btc :: "+ msg.btc);  
      console.log("Received Data times :: "+ msg.times);
      btc = msg.btc
      times = msg.times
      timesdisplay = formatDate(times)
     
      document.getElementById("timesbtcDisplay").textContent = 'Time: ' + timesdisplay;
      document.getElementById("btcDisplay").textContent = 'Price: ' +btc;
              
      data.push({x: times,y: btc})

      real_chart.updateSeries([{data: data}])

      // Call the function to update y-axis dynamically
      updateYAxis(real_chart, btc);
 
           });

});


//////////////////////////////////////////////////////////////////
//////////////////////// Real Time Line - Grafico 1 //////////////////////////
//////////////////////////////////////////////////////////////////

//var lastDate = 0;
var data = []
//var TICKINTERVAL = 86400000
//let XAXISRANGE = 777600000
let XAXISRANGE = 100000





function resetData(){
  // Alternatively, you can also reset the data at certain intervals to prevent creating a huge series 
  data = data.slice(data.length - 10, data.length);
}



///////////////////

var real_time_options = {
  series: [{
  data: data
}],
  chart: {
  id: 'realtime',
  height: 500,
  type: 'line',
  animations: {
    enabled: true,
    easing: 'linear',
    //dynamicAnimation: {
    //  speed: 1000
   // }
  },
  toolbar: {
    show: false
  },
  zoom: {
    enabled: false
  }
},
dataLabels: {
  enabled: false
},
stroke: {
  curve: 'smooth'
},
title: {
  text: "endpoint = 'wss://stream.binance.com:9443/ws/!miniTicker@arr'",
  align: 'left'
},
markers: {
  size: 0
},
xaxis: {
  type: 'datetime',
  range: XAXISRANGE,
},
//yaxis: {
//  labels: {
//      formatter: function (val) {
//          return val.toFixed(2);
//      }
//  }
//},
//yaxis: {
//  max: 71200,
//  min : 71150
//},
legend: {
  show: false
},
};

var real_chart = new ApexCharts(document.querySelector("#real_time_line"), real_time_options);
real_chart.render();



// Function to update y-axis dynamically
function updateYAxis(chart, price) {
  var minY = btc - 150;
  var maxY = btc + 150;
  chart.updateOptions({
      yaxis: {
          min: minY,
          max: maxY
      }
  });
}


// Function to convert epoch timestamp to a formatted date string
function formatDate(epochTimestamp) {

  // Subtract 3 hours (180 minutes) in milliseconds
  var gmtMinus0300Offset = 180 * 60 * 1000;


  
  // Create a new Date object with the epoch timestamp (in milliseconds)

  var date = new Date(epochTimestamp + gmtMinus0300Offset);
  


  // Get the individual components of the date
  var year = date.getFullYear();
  var month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
  var day = ('0' + date.getDate()).slice(-2);
  var hours = ('0' + date.getHours()).slice(-2);
  var minutes = ('0' + date.getMinutes()).slice(-2);
  var seconds = ('0' + date.getSeconds()).slice(-2);

  // Construct the formatted date string in the desired format
  var formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

  return formattedDate;
}

// Example usage:
//var epochTimestamp = 1622951283000; // Example epoch timestamp in milliseconds
//var formattedDate = formatDate(epochTimestamp);
//console.log(formattedDate); // Output: "2021-06-06 12:08:03"





