const express = require('express');
const app = express();

app.get('/getStatus', (res, req) => {
    res.send('This is status');
    console.log("This is status.");
});

app.listen(9000, () => {
    console.log('Test server listening on port 9000!');
});