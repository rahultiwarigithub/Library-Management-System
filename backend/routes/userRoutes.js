const router = require('express').Router();
const { registerUser} = require('../controllers/userController');
const { borrowBook, returnBook } = require('../controllers/transactionController');


router.post('/register', registerUser);

router.post('/books/borrow', borrowBook);
router.put('/books/return', returnBook);


module.exports = router;