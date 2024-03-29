# OPNex-nodejs-tscript
[README in English](https://github.com/jtsalten/OPNex-nodejs-tscript/blob/main/README_eng.md)

Pequeño ejemplo - IRIS + Node.js usando TypeScript (fichero de definición de tipos del Native API SDK para Node.js de IRIS en beta)

## Instalación en entorno Local

### Instalación de Node.js

Ve a [nodejs.org](https://nodejs.org/en/download/) e instala la versión más reciente de Node.js para tu sistema operativo

Las últimas versiones de node.js ya deben incluir el package manager npm que nos servirá para instalar otros módulos.

### Instalación de TypeScript

Ve al sitio de [Descarga de TypeScript](https://www.typescriptlang.org/download).

Puedes instalar TypeScript local al proyecto, pero yo prefiero instalarlo globalmente, de modo que pueda llamarlo con ``tsc`` desde cualquier sitio. Para instalarlo globalmente:

``` language shell
npm install -g typescript
```

### Declaración de tipos del SDK Nativo de Node.js para IRIS ``intersystems-iris-native``

El fichero ``index.d.ts`` declara los tipos de clases, propiedades, métodos,... del Node Native API SDK para IRIS. Actualmente (Sep-2022) está en beta, pero será incluido oficialmente en versiones posteriores de InterSystems IRIS.

- El SDK para Node.js lo encontrarás en ``<installdir>/dev/node/intersystems-iris-native``. Lo he copiado directamente bajo el directorio ``./install`` para tenerlo localmente en este repositorio (pertenece a la versión 2022.1).
- Ahí deberías tener un fichero: ``index.js``. Debes copiar el fichero index.d.ts en ese directorio, al mismo nivel que ``index.js``
- Modifica el archivo ``package.json``, añadiéndole un campo **types**. Debería quedar algo así:

```language json
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
        **"types": "./index.d.ts"**
   }
```

- Una vez hecho eso, puedes instalar el módulo con npm install:

```language shell
npm install ./install/intersystems-iris-native
```

- Dependerá de los ejemplos, pero en nuestro caso, puede que necesites instalar más paquetes de node.js. Para este ejemplo básico instalaremos ``readline-sync``, ``fs-extra`` y ``odbc``, junto con su declaración de tipos (el paquete ``odbc`` ya los incluye por defecto).

```language shell
npm install readline-sync
npm install -S @types/readline-sync
npm install fs-extra
npm install -S @types/fs-extra
npm install odbc
```

### Instalación de Clase de Ejemplo

Abre el terminal de InterSystems IRIS (actualmente versión 2022.1) y ve al namespace **USER**:

```language objectscript
zn "USER"
```

Carga y compila la clase de prueba ``OPNex.NativeNodejs``:

```language objectscript
do $system.OBJ.Load("<path-a-tu-repositorio>/src/OPNex.NativeNodejs.cls","cuk")
```

## Ejecución del Ejemplo

Se incluyen 2 archivos de ejemplo: ``nodeplay.ts`` en TypeScript, y ``nodeplay.js``, que representa el mismo archivo transpilado (JS generado a partir del TypeScript).

Si quieres hacer modificaciones, puedes cambiar código en ``nodeplay.ts`` y luego transpilar de nuevo, o cambiar directamente el fichero final en JS.

Para generar el archivo en JS, simplemente ejecuta:

```language shell
tsc nodeplay.ts
```

Se generará (se sobrescribirá si ya existe) una nueva versión del archivo ``nodeplay.js``. Para ejecutar el ejemplo:

```language shell
node nodeplay.js
```

Hay varias opciones que permiten probar el acceso directo a globals, la carga (escritura y lectura) accediendo e iterando sobre globals directamente, la ejecución de rutinas o métodos implementados en IRIS, así como el acceso puramente relacional a IRIS (ejecución de una select simple sobre la tabla de ejemplo ``OPNex.NativeNodejs``).

> En el momento de cerrar esta revisión, la transpilación no genera un código JavaScript correcto, con lo que el método ``ViewStockData`` no funcionará. Para que lo haga debes modificarlo en el fichero nodeplay.js generado:

```language=javascript
// Iterate over all nodes and print
function ViewStockData(irisNative) {
    var _a;
    // Create iterator
    var iter = irisNative.iterator("^nyse");
    console.log("Walk forwards");
    /* Original JS code that works - generated TS code doesn't work
    */
    var key, value = '';
    for ([key, value] of iter)
    {
        console.log("subscript = " + key + ", value = " + value);
    }
    /*
    // Iterate over all nodes
    for (var _i = 0, iter_1 = iter; _i < iter_1.length; _i++) {
        _a = iter_1[_i], key = _a[0], value = _a[1];
        console.log("subscript = " + key + ", value = " + value);
    }
    */
  }
```

## Documentación Adicional

Para documentación más detallada del API para Node.js, revisa la [Documentación Oficial de InterSystems IRIS](https://docs.intersystems.com/irisforhealth20221/csp/docbook/DocBook.UI.Page.cls?KEY=BJSNAT_refapi#BJSNAT_refapi_connection)


