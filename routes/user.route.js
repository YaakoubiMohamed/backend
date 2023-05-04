const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
//GET all user
router.get('/vendeur', userController.getVendeurs);

router.get('/client', userController.getClients);

//GET a single user by ID 
router.get('/:id', userController.getUserById);

//post a new user
router.post('/', userController.createUser);
//put update an existing user by ID 
router.put('/:id', userController.updateUser);
// DELETE a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;