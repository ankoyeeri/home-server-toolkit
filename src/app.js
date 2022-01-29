//  Modules
const express       = require('express');
const fileUpload    = require('express-fileupload');
const cors          = require('cors');
const fm_config     = require('./server_modules/file-manager/configuration');

//  Config
const config = require('./config/default.json');
const port = config.app.port;
const fm_path = config.server_modules.file_manager.storage_path;

//  Initialization
const app = express();
fm_config.buildConfig({ path: fm_path });   //  File Manager configuration
const FileManagerRouter = require('./routers/file_manager_router');
const HomeRouter        = require('./routers/home_router');


//#region HTTP Server
//  --- Middleware ---
app.use(fileUpload({
    createParentPath: true
}));
app.use(express.json());


//  CORS enabling  
app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5500');
    
    response.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Request-With, Content-Type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


//  --- Routing ---
app.get('/', (request, response) => {
    response.header({
        'Content-Type': 'application/json'
    });

    response.send(JSON.stringify({
        title: 'Home Server',
        time: new Date(),
        environment: {
            username: process.env.USERNAME,
            shell: process.env.SHELL,
            language: process.env.LANG,
            path: process.env.PATH
        }
    }));
});

app.use('/home', HomeRouter);
app.post('/error', (request, response) => {
    console.log(request.body);
    response.send();
});
app.use('/api/files', FileManagerRouter);

app.listen(port, () => {
    console.log(`Server is now running at port ${port}.`);
});
//#endregion