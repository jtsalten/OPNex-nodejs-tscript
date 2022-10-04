/*
* PURPOSE: Store stock data directly to InterSystems IRIS Data Platform using a custom structure and generate trade data
*   with methods from InterSystems IRIS as well as call routine to print the version of InterSystems IRIS.
* 
* NOTES: When running,
* 1. Choose option 2 to store stock data natively.
* 2. Choose option 3 to retrieve stock data natively.
* 3. Choose option 4 to generate trades with random data using methods from InterSystems IRIS.
* 4. Choose option 5 to call InterSystems IRIS routine directly.
*/

import * as irisnative from 'intersystems-iris-native';

import * as readline from "readline-sync";
import * as fs from "fs-extra";
import * as odbc from "odbc";

interface ConnConfig {
    host: string;
    port: number;
    namespace: string;
    username: string;
    password: string;
    odbc_DSN?: string;
    odbc_cnTimeout?: number;
    odbc_loginTimeout?: number;
};

// Helper method: Get connection details from config file
function GetConnections(filename: string): ConnConfig {
    var array = fs.readFileSync(filename).toString().split("\n");
    var connections: any = {};
    // Remove all spaces and split line based on colon
    for(var i in array) {
        //var details = array[i].replace(/\s/g, '').split(":")
        var details = array[i].trim().split(":")
        connections[details[0]] = details[1]
    }
    return connections;
}

async function main()
{
    // Get connection details from connections.config
    var connSetting = GetConnections("connections.config");
    //console.log(connSetting);

    // Retrieve connection information from configuration file
    let connInfo: irisnative.ConnectionInfo = {
        host : connSetting.host,
        port : connSetting.port,
        ns : connSetting.namespace,
        user : connSetting.username,
        pwd : connSetting.password
    };
   
    // Create connection to InterSystems IRIS
    //const connection = irisnative.createConnection({host: ip, port: port, ns: namespace, user: username, pwd: password})
    const connection = irisnative.createConnection(connInfo)
    // Create InterSystems IRIS native object
    const iris = connection.createIris()
    console.log("Connected to Native API - InterSystems IRIS")

    // Starting interactive prompt
    while(true)
    {
        console.log("1. Test");
        console.log("2. Store Stock Data");
        console.log("3. View stock data");
        console.log("4. Generate Trades");
        console.log("5. Call routines");
        console.log("6. Call methods");
        console.log("7. Execute SELECT query");
        console.log("8. Quit");
        var selection = readline.question("What would you like to do? ")
        switch(selection){
            case "1":
                SetTestGlobal(iris)
                break;
            case "2":
                StoreStockData(iris);
                break;
            case "3":
                ViewStockData(iris);
                break;
            case "4":
                PopulateData(iris, 10);
                break;
            case "5":
                callRoutines(iris);
                break;
            case "6":
                callMethods(iris);
                break;
            case "7":
                await ExecuteSelect(connSetting);
                break;
            case "8":
                console.log("Exited");
                return;
            default:
                console.log("Invalid option. Try again!");
                break;
        }
        readline.keyInPause();
    }
}

// Write to a test global
function SetTestGlobal(irisNative:irisnative.Iris)
	{
		irisNative.set(8888, "^testglobal", "1");
		let globalValue = irisNative.get("^testglobal", "1");
		console.log("The value of ^testglobal(1) is " + globalValue);
    }

// Store stock data directly into InterSystems IRIS
function StoreStockData(irisNative: irisnative.Iris){
    // Clear global from previous runs
    irisNative.kill("^nyse");
    
    console.log("Storing stock data using Native API...");

    // Get all stock data from all_stocks.csv file into a list
    var array = fs.readFileSync('./dataStocks/all_stocks.csv').toString().split("\n");

    // Get start time
    var start = Date.now()/1000;

    // Loop through list of stock and store natively
    for (var j = 1; j < array.length; j++){
        irisNative.set(array[j], "^nyse", j);
    }

    // Get time consuming
    var end = Date.now()/1000;
    var totalConsume = (end - start).toFixed(4);
    console.log("Stored natively successfully. Execution time: " + totalConsume + "ms");
}

