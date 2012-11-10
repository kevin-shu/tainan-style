load('application');

before(loadTitle, {only: ['show', 'edit', 'update', 'destroy']});

action('new', function () {
    this.title = 'New title';
    this.title = new Title;
    render();
});

action(function create() {
    Title.create(req.body.Title, function (err, title) {
        if (err) {
            flash('error', 'Title can not be created');
            render('new', {
                title: title,
                title: 'New title'
            });
        } else {
            flash('info', 'Title created');
            redirect(path_to.titles());
        }
    });
});

action(function index() {
    this.title = 'Titles index';
    Title.all(function (err, titles) {
        render({
            titles: titles
        });
    });
});

action(function show() {
    this.title = 'Title show';
    render();
});

action(function edit() {
    this.title = 'Title edit';
    render();
});

action(function update() {
    this.title.updateAttributes(body.Title, function (err) {
        if (!err) {
            flash('info', 'Title updated');
            redirect(path_to.title(this.title));
        } else {
            flash('error', 'Title can not be updated');
            this.title = 'Edit title details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.title.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy title');
        } else {
            flash('info', 'Title successfully removed');
        }
        send("'" + path_to.titles() + "'");
    });
});

function loadTitle() {
    Title.find(params.id, function (err, title) {
        if (err || !title) {
            redirect(path_to.titles());
        } else {
            this.title = title;
            next();
        }
    }.bind(this));
}
