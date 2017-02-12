var SerialPort = require("serialport");
console.log('CONNECTING TO:' + process.env.COM_NAME);
var port = new SerialPort(process.env.COM_NAME, {
  baudRate: 9600,
  parser: SerialPort.parsers.readline("\n")
});

port.on('open', showPortOpen);
port.on('data', showSerialData);
port.on('close', showPortClose);
port.on('error', showError);

function showPortOpen() {
  console.log('[ port open ] - Connection settings: ' + JSON.stringify(port.options));
}

function showSerialData(data) {
  console.log('[ SERVER <-- SERIAL ]: ' + data);
  // console.log('[SENDING  --> SERIAL]: ' + data);
}

function showPortClose() {
  console.log('[ port closed ]');
}

function showError(error) {
  console.log('[ port error ] - Error: ' + error);
}