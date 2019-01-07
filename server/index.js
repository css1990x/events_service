const newrelic = require('newrelic');
process.env.NODE_ENV = 'production';
'use strict';
const bodyParser = require('body-parser');
const path = require('path');

const express = require('express');
const cassandraDb = require('../database/index.js');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());



app.post('/events/bookings', (req, res) => {
  var bookingsStack = (bookingsStack || []);
  if (bookingsStack.length < 60) {
    var q = {};

    q['query'] = 'INSERT INTO events.newBookings(event_type, booking_uuid, created_at, has_pa) values(?, ?, ?, ?)';
    q['params'] = [req.body.event_type, req.body.booking_uuid, JSON.parse(req.body.created_at), req.body.has_pa];
    bookingsStack.push(q);
    res.sendStatus(201);
    res.end();
  } else {
    var queries = [];
    while (queries.length < 60) {
      queries.push(bookingsStack.pop());
    }
    bookingsStack.push({'query': 'INSERT INTO events.newBookings(event_type, booking_uuid, created_at, has_pa) values(?, ?, ?, ?)', params: [req.body.event_type, req.body.booking_uuid, JSON.parse(req.body.created_at), req.body.has_pa]});
    cassandraDb.client.batch(queries, {prepare: true})
      .then((result) => {
        res.sendStatus(201);
        res.end();
      })
      .catch((err) => {
        res.sendStatus(403);
        res.end();
      });

  }

});

app.post('/events/searches', (req, res) => {
  var searchesStack = (searchesStack || []);
  if (searchesStack.length < 60) {
    var q = {};
    q['query'] = 'INSERT INTO events.newsearches(event_type, user_uuid, created_at, query) values(?, ?, ?, ?)';
    q['params'] = [req.body.event_type, req.body.user_uuid, JSON.parse(req.body.created_at), req.body.query];
    res.sendStatus(201);
    res.end();
  } else {
    var queries = [];
    while (queries.length < 60) {
      queries.push(searchesStack.pop());
    }
    searchesStack.push({'query': 'INSERT INTO events.newsearches(event_type, user_uuid, created_at, query) values(?, ?, ?, ?)', 'params': [req.body.event_type, req.body.user_uuid, JSON.parse(req.body.created_at), req.body.query]});
    cassandraDb.client.batch(queries, {prepare: true})
      .then(result => {
        res.status(201);
        res.end();
      })
      .catch((err) => {
        res.status(403);
        res.end();
      });

  }
});

app.post('/events/new_listings', (req, res) => {
  var listingsStack = (listingsStack || []);
  if (listingsStack.length < 60) {
    var q = {};
    q['query'] = 'INSERT INTO events.newListings(event_type, listing_uuid, created_at) values(?, ?, ?)';
    q['params'] = [req.body.event_type, req.body.listing_uuid, JSON.parse(req.body.created_at)];
    listingsStack.push(q);
    res.sendStatus(201);
    res.end();
  } else {
    var queries = [];
    while (queries.length < 60) {
      queries.push(listingsStack.pop());
    }
    listingsStack.push({'query': 'INSERT INTO events.newListings(event_type, listing_uuid, created_at) values(?, ?, ?)', 'params': [req.body.event_type, req.body.listing_uuid, JSON.parse(req.body.created_at)]});
    cassandraDb.client.batch(queries, {prepare: true})
      .then((results) => {
        res.sendStatus(201);
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.status(403);
        res.send();
      });

  }
});

app.get('/events/searches', (req, res) => {
  res.status(200);
  res.send('hello');
});

app.post('/events/updated_bookings', (req, res) => {
  var updatesStack = (updatesStack || []);
  if (updatesStack.length < 60) {
    var q = {};
    q['query'] = 'INSERT INTO events.updatedBookings(event_type, created_at, update_uuid, status) values(?, ?, ?, ?)';
    q['params'] = [req.body.event_type, JSON.parse(req.body.created_at), req.body.update_uuid, true];
    updatesStack.push(q);
    res.status(201);
    res.end();
  } else {
    var queries = [];
    while (updatesStack.length > 0) {
      queries.push(updatesStack.pop());
    }
    var q = {};
    q['query'] = 'INSERT INTO events.updatedBookings(event_type, created_at, update_uuid, status) values(?, ?, ?, ?)';
    q['params'] = [req.body.event_type, JSON.parse(req.body.created_at), req.body.update_uuid, req.body.status];
    updatesStack.push(q);
    cassandraDb.client.batch(queries, {prepare: true})
      .then(result => {
        res.status(201);
        res.end();
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(403);
      });

  }
});

var server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = server;

