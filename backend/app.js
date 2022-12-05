require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;

const app = express();

const { login } = require('./controllers/user');

const { logout } = require('./controllers/user');

const { createUser } = require('./controllers/user');

const { auth } = require('./middlewares/auth');

const NotFoundErr = require('./errors/NotFoundErr');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(requestLogger);

const options = {
  origin: [
    'http://localhost:3000',
    'https://mesto.msti.nomoredomains.club',
    'http://mesto.msti.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(www\.)?(\w|[-._~:/?#[\]@!$&'()*+,;=])+\.\w+((\w|[-._~:/?#[\]@!$&'()*+,;=])+)+#?/),
  }),
}), createUser);

app.use(auth);

app.use('/users', require('./routes/user'));

app.use('/cards', require('./routes/card'));

app.use('/logout', logout);

app.all('/*', () => {
  throw new NotFoundErr('Неверный адрес');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) res.status(err.statusCode).send({ message: err.message });
  else res.status(500).send({ message: 'На сервере произошла ошибка' });

  next();
});

app.listen(PORT, () => {
});
