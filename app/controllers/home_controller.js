load('application');

action('index', function () {
    flash('user',session.cookie);
    console.log(session.user);
    render({
        title: "ibetu - all you can bet"
    });
});
