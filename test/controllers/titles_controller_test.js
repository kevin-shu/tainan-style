require('../test_helper.js').controller('titles', module.exports);

var sinon  = require('sinon');

function ValidAttributes () {
    return {
        description: '',
        status: '',
        red_gambler: '',
        red_follower: '',
        red_stake: '',
        blue_gambler: '',
        blue_follower: '',
        blue_stake: '',
        owner: '',
        follower: ''
    };
}

exports['titles controller'] = {

    'GET new': function (test) {
        test.get('/titles/new', function () {
            test.success();
            test.render('new');
            test.render('form.' + app.set('view engine'));
            test.done();
        });
    },

    'GET index': function (test) {
        test.get('/titles', function () {
            test.success();
            test.render('index');
            test.done();
        });
    },

    'GET edit': function (test) {
        var find = Title.find;
        Title.find = sinon.spy(function (id, callback) {
            callback(null, new Title);
        });
        test.get('/titles/42/edit', function () {
            test.ok(Title.find.calledWith('42'));
            Title.find = find;
            test.success();
            test.render('edit');
            test.done();
        });
    },

    'GET show': function (test) {
        var find = Title.find;
        Title.find = sinon.spy(function (id, callback) {
            callback(null, new Title);
        });
        test.get('/titles/42', function (req, res) {
            test.ok(Title.find.calledWith('42'));
            Title.find = find;
            test.success();
            test.render('show');
            test.done();
        });
    },

    'POST create': function (test) {
        var title = new ValidAttributes;
        var create = Title.create;
        Title.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, title);
            callback(null, title);
        });
        test.post('/titles', {Title: title}, function () {
            test.redirect('/titles');
            test.flash('info');
            test.done();
        });
    },

    'POST create fail': function (test) {
        var title = new ValidAttributes;
        var create = Title.create;
        Title.create = sinon.spy(function (data, callback) {
            test.strictEqual(data, title);
            callback(new Error, title);
        });
        test.post('/titles', {Title: title}, function () {
            test.success();
            test.render('new');
            test.flash('error');
            test.done();
        });
    },

    'PUT update': function (test) {
        Title.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(null); }});
        });
        test.put('/titles/1', new ValidAttributes, function () {
            test.redirect('/titles/1');
            test.flash('info');
            test.done();
        });
    },

    'PUT update fail': function (test) {
        Title.find = sinon.spy(function (id, callback) {
            test.equal(id, 1);
            callback(null, {id: 1, updateAttributes: function (data, cb) { cb(new Error); }});
        });
        test.put('/titles/1', new ValidAttributes, function () {
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

