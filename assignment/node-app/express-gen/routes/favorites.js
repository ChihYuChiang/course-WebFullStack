const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var authenticate = require("../authenticate");
const Favorite = require("../models/favorite");

const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());

favoriteRouter
  .route("/")
  .get((req, res, next) => {
    Favorite.findOne({ "user._id": req.user._id })
      .populate("user")
      .populate("dish")
      .then(
        favorite => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(favorite);
        },
        err => next(err)
      )
      .catch(err => next(err));
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({ "user._id": req.user._id })
      .then(favorite => {
        if (favorite != null) {
          favorite.dish.push(req.body);
          favorite.dish = Array.from(new Set(favorite.dish));
          favorite.save().then(
            favorite => {
              Favorite.findById(favorite._id)
                .populate("user")
                .populate("dish")
                .then(
                  favorite => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                  },
                  err => next(err)
                );
            },
            err => next(err)
          );
        } else {
          Favorite.create({
            user: { _id: req.user._id },
            dish: req.body
          }).then(
            favorite => {
              console.log("Favorite Created ", favorite);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            },
            err => next(err)
          );
        }
      })
      .catch(err => next(err));
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported.");
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
      Favorite.deleteOne({ "user._id": req.user._id })
        .then(
          resp => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(resp);
          },
          err => next(err)
        )
        .catch(err => next(err));
    }
  );

favoriteRouter
  .route("/:dishId")
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("GET operation not supported.");
  })
  .put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported." + req.params.dishId);
  })
  .post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({ "user._id": req.user._id })
      .then(favorite => {
        if (favorite != null) {
          favorite.dish.push({_id: req.params.dishId});
          favorite.dish = Array.from(new Set(favorite.dish));
          favorite.save().then(
            favorite => {
              Favorite.findById(favorite._id)
                .populate("user")
                .populate("dish")
                .then(
                  favorite => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(favorite);
                  },
                  err => next(err)
                );
            },
            err => next(err)
          );
        } else {
          Favorite.create({
            user: { _id: req.user._id },
            dish: [{_id: req.params.dishId}]
          }).then(
            favorite => {
              console.log("Favorite Added ", favorite);
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(favorite);
            },
            err => next(err)
          );
        }
      })
      .catch(err => next(err));
  })
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    (req, res, next) => {
        Favorite.findOne({ "user._id": req.user._id })
        .then(favorite => {
            let index = favorite.dish.indexOf({_id: req.params.dishId});
            if (index > -1) {
                favorite.dish.splice(index, 1);
            }
            favorite.save().then(
                resp => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(resp);
                  }, err => next(err))
        }, err => next(err))
        .catch(err => next(err));
    });

module.exports = favoriteRouter;
