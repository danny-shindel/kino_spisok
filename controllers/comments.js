const Movie = require('../models/movie');
const Comment = require('../models/comment');

module.exports = {
    create,
}

function create(req,res){
    console.log(req.body);
    Comment.create(req.body,function(err,comment){
        comment.user = req.user._id;
        comment.userName = req.user.name;
        comment.userAvatar = req.user.avatar;
        let commentID = comment._id;
        console.log(commentID)
        comment.save(function(err){
            Movie.findById(req.body.movieID, function(err,movie){
                if (movie.comments.length){
                    movie.comments.push(commentID);
                    movie.save(function(err){
                        res.redirect('/')
                    })
                } else {
                    console.log("create")
                    movie.comments = [commentID];
                    movie.save(function (err) {
                        res.redirect('/')
                    })
                }   
            })
        })
    })
        
}
