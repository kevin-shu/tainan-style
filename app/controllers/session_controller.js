load('application');

action('login', function () {
    User.findOne({'uid':params.uid}, function (err, user) {
        //check the user
        if (err || !user) { 
            redirect(path_to.new_user);
        } else {
            session.user = user;
            //next();
            redirect('/');
        }
    }.bind(this));
  
//    session.
//    render({
//        title: "session#login"
//    });
});

action('logout', function () {
    render({
        title: "session#logout"
    });
});
