# otp-encryption-decryption-lib

[![NPM version](http://img.shields.io/npm/v/otp-encryption-decryption-lib.svg?style=flat)](https://npmjs.org/package/otp-encryption-decryption-lib)
[![NPM downloads](http://img.shields.io/npm/dm/otp-encryption-decryption-lib.svg?style=flat)](https://npmjs.org/package/otp-encryption-decryption-lib) 
[![jSDelivr CDN](https://data.jsdelivr.com/v1/package/npm/otp-encryption-decryption-lib/badge?style=rounded)](https://www.jsdelivr.com/package/npm/otp-encryption-decryption-lib)
[![tests](https://github.com/eklem/otp-encryption-decryption-lib/actions/workflows/tests.yml/badge.svg)](https://github.com/eklem/otp-encryption-decryption-lib/actions/workflows/tests.yml)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

Library of small snippets, tools and helper-functions for encrypting and decrypting messages with OTPs - One-time pads.

![Example-code](https://github.com/eklem/otp-encryption-decryption-lib/blob/trunk/otp-library-03.png)

Will be core functionality together with [nfc-json-transfer](https://github.com/eklem/nfc-json-transfer) for creating [otp-encryption-toy](https://github.com/eklem/otp-encryption-toy)

## Example usage
```sh
npm install otp-encryption-decryption-lib
```

index.mjs:
```javaScript
import { textToPlaincode, plaincodeToText, createOnetimePad, nob, codebook, checkLength, encryptPlaincode, decryptEncryptedMsg } from 'otp-encryption-decryption-lib'

// The message
const txt = 'Hello 👨‍👩‍👦‍👦🏳️‍🌈😀🇿🇼  world 123 æøå!'
console.log('\n\nInput:               ' + txt)

// ### Text to plaincode
const plaincodeConverted = textToPlaincode(txt, nob, codebook)
console.log('Plaincode:           ' + plaincode)

// ### Creating a one-time pad
const otp = createOnetimePad(96)
console.log('One-time pad:        ' + otp)

// ### Checking length of plaincode vs. one-time pad
const lengthObj = checkLength(plaincodeConverted, otp)
console.log('Length:              ' + JSON.stringify(lengthObj))

// ### Encrypting plaincode
const encryptedMsg = encryptPlaincode(plaincodeConverted, otp)
console.log('Encrypted plaincode: ' + encryptedMsg.join(''))

// ### Decrypting encrypted message
const decryptedPlaincode = decryptEncryptedMsg(encryptedMsg.join(''), otp)
console.log('Decrypted plaincode: ' + decryptedPlaincode.join(''))

// ### Plaincode to text - The message delivered!
const textConverted = plaincodeToText(decryptedPlaincode.join(''), nob, codebook)
console.log('Decrypted msg:       ' + textConverted + '\n\n')
```

Run it with:
```sh
node --experimental-json-modules index.mjs
```

## API

### textToPlaincode
```javaScript
textToPlaincode(text, conversionLanguage, codebook)
// Returns plaincode string from text.
```

### plaincodeToText
```javaScript
plaincodeToText(plaincode, conversionLanguage, codebook)
// Returns text string from plaincode string.
```

### createOnetimePad
```javaScript
createOnetimePad(length)
// Return a one-time pad of desired length.
```

### Language conversion tables and regexes
#### eng
```javaScript
eng.textRegex // regex pattern for converting english text, numbers and punctuation into single characters
eng.plaincodeRegex // regex pattern for converting english plaincode string into array of plaincodes
eng.table // unicode <-> plaincode conversion table for english
```

#### nob
```javaScript
nob.textRegex // regex pattern for converting norwegian text, numbers and punctuation into single characters
nob.plaincodeRegex // regex pattern for converting norwegian plaincode string into array of plaincodes
nob.table // unicode <-> plaincode conversion table for norwegian
```

### codebook
```javaScript
codebook // conversion table for all (almost) unicode emojis <-> plaincode
```

### checkLength
```javaScript
checkLength(plaincode, otp)
// returns { plaincodeLength: plaincodeLength, otpLength: otpLength, tooLong: tooLong }
```
Helper function to check if plaincode length (and thus your message length) is too long, and also show the user how close they are to exceed length of one-time pad.

### encryptPlaincode
```javaScript
encryptPlaincode(plaincode, otp)
// Returns encrypted message as an array of numbers.
```

### decryptEncryptedMsg
```javaScript
decryptEncryptedMsg(encryptedMsg, otp)
// Returns message as an array of characters.
```

## Maintenance
If unicode emojis are updated (to i.e. v.16 from v.15)

```console
cd scipts
node ./fetch-emojis.mjs && node ./create-emoji-regex.mjs && node ./create-emoji-codebook.mjs
```

## Possible issue

Haven't found a unique way of numbering/addressing the unicode emojis that will work cross unicode emoji versions, so then stuff won't encrypt/decrypt properly if you use different versions of the library.
