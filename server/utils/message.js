const moment = require('moment');

const generateMessage = (from, text) => ({
  from,
  text,
  created: moment().format('HH:mm:ss')
});

const generateLocationMessage = (from, latitude, longitude) => ({
  from,
  url: `https://google.com/maps?q=${latitude},${longitude}`,
  created: moment().format('HH:mm:ss')
});

module.exports = {
  generateMessage,
  generateLocationMessage
};
