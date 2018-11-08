'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const { extractListingsFromHTML } = require('./helpers');
const _ = require('lodash');

const bucketName = 'article-bucket-55895cd0-e240-11e8-8c69-036b726f6b89';
const region = 'ap-southeast-1';

const AWS = require('aws-sdk');
const sqs = new AWS.SQS({
    region: region
});
const s3 = new AWS.S3();


const articleQueueName = 'ArticleQueue';


// console.log(AWS.config);
// AWS.config.update({ region: 'ap-southeast-1' });

// let lambda = new AWS.Lambda();

const scrapeUrl = 'http://std.stheadline.com/instant/articles/listview/%E9%A6%99%E6%B8%AF/';

exports.handler = async (event, context, callback) => {
    console.log('Loading...');

    // let calculationResult = await calculate();
    // console.log('calculationResult: ' + calculationResult);
    // return calculationResult;


    // const s3Result = await setupS3Bucket();
    // const sqsResult = await setupSQS();

    let data;

    try {
        console.log('Start scraping data');
        data = await scrapeFromUrl(scrapeUrl);
        console.log('Scrape completed');

        if (data != null && data.length > 0) {
            // const sqsQueueUrl = await setupSQS();
            // if (sqsQueueUrl) {
            //     const asdf = await pushArticleToSQSQueue(sqsQueueUrl, data);
            // }





        }
    } catch (error) {
        console.log(error);
        return error;
    }




    // console.log('hello world end');

    return data;
};

async function scrapeFromUrl(url) {
    return new Promise((resolve, reject) => {
        axios(url)
            .then(({ data }) => {
                // console.log('data');
                // console.log(data);
                const jobs = extractListingsFromHTML(data);
                // console.log('\n\n\n\n\n\n\njobs');

                // console.log('extractListingsFromHTML');
                // console.log(jobs);

                let list = jobs;

                // const response = {
                //     statusCode: 200,
                //     body: JSON.stringify('Hello from Lambda 2!'),
                //     scrape: list
                // };

                const response = list;

                resolve(response);


            })
            .catch(reject);
    })

}


async function setupS3Bucket() {
    console.log('setupS3Bucket');

    // const newBucket = await createS3Bucket('eed7f02f-8418-4b71-862e-f6044cf41ad3', region);

    // const buckets = await listS3Buckets();

    const bucketObjects = await listS3BucketObjects(bucketName);

}

async function setupSQS() {
    console.log('setupSQS');

    // Create an SQS service object
    // var sqs = new AWS.SQS({ 
    //     region: 'ap-southeast-1'
    //     // apiVersion: '2012-11-05'
    //  });

    // const qName = 'MyFirstQueue';



    // const sqsArticleQueueUrl = await isSQSQueueExist(articleQueueName);
    // if (sqsArticleQueueUrl == null) {
    //     createSQSQueue(articleQueueName);
    // }

    // createSQSQueue(queueName);
    // listSQSQueues();

    let sqsQueueUrl = await createSQSQueue(articleQueueName);

    // let sqsQueueUrl = await isSQSQueueExist(articleQueueName);
    // if (sqsQueueUrl == null) {
    //     console.log(`SQS Queue ${sqsQueueUrl} does not exist`);
    // }

    if (sqsQueueUrl != null) {
        return sqsQueueUrl;
        // addMessageToSQSQueue(sqsQueueUrl, 'hello world');
        // addMessageToSQSQueue(sqsQueueUrl, 'good job');
        // addMessageToSQSQueue(sqsQueueUrl, 'nice view');


        // updateSQSQueue(sqsQueueUrl)
        //     .then(data => {
        //         console.log('updateSQSQueue success');
        //         console.log(data);
        //     })
        //     .catch(err => {
        //         console.log('updateSQSQueue err');
        //         console.log(err);
        //     })
        // ;

        // addMessageToSQSQueue(sqsQueueUrl, 'lalala')
        // .then(data => {
        //     console.log('addMessageToSQSQueue success');
        //     console.log(data);
        // })
        // .catch(err => {
        //     console.log('addMessageToSQSQueue err');
        //     console.log(err);
        // });





        // const allMessageObjects = await receiveMessageFromSQSQueue(sqsQueueUrl);
        // if (_.isArray(allMessageObjects)) {
        //     console.log(`allMessages: ${allMessageObjects.length}`);
        //
        //     _.forEach(allMessageObjects, (obj) => {
        //         const receiptHandle = obj.receiptHandle;
        //         const body = obj.body;
        //
        //         console.log(`body: ${body}`);
        //
        //         // deleteMessage(sqsQueueUrl, receiptHandle)
        //         //     .then(data => {
        //         //         console.log('deleteMessage return');
        //         //         console.log(data);
        //         //     })
        //         //     .catch(err => {
        //         //         console.log('deleteMessage return err');
        //         //         console.log(err);
        //         //     })
        //         // ;
        //     });
        // }

    }



    console.log(`sqsQueueUrl: ${sqsQueueUrl}`);



}

