const Movie = require('../models/movie');

module.exports = {
    create,
    delete: deleteComment,
}

function create(req, res) {
    if (!req.body.content) return res.redirect('/'); 
    Movie.findById(req.params.id, function (err, movie) {
        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;
        movie.comments.push(req.body);
        movie.save(function (err) {
            Movie.aggregate([{ $addFields: { numUsers: { $size: '$users' } } }, { $sort: { numUsers: -1 } }, { $limit: 5 }])
                .then(movies => res.render('home', { title: 'HOME SCREEN', movies, page: 'home', dropdown: true, dd: movie.info.imdbID }));
        });
    });
}

function deleteComment(req, res, next) {
    Movie.findOne({ 'comments._id': req.params.id }).then(function (movie) {
        const comment = movie.comments.id(req.params.id);
        if (!comment.user.equals(req.user._id)) return res.redirect("/");
        comment.remove();
        movie.save().then(function () {
            Movie.aggregate([{ $addFields: { numUsers: { $size: '$users' } } }, { $sort: { numUsers: -1 } }, { $limit: 5 }])
                .then(movies => res.render('home', { title: 'HOME SCREEN', movies, page: 'home', dropdown: true, dd: movie.info.imdbID }));
        }).catch(function (err) {
            return next(err);
        });
    });
}

