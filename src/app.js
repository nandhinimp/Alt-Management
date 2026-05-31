const express = require('express');
const memberRoutes = require('./routes/member.routes');
const bookRoutes = require('./routes/book.routes');
const issuanceRoutes = require('./routes/issuance.routes');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Library Management API',
  });
});

app.use('/member', memberRoutes);
app.use('/book', bookRoutes);
app.use('/issuance', issuanceRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});