async function createSQSQueue(name) {
    return new Promise((resolve, reject) => {
        const params = {
            QueueName: name,
            Attributes: {
                'ReceiveMessageWaitTimeSeconds': '20',
            }
        };
        console.log('createQueue');
        sqs.createQueue(params, (err, data) => {
            if (err) {
                console.log('createQueueErr');
                console.log(err, err.stack);
                reject(err);
            } else {
                console.log('createQueueSuccess');
                console.log(data);
                resolve(data.QueueUrl);
            }
        });
    });
}

async function updateSQSQueue(queueUrl) {
    new Promise((resolve, reject) => {
        const params = {
            Attributes: {
                "ReceiveMessageWaitTimeSeconds": "20",
            },
            QueueUrl: queueUrl
        };
        sqs.setQueueAttributes(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                console.log("Success", data);
                resolve(data);
            }
        });
    });
}

function listSQSQueues() {
    console.log('listQueues');
    sqs.listQueues(function (err, data) {
        if (err) {
            console.log('listQueuesErr');
            console.log(err);
        } else {
            console.log('listQueuesSuccess');
            console.log(data.QueueUrls);
        }
    });
}

async function isSQSQueueExist(name) {
    return new Promise((resolve, reject) => {
        var params = {
            QueueName: name,
            // QueueOwnerAWSAccountId: 'STRING_VALUE'
        };

        sqs.getQueueUrl(params, function (err, data) {
            if (err) {
                console.log('getQueueUrl err');
                console.log(err, err.stack);

                reject(null);
            } else {
                console.log('getQueueUrl success');
                console.log(data);
                resolve(data.QueueUrl);
            }
        });
    });
}

function addMessageToSQSQueue(queueUrl, message) {
    return new Promise((resolve, reject) => {
        const params = {
            MessageBody: message,
            QueueUrl: queueUrl,
            DelaySeconds: 0
        };

        sqs.sendMessage(params, function (err, data) {
            if (err) {
                console.log('sendMessage err: ', err);
                reject(err);
            }
            else {
                console.log('sendMessage success: ', data);
                resolve(data);
            }
        });
    })
}

async function receiveMessageFromSQSQueue(queueUrl) {
    return new Promise((resolve, reject) => {
        const params = {
            AttributeNames: [
                "SentTimestamp"
            ],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: [
                "All"
            ],
            QueueUrl: queueUrl,
            WaitTimeSeconds: 20
        };

        let messages = [];

        sqs.receiveMessage(params, function (err, data) {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                console.log("Success", data);



                console.log(`for each all messages`);
                data.Messages.forEach(message => {
                    const newMsg = {
                        messageId: message.MessageId,
                        body: message.Body,
                        receiptHandle: message.ReceiptHandle
                    };
                    console.log(`received message ${newMsg.messageId} , ${newMsg.body}`);
                    messages.push(newMsg);
                });
                console.log(`messages length: ${messages.length}`);


                resolve(messages);
            }
        });
    });
}

async function deleteMessage(queueUrl, receiptHandle) {
    return new Promise((resolve, reject) => {
        const params = {
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle
        };
        sqs.deleteMessage(params, function (err, data) {
            if (err) {
                console.log('deleteMessage err');
                console.log(err);
                reject(err);
            } else {
                console.log('deleteMessage success');
                console.log(data);
                resolve(data);
            }
        });
    });
}

