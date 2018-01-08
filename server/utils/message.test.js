const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should create correct message object', () => {
    const from = 'TestUser';
    const text = 'Test text';
    const message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message).toInclude({ from, text });
    expect(message.created).toBeA('string');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location message object', () => {
    const from = 'TestUser';
    const latitude = 100;
    const longitude = 100;
    const expectedUrl = `https://google.com/maps?q=${latitude},${longitude}`;
    const message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from);
    expect(message.url).toBe(expectedUrl);
    expect(message).toInclude({ from, url: expectedUrl });
    expect(message.created).toBeA('string');
  });
});
