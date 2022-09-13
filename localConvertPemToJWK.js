var fs = require('fs')
var rsaPemToJwk = require('rsa-pem-to-jwk')

var privateKey = fs.readFileSync('./certs/private.pem')
var jwk = rsaPemToJwk(privateKey, { use: 'sig' }, 'public')
console.log(jwk)