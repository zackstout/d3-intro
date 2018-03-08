
// console.log(d3);
var data = [1, 23, 22, 4, 63, 12];
var dogs = [];
var pulp = [];
var kb1 = [];
var kb2 = [];
var ib = [];
var django = [];
var jackie = [];

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
  // all.push(res);
}).then(function() {

  graphMovie(jackie);
  graphMovie(dogs);
  graphMovie(pulp);

});

var graphCount = 0;

function graphMovie(movie) {
  // console.log(movie);
  var x = d3.scaleLinear()
      .domain([0, 145])
      .range([0, 520]);

  var circles = d3.select(".tarantino")
    .selectAll("circle")
    .data(movie)
    .enter().append("circle");

  circles.attr("cx", function(d) {
      return x(parseFloat(d.minutes_in));
    })
    .style("fill", function(d) {
      if (d.type == 'word') {
        return "steelblue";
      } else {
        return "tomato";
      }
    })
    .attr("r", 5)
    .attr("cy", 50 + 100 * graphCount);

    graphCount ++;
}








// all right, and this has been updated from .scale():
var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 520]);

// var svg = document.getElementsByTagName('svg')[0];
// just needed the background color, ok:
d3.select(".chart")
// initiate Join by defining selection to be joined to data:
  .selectAll("div")
  // join the data:
    .data(data)
    // say what to do for data without a selection (which is all of it, since selection is empty:)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .style("background-color", "blue")
    .style("text-align", "right")
    .text(function(d) { return d; });

var circle = d3.selectAll("circle");
d3.selectAll("circle")
  .style("fill", "steelblue")
  .attr("r", 30)
  .attr("cx", function() {  return Math.random() * 720;  });


circle.data([32, 57, 112]);
circle.attr("r", function(d) { return Math.sqrt(d); });
circle.attr("cx", function(d, i) { return i * 100 + 30; });

var svg = d3.select("svg");

// svg.selectAll("circle")
// // Strange, changing the value of first three elements does nothing here..
//     .data([320, 57, 112, 293])
//   .enter().append("circle")
//     .attr("cy", 60)
//     .attr("cx", function(d, i) { return i * 100 + 30; })
//     .attr("r", function(d) { return Math.sqrt(d); });
//

// *** Using update rather than regenerating objects that are sticking around (e.g. being shifted from 1 to 5 when changing age bracket) improves performance. Use key functions for this kind of object constancy.