// Iterate over all nodes and print
function ViewStockData(irisNative: irisnative.Iris)
	{
        // Create iterator
		var iter = irisNative.iterator("^nyse");
        console.log("Walk forwards");

        /* Original JS code that works - generated TS code doesn't work
        // Iterate over all nodes
        var key, value = '';
        for ([key, value] of iter)
        {
            console.log("subscript = " + key + ", value = " + value);
        }
        */

        // Iterate over all nodes
        var key, value = '';
        for ([key, value] of iter){
            console.log("subscript = " + key + ", value = " + value);
        }

    }

// To generate the list of trades with methods from InterSystems IRIS    
function PopulateData(irisNative: irisnative.Iris, object_count: number)
	{
        // Loop through list of trade to generate data for each trade
		for(var i = 0; i < object_count; i++){
            let tempDate = "2018-01-01";
            let tempAmount = irisNative.classMethodValue("%PopulateUtils", "Currency");
            let tempName = 	irisNative.classMethodValue("%PopulateUtils", "String") + 
                        irisNative.classMethodValue("%PopulateUtils", "String") + 
                        irisNative.classMethodValue("%PopulateUtils", "String");
            let tempTrader = irisNative.classMethodValue("%PopulateUtils", "Name");
            let tempShares = Math.floor(Math.random() * 10);
            console.log("New trade: " + tempName + ", " + tempDate + ", " + tempAmount + ", " + tempShares + ", " + tempTrader);
        }
    }

// Call routine directly to print the version of InterSystems IRIS.    
function callRoutines(irisNative: irisnative.Iris){
    console.log("on InterSystems IRIS version: " + irisNative.function("StocksUtil", "PrintVersion"))
}

// Executes a SELECT and presents result in console
async function ExecuteSelect(connections: ConnConfig) {
    // or using a configuration object
    const connectionConfig = {
        connectionString: 'DSN='+connections.odbc_DSN,
        connectionTimeout: connections.odbc_cnTimeout,
        loginTimeout: connections.odbc_loginTimeout,
    };
    const sqldb = await odbc.connect(connectionConfig);
    console.log("Connected to InterSystems IRIS through ODBC");
    readline.keyInPause('Pulse a key to execute select...');
    const result = await sqldb.query('select * from OPNex.NativeNodejs where ID < 10');
    console.log(result);
}

function callMethods(irisNative: irisnative.Iris)
{
    let comment = '';
    const defaultClass = 'OPNex.NativeNodejs';

    let cmExpression = readline.question('Class:Method to execute (<classname>:<methodname>:<numparams>:<param1>:...:<paramNN>) [OPNex.NativeNodejs:cmString:1:"World"] -> ');

    if (cmExpression === '') {cmExpression = 'OPNex.NativeNodejs:cmString:1:"Woooorllld!!"'}

    let execExpression = cmExpression.split(':');
    let className = execExpression[0];
    if (className === '') {className = defaultClass}
    let methodName = execExpression[1];
    let numParams = execExpression[2];
    if (numParams === '') {numParams = 0}

    let cmValue: irisnative.Scalar = '';
    try {
        switch(numParams){
            case "0":
                cmValue = irisNative.classMethodValue(className,methodName);
                comment = className + ' ** '+ methodName + ' ** Valor: '+cmValue;
                break;
            case "1":
                cmValue = irisNative.classMethodValue(className,methodName,execExpression[3]);
                comment = className + ' ** '+ methodName + ' ** Valor: '+cmValue;
                break;
            case "2":
                cmValue = irisNative.classMethodValue(className,methodName,execExpression[3],execExpression[4]);
                comment = className + ' ** ' + methodName + ' ** Valor: ' + cmValue;
                break;
            default:
                className = "OPNex.NativeNodejs";
                methodName = "cmString";
                cmValue = irisNative.classMethodValue(className,methodName,"World!!");
                comment = className + ' ** ' + methodName + ' ** Valor: ' + cmValue;
                break;
        }
        }
    catch 
    {
        cmValue = 'Method failed'
    }
    console.log(comment);
}

main()