
// console.log(d3);
// var data = [1, 23, 22, 4, 63, 12];
var dogs = [];
var pulp = [];
var kb1 = [];
var kb2 = [];
var ib = [];
var django = [];
var jackie = [];

var graphCount = 0;


$(document).ready(function() {
  // Remember, you need a server to use this:
  d3.csv('tarantino.csv', function(res) {
    // console.log(res);
    switch(res.movie) {
      case "Reservoir Dogs": dogs.push(res);
      break;
      case "Pulp Fiction": pulp.push(res);
      break;
      case "Kill Bill: Vol. 1": kb1.push(res);
      break;
      case "Kill Bill: Vol. 2": kb2.push(res);
      break;
      case "Inglorious Basterds": ib.push(res);
      break;
      case "Django Unchained": django.push(res);
      break;
      case "Jackie Brown": jackie.push(res);
      break;
    }
  }).then(function() {

    var dogsSwears = sanitizeMovie(dogs);
    graphMovie(dogsSwears);

    var pulpSwears = sanitizeMovie(pulp);
    graphMovie(pulpSwears);

    var kb1Swears = sanitizeMovie(kb1);
    graphMovie(kb1Swears);
    var kb2Swears = sanitizeMovie(kb2);
    graphMovie(kb2Swears);
    var ibSwears = sanitizeMovie(ib);
    graphMovie(ibSwears);
    var djangoSwears = sanitizeMovie(django);
    graphMovie(djangoSwears);
    var jackieSwears = sanitizeMovie(jackie);
    graphMovie(jackieSwears);
    // graphMovie(pulp);
    // graphMovie(dogs);

  });



});



// The goal here will be to collapse the data into minute-sized chunks, and radius of circle at that minute will depict number of swears:
function sanitizeMovie(movie) {
  var eventObject = {};
  var eventArray = [];
  var length = parseFloat(movie[movie.length - 1].minutes_in);

  // Initialize object's keys:
  for (var i=0; i < length; i++) {
    eventObject[i] = 0;
  }

  movie.forEach(function(ev) {
    var min = Math.floor(parseFloat(ev.minutes_in));
    if (ev.type == 'word') {
      eventObject[min] ++;
    }
  });
  // console.log(eventObject);


  for (var j=0; j < length; j++) {
    eventArray.push(eventObject[j]);
  }
  // console.log(eventArray);

  // wait, this is all we need:
  return eventArray;

  // Ugh fine i'll just add it to every event....ugly:
  // movie.forEach(function(ev) {
  //   ev.eventObject = eventObject;
  // });
  // console.log(Object.keys(eventObject));
}

// ok the issue is likely that we're selecting *all* circles, so it only works the first time...
function graphMovie(movie) {
  console.log(movie);
  // var length = parseFloat(movie[movie.length - 1].minutes_in);
  var length = movie.length;
  // console.log(length);
  var x = d3.scaleLinear()
      .domain([0, length])
      .range([10, 710]);

  var circles = d3.select(".tarantino" + graphCount)
    .selectAll("circle")
    .data(movie);

  console.log(circles);
  var circle = circles.enter().append("circle");
    // .update().append("circle");


  circle.attr("cx", function(d, i) {
    // console.log(d);
    return x(i);
  })
    .style("fill", function(d) {
      // if (d.type == 'word') {
      //   return "steelblue";
      // } else {
      //   return "tomato";
      // }
      return "steelblue";
    })
    .attr("r", function(d, i) {
      return d;
    })
    .attr("cy", 50);

    graphCount ++;
    $('body').append('<svg width="720" height="120" class="tarantino' + graphCount + '"></svg>');
}






// all right, and this has been updated from .scale():
// var x = d3.scaleLinear()
//     .domain([0, d3.max(data)])
//     .range([0, 520]);
//
// // var svg = document.getElementsByTagName('svg')[0];
// // just needed the background color, ok:
// d3.select(".chart")
// // initiate Join by defining selection to be joined to data:
//   .selectAll("div")
//   // join the data:
//     .data(data)
//     // say what to do for data without a selection (which is all of it, since selection is empty:)
//   .enter().append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .style("background-color", "blue")
//     .style("text-align", "right")
//     .text(function(d) { return d; });
//
// var circle = d3.selectAll("circle");
// d3.selectAll("circle")
//   .style("fill", "steelblue")
//   .attr("r", 30)
//   .attr("cx", function() {  return Math.random() * 720;  });
//
//
// circle.data([32, 57, 112]);
// circle.attr("r", function(d) { return Math.sqrt(d); });
// circle.attr("cx", function(d, i) { return i * 100 + 30; });
//
// var svg = d3.select("svg");

// svg.selectAll("circle")
// // Strange, changing the value of first three elements does nothing here..
//     .data([320, 57, 112, 293])
//   .enter().append("circle")
//     .attr("cy", 60)
//     .attr("cx", function(d, i) { return i * 100 + 30; })
//     .attr("r", function(d) { return Math.sqrt(d); });
//

// *** Using update rather than regenerating objects that are sticking around (e.g. being shifted from 1 to 5 when changing age bracket) improves performance. Use key functions for this kind of object constancy.
