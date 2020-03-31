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

//create book routes
//get form

router.get('/book-add', (req, res) =>{
  res.render('book-add')
})

//post add book
router.post('/book-add', (req, res) => {
  console.log('body: ', req.body)
  
  const {
    title,
    author, 
    description,
    rating
  } = req.body

  //using new keyword by instance

  const newBook = new Book({
    title,
    author,
    description,
    rating
  })

  newBook.save()
  .then(response => {
    console.log(response)
    res.redirect('/books')
  })
  .catch(error => console.log(error))

  //using crete method of Model

})

module.exports = router;