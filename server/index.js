const newrelic = require('newrelic');
process.env.NODE_ENV = 'production'; 
// const Chance = require('chance');
// const chance = new Chance; 
const bodyParser = require('body-parser'); 
const path = require('path');
// const Queue = require('../queue.js'); 
// const helpers = require('../helpers/helpers.js');  
// const AWS = require('aws-sdk'); 
var bookingsStack = [];
var searchesStack = [];
var updatesStack = []; 
var listingsStack = []; 
// for (var i = 0; i < 100; i++) {
//   var newSearch = `new search, ${chance.guid()}, ${chance.date({year: 2017})}, "${chance.city()}, ${chance.country()}"`;
//   var search = ['new search', chance.guid(), chance.date({year: 2017}), `${chance.city()}, ${chance.country()}`];
//   generateRandomSearch(new);
// }

// let searchCount = 0; 
// let searchMax = 2000; 
// // let bookingsCount = 0; 
// let bookingsMax = 30000; 
// // let listingsCount = 0;
// let listingsMax = 300; 
// // let totalCount = 0; 
// // let updatedBookingsCount = 0;
// let updatedBookingsMax = 700;
// var randomChoice = ['new booking', 'new listing', 'new search', 'new update']; 
// // console.log(getAllBookings());

// // for (var i = 1; i <= searchMax; i++) {
// //   let newsearch = generateRandomSearch();
// //   if (i > searchMax - 5) {
// //     console.log(newsearch);
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
//   // }
// }

// for (var j = 1; j <= listingsMax; j++) {
//   let newlisting = generateRandomNewListing(j);
//   if (j > listingsMax - 3) {
//     console.log(newlisting);
//   }
// }

// for (var l = 0; l < updatedBookingsMax; l++) {
//   let newUpdate = generateUpdatedBookings(l);
//   if (l > updatedBookingsMax - 3) {
//     console.log(newUpdate);
//   }
// }
// console.log('bookings count', bookingsCount); 
// console.log('listings count', listingsCount); 
// console.log('search count', searchCount); 
// console.log('updated bookings count', updatedBookingsCount);
// console.log('totalCount', totalCount);
// var generateRandomNewListing = (params) => {
//   var query = 'INSERT INTO events.newListings(event_type, listing_uuid, created_at) values(?, ?, ?)';
//   cassandraDb.client.execute(query, params, {prepare: true})
//     .then(result => {
//       return result; 
//     })
//     .catch((err) => (console.error('error', err)));

// const cluster = require('cluster');
// if (cluster.isMaster) {
//   var cpuCount = require('os').cpus().length;
//   console.log('this is the number of cpus', cpuCount); 
//   for (var i = 0; i < (cpuCount / 2); i++) { 
//     cluster.fork(); 
//   }
// } else {

const express = require('express'); 
const cassandraDb = require('../database/index.js');
const app = express(); 
const PORT = process.env.PORT || 3000; 
// const { randomDate } = require('../seedDatabase/dbseeder.js');

app.use(bodyParser.json()); 
// app.use(bodyParser.urlencoded({extended: true})); 



