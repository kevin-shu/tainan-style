/*
 db/schema.js contains database schema description for application models
 by default (when using jugglingdb as ORM) this file uses database connection
 described in config/database.json. But it's possible to use another database
 connections and multiple different schemas, docs available at

 http://railwayjs.com/orm.html

 Example of model definition:

 define('User', function () {
     property('email', String, { index: true });
     property('password', String);
     property('activated', Boolean, {default: false});
 });

 Example of schema configured without config/database.json (heroku redistogo addon):
 schema('redis', {url: process.env.REDISTOGO_URL}, function () {
     // model definitions here
 });

*/

var User = describe('User', function () {
    property('uid', String);
    property('name', String);
    property('email', String);
    property('point', String);
    property('assets', String);
    property('history', String);
});
var Bet = describe('Bet', function () {
    property('title', String);
    property('description', String);
    property('blue', String);
    property('red', String);
    property('stream', String);
    property('status', String);
    property('red_gambler', String);
    property('red_stake', String);
    property('blue_gambler', String);
    property('blue_stake', String);
    property('owner', String);
    property('follower', String);
});
