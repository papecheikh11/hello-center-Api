const express = require('express');
const router = express.Router();
const multer = require('../config/multer');


// Importez vos contrôleurs d'hôtel
const messageController = require('../controllers/Messages');

// Route pour créer un nouvel message
router.post('/send', messageController.createMessage);

module.exports = router;
