
var allBech = [];
var domgrosses = [];
var budgets = [];
var years = [];

$(document).ready(function() {
  // BECHDEL:
  d3.csv('csvs/movies.csv', function(res) {
    // console.log(res);
    allBech.push(res);
    years.push(parseInt(res.year));
    budgets.push(parseInt(res.budget_2013$));
    domgrosses.push(parseInt(res.domgross_2013$));
  }).then(function() {
    console.log(allBech);
    graphBech(allBech);
  });
});


function graphBech(arr) {
  var dom = d3.scaleLinear()
    .domain([0, d3.max(domgrosses)])
    .range([10, 790]);
  var bud = d3.scaleLinear()
    .domain([0, d3.max(budgets)])
    .range([10, 790]);
  var year = d3.scaleLinear()
    .domain([d3.min(years), d3.max(years)])
    .range([10, 590]);

  var circles = d3.select(".bechdel")
    .selectAll("circle")
    .data(arr)
    .enter().append("circle")
    .style("fill", function(d) {
      return d.binary == 'PASS' ? 'blue' : 'red';
    })
    .attr('r', 5)
    .attr('cx', function(d) {
      // return dom(parseInt(d.domgross_2013$));
      return bud(parseFloat(d.budget_2013$));

    })
    .attr('cy', function(d) {
      // return bud(parseFloat(d.budget_2013$));
      return year(parseInt(d.year));
    });
}
