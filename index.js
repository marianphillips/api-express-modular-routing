const express = require("express");
const app = express();
const port = 3030;

const cors = require("cors");
const morgan = require("morgan");

// SETUP MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// REQUIRE ROUTERS
const usersRouter = require("./src/routers/users");
const data = require('./data')



// ADD ROUTERS TO APP
app.get('/users', (req,res) => {  
  res.json({users: data.users})
})

app.get('/users/:userId', (req,res) => {  
  const user = data.users.find(user => user.id === parseInt(req.params.userId))
  res.send(user)
})

app.post('/users', (req,res) => {  
  const newUser = {
    id: data.users.length+1,
    email: req.body.email
  }
  data.users.push(newUser)
  res.send(data.users)
})

app.get('/books', (req,res) => {  
  res.json({books: data.books})
})

app.get('/books/:bookId', (req,res) => {  
  const book = data.books.find(book => book.id === parseInt(req.params.bookId))
  res.send(book)
})

app.post('/books', (req,res) => {  
  const newBook = {
    id: data.books.length+1,
    "title": req.body.book.title,
    "type": req.body.book.type,
    "author": req.body.book.author
  }

  data.books.push(newBook)
  res.send(data.books)
})

app.get('/films', (req,res) => {  
  res.json({films: data.films})
})

app.get('/films/:filmId', (req,res) => {  
  const film = data.films.find(film => film.id === parseInt(req.params.filmId))
  res.send(film)
})

app.post('/films', (req,res) => {  
  const newFilm = {
    id: data.films.length+1,
    "title": req.body.film.title,
    "director": req.body.film.director,
  }
  data.films.push(newFilm)
  res.send(data.films)
})

/* START SERVER */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
