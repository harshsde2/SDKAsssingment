/**
 * Basic test file to demonstrate testing capabilities
 */

describe('Basic tests', () => {
  test('basic truth check', () => {
    expect(true).toBe(true);
  });

  test('string operations', () => {
    expect('SDK').toEqual('SDK');
    expect('SDK Assessment'.split(' ')).toEqual(['SDK', 'Assessment']);
  });

  test('numeric operations', () => {
    expect(2 + 2).toBe(4);
    expect(10 - 5).toBe(5);
  });

  test('object equality', () => {
    const data = { name: 'John', email: 'john@example.com' };
    expect(data).toEqual({ name: 'John', email: 'john@example.com' });
  });
}); 