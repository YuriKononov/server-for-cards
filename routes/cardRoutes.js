const express = require('express');
const router = express.Router();
const cardControllers = require('../controllers/cardControllers')


router.get('/', cardControllers.getUsers);
router.post('/', cardControllers.addUser);
router.delete('/', cardControllers.deleteUser);
router.patch('/', cardControllers.editUser);

module.exports = router;