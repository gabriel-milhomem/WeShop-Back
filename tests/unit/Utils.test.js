const Utils = require('../../src/utils/Utils');

describe('function sanitizeHtml', () => {
  it('It should return the same object, without the html tag /clients route', () => {
    const object = {
      name: '<script> malicius </script> Nome Cliente',
      email: '<script> second </script> Email',
      phone: '234234',
      birthDay: '11/11/2000'
    };

    const expectedObject = {
      name: 'Nome Cliente',
      email: 'Email',
      phone: '234234',
      birthDay: '11/11/2000'
    };

    const result = Utils.sanitizeHtml(object);
    expect(result).toMatchObject(expectedObject);
  });

  it('It should return the same object, without the html tag /products route', () => {
    const object = {
      name: '<script> malicius </script> Nome Produto',
      price: 234
    };
    const expectedObject = {
      name: 'Nome Produto',
      price: 234
    };

    const result = Utils.sanitizeHtml(object);
    expect(result).toMatchObject(expectedObject);
  });
});

describe('function capitalizeAllAndTrim', () => {
  it('should return an name capitalized', () => {
    const name = 'FeRnAnDo FeRREIRa';
    const expectedName = 'Fernando Ferreira';

    const result = Utils.capitalizeAllAndTrim(name);

    expect(result).toEqual(expectedName);
  });

  it('should return an name all trim', () => {
    const name = ' fernando   ferreira     gomes  ';
    const expectedName = 'Fernando Ferreira Gomes';

    const result = Utils.capitalizeAllAndTrim(name);

    expect(result).toEqual(expectedName);
  });
});
