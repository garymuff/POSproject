const express = require('express')
const app = express()

app.get('/health', (req, res) => res.send('Server up and running!'));

app.all('/', function (req, res) {
 	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static("public"));

app.listen(process.env.PORT || 5000, () => console.log('App listening on port 5000!'));