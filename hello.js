'use strict';

console.log('hello_init');

// const request = require('request').defaults({ encoding: null, gzip:true });
// const http = require('http');

const bucketName = 'article-bucket-55895cd0-e240-11e8-8c69-036b726f6b89';

const imgUrl_1 = 'http://static.stheadline.com/stheadline/inewsmedia/20181107/_2018110713044995455_popup.jpg';
const imgUrl_2 = 'http://static.stheadline.com/stheadline/inewsmedia/20181107/_2018110714040257578_popup.jpg';
const imgUrl_3 = 'http://static.stheadline.com/stheadline/inewsmedia/20181107/_2018110713570218645_popup.jpg';


// http.get(imgUrl_1, (response) => {
//     response.setEncoding('base64');
//     let body = 'data:' + response.headers['content-type'] + ';base64,';
//     response.on('data', (data) => {
//         body += data;
//     });
//     response.on('end', () => {
//         console.log(body);
//     });
// }).on('error', err => {
//     console.log(`err: ${ err }` );
// });


// request.get(imgUrl_1, (error, response, body) => {
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
// });

// request
//     .get(imgUrl_1)
//     .on('response', function(response) {
//         console.log(response.statusCode) // 200
//         console.log(response.headers['content-type']) // 'image/png'
//     });



/*
const uuidv1 = require('uuid/v1');
const uuidv3 = require('uuid/v5');
const uuidv4 = require('uuid/v4');
const uuidv5 = require('uuid/v5');

console.log(`v1: ${ uuidv1() }`);
console.log(`v1: ${ uuidv1(bucketName) }`);
console.log(`v4: ${ uuidv4() }`);
console.log(`v5: ${ uuidv5(bucketName, '1b671a64-40d5-491e-99b0-da01ff1f3341') }`);
*/


console.log(`bucketLength: ${ bucketName.length }`);

