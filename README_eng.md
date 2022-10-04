# OPNex-nodejs-tscript
[README en Español](https://github.com/jtsalten/OPNex-nodejs-tscript#readme)

A small example - IRIS + Node.js using TypeScript (type definition file for Native API SDK for Node.js in IRIS still in beta)

## Local Environment Installation

### Node.js installation

Go to [nodejs.org](https://nodejs.org/en/download/) and install the latest version of Node.js for your OS.

The last versions of node.js already include the package manager ``npm`` that we'll use to install other modules/packages.

### TypeScript Installation

Go to [TypeScript Download](https://www.typescriptlang.org/download).

You can install TypeScript locally for your project, but I prefer to do it globally, so I can call ``tsc`` from everywhere. To install it globally:

``` language powershell
npm install -g typescript
```

### Type Declaration for IRIS Node.js Native SDK ``intersystems-iris-native``

The file ``index.d.ts`` declares the class, properties, methods,... types for our Node.js Native API SDK for IRIS. Currently (Sep-2022) is in beta version, but it'll be included at some point in future versions of InterSystems IRIS.

- You'll find the SDK package for Node.js in ``<installdir>/dev/node/intersystems-iris-native``. I've copied it directly under ``./install`` folder to get it locally in this repository (it belongs to IRIS 2022.1 version).
- There you should have a file: ``index.js``. And there you should copy the file ``index.d.ts``, at the same level than ``index.js``
- Change the file ``package.json``, to add a field **types**. It should look something like this:

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

- Once this is done, you can install the package with npm install:

```language shell
npm install ./install/intersystems-iris-native
```

- It depends on your examples, but for this, you will need to install more node.js packages. We'll install: ``readline-sync``, ``fs-extra`` y ``odbc``, together with their type declarations (``odbc`` include them already).

```language powershell
npm install readline-sync
npm install -S @types/readline-sync
npm install fs-extra
npm install -S @types/fs-extra
npm install odbc
```

### Installing the sample class

Open your InterSystems IRIS terminal (I'm currently using version 2022.1)and go to namespace **USER**:

```language objectscript
zn "USER"
```

Load and compile the test class``OPNex.NativeNodejs``:

```language objectscript
do $system.OBJ.Load("<path-a-tu-repositorio>/src/OPNex.NativeNodejs.cls","cuk")
```

## Example Execution

There are 2 files included for testing: ``nodeplay.ts`` written in TypeScript, and ``nodeplay.js``, that is the same code transpiled (generated JS from the TypeScript file).

If you want to modify any of them, you can change code in ``nodeplay.ts`` and then transpile it again, or change directly the code in the JS file.

To transpile and generate the file in JS, just execute:

```language shell
tsc nodeplay.ts
```

A new version of file ``nodeplay.js`` will be generated (overwritting the existing one if any). To execute the example:

```language shell
node nodeplay.js
```

There are several options that allow you to test the direct access to ``globals``, workload (writing & reading) accessing directly to and iterating through, execution of routines and methods implemented in IRIS and also pure relational access to IRIS DDBB (executing a simple SQL query on the sample table ``OPNex.NativeNodejs``).

## Additional Info

To get more detailed doc of this Native API for Node.js, take a look at the [Documentation published in the official InterSystems IRIS website](https://docs.intersystems.com/irisforhealth20221/csp/docbook/DocBook.UI.Page.cls?KEY=BJSNAT_refapi#BJSNAT_refapi_connection)


