const Message = require('../models/messages');
const nodemailer = require('nodemailer');

exports.createMessage = async (req, res) => {
    const { nom, sujet, email, message } = req.body;
    try {
        const newMessage = new Message({ nom, sujet, email, message });

        await newMessage.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'wadendioneawa@gmail.com',
                pass: 'CoumbaAbasse1419',
            }
        });

        const mailOptions = {
            from: email,
            to: 'wadendioneawa@gmail.com',
            subject: `Message de ${nom}: ${sujet}`,
            text: message
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send("Message envoyé avec succès et enregistré dans la base de données");
        });

    } catch (error) {
        res.status(500).send('Une erreur est survenue');
    }
};
