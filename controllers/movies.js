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
    res.render('movies/index', { title: 'My Movies', movies, page:'movies' });
  })
}

function seenIndex(req, res) {
  Movie.find({ seenUsers: req.user._id }, function (err, movies) {
    res.render('movies/seen', { title: 'Seen Movies', movies, page: 'seen' });
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
  res.render('movies/new', { title: 'New Movie', page: 'add', message: '', search: ''})/////
}


//info from form on req.query
async function search(req,res) {
  console.log(req.query.title)
  const title = req.query.title;
  if (!title) return res.render('movies/new', { title: 'New Movie', page: 'add', message: "PLEASE ENTER A TITLE", search: ''});////
  const apiResult = await fetch(`${searchURL}${title}&type=movie`).then(res => res.json());
  const search = apiResult.Search;
  console.log(req.query.title)
  if (!search) return res.render('movies/new', { title: 'New Movie', page: 'add', message: "MOVIE CANT BE FOUND. CHECK SPELLING", search:req.query.title});///add that movie cant be found or misspelled
  for (i=0;i < search.length; i++){
    const infoMovie = await fetch(`${saveURL}${search[i].imdbID}`).then(res => res.json());
    console.log(search[i].Poster)
    if (search[i].Poster === "N/A") search[i].Poster = "https://i.imgur.com/9aAnclH.png";
    let director = infoMovie.Director;
    let plot = infoMovie.Plot;
    search[i].Director = director;
    search[i].Plot = plot;
  }
  const seen = [];
  const movies = search.filter(movie => {
    if (seen.includes(movie.imdbID)) {
      return false;
    }
    seen.push(movie.imdbID);
    return true;
  });
  if (!movies) return res.render('movies/new', { title: 'New Movie', page: 'add' }); ///add that movie cant be found or misspelled
  res.render('movies/search', { movies, title: "search", page: 'add'})
}

function create(req, res) {
  Movie.findOne({ 'info.imdbID': req.body.imdb }).exec(async function(err,movie){
    if (movie){
      if (movie.users.includes(req.user._id) || movie.seenUsers.includes(req.user._id)) {
        res.render('movies/new', { title: 'New Movie', page: 'add', message: "MOVIE ALREADY SAVED", search: '' })//////
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
