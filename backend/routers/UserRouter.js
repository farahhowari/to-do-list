const express = require('express');
const { auth, getAllUsers, createuser, UpdateUserByID, deleteUserById, login } = 
require('../controllers/UserController');

const router = express.Router();

router.get('/Users',auth, getAllUsers);
router.post('/createuser', createuser);
router.put('/updateUser/:id', UpdateUserByID);
router.delete('/deleteUser/:id', deleteUserById);
router.post('/login', login);
router.get('/auth', auth);

module.exports = router;

