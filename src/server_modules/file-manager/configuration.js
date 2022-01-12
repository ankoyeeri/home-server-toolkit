//  Modules
const fs = require('fs');
const rl = require('readline-sync');


class FileManagerConfigurator {
    static buildConfig(configuration) {
        if (configuration != null) {
            if (configuration.hasOwnProperty('path')) {
                FileManagerConfigurator.path = buildPath(configuration.path);
            } else {
                throw new Error('Error: FileManagerConfigurator: no path specified');
            }
        } else {
            console.log('null');
        }
    };

    static path = new String();
}

function buildPath(path = new String()) {
    if (path.match(/\$HOME/g)) {
        path = path.replace('$HOME', process.env.HOME); 
    } 

    if (fs.existsSync(path)) {
        console.log('Path found');
    } else {
        console.log('Path not found.');
        switch (rl.question('Do you want to create a new folder according to selected path? [Y/n]: ')) {
            case '':
            case 'y':
                console.log('Creating folder: ', fs.mkdirSync(path, {
                    recursive: true
                }));
                console.log('Folder successfully created');
                break;
            case 'n':
                console.log('Cancelling...');
                process.exit(0);
            default:
                console.log('Wrong command. Cancelling...')
                process.exit(0);
        }
    }

    return path;
}

module.exports = FileManagerConfigurator;