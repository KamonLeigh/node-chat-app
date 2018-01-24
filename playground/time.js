const moment = require('moment');


// Jan 1st 1970 00:00:00 am
// let date = new Date(); 
// console.log(date.getMonth());

// const date = moment();
// date.add(1, 'year').subtract(9, 'months')
// console.log(date.format('Do MMM, YYYY'));


//10:35 am

const someTimestamp = moment().valueOf(); // That is the same as new Date().getTime();
console.log(someTimestamp);

const createAt = 1234
const time = moment(createAt);
//time.subtract(7, 'hour').add(19, 'minute');
console.log(time.format('h:mm a'));
