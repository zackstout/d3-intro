
var allDays = [];
var allData = {
  diffFromAvgMax: 0,
  diffFromAvgMin: 0,
  diffFromRecordMax: 0,
  diffFromRecordMin: 0,
  diffFromAvgPrec: 0,
  diffFromRecordPrec: 0
};
var allDataArray = [];

$(document).ready(function() {

    d3.csv('../csvs/KSEA.csv', function(res) {
      allDays.push(res);
    }).then(() => {
      console.log(allDays);

      allDays.forEach((day) => {
        allData.diffFromAvgPrec = parseFloat(day.actual_precipitation) - parseFloat(day.average_precipitation);
        allData.diffFromRecordPrec = parseFloat(day.actual_precipitation) - parseFloat(day.record_precipitation);
        allData.diffFromAvgMin = parseFloat(day.actual_min_temp) - parseFloat(day.average_min_temp);
        allData.diffFromAvgMax = parseFloat(day.actual_max_temp) - parseFloat(day.average_max_temp);
        allData.diffFromRecordMax = parseFloat(day.actual_max_temp) - parseFloat(day.record_max_temp);
        allData.diffFromRecordMin = parseFloat(day.actual_min_temp) - parseFloat(day.record_min_temp);
        allDataArray.push(allData);
        allData = {
          diffFromAvgMax: 0,
          diffFromAvgMin: 0,
          diffFromRecordMax: 0,
          diffFromRecordMin: 0,
          diffFromAvgPrec: 0,
          diffFromRecordPrec: 0
        };
      });

      console.log(allDataArray);

      // Set the angle for each day:
      for (var j=0; j < allDays.length; j++) {
        // allDays[j].angle = ((j * 2 * Math.PI / 365) + Math.PI/4) % 2*Math.PI;
        allDays[j].angle = (j * 2 * Math.PI) / 365;
      }

      var circles = d3.select(".weather")
        .selectAll("rect")
        .data(allDays)
        .enter().append("rect")
        .style("fill", 'blue')
        // .attr("transform", function(d) {
        //   // console.log((d.angle * 360/(2*Math.PI)));
        //   return "translate(400,400)rotate(" + (d.angle * 360/(2*Math.PI)) + ")";
        // })
        .attr('x', function(d, i) {
          // console.log(d);
          // angle = i * 2 * Math.PI / 365;
          // return  300 * Math.cos(i * 2 * Math.PI / 365);
          return 400 + 300 * Math.cos(d.angle);
          // return 200;
        })
        // ooooh this will need degrees, not radians:

        .attr('y', function(d, i) {
          // return  300 * Math.sin(i * 2 * Math.PI / 365);
          return 400 + 300 * Math.sin(d.angle);
          // return 200;
        })
        .attr("height", 10)
        .attr("width", 2);
        // .attr('r', 1)
        // .attr('cx', function(d, i) {
        //   return 400 + 300 * Math.cos(i * 2 * Math.PI / 365);
        // })
        // .attr('cy', function(d, i) {
        //   return 400 + 300 * Math.sin(i * 2 * Math.PI / 365);
        // });
    });
});
