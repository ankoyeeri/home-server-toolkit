#!/bin/bash

node_modules="./node_modules"
config_default="./src/config/default.json"

function start_server_with_install() {
    echo "Starting server with \"npm i\"..."
    npm i && npm start
}

function start_server_default() {
    echo "Starting server by default..."
    exec npm start
}

function npm_install() {
    if [[ -d "$node_modules" ]]; then
        echo "Folder exist"
    else
        echo "$node_modules is not exist"
        exec npm i
    fi
}

function config() {
    if [[ -f "$config_default" ]]; then
        exec $EDITOR $config_default
    else
        echo "$config_default is not exist"
        exit
    fi
}

function help_info() {
    echo "This script is created to handle basic node.js server setup before executing it."
    echo
    echo "Syntax:   $0 [-h|i|c]"
    echo "          $0 [--help|install|config]"
    echo
    echo "Options:"
    echo "-h, --help            Get script help"
    echo "-i, --install         Install node_modules using 'npm i'"
    echo "-c, --config          Open default config file using default user editor"
}

if [[ -z "$1" ]] 
    then
    if [[ -d "$node_modules" ]] 
        then
        echo "$node_modules exist"
        start_server_default
    else
        echo "$node_modules is not exist"
        start_server_with_install
    fi
    exit
fi

case "$1" in
"-h" | "--help")
    help_info
    exit
;;

"-i" | "--install")
    npm_install
    exit
;;

"-c" | "--config")
    config
    exit
;;

*)
    echo "Command not found"
    exit
;;
esac

