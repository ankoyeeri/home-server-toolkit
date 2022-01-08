//  Modules
const express = require('express');


//  Initialization
const app = express();

//#region Server
//  Middleware
app.use(express.json());

//  Routing
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

app.listen(8080, () => {
    console.log('Server is now running in port 8080.');
})
//#endregion