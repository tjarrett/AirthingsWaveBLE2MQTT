require('dotenv').config();

const noble = require('@abandonware/noble');
const serviceUuids = [process.env.AIRWAVE_UUID];

noble.on('stateChange', function(state) {
    if (state === 'poweredOn') {
        //allowDuplicates has to be true to return anything... weirdly
        noble.startScanning(serviceUuids, true);
    } else {
        noble.stopScanning();
    }
});

noble.on('discover', function(peripheral) {
/*    console.log('Found device with local name: ' + peripheral.advertisement.localName);
    console.log('advertising the following service uuid\'s: ' + peripheral.advertisement.serviceUuids);
    console.log();*/
    console.log("Found device with uuid's: ", peripheral.advertisement.serviceUuids);
    peripheral.connect(function(error) {
        console.log('Connected to peripheral: ' + peripheral.uuid);
        peripheral.discoverServices(null, function(error, services) {
            console.log('Found the following services:');
            for (let service in services) {
                console.log('  ' + service + ' uuid: ' + services[service].uuid);
            }
        });
    });
});