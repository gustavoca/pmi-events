var async = require('async');
var mongoDatasourceName = 'mongodb';
const env = process.env.NODE_ENV;

module.exports = function(app) {
  if (env != "production") {
    //data source
    var mongoDs = app.dataSources[mongoDatasourceName];
    //create all models
    async.parallel({
      events: async.apply(createEvents),
      // participantCategories: async.apply(createParticipantCategories),
    }, function(err, results) {
      if (err) throw err;
      createEvents(function(err) {
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
          // {name: 'event1', description: 'event1', payMethods: createPayMethods(), participantCategories: createParticipantCategories(), _participants: createParticipants(), createdAt: new Date()}
          {name: 'event1', description: 'event1', participantCategories: createParticipantCategories(), _participants: createParticipants(), createdAt: new Date()}
        ], cb);
      });
    }
    //create participant categories
    function createParticipantCategories() {
      return [{name: 'cat1', price: 520.4,  presalePrice: 100, id: "1"},
              {name: 'cat2', price: 90099.4,presalePrice: 200, id: "2"},
              {name: 'cat3', price: 12312.5,presalePrice: 300, id: "3"},
              {name: 'cat4', price: 11250.3,presalePrice: 400, id: "4"}];
    }
    //create participants
    function createParticipants() {
      return [{names: "Gustavo",firstSurname: "Calderon",lastSurname: "Añez",registeredAt: new Date(), lunch: true, _payments: createPayment(),phone: "12345790",email: "user1@gmail.com","createdAt": new Date(),id: "1",categoryId: "1", modality: "Venta", attended: false},
              {names: "Francisco",firstSurname: "Suarez",lastSurname: "wwww",registeredAt: new Date(), lunch: false,phone: "12345790",email: "user2@gmail.com",createdAt: new Date(),id: "2",categoryId: "2", modality: "Venta", attended: false},
              {names: "zzzz",firstSurname: "yyyy",lastSurname: "qqq",registeredAt: new Date(), lunch: true,phone: "12345790",email: "user3@gmail.com",createdAt: new Date(),id: "3",categoryId: "3", modality: "Pre-venta", attended: false}
              ];
    }
    //create payMethods
    function createPayMethods() {
      return [{"name": "sale", "discountPercentage": 50, "id": "1"},
              {"name": "pre-sale", "discountPercentage": 80, "id": "2"}
              ];
    }

    //create payments
    function createPayment() {
      return [{amount: 100, id: "1", createdAt: new Date()},
              {amount: 50, id: "2", createdAt: new Date()}];
    }
  }
};
