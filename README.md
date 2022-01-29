# Home Toolkit Server
`Version: 1.0.0`

>_This is the test project created for self-learn purpose._   
_The whole project can be critically changed from its original idea._


1. [Description](#description)
2. [Installation](#installation)
    * [Requirements](#requirements)
    * [Getting started](#getting-started)
3. [Configuration](#configuration)

---

## Description
This project respresents web-server created using Node.js with Express framework.   
User can control local filesystem where server is deployed remotely.


# Installation
The project development and tesing is going on Linux-based operating system.   
Right now it's better to deploy project on Linux.


## Requirements
* operating system: `Linux`
* node.js
* npm


## Getting started
Install server using git:

```bash
git clone https://github.com/ankoyeeri/home-server-toolkit
```

Switch to newly installed directory:

```bash
cd home-server-toolkit/
```

Run setup-script:
```bash
./setup.sh
```

* To get more info about `setup.sh` script run sript with _-h_ argument:

    ```bash
    ./setup.sh -h
    ```
* You can use `npm start` to directly start server instead of using script.


By default server is running at `localhost:8080`.    
Open web-page throught `localhost:8080/files` route.



# Configuration
To change server port or work path see `default.json` in `src/config/`:
```json
{
    "app": {
        "port": 8080
    },
    "server_modules": {
        "file_manager": {
            "storage_path": "$HOME/home_server/files"
        }
    }
}
```
You can use `$HOME` variable in path definition instead of direct path.
