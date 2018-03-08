
// console.log(d3);

var dogs = [];
var pulp = [];
var kb1 = [];
var kb2 = [];
var ib = [];
var django = [];
var jackie = [];

var all = ['Reservoir Dogs', 'Pulp Fiction', "Kill Bill: Vol. 1", "Kill Bill: Vol. 2", "Inglorious Basterds", "Django Unchained", "Jackie Brown"];

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
  });
});


// The goal here will be to collapse the data into minute-sized chunks, and radius of circle at that minute will depict number of swears:
function sanitizeMovie(movie) {
  var eventObject = {};
  var deathObject = {};
  var eventArray = [];
  var length = parseFloat(movie[movie.length - 1].minutes_in);

  // Initialize object's keys:
  for (var i=0; i < length; i++) {
    eventObject[i] = 0;
    deathObject[i] = 0;
  }

  movie.forEach(function(ev) {
    var min = Math.floor(parseFloat(ev.minutes_in));
    if (ev.type == 'word') {
      eventObject[min] ++;
    } else {
      deathObject[min] ++;
    }
  });

  // d3's data function needs an array, not an object:
  for (var j=0; j < length; j++) {
    eventArray.push({num: eventObject[j], deaths: deathObject[j]});
  }

  return eventArray;
}

// ok the issue is likely that we're selecting *all* circles, so it only works the first time...
function graphMovie(movie) {
  console.log(movie);
  var length = movie.length;
  var x = d3.scaleLinear()
      .domain([0, length])
      .range([10, 710]);

  var circles = d3.select(".tarantino" + graphCount)
    .selectAll("circle")
    .data(movie);

  // console.log(circles);
  var circle = circles.enter().append("circle");

  circle.attr("cx", function(d, i) {
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
    .attr("r", function(d) {
      return d.num;
    })
    .attr("cy", 50);

    var squares = d3.select(".tarantino" + graphCount)
      .selectAll("rect")
      .data(movie)
      .enter().append("rect");

    squares.attr("x", function(d, i) {
      // don't actually need the /2 if we double the size!
      return x(i) - d.deaths ;
    })
      .style("fill", "tomato")
      .attr("y", function(d) {
        return 50 - d.deaths ;
      })
      .attr("height", function(d) {
        return d.deaths * 2;
      })
      .attr("width", function(d) {
        return d.deaths * 2;
      });

    graphCount ++;
    $('body').append('<h4>' + all[graphCount] + ':</h4><svg width="720" height="120" class="tarantino' + graphCount + '"></svg>');
}


// *** Using update rather than regenerating objects that are sticking around (e.g. being shifted from 1 to 5 when changing age bracket) improves performance. Use key functions for this kind of object constancy.
