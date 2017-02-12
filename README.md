# serial-test
This repo serves as a proof of concept for a connection between an Arduino and a Raspberry Pi using the serialport library and docker.

### Dependencies:
Before you can run this application you need the following dependencies. 
```bash
git --version # Developed on: git version 2.9.3
docker -v # Developed on: Docker version 1.13.1, build 092cba3
node -v # Developed on: v7.5.0
npm -v # Developed on: 4.1.2
```

## Getting started
```terminal
git clone https://github.com/ArunKalahasti/serial-test.git && cd serial-test
npm install
node index.js
```

## Running in Docker on a Raspberry Pi
Node, npm, and serialport are included in this docker image [armhf-node-serialport](https://hub.docker.com/r/arunk3001/armhf-node-serialport/).
To test, run the following command, replacing the values in angular brackets:
```bash
docker run -it --device /dev/<DEVICE NAME>:/dev/<DEVICE NAME> --rm -p 8080:8080 --env-file .secret.SERIALPORT.env -v "$PWD":/usr/src/app/ -w /usr/src/app/ arunk3001/armhf-node-serialport sh -c 'node index.js'
```