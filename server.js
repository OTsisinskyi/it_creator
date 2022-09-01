const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

let mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "demodemmoo12@gmail.com",
		pass: "dsozgorppxjabxpg"
	}
})

function sendData(username, email, text) {
	let details = {
		from: "demodemmoo12@gmail.com",
		to: email,
		subject: "IT_Academy_Creator",
		text: "Hello, " + username + ", this is your data: " + text + " !!!"
	}
	mailTransporter.sendMail(details, (err) => {
		if (err) {
			console.log(err)
		}
	})
}

app.post('/api/user-data', (req, res) => {
	const body = req.body;
	sendData(body.username, body.mail, body.text);
	res.redirect("/");
})


app.listen(PORT, () => {
	console.log(`Server started on port http://localhost:${PORT}`)
})


