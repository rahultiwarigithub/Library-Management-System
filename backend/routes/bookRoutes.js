const router = require('express').Router();
const { getBookStatus, getAllBooks, getAvailableBooks } = require('../controllers/bookController');


router.get('/', getAllBooks);
router.get('/available', getAvailableBooks);
router.get('/status/:bookname', getBookStatus);


module.exports = router;