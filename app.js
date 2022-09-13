const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const JWT = require('jsonwebtoken');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/token', async (req, res, next) => {
  const payload = {
    "userPrivilegeUuid": "myprivilegeuuid",
    "user_name": "software_admin",
    "stores": [],
    "scope": [
      "read",
      "write"
    ],
    "userUuid": "myid",
    "fullStoresAccess": true,
    "authorities": [
      "ROLE_SOFTWARE_ADMIN"
    ],
    "jti": "myjti",
    "client_id": "back_office"
  }

  const secret = fs.readFileSync('./certs/private.pem')
  const token = JWT.sign(payload, secret, { expiresIn: '10min', algorithm: 'RS256' })
  res.send({ token });
});

app.use(express.static('public'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0',() => console.log(`🚀 @ http://localhost:${PORT}`));
