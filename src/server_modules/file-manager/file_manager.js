// Modules
const fs    = require('fs');
const path  = require('path');
const mime  = require('mime-types');
const FileManagerConfigurator = require('./configuration');

class FileManager {
    constructor() {
        // FileManagerConfigurator.buildConfig(configuration);
        this.work_path = FileManagerConfigurator.path;
        this.current_path = this.work_path;
    }

    async readPath(usrPath = new String()) {
        this.current_path = path.normalize(this.work_path + (usrPath === '/' ? "" : usrPath));

        if (fs.lstatSync(this.current_path).isDirectory()) {
            return this.#readDir(this.current_path);
        }
        if (fs.lstatSync(this.current_path).isFile()) {
            return this.#readFile(this.current_path);
        }
    }

    async addItem(usrPath = new String(), options) {
        if (options) {
            this.current_path = path.normalize(this.work_path + usrPath);

            if (options.type === 'dir') {
                return fs.mkdirSync(this.current_path);
            } else if (options.type === 'file') {
                return fs.writeFileSync(this.current_path, options.data);
            } else {
                throw new Error('Error: addItem: option.type no specified file type');
            }
        } else {
            throw new Error('Error: addItem: no options');
        }
    }

    #readDir(usrPath = new String()) {
        let dir = fs.readdirSync(usrPath);
        let result = new Array();

        if (this.work_path != this.current_path) {
            result.push({
                item: '🔙',
                type: 'go-back'
            });
        }

        dir.forEach(item => {
            let obj = new Object();
            let itemPath = usrPath + '/' + item;
            let stat = fs.lstatSync(itemPath);
            
            obj.item = item;
            obj.size = stat.size;

            if (stat.isFile()) {
                obj.type = 'file';
                obj.mime = mime.lookup(itemPath);
            }
            if (stat.isDirectory()) {
                obj.type = 'dir';
            }

            result.push(obj);
        });

        return result;
    }

    #readFile(usrPath = new String()) {
        if (fs.existsSync(usrPath)) {
            return usrPath;
        } else  {
            throw new Error('Error: readFile: file is not exists');
        }
    }
}

module.exports = FileManager;