
// console.log(d3);
var data = [1, 23, 22, 4, 63, 12];

// all right, and this has been updated from .scale():
var x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

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
