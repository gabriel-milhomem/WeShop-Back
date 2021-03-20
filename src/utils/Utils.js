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

  putTotalAndPartialPrice(order) {
    if (order.products.length === 0) return;

    let total = 0;

    order.products.forEach(product => {
      const { ordersProduct, price } = product;
      const auxQuantity = ordersProduct.quantity;
      delete product.ordersProduct;

      product.quantity = auxQuantity;
      product.partialValue = (auxQuantity * price) / 100;
      product.price = price / 100;

      total += product.partialValue;
    });

    order.total = total;
    return order;
  }
}

module.exports = new Utils();
