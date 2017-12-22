const { generateRandomSearch, generateRandomNewBooking, getAllBookings, generateRandomNewListing, generateUpdatedBookings } = require('../helpers/generaterandomandsave.js'); 
const Chance = require('chance');
const chance = new Chance; 

let searchMax = 2000; 
// let bookingsCount = 0; 
let bookingsMax = 10000; 
// let listingsCount = 0;
let listingsMax = 300; 
// let totalCount = 0; 
// let updatedBookingsCount = 0;
let updatedBookingsMax = 700;
var randomChoice = ['new booking', 'new listing', 'new search', 'new update']; 
// console.log(getAllBookings());

// for (var i = 1; i <= searchMax; i++) {
//   let newsearch = generateRandomSearch();
//   if (i > searchMax - 5) {
//     console.log(newsearch);
// //   }
// // // }
// for (var t = 1; t <= bookingsMax; t++) {
//   var id = chance.guid(); 
//   var tf = (t % 2 === 0);
//   var time = chance.date({year: 2017}); 
//   // console.log(tf, t, time); 
//   var params = ['new booking', id, time, tf];
//   generateRandomNewBooking(params);
//   if (t === bookingsMax) {
//     console.log('done!');
//   }
//   // let newbook = generateRandomNewBooking(t);
//   // if (t > bookingsMax - 5) {
//   //   console.log(newbook);
var fs = require('fs');


var randomDate = function() {
  var year = '2017'; 
  var month = Math.ceil(Math.random() * 12); 
  if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
    var day = Math.ceil(Math.random() * 30);
  } else if (month === 2) {
    day = Math.ceil(Math.random() * 28); 
  } else {
    day = Math.ceil(Math.random() * 31);
  }
  if (month < 10) {
    month = '0' + month.toString();
  } else {
    month = month.toString();
  }
  if (day < 10) {
    day = '0' + day.toString();
  } else {
    day = day.toString();
  }
  return `${year}-${month}-${day}`;
};

var newBooking = function(t) {
  var newBooking = `new booking,${chance.guid()},${randomDate()},${(t % 2) === 0}`;
  // var booking = {
  //   event_type: 'new booking', 
  //   booking_uuid: chance.guid(),
  //   created_at: chance.date({year: 2017}),
  //   has_PA: (t % 2 === 0)
  // };
  return newBooking;
};
var newListing = function() {
  var newlisting = `new listing,${chance.guid()},${randomDate()}`;
  return newlisting; 
};

var newSearch = function() {
  var newSearch = `new search,${chance.guid()},${randomDate()},"${chance.city()}, ${chance.country()}"`;

  return newSearch; 
};

var updatedBooking = function() {
  var bookUd = `updated booking,${randomDate()},${chance.guid()},${Math.random() > 0.000002}`;
  // var bookingUpdate = {
  //   event_type: 'updated booking',
  //   created_at: chance.date({year: 2017}),
  //   update_uuid: chance.guid(),
  //   status: (Math.random() > 0.0001)
  // };
  return bookUd;
};

// you can either import your data generator or write it in this file
// const sessionGenerator = require('./generator1.js');

var stream = fs.createWriteStream("./updatedBookings.csv", {'flags': 'a'});
console.log('\x1b[0m' + 'start');
stream.once('open', (fd) => {
  // this is setup to produce 2.5 mil lines, more than that in a single go slows my computer down but your mileage may vary. If you don't have a solid state drive... well this could take awhile
  // so just run this 4 times, it appends to the file if it exists, or creates a new one
  for (var i = 0; i < 65000; i++) {
    
    // this is where the magic happens, run your function then append a new line
    // if it's JSON you need, then make sure your output has been through JSON.stringify()
    // the goal is just to have 10mil lines to represent records/docs for import.
    // wc -l <FILENAME> // In terminal this will give you the line count of the file
    // var someSearch = newSearch();
    // console.log(somebooking);
    stream.write(updatedBooking() + '\n');

    if (i % 100000 === 0) {
    // console log every 100k to show progress
      console.log(i);
    }
  }
  
  stream.end();
  console.log('done');
});

module.exports.randomDate = randomDate;
