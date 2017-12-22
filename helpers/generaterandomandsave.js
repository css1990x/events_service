// const Chance = require('chance'); 
// const chance = new Chance; 
const cassandraDb = require('../database/index.js'); 
var generateRandomNewListing = (params) => {
  var query = 'INSERT INTO events.newListings(event_type, listing_uuid, created_at) values(?, ?, ?)';
  cassandraDb.client.execute(query, params, {prepare: true})
    .then(result => {
      return result; 
    })
    .catch((err) => (console.error('error', err)));
  // var newListing = {
  //   'event_type': 'new listing',
  //   'listing_uuid': l,
  //   'created_at': chance.date({year: 2017}) 
  // };
  // return newListing;
};

var generateRandomNewBooking = (params) => {
  var query = 'INSERT INTO events.newBookings(event_type, booking_uuid, created_at, has_pa) values(?, ?, ?, ?)';
  cassandraDb.client.execute(query, params, {prepare: true})
    .then((result) => {
      return result; 
    })
    .catch((err) => (console.error('error', err)));
  // var newBooking = {
  //   'event_type': 'new booking',
  //   'booking_uuid': l, 
  //   'has_pa': (l % 2 === 0),
  //   'created_at': chance.date({year: 2017})
  // };
  // return newBooking; 
}; 


var generateRandomSearch = (params) => {
  var query = 'INSERT INTO events.newSearches(event_type, user_uuid, created_at, query) values(?, ?, ?, ?)'; 
  cassandraDb.client.execute(query, params, {prepare: true})
    .then((result) => {
      return result; 
    })
    .catch((err) => (console.error('error', err))); 
  // var newSearch = {
  //   'event_type': 'new search', 
  //   'user_uuid': Math.floor(Math.random() * 2000000),
  //   'search_date': chance.date({year: 2017}),
  //   'query': (chance.city() + ',' + chance.country({ full: true}))
  // };
  // return newSearch;
}; 

var getAllBookings = () =>{
  var query = 'SELECT count(*) FROM events.newBookings'; 
  cassandraDb.client.execute(query)
    .then((results) => {
      console.log(results);
      console.log('got here!');
      return results; 
    })
    .catch((err) => {
      console.error('error', err); 
    }); 
};

var generateUpdatedBookings = (params) => {
  var query = 'INSERT INTO events.updatedBookings(event_type, created_at, update_uuid, status) values(?, ?, ?, ?)';
  cassandraDb.client.execute(query, params, {prepare: true})
    .then(result => (console.log('inserted'))) 
    .catch((err) => (console.error('error', err))); 
  // var newUpdate = {
  //   'event_type': 'updated bookings',
  //   'update_uuid': l,
  //   'created_at': chance.date({year: 2017}), 
  //   'status': true 
  // };
  // return newUpdate;
};
module.exports.generateRandomSearch = generateRandomSearch; 
module.exports.generateRandomNewBooking = generateRandomNewBooking;
module.exports.generateRandomNewListing = generateRandomNewListing;
module.exports.generateUpdatedBookings = generateUpdatedBookings;
module.exports.getAllBookings = getAllBookings;
