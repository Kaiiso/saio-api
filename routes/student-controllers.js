// Imports
const bcrypt = require('bcryptjs');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const asyncLib = require('async');

// REGEX
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{8,32}$/;

// Routes
module.exports = {
    create: (req, res) => {
        /*
        // Params
        let surname    = req.body.surname;
        let name     = req.body.name;
        let password = req.body.password;
        let bio      = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if (username.length > 16 || username.length < 4) {
            return res.status(400).json({'error': 'wrong username (must be length 4 - 16)'});
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({'error': 'email is not valid'});
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({'error': 'password invalid (must length 8 - 32 and include 1 number'});
        }

        // Verifying if user is already registered
        models.users.findOne({
        attributes: ['email'],
        where: {email: email}
        })

        .then((userFound) => {
            if(!userFound) {
                bcrypt.hash(password, 10, (err, bcryptedPassword) => {
                    let newUser = models.users.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then((newUser) => {
                        return res.status(201).json({'id': newUser.id})
                        let userlabel = document.querySelector('#username');
                        userlabel.innerHTML = newUser.username;
                    })
                    .catch((err) => {
                        return res.status(500).json({'error': 'cannot add user'});
                    });
                });

            } else {
                return res.status(409).json({'error': 'email is already taken'});
            }
        })
        .catch((err) => {
            return res.status(500).json({'error': 'unable to verify user'});
        });
        */

    },
    list: (req, res) => {
        
        models.Student.findAll({
            attributes: ['UserId', 'Surname', 'Name']
        })
        .then((userFound) => {
            if (userFound) {
                return res.status(200).json({'student': userFound});
            }
        })
        .catch((err) => {
            return res.status(500).json({'error': 'unable to access database'});
        })

    },
    count: (req, res) => {

        models.Student.count().then(count => {
            return res.status(200).json({'count': count});
        })
        .catch((err) => {
            return res.status(500).json({'error': 'Accès à la base de donnée impossible'});
        });

    }
}