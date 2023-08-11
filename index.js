const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/webhooks', (req, res) => {
    var file = path.join(__dirname, 'home.html');
    res.sendFile(file);
});

app.get('/', (req, res) => {
    var file = path.join(__dirname, 'home.html');
    res.sendFile(file);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
