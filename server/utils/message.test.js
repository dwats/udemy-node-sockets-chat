const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should create correct message object', () => {
    const from = 'TestUser';
    const text = 'Test text';
    const message = generateMessage(from, text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.created).toBeA('number');
  });
});
