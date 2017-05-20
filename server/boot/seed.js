var async = require('async');
var mongoDatasourceName = 'mongodb';

module.exports = function(app) {
  //data source
  var mongoDs = app.dataSources[mongoDatasourceName];
  //create all models
  async.parallel({
    events: async.apply(createEvents),
    // participantCategories: async.apply(createParticipantCategories),
  }, function(err, results) {
    if (err) throw err;
    createEvents(results.events, function(err) {
      if (err) throw err;
      console.log('> models created sucessfully');
    });
  });
  //create event
  function createEvents(cb) {
    mongoDs.automigrate('event', function(err) {
      if (err) return cb(err);
      var Event = app.models.Event;
      Event.create([
        {name: 'event1', description: 'event1', participantCategories: createParticipantCategories(), participants: createParticipants(), createdAt: new Date()}
      ], cb);
    });
  }
  //create participant categories
  function createParticipantCategories() {
    return [{name: 'cat1', price: 50.4, id: "1"},
            {name: 'cat2', price: 90099.4, id: "2"},
            {name: 'cat3', price: 12312.5, id: "3"},
            {name: 'cat4', price: 11250.3, id: "4"}];
  }
//create participants
  function createParticipants() {
    return [{"names": "user1","firstSurname": "user1","lastSurname": "user1","registeredAt": new Date(),"phone": "12345790","email": "user1@gmail.com","createdAt": new Date(),"id": "1","categoryId": "1"},
            {"names": "user2","firstSurname": "user2","lastSurname": "user2","registeredAt": new Date(),"phone": "12345790","email": "user2@gmail.com","createdAt": new Date(),"id": "2","categoryId": "2"},
            {"names": "user3","firstSurname": "user3","lastSurname": "user3","registeredAt": new Date(),"phone": "12345790","email": "user3@gmail.com","createdAt": new Date(),"id": "3","categoryId": "3"}
            ];
  }
};
