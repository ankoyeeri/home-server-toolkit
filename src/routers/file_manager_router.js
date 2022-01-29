//  Modules
const express       = require('express');
const url           = require('url');
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
    if (request.query.type) {
        switch (request.query.type) {
            case 'file':
                console.log('File saving...');
                if (!request.files) {
                    response.status(500).send('No file uploaded');
                    return;
                }

                let file = request.files.file;
                file.mv(fileManager.current_path + '/' + file.name);
                response.send();
                break;
            case 'dir':
                fileManager.addDir(request.path)
                .then(() => {
                    response.send();
                })
                .catch(error => {
                    next(error.message);
                });
                break;
            default:
                break;
        }
    } else {
        response.status(300);
    }

})
.put((request, response, next) => {
    response.send(`PUT: ${request.url}`);
})
.delete((request, response, next) => {
    if (request.query.type) {
        fileManager.deleteItem(request.path, request.query.type)
        .then(data => {
            if (!data) {
                response.status(500);
            }

            response.status(200);
        })
        .catch(error => {
            next(error.message);
        })
    }

    response.send(`DELETE: ${request.url}`);
});


module.exports = router;