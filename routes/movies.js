var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');
const isLoggedIn = require('../config/auth');


router.get('/', isLoggedIn, moviesCtrl.index);
router.get('/new', isLoggedIn, moviesCtrl.new);
router.get('/search', isLoggedIn, moviesCtrl.search);
router.get('/seen', isLoggedIn, moviesCtrl.seenIndex);
router.get('/:id/rating', isLoggedIn, moviesCtrl.rating);
router.get('/:id/seen', isLoggedIn, moviesCtrl.unSeen);
router.delete('/:id', isLoggedIn, moviesCtrl.delete);
router.post('/:id/seen', isLoggedIn, moviesCtrl.createRating);
router.post('/create', isLoggedIn, moviesCtrl.create);

module.exports = router;