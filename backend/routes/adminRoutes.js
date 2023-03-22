const router = require('express').Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const { addBook, removeBook } = require('../controllers/bookController');
const { transactionsRecord } = require('../controllers/transactionController');
const validateToken = require('../middlewares/validateToken');


router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

router.post('/addbook', validateToken, addBook);
router.delete('/removebook/:bookname', validateToken, removeBook);

router.get('/allbooks', validateToken, transactionsRecord);


module.exports = router;