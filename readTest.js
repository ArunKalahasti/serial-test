var SerialPort = require("serialport");
console.log('CONNECTING TO:' + process.env.COM_NAME);
var port = new SerialPort(process.env.COM_NAME, {
  baudRate: 9600,
  parser: SerialPort.parsers.readline("\n")
});

port.on('open', function() {
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});

// open errors will be emitted as an error event 
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

port.on('data', function (data) {
  console.log(''+data);
});