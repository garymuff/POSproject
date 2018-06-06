const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Server up and running!'));

app.all('/index', function (req, res) {
 	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static("public"));

app.listen(5000, () => console.log('App listening on port 5000!'));