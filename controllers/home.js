const Movie = require('../models/movie');

module.exports = {
    index,
};


///aggregate and populate the front page movies
function index(req, res) {
    Movie.aggregate([{ $addFields: { usersLength: { $size: "$users" } } }, { $sort: { usersLength: -1 } }, { $limit: 5 }]).exec(function (err, aggMovies) {
        console.log(aggMovies)
        aggMovies.populate('comments').exec(function (err, movies) {
            res.render('home', { title: 'HOME SCREEN', movies });
        }
        );
    });
}

