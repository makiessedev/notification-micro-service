import { Content } from './content';

describe('notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('voce recebu uma nova solisitação de amizade');

    expect(content).toBeTruthy();
  });

  it('should be able to create content with less than 5 caracters', () => {
    expect(() => new Content('aaa')).toThrow();
  });

  it('should be able to create content with more than 255 caracters', () => {
    expect(() => new Content('a'.repeat(256))).toThrow();
  });
});
