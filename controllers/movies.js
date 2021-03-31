const fetch = require('node-fetch');
const token = process.env.MDB_TOKEN;
const searchURL = `http://www.omdbapi.com/?apikey=${token}&s=`;
const saveURL = `http://www.omdbapi.com/?apikey=${token}&i=`;
const Movie = require('../models/movie');


module.exports = {
  index,
  seenIndex,
  new: newMovie,
  unSeen,
  search,
  create,
  delete: deleteMovies,
  rating,
  createRating,
};

function index(req, res) {
  Movie.find({ users: req.user._id }, function(err, movies) {
    let sorted = getLastNames(movies);
    res.render('movies/index', { title: 'My Movies', movies:sorted, page:'movies' });
  })
}

function seenIndex(req, res) {
  Movie.find({ seenUsers: req.user._id }, function (err, movies) {
    let sorted = getLastNames(movies);
    res.render('movies/seen', { title: 'Seen Movies', movies:sorted, page: 'seen' });
  })
}

function getLastNames(movies) {
  let sorted = movies.map(movie => {
    let splitted = movie.info.Director.split(' ');
    let lastName = splitted[splitted.length - 1];
    if (lastName === "N/A") lastName = "zzzzz"
    movie.lastName = lastName;
    return movie;
  });
  sorted.sort((a, b) => a.lastName.localeCompare(b.lastName));
  return sorted
}

function newMovie(req,res) {
  res.render('movies/new', { title: 'New Movie', page: 'add', message: 'PRESS ENTER TO SEARCH', search: ''})
}

function unSeen(req, res) {
  Movie.findById(req.params.id).then(function (movie) {
      const rating = movie.ratings.find(function(rating){
        return rating.user.toString() === req.user._id.toString();
      });
      rating.remove();
      movie.seenUsers.remove(req.user._id);
      movie.users.push(req.user._id);
      movie.save().then(function() {
        res.redirect('/movies/seen')
      })
  })
}

function createRating(req, res){
  Movie.findById(req.params.id).then(function (movie) {
    const rating = movie.ratings.find(function (rating) {
      return rating.user.toString() === req.user._id.toString();
    });
    if (rating) rating.remove();
    req.body.user = req.user._id
    movie.ratings.push(req.body)
    console.log(req.body.rating)
    movie.users.remove(req.user._id);
    movie.seenUsers.push(req.user._id);
    movie.save().then(function () {
      res.redirect('/movies')
    }).catch(function (err) {
      return next(err);
    });
  })    
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
          if (req.query.home) return res.redirect('/');
          res.redirect('/movies');
        })
      }
    } else {
      const apiResult = await fetch(`${saveURL}${req.body.imdb}`).then(res => res.json());
      Movie.create({}, function (err, movie) {
        movie.info = apiResult
        if (movie.info.Poster === "N/A") movie.info.Poster = "https://i.imgur.com/9aAnclH.png";
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
///page will be pased in through req.query, go back res,redirect will also be passed in through req.query

function rating(req,res){
  Movie.findById(req.params.id).then(function (movie) {
    res.render('movies/rating', { movie, title: "rating", page: "seen" });
  })
}
