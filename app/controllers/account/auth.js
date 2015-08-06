var passport = require('passport');


exports.session = function(req, res, next) {

  if(req.user) {

    res.send({
      user: {
        first: req.user.first,
        last: req.user.last,
        username: req.user.username,
        email: req.user.email
      },
      msg: "Current user found."
    });
  }
  else { res.status(401).send({ msg: "No current user." }); }

};


exports.quick_auth = function(req, res, next) {

  if(req.isAuthenticated()) { return next(); }
  else { res.status(401).send({ msg: "No current user." }); }

}


exports.authenticate = function(req, res, next) {

  req.body.username = req.body.username.toLowerCase();

  var auth = passport.authenticate('local', function(err, user) {

    if(err) return next(err);
    if(!user) res.status(400).send({ msg: "Incorrect username or password." });

    req.logIn(user, function(err) {

      if(err) return next(err);

      res.send({
        user: {
          first: user.first,
          last: user.last,
          username: user.username,
          email: user.email
        },
        msg: "Logged in successfully."
      });

    });
  });

  auth(req, res, next);

};


exports.logout = function(req, res, next) {

  req.logout();
  res.send({
    msg: "Logged out successfully."
  });

};
