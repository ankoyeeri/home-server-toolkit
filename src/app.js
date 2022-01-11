//  Modules
const express = require('express');


//  Initialization
const app = express();
const FileManagerRouter = require('./routers/file_manager_router');
const HomeRouter        = require('./routers/home_router');

//#region HTTP Server
//  --- Middleware ---
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
app.use('/files', FileManagerRouter);

app.listen(8080, () => {
    console.log('Server is now running in port 8080.');
});
//#endregion