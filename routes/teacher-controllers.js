// Imports
const bcrypt = require("bcryptjs");
const jwtUtils = require("../utils/jwt.utils");
const models = require("../models");
const asyncLib = require("async");

// REGEX
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{8,32}$/;

function htmlSpecialChars(text) {
	if (text) {
		return text
    	.replace(/&/g, "&amp;")
    	.replace(/</g, "&lt;")
    	.replace(/>/g, "&gt;")
    	.replace(/"/g, "&quot;")
    	.replace(/'/g, "&#039;");
	}
}

// Routes
module.exports = {
	register: (req, res) => {
		let currentDate = new Date();

		function generateUUID() {
			let generatedStringUUID = currentDate.getTime().toString(10).substring(1);
			let parsedUUID = parseInt(generatedStringUUID);

			while (parsedUUID.toString(10).length !== 12) {
				generateUUID();
			}

			return parsedUUID;
		}

		// Params
		let UUID = generateUUID();
		let surname = htmlSpecialChars(req.body.surname);
		let name = htmlSpecialChars(req.body.name);
		let password = htmlSpecialChars(req.body.password);
		let establishment = htmlSpecialChars(req.body.establishment);
		let timezone = htmlSpecialChars(req.body.timezone);
		let email = htmlSpecialChars(req.body.email);
		let displayName = htmlSpecialChars(req.body.displayname);

		if (surname == null || surname == "" || name == null || name == "" || establishment == null || establishment == "" || timezone == null || timezone == "" || email == null || email == "" || displayName == null || displayName == "") return res.status(400).json({ error: "missing parameters" });

		if (surname.length > 32 || surname.length < 2) return res.status(400).json({error: "wrong surname (must be length 2 - 32)"});

		if (name.length > 32 || name.length < 2) return res.status(400).json({error: "wrong name (must be length 2 - 32)"});

		if (!EMAIL_REGEX.test(email)) return res.status(400).json({error: "email is not valid"});

		if (!PASSWORD_REGEX.test(password)) return res.status(400).json({error: "password invalid (must length 8 - 32 and include 1 number"});

		if (establishment.length > 48) return res.status(400).json({error: "establishment is too long"});

		if (displayName.length > 48) return res.status(400).json({error: "displayname is too long"});

		// Verifying if user is already registered
		models.Teacher.findOne({
			attributes: ["Email"],
			where: {Email: email}
		})
		.then(userFound => {
			if (!userFound) {
				bcrypt.hash(password, 10, (err, bcryptedPassword) => {
					let newUser = models.Teacher.create({
						UUID: UUID,
						Surname: surname,
						Name: name,
						Password: bcryptedPassword,
						Establishment: establishment,
						Timezone: timezone,
						Email: email,
						DisplayName: displayName,
						AvatarPath: null
					})
					.then(newUser => {
						return res.status(201).json({UUID: newUser.UUID});
					})
					.catch(err => {
						return res.status(500).json({error: "cannot add user"});
					});
				});
			} else {
				return res.status(409).json({error: "email is already taken"});
			}
		})
		.catch(err => {
			return res.status(500).json({error: "unable to verify user"});
		});
	},
	login: (req, res) => {
		
		// Params
        let email    = req.body.email;
        let password = req.body.password;


        // Send error if email or password isn't set
        if (email == null || email == "" || password == null || password == "") {
            return res.status(400).json({error: 'missing parameters'});
        }

        models.Teacher.findOne({
            where: {Email: email}
        })
        .then(userFound => {
            if (userFound) {

                bcrypt.compare(password, userFound.Password, (errBycrypt, resBycrypt) => {
                    if (resBycrypt) {
                        return res.status(200).json({UserId: userFound.UserId, token: jwtUtils.generateTokenForUser(userFound)});
                    } else {
                        return res.status(403).json({error: 'invalid email or password'});
                    }
                });

            } else {
                return res.status(404).json({error: 'invalid email or password'});
            }
        })
        .catch((err) => {
            return res.status(500).json({error: 'unable to verify user'});
        });

	},
	count: (req, res) => {
		models.Teacher.count()
		.then(count => {
			return res.status(200).json({count: count});
		})
		.catch(err => {
			return res.status(500).json({error: "unable to access database"});
		});
	}
};