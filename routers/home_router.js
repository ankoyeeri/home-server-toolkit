//  Modules
const express   = require('express');
const path      = require('path');
const fs        = require('fs');

//  Initialization
const router = express.Router();


//  Routing
router.get('/files', (request, response) => {
    response.sendFile(path.resolve(__dirname + '/../views/files.html'));
});

module.exports = router;