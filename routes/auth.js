const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/auth');
const authMiddleware = require('../config/auth');
const User = require('../models/messages');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// route protégée nécessitant une authentification
router.get('/profile', authMiddleware, (req, res) => {
  User.findById(req.auth.userId) // Recherche de l'utilisateur par son ID
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      // Si l'utilisateur est trouvé, renvoyer toutes ses informations
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'utilisateur" });
    });
});

router.put('/profile', authMiddleware, (req, res) => {
  // Récupérer les valeurs à mettre à jour à partir du corps de la requête
  let updateValues = { ...req.body };

  // Supprimer les propriétés qui ne doivent pas être mises à jour
  delete updateValues._id;
  delete updateValues._userId;

  // Mettre à jour l'utilisateur
  User.findOneAndUpdate({ _id: req.auth.userId }, updateValues, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ message: 'Utilisateur modifié!', user });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

const passwordResetCtrl = require('../controllers/auth');

// Route pour la demande de réinitialisation de mot de passe
router.post('/forgot-password', passwordResetCtrl.forgotPassword);

// Route pour la réinitialisation du mot de passe avec un token
router.post('/reset-password', passwordResetCtrl.resetPassword);

module.exports = router;
