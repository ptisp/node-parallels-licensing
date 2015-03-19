PARALLELS MANAGE2 Node Module
=========

PARALLELS's LICENSES API Node client.

## Installation

```
npm install parallels-licenses
```

## Usage

First you need to instantiate it.

```javascript

var PARALLELS = require('../parallels');

var config = {
    serverUrl: 'https://ka.parallels.com:7050',
    username: process.env.PARALLELS_USER,
    password: process.env.PARALLELS_PASSWORD,
};

var parallelsexample = new PARALLELS(config);
```

Using the created client, call the methods you need, example:

```javascript

var ips = ["127.0.0.1" ...];
var macs = [...];

parallelsexample.licenses.getKeyNumbers(ips, macs, function(err, data){
  ...
});

```


## Examples

Check the examples folder for more specific use cases examples.

## License

Licensed under the Apache license, version 2.0 (the "license"); You may not use this file except in compliance with the license. You may obtain a copy of the license at:

http://www.apache.org/licenses/LICENSE-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the license is distributed on an "as is" basis, without warranties or conditions of any kind, either express or implied. See the license for the specific language governing permissions and limitations under the license.
