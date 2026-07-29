const express = require('express');
const router = express.Router();

const { createUser, getUserById, userLogin } = require('../controller/userController');

router.get('/', (req, res) => {
    res.json({
        message: "User route is working",
    });
});

router.post('/signup', createUser);
router.get('/:id', getUserById);
router.post('/login', userLogin);

module.exports = router;