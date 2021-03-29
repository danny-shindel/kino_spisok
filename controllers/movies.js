const fetch = require('node-fetch');
const token = process.env.MDB_TOKEN;
const searchURL = `http://www.omdbapi.com/?apikey=${token}&s=`;
const saveURL = `http://www.omdbapi.com/?apikey=${token}&i=`;
const Movie = require('../models/movie');


module.exports = {
  index,
  new: newMovie,
  search,
  create,
  seenIndex,
  addSeen,
  delete: deleteMovies,
};

function index(req, res) {
  Movie.find({users: req.user._id}, function(err,movies){
    res.render('movies/index', { title: 'My Movies', movies });
  })
}

function seenIndex(req, res) {
  Movie.find({ seenUsers: req.user._id }, function (err, movies) {
    res.render('movies/seen', { title: 'Seen Movies', movies });
  })
}

function addSeen(req, res) {
  Movie.findById(req.params.id).then(function (movie) {
    if (movie.users.includes(req.user._id)){
      movie.users.remove(req.user._id);
      movie.seenUsers.push(req.user._id);
      movie.save().then(function () {
        res.redirect('/movies');
      }).catch(function (err) {
        return next(err);
      });
    } else {
      movie.seenUsers.remove(req.user._id);
      movie.users.push(req.user._id);
      movie.save().then(function() {
        res.redirect('/movies/seen')
      })
    }
  })
}


function newMovie(req,res) {
  res.render('movies/new', {title: 'New Movie'})
}


//info from form on req.query
async function search(req,res) {
  const title = req.query.title;
  if (!title) return res.render('movies/new', { title: 'New Movie' }); ///please enter title
  const apiResult = await fetch(`${searchURL}${title}&type=movie`).then(res => res.json());
  const movies = apiResult.Search;
  console.log(movies)
  let search = [];
  for (i=0;i < movies.length; i++){
    const infoMovie = await fetch(`${saveURL}${movies[i].imdbID}`).then(res => res.json());
    let a = infoMovie.Director;
    let b = infoMovie.Plot;
    movies[i].Director = a;
    movies[i].Plot = b
    search.push(movies[i]);
  }
  if (!movies) return res.render('movies/new', { title: 'New Movie' }); ///add that movie cant be found or misspelled
  res.render('movies/search', {movies, title:"search"})
}///buster scrubs problem

function create(req, res) {
  Movie.findOne({ 'info.imdbID': req.body.imdb }).exec(async function(err,movie){
    if (movie){
      if (movie.users.includes(req.user._id)) { ///you already have this movies in your list
        res.redirect('/')
        return
      } else {
        movie.users.push(req.user._id);
        movie.save(function (err) {
          res.redirect('/movies');
        })
      }
    } else {
      const apiResult = await fetch(`${saveURL}${req.body.imdb}`).then(res => res.json());
      Movie.create({}, function (err, movie) {
        movie.info = apiResult
        movie.users = [req.user._id]
        movie.save(function (err) {
          res.redirect('/movies');
        });
      })
    }
  })
}

function deleteMovies(req, res){
  Movie.findById(req.params.id).then(function (movie) {
    movie.seenUsers.remove(req.user._id);
    movie.users.remove(req.user._id);
    movie.save().then(function () {
      res.redirect('/movies');
    }).catch(function (err) {
      return next(err);
    });
  });
}
