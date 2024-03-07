# CONEXIÓN JSON
 Instalamos nvm en el ordenador: https://github.com/coreybutler/nvm-windows/releases

Instalamos la versión de node.js que queramos utilizar: 
> nvm install 20.11.1

Marcamos que vamos a utilizar esa version
> nvm use 20.11.1

Instalamos json-server
> npm install -g json-server

Iniciamos el json-server
> json-server --watch json\sudoku.json


# GIT
Importar directorio en máquina local la primera vez

> git clone https://github.com/Elardillo2002/Entertainment.git

Actualizar cambios de otros (main)

> git pull origin main

Actualizar cambios propios (main)

> git fetch origin main
> git merge origin/main
> git add .
> git commit -m "commit"
> git push origin main