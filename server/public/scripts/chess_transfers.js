
// I think what we want to do here is organize by month, so we get a sequence, and then animate each countries number changing (with number of circles or whatever) over time, each starting with 0?
var allConfeds = [];
var allTransfers = [];

$(document).ready(function() {

    d3.csv('../csvs/transfers.csv', function(res) {
      // console.log(res);
      var datesObj = {};
      if (!allConfeds.includes(res.Federation)) {
        allConfeds.push(res.Federation);
      }
      var date = res["Transfer Date"];
      var month = date.slice(0, date.indexOf('/'));
      var year = date.slice(date.length - 2);
      // console.log(month + 'and' + year);
      // console.log(date);
      var cleanDate = month + '/' + year;
      // console.log(cleanDate);
      datesObj.date = cleanDate;
      datesObj.to = res.Federation;
      datesObj.from = res["Form.Fed"];
      allTransfers.push(datesObj);

    }).then(function() {
      // console.log(allConfeds);
      console.log(allTransfers);

      var datesObj = {};

      var fedsObj = {};
      for (var i=0; i < allConfeds.length; i++) {
        fedsObj[allConfeds[i]] = 0;
      }
      console.log(fedsObj);
      allTransfers.forEach((t) => {
        // console.log(t);
        var less;
        fedsObj[t.from] --;
        fedsObj[t.to] ++;

      });
      console.log(fedsObj);
    });
});
