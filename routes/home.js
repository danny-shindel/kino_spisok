const express = require('express');
const router = express.Router();
const passport = require('passport');
const Movie = require('../models/movie');

/* GET home page. */
router.get('/', function(req, res){
  Movie.aggregate([{ $addFields: { numUsers: { $size: '$users' } } }, { $sort: { numUsers: -1 } }, { $limit: 5 }])
    .then(movies => res.render('home', { title: 'дом', movies, page: 'home', dropdown: false, dd: 1 }));
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


module.exports = router;

