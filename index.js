var BAUD_RATE = (typeof process.env.BAUD_RATE !== 'undefined') ? process.env.BAUD_RATE : Number(9600);
var SERVER_PORT = (typeof process.env.SERVER_PORT !== 'undefined') ? process.env.SERVER_PORT : 8080;

var SerialPort = require('serialport');
var WebSocketServer = require('ws').Server;
var port = new SerialPort(process.env.COM_NAME, {
    baudRate: 9600,
    parser: SerialPort.parsers.readline("\n")
});
var wss = new WebSocketServer({port: SERVER_PORT});
var connections = new Array;

if (typeof process.env.COM_NAME === 'undefined') {
  console.log("You need to specify the serial port when you launch this script\n");
  console.log("    Specify it as an environment variable titled 'COM_NAME'");
  console.log("\n Fill in the name of your serial port\n");
  process.exit(1);
}

console.log('[ SERVER ] - port: ' + SERVER_PORT);
console.log();

port.on('open', showPortOpen);
port.on('data', showSerialData);
port.on('close', showPortClose);
port.on('error', showError);

wss.on('connection', handleConnection);

function handleConnection(client) {
    console.log('[ SERVER ] - new client');
    connections.push(client);

    client.on('open', function () {
        client.send('CONNECTED');
    });

    client.on('message', writeSerialData);

    client.on('close', handleClientClose);
}

function writeSerialData(data, flags) {
    console.log('[ SERVER --> SERIAL ]: ' + data);
    port.write(data);
    if (connections.length > 0) {
        broadcast(data);
    }
}

function broadcast(data) {
    for (connection in connections) {
        connections[connection].send(data);
    }
}

function handleClientClose(client){
    console.log('[ SERVER ] - client closed');
    var position = connections.indexOf(client);
    connections.splice(position, 1);
}

function showPortOpen() {
    console.log('[ PORT OPEN ] - connection settings: ' + JSON.stringify(port.options));
    console.log('[ PORT OPEN ] - connected to: ' + process.env.COM_NAME);
}

function showSerialData(data) {
    console.log('[ SERVER <-- SERIAL ] - data: ' + data);
    broadcast(data);
}

function showPortClose() {
    console.log('[ PORT CLOSED ]');
}

function showError(error) {
    console.log('[ PORT ERROR ] - message: ' + error);
}