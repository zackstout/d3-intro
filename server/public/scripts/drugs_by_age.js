
var allAges = [];

$(document).ready(() => {
  d3.csv('../csvs/drug-use-by-age.csv', function(res) {
    // console.log(res);
    allAges.push(res);
  }).then(function() {
    console.log(allAges);

    d3.select(".chart")
    .selectAll("div")
    .data(allAges)
    .enter().append("div")
    // also cocaine, crack, heroin, hallucinogen, oxycontin, pain-reliever, tranquilizer
    .style("width", function(d) {
      // Ok heroin is buggy??
      return d['marijuana-frequency'] == '-' ? 0 : parseFloat(d['marijuana-frequency']) * 6 + "px";
    })
    .style("background-color", "steelblue")
    .text(function(d) { return d.age; });
    // Hmm...can't do both?
    // .style("text-align", "right")
    // .text(function(d) { return d['alcohol-frequency']; });
  });
});
