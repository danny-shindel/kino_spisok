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
};

function index(req, res) {
  res.render('movies/index', { title: 'All Movies'});
}

function newMovie(req,res) {
  res.render('movies/new', {title: 'New Movie'})
}


//info from form on req.query
async function search(req,res) {
  const title = req.query.title;
  if (!title) return res.render('movies/new', { title: 'New Movie' });
  const apiResult = await fetch(`${searchURL}${title}&type=movie`).then(res => res.json());
  const movies = apiResult.Search;
  // movies.forEach(function(movie){
  //   const infoMovie = fetch(`${saveURL}${movie.imdbID}`)
  //   let a = infoMovie.Director;
  //   console.log(infoMovie)
  // })
  // console.log(movies)
  res.render('movies/search', {movies})
}

async function create(req, res) {
  console.log(req.body.imdb)
  const apiResult = await fetch(`${saveURL}${req.body.imdb}`).then(res => res.json());
  Movie.create({},function(err,movie){
    movie.info = apiResult
    console.log(movie.info.Title)
    console.log(movie.user)
    movie.users = [req.user._id]
    console.log(movie.users)
    movie.save(function(err){
      res.render('movies/index', { title: 'All Movies' });
    });
  })
}
