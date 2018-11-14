const cheerio = require('cheerio');
const moment = require('moment');

function extractListingsFromHTML (html) {
    const $ = cheerio.load(html);

    const dataTopRows = $('.inews-section-wrapper .top-news .news-wrap');
    const dataListRows = $('.inews-section-wrapper .inews-list .news-wrap');

    // console.log('dataTopRows');
    // console.log(dataTopRows);

    let result = [];
    
    // console.log('\n\n\n');

    // carousel
    dataTopRows.each((i, element) => {
        // console.log(el);

        
        let title = $(element).find('.title').text().trim();
        let posted_at = $(element).find('.time').text().trim();
        let thumbnail = $(element).find('img').attr("src");
        let link = $(element).find('a').attr('href');

        const linkId = link.split('/').pop();

        // console.log(title);
        // console.log(posted_at);
        // console.log(thumbnail);
        // console.log(link);
        // console.log(linkId);

        const obj = {
            title: title,
            posted_at: posted_at,
            thumbnail: thumbnail,
            linkId: linkId
            // link: link
        };
        result.push(obj);

        // console.log(JSON.stringify(obj));

    });

/*
    // list
    dataListRows.each((i, element) => {
        let title = $(element).find('.title').text().trim();
        let posted_at = $(element).find('.time').text().trim();
        let thumbnail = $(element).find('img').attr("src");
        let link = $(element).find('a').attr('href');

        const linkId = link.split('/').pop();

        const obj = {
            title: title,
            posted_at: posted_at,
            thumbnail: thumbnail,
            linkId: linkId
        };
        result.push(obj);
    });

    */



    return result;
}

// function formatJobs (list) {
//     return list.reduce((acc, job) => {
//         return `${acc}${job.job} in ${job.location} closing on ${moment(job.closing).format('LL')}\n\n`;
//     }, 'We found:\n\n');
// }

module.exports = {
    extractListingsFromHTML,
    // formatJobs
};

