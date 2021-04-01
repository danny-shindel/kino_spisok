const Movie = require('../models/movie');

module.exports = {
    index,
};

function index(req, res) {
    console.log(req.query.dropdown)
    Movie.aggregate([{ $addFields: { numUsers: { $size: '$users' } } }, { $sort: { numUsers: -1 } }, { $limit: 5 }])
        .then(movies => res.render('home', { title: 'дом', movies, page: 'home', dropdown: false, dd: 1 }));
}

