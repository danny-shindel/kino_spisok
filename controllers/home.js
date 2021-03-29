const Movie = require('../models/movie');

module.exports = {
    index,
};

function index(req, res) {
    Movie.aggregate([{ $addFields: { numUsers: { $size: '$users' } } }, { $sort: { numUsers: -1 } }, { $limit: 5 }])
    .then(movies => res.render('home', { title: 'HOME SCREEN', movies, page:'home' }));
}

