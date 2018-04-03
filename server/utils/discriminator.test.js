const expect = require('expect');
const { getNewDiscriminator } = require('./discriminator');

describe('discriminator.js', () => {
  describe('getNewDiscriminator()', () => {
    let collection;

    beforeEach(() => {
      collection = [
        {
          id: '1',
          discriminator: '0001',
          name: 'Test1',
          room: 'Testing1'
        },
        {
          id: '2',
          discriminator: '0010',
          name: 'Test1',
          room: 'Testing2'
        },
        {
          id: '3',
          discriminator: '0100',
          name: 'Test1',
          room: 'Testing2'
        }
      ];
    });

    it('should create a unique discriminator', () => {
      const discriminator = getNewDiscriminator('Test1', collection);
      const isUnique = collection.filter((item) => item.discriminator === discriminator).length === 0;
      expect(isUnique).toBe(true);
      expect(discriminator).toBeTruthy();
    });

    it('should create a 4 digit discriminator', () => {
      const discriminator = getNewDiscriminator('Test1', collection);
      expect(discriminator.length).toBe(4);
    });

  });
});
