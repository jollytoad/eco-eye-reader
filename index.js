const SerialPort = require("serialport")

const port = new SerialPort("/dev/tty.usbserial", {
  parser: SerialPort.parsers.readline("\r"),
  baudrate: 19200,
  databits: 8,
  stopbits: 1,
  parity: 'none',
  buffersize: 10
})

const voltage = 240

port.on('open', () => {
  console.log('Serial Port Opened')

  port.on('data', (data) => {
    const current = data.split(",")
    const use = current[0] * voltage / 100000
    const gen = current[1] * voltage / 100000

    console.log(use.toFixed(3) + " - " + gen.toFixed(3) + " = " + (use-gen).toFixed(3) + " kW")
  })
})
