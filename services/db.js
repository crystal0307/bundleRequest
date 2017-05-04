const Promise = require('promise');
var mongoose = require('mongoose');
const UserSvc = require('./userSvc.js');
var schedule = require('node-schedule');
var moment = require('moment');

mongoose.Promise = Promise;
// Build the connection string
var dbURI = 'mongodb://root:shyr021191$@222.73.7.150:27017/babydate'
//var dbURI = 'mongodb://root:root@172.20.67.109:27060/babydate'


// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open to ' + dbURI);
  //getUsers();
  //var a = schedule.scheduleJob('30 * * * *', function() {
  //  getUsers();
  //});
  //userSvc.getWeeks('2017-11-26').then(data => {
  //    console.log(data);
  //})

  //    var j = schedule.scheduleJob({hour: 09, minute: 00}, function(){
  //        userSvc.sendTempateMsg().then(data => {
  //
  //        })
  //    });
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});

function getUsers() {
  var userSvc = new UserSvc();
  userSvc.updateUser().then(data => {

  })
  //    setInterval(() => {
  //        var userSvc = new UserSvc();
  //    userSvc.updateUser().then(data => {
  //
  //    })
  //}, 1000*60*60)

}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