// async function deleteMessageBatch(queueUrl) {
//     return new Promise((resolve, reject) => {
//         const params = {
//             QueueUrl: queueUrl,
//             Entries: [
//                 {
//                     Id: 'STRING_VALUE',
//                     ReceiptHandle: 'STRING_VALUE'
//                 }
//             ]
//         };
//         sqs.deleteMessage(params, function(err, data) {
//             if (err) {
//                 console.log('deleteMessage err');
//                 console.log(err);
//                 reject(err);
//             } else {
//                 console.log('deleteMessage success');
//                 console.log(data);
//                 resolve(data);
//             }
//         });
//     });
// }


async function listS3Buckets() {
    return new Promise((resolve, reject) => {
        const params = {};
        s3.listBuckets(params, function (err, data) {
            if (err) {
                console.log('listBuckets err');
                console.log(err, err.stack);
                reject(err);
            } else {
                /*
                data = {
                    Buckets: [
                    {
                    CreationDate: <Date Representation>,
                    Name: "examplebucket"
                    },
                    {
                    CreationDate: <Date Representation>,
                    Name: "examplebucket2"
                    },
                    {
                    CreationDate: <Date Representation>,
                    Name: "examplebucket3"
                    }
                    ], 
                    Owner: {
                    DisplayName: "own-display-name",
                    ID: "examplee7a2f25102679df27bb0ae12b3f85be6f290b936c4393484be31"
                    }
                }
                */
                console.log('listBuckets success');
                console.log(data);
                resolve(data.Buckets);
            }
        });
    });
}

async function createS3Bucket(bucketName, bucketRegion) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            CreateBucketConfiguration: {
                LocationConstraint: bucketRegion
            }
        };
        s3.createBucket(params, function(err, data) {
            if (err) {
                console.log('createBucket err');
                console.log(err, err.stack);
                reject(err);
            } else {
                console.log('createBucket success');
                console.log(data);
                resolve(data);
            }
            /*
            data = {
             Location: "http://examplebucket.s3.amazonaws.com/"
            }
            */
        });
    });
}

async function listS3BucketObjects(bucketName) {
    return new Promise((resolve, reject) => {
        const params = {
            Bucket: bucketName,
            MaxKeys: 10
        };
        s3.listObjects(params, function(err, data) {
            if (err) {
                console.log('listObjects err');
                console.log(err, err.stack);
                reject(err);
            } else {
                console.log('listObjects success');
                console.log(data);
                resolve(data);

                /*
                data = {
                 Contents: [
                    {
                   ETag: "\"70ee1738b6b21e2c8a43f3a5ab0eee71\"",
                   Key: "example1.jpg",
                   LastModified: <Date Representation>,
                   Owner: {
                    DisplayName: "myname",
                    ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
                   },
                   Size: 11,
                   StorageClass: "STANDARD"
                  },
                    {
                   ETag: "\"9c8af9a76df052144598c115ef33e511\"",
                   Key: "example2.jpg",
                   LastModified: <Date Representation>,
                   Owner: {
                    DisplayName: "myname",
                    ID: "12345example25102679df27bb0ae12b3f85be6f290b936c4393484be31bebcc"
                   },
                   Size: 713193,
                   StorageClass: "STANDARD"
                  }
                 ],
                 NextMarker: "eyJNYXJrZXIiOiBudWxsLCAiYm90b190cnVuY2F0ZV9hbW91bnQiOiAyfQ=="
                }
                */

            }

        });
    });
}

function pushArticleToSQSQueue(sqsQueueUrl, articles) {
    // return new Promise((resolve, reject) => {
    //
    // });

    _.forEach(articles, function(article) {
        const articleStr = JSON.stringify(article);
        console.log(`data: ${ articleStr }`);

        const addMessageResult = addMessageToSQSQueue(sqsQueueUrl, articleStr);
        console.log(`title: ${article.title} , result: ${ JSON.stringify(addMessageResult) }`);

    });

}