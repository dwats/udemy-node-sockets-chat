const moment = require('moment');

const generateMessage = (from, text) => ({
  from,
  text,
  created: moment().valueOf()
});

const generateLocationMessage = (from, latitude, longitude) => ({
  from,
  url: `https://google.com/maps?q=${latitude},${longitude}`,
  created: moment().valueOf()
});

module.exports = {
  generateMessage,
  generateLocationMessage
};
