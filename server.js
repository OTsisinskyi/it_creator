const express = require("express");
let fileUpload = require("express-fileupload");
const cors = require('cors');
const nodemailer = require("nodemailer");

// https://gentle-dusk-44061.herokuapp.com/
const app = express();
app.use(cors())
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

function sendData(resultData, callback) {
	let username = resultData.username;
	let email = resultData.email;
	let text = resultData.text;

	let mailTransporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "demodemmoo12@gmail.com",
			pass: "dsozgorppxjabxpg"
		}
	})

	let details = {
		from: "demodemmoo12@gmail.com",
		to: email,
		subject: "IT_Academy_Creator",
		text: "Hello, " + username + ", this is your data: " + text + " !!!"
	}
	mailTransporter.sendMail(details, (err) => {
		if (err) {
			return callback(false);
		}
		else {
			return callback(true);
		}
	})
}

app.post("/form-data", (req, res) => {
	sendData(req.body, function (response) {
		res.send(response)
	});

});


app.listen(5000, () => {
	console.log("Server started on port http://localhost:5000");
});



