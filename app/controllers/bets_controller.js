load('application');

before(loadBet, {only: ['show', 'edit', 'update', 'destroy']});
//before(authenticate_user, {only: ['new','edit', 'update', 'destroy']})

action('new', function () {
    this.title = 'New bet';
    this.bet = new Bet;
    render();
    console.log("This is new bet.");
});

action(function create() {
    Bet.create(req.body.Bet, function (err, bet) {
        if (err) {
            flash('error', 'Bet can not be created');
            render('new', {
                bet: bet,
                title: 'New bet'
            });
        } else {
            flash('info', 'Bet created');
            redirect(path_to.bets());
        }
    });
});

action(function index() {
    this.title = 'Bets index';
    Bet.all(function (err, bets) {
        render({
            bets: bets
        });
    });
});

action(function show() {
    this.title = 'Bet show';
    if(session.user!={} && session.user!=null){
        flash('name', session.user);
    }
    console.log(session.user);
    console.log("This is show");
    render();
});

action(function edit() {
    this.title = 'Bet edit';
    render();
});

action(function update() {
    this.bet.updateAttributes(body.Bet, function (err) {
        if (!err) {
            flash('info', 'Bet updated');
            redirect(path_to.bet(this.bet));
        } else {
            flash('error', 'Bet can not be updated');
            this.title = 'Edit bet details';
            render('edit');
        }
    }.bind(this));
});

action(function destroy() {
    this.bet.destroy(function (error) {
        if (error) {
            flash('error', 'Can not destroy bet');
        } else {
            flash('info', 'Bet successfully removed');
        }
        send("'" + path_to.bets() + "'");
    });
});

function loadBet() {
    Bet.find(params.id, function (err, bet) {
        if (err || !bet) {
            redirect(path_to.bets());
        } else {
            this.bet = bet;
            next();
        }
    }.bind(this));
}

function authenticate_user() {
    if(session.user=={} || session.user==null){
        redirect(path_to.bets);
    }
    next();
    console.log("authentication end");
}
