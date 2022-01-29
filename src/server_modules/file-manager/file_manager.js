// Modules
const fs    = require('fs');
const path  = require('path');
const mime  = require('mime-types');
const FileManagerConfigurator = require('./configuration');

class FileManager {
    constructor() {
        this.work_path = FileManagerConfigurator.path;
        this.current_path = this.work_path;
    }

    async readPath(usrPath = new String()) {
        let tmp_path = path.normalize(this.work_path + (usrPath === '/' ? "" : usrPath));

        if (fs.lstatSync(tmp_path).isDirectory()) {
            this.current_path = tmp_path;
            return this.#readDir(this.current_path);
        }
        if (fs.lstatSync(tmp_path).isFile()) {
            return this.#readFile(tmp_path);
        }
    }

    // async addItem(usrPath = new String(), options) {
    //     if (options) {
    //         this.current_path = path.normalize(this.work_path + usrPath);

    //         if (options.type === 'dir') {
    //             return fs.mkdirSync(this.current_path);
    //         } else if (options.type === 'file') {
    //             return fs.writeFileSync(this.current_path, options.data);
    //         } else {
    //             throw new Error('Error: addItem: option.type no specified file type');
    //         }
    //     } else {
    //         throw new Error('Error: addItem: no options');
    //     }
    // }

    async deleteItem(usrPath = new String(), itemType) {
        if (usrPath === '') {
            throw new Error('Error: deleteItem: usrPath not specified');
        }
        
        if (!itemType) {
            throw new Error('Error: deleteItem: itemType not specified');
        }

        switch (itemType) {
            case 'dir':
            case 'file':
                let tmp_path = path.normalize(this.work_path + usrPath);
                if (!fs.existsSync(tmp_path)) {
                    throw new Error('Error: deleteDir: there is no such directory');
                }

                // console.log(tmp_path);

                fs.rmSync(tmp_path, {
                    recursive: true 
                });
                return true;

            default:
                throw new Error('Error: deleteItem: wrong item type. Must be "dir" or "file"');
        }
    }

    async addDir(usrPath) {
        this.current_path = path.normalize(this.work_path + usrPath);

        return fs.mkdirSync(this.current_path);
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