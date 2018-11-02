const request = require('axios');
const cheerio = require('cheerio');
const {extractListingsFromHTML} = require('./helpers');

module.exports.handler = async (event) => {
    // console.log('hello world');

    return new Promise((resolve, reject) => {
        request('http://std.stheadline.com/instant/articles/listview/%E9%A6%99%E6%B8%AF/')
        .then(({data}) => {
            // console.log('data');
            // console.log(data);
            const jobs = extractListingsFromHTML(data);
            // console.log('\n\n\n\n\n\n\njobs');
            console.log(jobs);
            // callback(null, {jobs});
            // return {jobs};
            
            resolve(jobs);

        })
        .catch();
    });

    // let list = await 

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda 2!'),
        scrape: list
    };
    return response;
};




// let handler = require('./handler');
//
// handler.hello = async (event) => {
//     console.log('hello world');
//
//     // TODO implement
//     const response = {
//         statusCode: 200,
//         body: JSON.stringify('Hello from Lambda 2!')
//     };
//     return response;
// };