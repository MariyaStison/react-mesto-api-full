const Card = require('../models/card');

const DataErr = require('../errors/DataErr');
const ForbiddenErr = require('../errors/ForbiddenErr');
const NotFoundErr = require('../errors/NotFoundErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка не найдена');
      }
      if (card.owner.valueOf() !== req.user._id) {
        throw new ForbiddenErr('Недостаточно прав для выполнения операции');
      }
      return card.remove()
        .then(() => {
          res.send({
            createdAt: card.createdAt,
            likes: card.likes,
            link: card.link,
            name: card.name,
            owner: card.owner,
            _id: card._id,
          });
        });
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({
      createdAt: card.createdAt,
      likes: card.likes,
      link: card.link,
      name: card.name,
      owner: card.owner,
      _id: card._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new DataErr('Переданы некорректные данные в метод создания карточки');
        next(error);
      } else next(err);
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка не найдена');
      }
      res.send({
        createdAt: card.createdAt,
        likes: card.likes,
        link: card.link,
        name: card.name,
        owner: card.owner,
        _id: card._id,
      });
    })
    .catch(next);
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка не найдена');
      }
      res.send({
        createdAt: card.createdAt,
        likes: card.likes,
        link: card.link,
        name: card.name,
        owner: card.owner,
        _id: card._id,
      });
    })
    .catch(next);
};
