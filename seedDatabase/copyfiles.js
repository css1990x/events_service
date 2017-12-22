var cassandraDB = require('../database/index.js');
var searches = require('./searches.csv'); 
// var searchesArr = require('./newsearchesArr.txt');

var getToSearches = function() {
  var query = 'COPY events.newsearches(user_uuid, created_at, event_type, query) TO "/Users/cliffordsutter/Desktop/Thesis/hrsf84-thesis/seedDatabase/searches.csv"';
  cassandraDB.client.execute(query)
    .then(result => {
      console.log(result);
      console.log('success!');
    })
    .catch(err => {
      console.error('error', err); 
    }); 
};

getToSearches(); 