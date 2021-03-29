const Movie = require('../models/movie');

module.exports = {
    create,
    delete: deleteComment,
}
function create(req, res) {
    if (!req.body.content){
        res.redirect('/') 
        return;
    }   
    Movie.findById(req.params.id, function (err, movie) {

        req.body.user = req.user._id;
        req.body.userName = req.user.name;
        req.body.userAvatar = req.user.avatar;

        movie.comments.push(req.body);
        console.log(movie)
        movie.save(function (err) {
            res.redirect(`/`);
        });
    });
}

function deleteComment(req, res, next) {
    Movie.findOne({ 'comments._id': req.params.id }).then(function (movie) {
        const comment = movie.comments.id(req.params.id);
        if (!comment.user.equals(req.user._id)) return res.redirect("/");
        comment.remove();
        movie.save().then(function () {
            res.redirect('/');
        }).catch(function (err) {
            return next(err);
        });
    });
}

