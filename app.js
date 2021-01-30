const express = require('express');
const formatPrice = require('./helpers/formatPrice');
const router = require('./routes/index');

const app = express();
const PORT = 3000;

app.locals.formatPrice = formatPrice;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}...`);
})