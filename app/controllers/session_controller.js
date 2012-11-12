
load('application');

action('login', function () {

    //var mongo = require('mongoskin');
    //var db = mongo.db('localhost:27017/test?auto_reconnect');    

    //User.where('uid',params.uid).findOne(function(err,user){
    //console.log(db.users.find({'uid': req.query.uid}));
    session.user = req.query.name;
    redirect('/');

    console.log(session.user);
});

/*
action('logout', function () {
    render({
        title: "session#logout"
    });
});
*/

