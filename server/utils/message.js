const generateMessage = (from, text) => ({ from, text, created: new Date().getTime() });

module.exports = {
  generateMessage
};
