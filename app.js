const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Server up on running!'));

app.all('/index', function (req, res) {
 	res.sendFile(__dirname + '/public/index.html');
});

app.use(express.static("public"));

app.listen(1234, () => console.log('Example app listening on port 1234!'));