app.post('/events/bookings', (req, res) => {
  if (bookingsStack.length < 60) {
    var q = {}; 
    q['query'] = 'INSERT INTO events.newBookings(event_type, booking_uuid, created_at, has_pa) values(?, ?, ?, ?)';
    q['params'] = [req.body.event_type, req.body.booking_uuid, JSON.parse(req.body.created_at), req.body.has_pa]; 
    bookingsStack.push(q);
    res.sendStatus(201);
    res.end();
  // var query = 'INSERT INTO events.newBookings(event_type, booking_uuid, created_at, has_pa) values(?, ?, ?, ?)';
  // var params = [req.body.event_type, req.body.booking_uuid, JSON.parse(req.body.created_at), req.body.has_pa]; 
  } else {
    var queries = []; 
    while (queries.length < 60) {
      queries.push(bookingsStack.pop()); 
    }
    bookingsStack.push({'query': 'INSERT INTO events.newBookings(event_type, booking_uuid, created_at, has_pa) values(?, ?, ?, ?)', params: [req.body.event_type, req.body.booking_uuid, JSON.parse(req.body.created_at), req.body.has_pa]});
    cassandraDb.client.batch(queries, {prepare: true})
      .then((result) => {
        res.sendStatus(201);
        // console.log(queries);
        // console.log('this is the length of the theQueue now', theQueue.length); 
        res.end(); 
      })
      .catch((err) => {
        res.sendStatus(403);
        res.end();
      });
    
  }
  // // // var params = ['new booking', chance.guid(), chance.date({year: 2017}), (Math.random() >= 0.5)]; 
  // // var queries = []; 
  // // for (var i = 0; i < 60; i++) {
  // //   var q = {};
  // //   queries.push(q);
    
  // // 

  // generateRandomNewBooking(params); 
});

app.post('/events/searches', (req, res) => {
  // console.log(req.body);
  // console.log('here in events/searches');
  if (searchesStack.length < 60) {
    var q = {}; 
    q['query'] = 'INSERT INTO events.newsearches(event_type, user_uuid, created_at, query) values(?, ?, ?, ?)';
    q['params'] = [req.body.event_type, req.body.user_uuid, JSON.parse(req.body.created_at), req.body.query]; 
  } else {
    var queries = []; 
    while (queries.length < 60) {
      queries.push(searchesStack.pop()); 
    }
    searchesStack.push({'query': 'INSERT INTO events.newsearches(event_type, user_uuid, created_at, query) values(?, ?, ?, ?)', 'params': [req.body.event_type, req.body.user_uuid, JSON.parse(req.body.created_at), req.body.query]});
    // var params = [req.body.event_type, req.body.user_uuid, JSON.parse(req.body.created_at), req.body.query]; 
    // // var params = ['new search', chance.guid(), chance.date({year: 2017}), `${chance.city()}, ${chance.country()}`];
    // // console.log(param[2], params[2]);
    // var query = 'INSERT INTO events.newsearches(event_type, user_uuid, created_at, query) values(?, ?, ?, ?)';
    cassandraDb.client.batch(queries, {prepare: true})
      .then(result => {
        // console.log('sent back');
        res.status(201);
        res.end();
      })
      .catch((err) => {
        res.status(403);
        res.end(); 
      });
    
  }

  // generateRandomSearch(params); 
});

app.post('/events/new_listings', (req, res) => {
  var params = [req.body.event_type, req.body.listing_uuid, req.body.created_at]; 
  // var params = ['new listing', chance.guid(), chance.date({year: 2017})]; 
  // console.log(params);
  // generateRandomNewListing(params); 
  var query = 'INSERT INTO events.newListings(event_type, listing_uuid, created_at) values(?, ?, ?)';
  cassandraDb.client.execute(query, params, {prepare: true})
    .then((results) => {
      res.status(201);
      res.end(); 
    })
    .catch((err) => {
      res.status(403);
      res.send(params);
    });
});

app.get('/events/searches', (req, res) => {
  res.status(200);
  res.send('hello'); 
});

app.post('/events/updated_bookings', (req, res) => {
  var params = [req.body.event_type, req.body.created_at, req.body.update_uuid, req.body.status]; 
  // var params = ['updated booking', chance.date({year: 2017}), chance.guid(), (Math.random() > 0.00001)];
  var query = 'INSERT INTO events.updatedBookings(event_type, created_at, update_uuid, status) values(?, ?, ?, ?)';
  cassandraDb.client.execute(query, params, {prepare: true})
    .then(result => {
      res.status(201);
      res.end();
    }) 
    .catch((err) => {
      res.sendStatus(403);
    }); 
}); 

var server = app.listen(PORT, () => {
  // console.log(`listening on port ${PORT}`); 
});

module.exports = server; 

