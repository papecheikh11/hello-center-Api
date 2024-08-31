const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const messageSchema = mongoose.Schema({
    nom: { type: String, required: true },
    sujet: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },
});

messageSchema.plugin(uniqueValidator);
// Création d'un modèle à partir du schéma
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
