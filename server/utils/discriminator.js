function getNewDiscriminator(name, collection) {
  let discriminator;
  while(!discriminator || !isUniqueDiscriminator(discriminator, name, collection)) {
    let rnd4 = Math.floor(Math.random() * Math.floor(10000));
    discriminator = pad(rnd4, 4);
  }
  return discriminator;
}

function isUniqueDiscriminator(discriminator, name, collection) {
  const index = collection.findIndex((item) => item.discriminator === discriminator && item.name === name);
  return index === -1;
}

function pad(num, size) {
  let padded = '0000' + num;
  return padded.substr(padded.length - size);
}

module.exports = {
  getNewDiscriminator
};
