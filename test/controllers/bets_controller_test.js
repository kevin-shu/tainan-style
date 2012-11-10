require('../test_helper.js').controller('bets', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        title: '',
        description: '',
        blue: '',
        red: '',
        stream: '',
        status: '',
        red_gambler: '',
        red_stake: '',
        blue_gambler: '',
        blue_stake: '',
        owner: '',
        follower: ''
    };
}

exports['bets controller'] = {

    'GET new': function (test) {
        test.get('/bets/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/bets', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Bet.find;
        Bet.find = sinon.spy(function (id, callback) {
            callback(null, new Bet);
        });
        test.get('/bets/42/edit', function () {
            test.ok(Bet.find.calledWith('42'));
            Bet.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Bet.find;
        Bet.find = sinon.spy(function (id, callback) {
            callback(null, new Bet);
        });
        test.get('/bets/42', function (req, res) {
            test.ok(Bet.find.calledWith('42'));
            Bet.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var bet = new ValidAttributes;
        var create = Bet.create;
        Bet.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, bet);
            callback(null, bet);
        });
        test.post('/bets', {Bet: bet}, function () {
            test.redirect('/bets');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var bet = new ValidAttributes;
        var create = Bet.create;
        Bet.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, bet);
            callback(new Error, bet);
        });
        test.post('/bets', {Bet: bet}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Bet.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/bets/1', new ValidAttributes, function () {
            test.redirect('/bets/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Bet.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/bets/1', new ValidAttributes, function () {
            test.success();
            test.render('edit');
            test.flash('error');
            test.done();
        });
    },

    'DELETE destroy': function (test) {
        test.done();
    },

    'DELETE destroy fail': function (test) {
        test.done();
    }
};

