const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedErr = require('../errors/UnauthorizedErr');

module.exports.auth = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie.startsWith('jwt=')) {
    const err = new UnauthorizedErr('Необходима авторизация');
    next(err);
    return;
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    const err = new UnauthorizedErr('Необходима авторизация');
    next(err);
  }

  req.user = payload;

  next();
};
