//  Modules
const express       = require('express');
const FileManager   = require('../server_modules/file-manager/file_manager');

//  Initialization
const router = express.Router();


const fileManager = new FileManager({
    path: `${process.env.HOME}/home_server/files/`
});

//  Routing
router.route('/*')
.get((request, response, next) => {
    fileManager.readPath(request.url)
    .then(data => {
        if (Array.isArray(data)) {
            response.send(data);
        } else {
            response.sendFile(data.toString());
        }
    })
    .catch(error => {
        next(error.message);
    });
})
.post((request, response, next) => {
    fileManager.addItem(request.url, request.body)
    .then(() => {
        response.send();
    })
    .catch(error => {
        next(error.message);
    });
})
.put((request, response, next) => {
    response.send(`PUT: ${request.url}`);
})
.delete((request, response, next) => {
    response.send(`DELETE: ${request.url}`);
});


module.exports = router;