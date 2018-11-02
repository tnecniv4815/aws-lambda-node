const cheerio = require('cheerio');
const moment = require('moment');

function extractListingsFromHTML (html) {
    const $ = cheerio.load(html);

    const dataTopRows = $('.inews-section-wrapper .top-news .news-wrap');
    const dataListRows = $('.inews-section-wrapper .inews-list');

    // console.log('dataTopRows');
    // console.log(dataTopRows);

    const result = [];
    
    // console.log('\n\n\n');
    dataTopRows.each((i, el) => {
        // console.log(el);

        
        let title = $(el).find('.title').text().trim();
        let time = $(el).find('.time').text().trim();
        let thumbnail = $(el).find('img').attr("src");
        
        
        console.log(title);
        console.log(time);
        console.log(thumbnail);

    });


/*

    const vacancyRows = $('.inews-section-wrapper');

    console.log('vacancyRows div');

    const vacancies = [];
    vacancyRows.each((i, el) => {
        console.log(el);

        // Extract information from each row of the jobs table
        let closing = $(el).children('.views-field-field-vacancy-deadline').first().text().trim();
        let job = $(el).children('.views-field-title').first().text().trim();
        let location = $(el).children('.views-field-name').text().trim();
        closing = closing.slice(0, closing.indexOf('-') - 1);
        closing = moment(closing, 'DD/MM/YYYY').toISOString();
        vacancies.push({closing, job, location});
    });

    return vacancies;
    */

    return result;
}

function formatJobs (list) {
    return list.reduce((acc, job) => {
        return `${acc}${job.job} in ${job.location} closing on ${moment(job.closing).format('LL')}\n\n`;
    }, 'We found:\n\n');
}

module.exports = {
    extractListingsFromHTML,
    formatJobs
};

