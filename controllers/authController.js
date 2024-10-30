const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        req.session.isLoggedIn = true;
        req.session.username = user.username;
        return res.redirect('/dashboard');
    } else {
        return res.status(400).send('Invalid credentials');
    }
};

exports.getRegister = (req, res) => {
    res.render('register')
}

exports.postRegister = async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });

    try {
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(400).send('Error registering user');
    }
};

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.send('Error logging out');
        res.redirect('/login');
    });
};
