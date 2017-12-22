var request = require('supertest'); 
var express = require('express');
var app = express(); 
var Chance = require('chance'); 
var chance = new Chance; 
const { randomDate } = require('../seedDatabase/dbseeder.js');
const { expect } = require('chai'); 

describe('Init', () => {
  it('should have 1 equal 1', () => {
    expect(1).to.equal(1); 
  });
});

describe('post routes', () => {
  var server; 
  beforeEach(function() {
    server = require('../server/index.js');
  });
  afterEach(function() {
    server.close(); 
  });  
  it('responds to a post to updated_bookings', function(done) {
    // let update = {event_type: 'updated booking', created_at: randomDate(), update_uuid: chance.guid(), status: (Math.random() > 0.00001)};
    request(server)
    .post('/events/updated_bookings')
    // .send(update)
    .expect(201, done)
  });
  it('responds to a post to bookings', function(done) {
    request(server)
    .post('/events/bookings')
    .expect(201, done)
  });
  it('responds to a post request to new_listings', function(done) {
    request(server)
    .post('/events/new_listings')
    .expect(201, done)
  });
  it('responds to a post request to searches', function(done) {
    request(server)
    .post('/events/searches')
    .expect(201, done)
  });
});