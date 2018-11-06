const request = require('axios');
const cheerio = require('cheerio');
const { extractListingsFromHTML } = require('./helpers');
const _ = require('lodash');

let AWS = require('aws-sdk');
var sqs = new AWS.SQS({
    region: 'ap-southeast-1'
});

// console.log(AWS.config);
// AWS.config.update({ region: 'ap-southeast-1' });

// let lambda = new AWS.Lambda();

const scrapeUrl = 'http://std.stheadline.com/instant/articles/listview/%E9%A6%99%E6%B8%AF/';

exports.handler = async (event, context, callback) => {
    console.log('Loading...');

    // let calculationResult = await calculate();
    // console.log('calculationResult: ' + calculationResult);
    // return calculationResult;


    setupSQS();

    let data;
/*
    try {
        data = await scrapeFromUrl(scrapeUrl);
        console.log('scrapeData');
        console.log(data);

        if (data != null && data.length > 0) {

        }
    } catch (error) {
        console.log(error);
        return error;
    }
    */

    // console.log('hello world end');

    return data;
};

async function scrapeFromUrl(url) {
    return new Promise((resolve, reject) => {
        request(url)
            .then(({ data }) => {
                // console.log('data');
                // console.log(data);
                const jobs = extractListingsFromHTML(data);
                // console.log('\n\n\n\n\n\n\njobs');

                console.log('extractListingsFromHTML');
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


async function setupSQS() {
    console.log('setupSQS');

    // Create an SQS service object
    // var sqs = new AWS.SQS({ 
    //     region: 'ap-southeast-1'
    //     // apiVersion: '2012-11-05'
    //  });

    const qName = 'MyFirstQueue';

    const articleQueueName = 'ArticleQueue';

    // const sqsArticleQueueUrl = await isSQSQueueExist(articleQueueName);
    // if (sqsArticleQueueUrl == null) {
    //     createSQSQueue(articleQueueName);
    // }

    // createSQSQueue(queueName);
    // listSQSQueues();

    const sqsQueueUrl = await isSQSQueueExist(qName);
    if (sqsQueueUrl != null) {
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





        const allMessageObjects = await receiveMessageFromSQSQueue(sqsQueueUrl);
        if (_.isArray(allMessageObjects )) {
            console.log(`allMessages: ${allMessageObjects.length}`);

            _.forEach(allMessageObjects, (obj) => {
                const receiptHandle = obj.receiptHandle;
                const body = obj.body;

                console.log(`body: ${body}`);

                // deleteMessage(sqsQueueUrl, receiptHandle)
                //     .then(data => {
                //         console.log('deleteMessage return');
                //         console.log(data);
                //     })
                //     .catch(err => {
                //         console.log('deleteMessage return err');
                //         console.log(err);
                //     })
                // ;
            });
        }



    }
    console.log(`sqsQueueUrl: ${sqsQueueUrl}`);



}

function createSQSQueue(name) {
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
        } else {
            console.log('createQueueSuccess');
            console.log(data);
        }
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
        sqs.setQueueAttributes(params, function(err, data) {
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

async function addMessageToSQSQueue(queueUrl, message) {
    return new Promise((resolve, reject) => {
        var params = {
            MessageBody: message,
            QueueUrl: queueUrl,
            DelaySeconds: 0
        };
    
        sqs.sendMessage(params, function(err, data) {
            if(err) {
                reject(err);
            }
            else {
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

        sqs.receiveMessage(params, function(err, data) {
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
        sqs.deleteMessage(params, function(err, data) {
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
