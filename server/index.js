const express = require('express');
const app = express();
const port = 1337;
const common_path = '/api';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});

app.get(`${common_path}/hello`, (req, res) => {
    res.send('Hello World!');
});

/**
 * Expected request body:
 * {
 *    "speech": string
 * }
 * 
 * Promised response body:
 * 
 * TBD
 * 
 */
app.post(`${common_path}/get-voice-commands`, (req, res) => {
    console.log("get-voice-commands endpoint called");
    console.log(req.body);

    let nlp = require('./services/nlp');

    // data = nlp.processString(req.body.speech);

    res.json(req.body);
    
});