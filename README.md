# atom2mqtt_wrapper
Protocol implementation for auml can homeautomation

## Install node 7
```bash
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Setup
```bash
git clone https://github.com/HomeAutomation/atom2mqtt_wrapper.git
cd atom2mqtt_wrapper
npm install
```

## Run
Rename configuration.json.template to configuration.json and edit the file to match the mqtt server that you would like to connect to
```bash
node --harmony_async_await index.js
```
