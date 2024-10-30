exports.getDashboard = (req, res) => {
    if (req.session.isLoggedIn) {
        res.render('dashboard', { username: req.session.username });
    } else {
        res.redirect('/login');
    }
};
