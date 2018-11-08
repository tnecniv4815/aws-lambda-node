'use strict';

console.log('hello_init');

// const request = require('request').defaults({ encoding: null, gzip:true });
const http = require('http');
const request = require('request');
const Stream = require('stream').Transform;
const fs = require('fs');

const bucketName = 'article-bucket-55895cd0-e240-11e8-8c69-036b726f6b89';

const imgUrl_1 = 'http://static.stheadline.com/stheadline/inewsmedia/20181107/_2018110713044995455_popup.jpg';
const imgUrl_2 = 'http://static.stheadline.com/stheadline/inewsmedia/20181107/_2018110714040257578_popup.jpg';
const imgUrl_3 = 'http://static.stheadline.com/stheadline/inewsmedia/20181107/_2018110713570218645_popup.jpg';
const imgUrl_4 = 'https://pbs.twimg.com/profile_images/948294484596375552/RyGNqDEM_400x400.jpg';




const options = {

};

// request.get(imgUrl_4, (error, response, body) => {
//     if (error) {
//         console.log('fail to get image');
//         console.log(error);
//     } else {
//         // console.log(response);
//         console.log('statusCode:', response && response.statusCode);
//         console.log(body.length);
//     }
// });



// var download = function(uri, filename, callback){
//     request.head(uri, function(err, res, body){
//         console.log('content-type:', res.headers['content-type']);
//         console.log('content-length:', res.headers['content-length']);
//
//         request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
//     });
// };
//
// download('https://www.google.com/images/srpr/logo3w.png', 'google.png', function(){
//     console.log('done');
// });

// var url = 'http://www.google.com/images/srpr/logo11w.png';
//
// http.request(imgUrl_1, function(response) {
//     var data = new Stream();
//
//     response.on('data', function(chunk) {
//         data.push(chunk);
//     });
//
//     response.on('end', function() {
//         fs.writeFileSync('tmp/image.png', data.read());
//         console.log('download finish');
//     });
// }).end();





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

