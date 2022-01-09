// Modules
const fs = require('fs');
const path = require('path');


class FileManager {
    constructor(configuration) {
        if (configuration) {
            this.work_path = configuration.path;
            this.current_path = configuration.path;
        } else {
            throw new Error('Configuration is empty');
        }
    }

    async readPath(usrPath = new String()) {
        this.current_path = path.normalize(this.work_path + usrPath);

        if (fs.lstatSync(this.current_path).isDirectory()) {
            return this.readDir(this.current_path);
        }
        if (fs.lstatSync(this.current_path).isFile()) {
            return this.readFile(this.current_path);
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

    readDir(usrPath = new String()) {
        let dir = fs.readdirSync(usrPath);
        let result = new Array();

        dir.forEach(item => {
            let obj = new Object();
            let stat = fs.lstatSync(usrPath + '/' + item);
            obj.item = item;
            obj.size = stat.size;

            if (stat.isFile()) {
                obj.type = 'file';
            }
            if (stat.isDirectory()) {
                obj.type = 'dir';
            }

            result.push(obj);
        });
        
        return result;
    }

    readFile(usrPath = new String()) {
        let data = fs.readFileSync(this.current_path);
        let stat = fs.lstatSync(usrPath);
        let obj = new Object({
            item: path.parse(usrPath).base,
            size: stat.size,
            data: data
        });

        return obj;
    }

    
}

module.exports = FileManager;