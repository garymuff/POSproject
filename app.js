const express = require('express')
const app = express()
const db = require('./public/admin/db')

db.query("SELECT * from users;");

app.get('/health', (req, res) => res.send('Server up and running!'));


app.all('/', function (req, res) {
 	res.sendFile(__dirname + '/public/login.html');
});

app.use(express.static("public"));

app.listen(process.env.PORT || 1234, () => console.log('App listening on port 1234!'));