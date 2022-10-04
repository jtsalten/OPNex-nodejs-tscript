# OPNex-nodejs-tscript
Pequeño ejemplo - IRIS + Node.js usando TypeScript (def tipos en beta)

## Instalación en entorno Local

###Instalación de node
Ve a [nodejs.org](https://nodejs.org/en/download/) e instala la versión más reciente de Node.js para tu sistema operativo

Las últimas versiones de node.js ya deben incluir el package manager npm que nos servirá para instalar otros módulos.

###Instalación de TypeScript
Ve al sitio de [Descarga de TypeScript](https://www.typescriptlang.org/download) 

###Declaración de tipos
El fichero index.d.ts declara los tipos de clases, propiedades y métodos del Node Native API SDK para IRIS. Actualemente (Sep-2022) está en beta, pero será incluido oficialmente en versiones posteriores.

- El SDK para node.js lo encontrarás en <installdir>/dev/node/intersystems-iris-native
- Ahí deberías tener un fichero: index.js. Debes copiar el fichero index.d.ts en ese directorio, al mismo nivel que index.js
- Modifica el archivo package.json, añadiéndole un campo types. Debería quedar algo así:
```language:json
  {
        "name": "intersystems-iris-native",
        "version": "1.2.0",
        "description": "InterSystems IRIS Native API for Node.js",
        "main": "index.js",
        "scripts": {
          "test": "echo \"Error: no test specified\" && exit 1"
        },
        "files": [
          "bin"
        ],
        "author": "",
        "repository": "",
        "license" : "Commercial License available from InterSystems",
        *"types": "./index.d.ts"*
   }
```
- Una vez hecho eso, puedes instalar el módulo con nmp install:
```language node
npm install <installdir>/dev/node/intersystems-iris-native
```

## Documentación Adicional
Para documentación más detallada del API para Node.js, revisa la [Documentación Oficial de InterSystems IRIS](https://docs.intersystems.com/irisforhealth20221/csp/docbook/DocBook.UI.Page.cls?KEY=BJSNAT_refapi#BJSNAT_refapi_connection)


