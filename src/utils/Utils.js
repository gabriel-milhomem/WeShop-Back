const { stripHtml } = require('string-strip-html');

class Utils {
  capitalizeAllAndTrim(string) {
    if (typeof string !== 'string') return;

    const stringArray = string
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .split(' ');

    const result = stringArray.map(
      word => word.charAt().toUpperCase() + word.slice(1)
    );

    return result.join(' ');
  }

  sanitizeHtml(object) {
    object = Object.fromEntries(
      Object.entries(object).map(([key, value]) => {
        if (typeof value !== 'string') {
          return [key, value];
        }

        return [key, stripHtml(value).result];
      })
    );

    return object;
  }
}

module.exports = new Utils();
