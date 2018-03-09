
// console.log(d3);



$(document).ready(function() {
  // Remember, you need a server to use this:

  // All right this one should be fun too:
  d3.csv('csvs/aging_curve.csv', function(res) {
    console.log(res);
  });

});



// *** Using update rather than regenerating objects that are sticking around (e.g. being shifted from 1 to 5 when changing age bracket) improves performance. Use key functions for this kind of object constancy.
