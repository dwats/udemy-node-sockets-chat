const moment = require('moment');

const generateMessage = (from, text) => ({ from, text, created: moment().format('HH:mm:ss') });

module.exports = {
  generateMessage
};
