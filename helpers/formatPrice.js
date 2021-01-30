function formatPrice(value) {
  let formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })

  return formatter.format(value);
}

module.exports = formatPrice;