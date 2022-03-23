const express = require("express");
const router = express.Router();
const data = require("../../data");

router.get('/', (req,res) => { 
    if(req.query.director) {
     res.json(data.films.filter(film => film.director === req.query.director))
    } 
    else{ res.json({films: data.films})}
  })
  
  router.get('/:filmId', (req,res) => {  
    const film = data.films.find(film => film.id === parseInt(req.params.filmId))
    res.send(film)
  })
  
  router.post('/', (req,res) => {  
    const newFilm = {
      id: data.films.length+1,
      "title": req.body.film.title,
      "director": req.body.film.director,
    }
    data.films.push(newFilm)
    res.send(data.films)
  })

  router.delete("/:id", (req, res) => {
    const numberId = parseInt(req.params.id);
    let deletedFilm = data.films.find((film) => film.id === numberId);
  
    if (!deletedFilm) {
      res.status(404);
      res.json({ error: "film not found" });
      return;
    }
  
    data.films = data.films.filter((film) => film.id !== numberId);
    res.json(deletedFilm);
  });

  router.put("/:id", (req, res) => {
    const numberId = parseInt(req.params.id);
  
    const existingFilm = data.films.find((film) => film.id === numberId);
  
    if (!existingFilm) {
      res.status(404);
      res.json({ error: "film does not exist" });
      return;
    }
  
    if (!req.body.title && !req.body.director) {
      res.status(404);
      res.json({ error: "incorrect information supplied" });
      return;
    }
  
    for (let info in req.body) {
        existingFilm[info] = req.body[info];
    }
  
    res.json({ user: existingFilm });
  });

  module.exports = router