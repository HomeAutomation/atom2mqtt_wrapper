# atom2mqtt_wrapper
Node.js implementation to port existing atom1.5 scripts to communicate with mqtt

## Install node 7
```bash
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt install librrd-dev
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
