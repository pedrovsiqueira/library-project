const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// books
router.get('/books', (req, res, next) => {
  Book
    .find()
    .then(books => {
      // console.log(booksFromMongoDB);
      res.render('books', {
        books
      });

    })
    .catch(error => console.log(error));
});

// book detail route

router.get('/book/:bookId', (req, res) => {
  const {
    bookId
  } = req.params;

  Book
    .find({
      _id: bookId
    })
    .then(book => {
      console.log(book);
      res.render('book-details', {
        book: book[0]
      });
    })
    .catch(error => console.log(error));
})



module.exports = router;