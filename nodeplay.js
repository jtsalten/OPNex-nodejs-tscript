"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var irisnative = require("intersystems-iris-native");
var readline = require("readline-sync");
var fs = require("fs-extra");
var odbc = require("odbc");
;
// Helper method: Get connection details from config file
function GetConnections(filename) {
    var array = fs.readFileSync(filename).toString().split("\n");
    var connections = {};
    // Remove all spaces and split line based on colon
    for (var i in array) {
        //var details = array[i].replace(/\s/g, '').split(":")
        var details = array[i].trim().split(":");
        connections[details[0]] = details[1];
    }
    return connections;
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var connSetting, connInfo, connection, iris, selection, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    connSetting = GetConnections("connections.config");
                    connInfo = {
                        host: connSetting.host,
                        port: connSetting.port,
                        ns: connSetting.namespace,
                        user: connSetting.username,
                        pwd: connSetting.password
                    };
                    connection = irisnative.createConnection(connInfo);
                    iris = connection.createIris();
                    console.log("Connected to Native API - InterSystems IRIS");
                    _b.label = 1;
                case 1:
                    if (!true) return [3 /*break*/, 13];
                    console.log("1. Test");
                    console.log("2. Store Stock Data");
                    console.log("3. View stock data");
                    console.log("4. Generate Trades");
                    console.log("5. Call routines");
                    console.log("6. Call methods");
                    console.log("7. Execute SELECT query");
                    console.log("8. Quit");
                    selection = readline.question("What would you like to do? ");
                    _a = selection;
                    switch (_a) {
                        case "1": return [3 /*break*/, 2];
                        case "2": return [3 /*break*/, 3];
                        case "3": return [3 /*break*/, 4];
                        case "4": return [3 /*break*/, 5];
                        case "5": return [3 /*break*/, 6];
                        case "6": return [3 /*break*/, 7];
                        case "7": return [3 /*break*/, 8];
                        case "8": return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 11];
                case 2:
                    SetTestGlobal(iris);
                    return [3 /*break*/, 12];
                case 3:
                    StoreStockData(iris);
                    return [3 /*break*/, 12];
                case 4:
                    ViewStockData(iris);
                    return [3 /*break*/, 12];
                case 5:
                    PopulateData(iris, 10);
                    return [3 /*break*/, 12];
                case 6:
                    callRoutines(iris);
                    return [3 /*break*/, 12];
                case 7:
                    callMethods(iris);
                    return [3 /*break*/, 12];
                case 8: return [4 /*yield*/, ExecuteSelect(connSetting)];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 12];
                case 10:
                    console.log("Exited");
                    return [2 /*return*/];
                case 11:
                    console.log("Invalid option. Try again!");
                    return [3 /*break*/, 12];
                case 12:
                    readline.keyInPause();
                    return [3 /*break*/, 1];
                case 13: return [2 /*return*/];
            }
        });
    });
}
// Write to a test global
function SetTestGlobal(irisNative) {
    irisNative.set(8888, "^testglobal", "1");
    var globalValue = irisNative.get("^testglobal", "1");
    console.log("The value of ^testglobal(1) is " + globalValue);
}
// Store stock data directly into InterSystems IRIS
function StoreStockData(irisNative) {
    // Clear global from previous runs
    irisNative.kill("^nyse");
    console.log("Storing stock data using Native API...");
    // Get all stock data from all_stocks.csv file into a list
    var array = fs.readFileSync('./dataStocks/all_stocks.csv').toString().split("\n");
    // Get start time
    var start = Date.now() / 1000;
    // Loop through list of stock and store natively
    for (var j = 1; j < array.length; j++) {
        irisNative.set(array[j], "^nyse", j);
    }
    // Get time consuming
    var end = Date.now() / 1000;
    var totalConsume = (end - start).toFixed(4);
    console.log("Stored natively successfully. Execution time: " + totalConsume + "ms");
}
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
// To generate the list of trades with methods from InterSystems IRIS    
function PopulateData(irisNative, object_count) {
    // Loop through list of trade to generate data for each trade
    for (var i = 0; i < object_count; i++) {
        var tempDate = "2018-01-01";
        var tempAmount = irisNative.classMethodValue("%PopulateUtils", "Currency");
        var tempName = irisNative.classMethodValue("%PopulateUtils", "String") +
            irisNative.classMethodValue("%PopulateUtils", "String") +
            irisNative.classMethodValue("%PopulateUtils", "String");
        var tempTrader = irisNative.classMethodValue("%PopulateUtils", "Name");
        var tempShares = Math.floor(Math.random() * 10);
        console.log("New trade: " + tempName + ", " + tempDate + ", " + tempAmount + ", " + tempShares + ", " + tempTrader);
    }
}
// Call routine directly to print the version of InterSystems IRIS.    
function callRoutines(irisNative) {
    console.log("on InterSystems IRIS version: " + irisNative["function"]("StocksUtil", "PrintVersion"));
}
// Executes a SELECT and presents result in console
function ExecuteSelect(connections) {
    return __awaiter(this, void 0, void 0, function () {
        var connectionConfig, sqldb, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connectionConfig = {
                        connectionString: 'DSN=' + connections.odbc_DSN,
                        connectionTimeout: connections.odbc_cnTimeout,
                        loginTimeout: connections.odbc_loginTimeout
                    };
                    return [4 /*yield*/, odbc.connect(connectionConfig)];
                case 1:
                    sqldb = _a.sent();
                    console.log("Connected to InterSystems IRIS through ODBC");
                    readline.keyInPause('Pulse a key to execute select...');
                    return [4 /*yield*/, sqldb.query('select * from OPNex.NativeNodejs where ID < 10')];
                case 2:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/];
            }
        });
    });
}
function callMethods(irisNative) {
    var comment = '';
    var defaultClass = 'OPNex.NativeNodejs';
    var cmExpression = readline.question('Class:Method to execute (<classname>:<methodname>:<numparams>:<param1>:...:<paramNN>) [OPNex.NativeNodejs:cmString:1:"World"] -> ');
    if (cmExpression === '') {
        cmExpression = 'OPNex.NativeNodejs:cmString:1:"Woooorllld!!"';
    }
    var execExpression = cmExpression.split(':');
    var className = execExpression[0];
    if (className === '') {
        className = defaultClass;
    }
    var methodName = execExpression[1];
    var numParams = execExpression[2];
    if (numParams === '') {
        numParams = 0;
    }
    var cmValue = '';
    try {
        switch (numParams) {
            case "0":
                cmValue = irisNative.classMethodValue(className, methodName);
                comment = className + ' ** ' + methodName + ' ** Valor: ' + cmValue;
                break;
            case "1":
                cmValue = irisNative.classMethodValue(className, methodName, execExpression[3]);
                comment = className + ' ** ' + methodName + ' ** Valor: ' + cmValue;
                break;
            case "2":
                cmValue = irisNative.classMethodValue(className, methodName, execExpression[3], execExpression[4]);
                comment = className + ' ** ' + methodName + ' ** Valor: ' + cmValue;
                break;
            default:
                className = "OPNex.NativeNodejs";
                methodName = "cmString";
                cmValue = irisNative.classMethodValue(className, methodName, "World!!");
                comment = className + ' ** ' + methodName + ' ** Valor: ' + cmValue;
                break;
        }
    }
    catch (_a) {
        cmValue = 'Method failed';
    }
    console.log(comment);
}
main();
