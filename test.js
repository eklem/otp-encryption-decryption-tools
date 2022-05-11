const crypto = require('crypto').webcrypto

let otp = ''
let randomValuesArr = crypto.getRandomValues(new Uint8Array(128));
for (var i = 0; i < randomValuesArr.length; i++) {
  // converting to single digits
  otp += Math.floor(randomValuesArr[i]/256*10)
}
console.log(otp)