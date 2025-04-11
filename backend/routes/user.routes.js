const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.milddleware');


// register route
router.post('/register', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    userController.registerUser
);


// login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
],
    userController.loginUser
);


//logout route
router.get('/logout', authMiddleware.authUser , userController.logoutUser);


module.exports = router;