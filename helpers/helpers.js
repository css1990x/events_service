var fs = require('fs');

// you can either import your data generator or write it in this file
const Chance = require('chance');
const chance = new Chance; 
const eventTypes = ['updated booking', 'booking', 'new listing', 'search'];
// for (var i = 0; i < 200; i++) {
//   let eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)]; 
//   // console.log(chance.country({full: true}));
// }



// var listing_uuid = Math.floor(Math.random() * 35000); 
// var events = ['booking', 'search', 'updated booking', 'new listing']; 
// var user_uuid = Math.floor(Math.random() * 2000000);
// var query = ['San Francisco', 'Tokyo', 'Japan', 'Thai Brothel', '']
// var stream = fs.createWriteStream("datapackage.json", {'flags': 'a', 'encoding': null, 'mode': 0666});
// console.log('\x1b[0m' + 'start');
// stream.once('open', (fd) => {
//   // this is setup to produce 2.5 mil lines, more than that in a single go slows my computer down but your mileage may vary. If you don't have a solid state drive... well this could take awhile
//   // so just run this 4 times, it appends to the file if it exists, or creates a new one
//   for (var i = 0; i < 2000; i++) {
//     console.log(chance.zip());
//     // this is where the magic happens, run your function then append a new line
//     // if it's JSON you need, then make sure your output has been through JSON.stringify()
//     // the goal is just to have 10mil lines to represent records/docs for import.
//     // wc -l <FILENAME> // In terminal this will give you the line count of the file
//     // JSON.stringify(stream.write(sessionGener() + '\n'));

//     if (i % 100000 === 0) {
//     // console log every 100k to show progress
//       console.log(i);
//     }
//   }
  
//   stream.end();
//   console.log('done');
// });