var auth = require('../controllers/account/auth');
var movies = require('../controllers/movies/movies');


module.exports = function(app) {

  app

    // auth routes
    .get('/session', auth.session)
    .post('/login', auth.authenticate)
    .post('/logout', auth.logout)

    // auth required for any route below this
    .all('*', auth.quick_auth)

    // movie routes
    .get('/movies', movies.getMovies)
    .get('/movies/:id', movies.getMovieByID)
    .get('/movies/play/:id', movies.playMovieByID);

};
