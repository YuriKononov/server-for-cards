const express = require('express');
const projectControllers = require('../controllers/projectControllers');
const router = express.Router();



router.get('/', projectControllers.getProjects);
router.post('/', projectControllers.addProject);
router.delete('/', projectControllers.deleteProject);
router.patch('/', projectControllers.editProject);

module.exports = router;