const request = require('axios');
const cheerio = require('cheerio');
const {extractListingsFromHTML} = require('./helpers');

// let AWS = require('aws-sdk');
// let lambda = new AWS.Lambda();

const scrapeUrl = 'http://std.stheadline.com/instant/articles/listview/%E9%A6%99%E6%B8%AF/';

exports.handler = async (event, context, callback) => {
    console.log('hello world start');

    // let calculationResult = await calculate();
    // console.log('calculationResult: ' + calculationResult);
    // return calculationResult;


    let data;
    try {
        data = await scrapeFromUrl(scrapeUrl);
        console.log('scrapeData');
        console.log(data);
    } catch(error) {
        console.log(error);
        return error;
    }
    console.log('hello world end');

    return data;
};

async function scrapeFromUrl(url) {
    return new Promise((resolve, reject) => {
        request(url)
        .then(({data}) => {
            // console.log('data');
            // console.log(data);
            const jobs = extractListingsFromHTML(data);
            // console.log('\n\n\n\n\n\n\njobs');
            
            console.log('extractListingsFromHTML');
            // console.log(jobs);

            let list = jobs;

            const response = {
                statusCode: 200,
                body: JSON.stringify('Hello from Lambda 2!'),
                scrape: list
            };
            resolve(response);


        })
        .catch(reject);
    })

}



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


