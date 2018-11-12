const axios = require('axios');

console.log('init.....');


// const data = require('./index').handler({});
// console.log(data);

const app = require('./index');
// const startTimer = Date.now();
const data = app.handler({});
// const endTimer = Date.now();


console.log(data);

// console.log('time spend: ' + endTimer - startTimer);



// .then((data) => {
//   console.log(data);
// })
// .catch((err) => {
//   console.log(err);
// })
;


// async function operation() {
//   return new Promise(function(resolve, reject) {
//       var a = 0;
//       var b = 1;
//       a = a + b;
//       a = 5;

//       // may be a heavy db call or http request?
//       resolve(a) // successfully fill promise
//   })
// }

// async function app() {
//   var a = await operation() // a is 5
//   console.log(a);
// }

// app()




/*
function getCoffee() {
    return new Promise(resolve => {
      setTimeout(() => resolve('☕'), 2000); // it takes 2 seconds to make coffee
    });
  }
  
  async function go() {
    try {
      // but first, coffee
      const coffee = await getCoffee();
      console.log(coffee); // ☕
      // then we grab some data over an Ajax request
      const wes = await axios('https://api.github.com/users/wesbos');
      console.log(wes.data); // mediocre code
    //   // many requests should be concurrent - don't slow things down!
    //   // fire off three requests and save their promises
    //   const wordPromise = axios('http://www.setgetgo.com/randomword/get.php');
    //   const userPromise = axios('https://randomuser.me/api/');
    //   const namePromise = axios('https://uinames.com/api/');
    //   // await all three promises to come back and destructure the result into their own variables
    //   const [word, user, name] = await Promise.all([wordPromise, userPromise, namePromise]);
    //   console.log(word.data, user.data, name.data); // cool, {...}, {....}
    } catch (e) {
      console.error(e); // 💩
    }
  }
  
  go();
  */



console.log('end.....');