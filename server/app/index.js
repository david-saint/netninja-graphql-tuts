const express = require('express');

const app = express();

// Takes the raw requests and turns them into usable properties on req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// done! we export it so we can start the server in server.js
module.exports = app;
