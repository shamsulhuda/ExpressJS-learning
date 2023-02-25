const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello Express JS!');
});

app.listen(port, () => {
    console.log(`Listening port:: ${port}`);
});
