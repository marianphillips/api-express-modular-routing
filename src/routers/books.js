// Import data here...
const express = require("express");
const router = express.Router();
const data = require("../../data");

// Write routes here...

router.get("/", (req, res) => {
  res.json({ books: data.books });
});

router.get("/:bookId", (req, res) => {
  const book = data.books.find(
    (book) => book.id === parseInt(req.params.bookId)
  );
  res.send(book);
});

router.post("", (req, res) => {
  const newBook = {
    id: data.books.length + 1,
    title: req.body.book.title,
    type: req.body.book.type,
    author: req.body.book.author,
  };

  data.books.push(newBook);
  res.send(data.books);
});

router.delete("/:id", (req, res) => {
  const numberId = parseInt(req.params.id);
  let deletedBook = data.books.find((book) => book.id === numberId);

  if (!deletedBook) {
    res.status(404);
    res.json({ error: "book not found" });
    return;
  }

  data.books = data.books.filter((book) => book.id !== numberId);
  res.json(deletedBook);
});

router.put("/:id", (req, res) => {
  const numberId = parseInt(req.params.id);

  const existingBook = data.books.find((book) => book.id === numberId);

  if (!existingBook) {
    res.status(404);
    res.json({ error: "book does not exist" });
    return;
  }

  if (!req.body.title && !req.body.type && !req.body.author) {
    res.status(404);
    res.json({ error: "incorrect information supplied" });
    return;
  }

  for (let info in req.body) {
    existingBook[info] = req.body[info];
  }

  res.json({ user: existingBook });
});

module.exports = router;
