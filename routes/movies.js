var express = require('express');
var router = express.Router();
const moviesCtrl = require('../controllers/movies');
const isLoggedIn = require('../config/auth');


router.get('/', isLoggedIn, moviesCtrl.index);
router.get('/new', isLoggedIn, moviesCtrl.new);
router.get('/search', isLoggedIn, moviesCtrl.search);
router.post('/create', isLoggedIn, moviesCtrl.create);

module.exports = router;