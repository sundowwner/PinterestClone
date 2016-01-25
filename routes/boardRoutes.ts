"use strict";
import express = require("express");
import jwt = require("express-jwt");
let mongoose = require("mongoose");
let router = express.Router();
let Board = mongoose.model("Board");
let User = mongoose.model("User");
let auth = jwt ({

    userProperty: "payload",

    secret: process.env.JWT_SECRET
});

//GET: /boards
router.get("/",(req,res,next) => {
    Board.find({})
    .exec((err, boards) => {
        if (err) return next(err);
        res.json(boards);
    });
});

//GET: /boards/:id
router.get("/:id", (req,res,next) => {
    console.log(req.params.id)
    Board.findOne({_id: req.params.id })
    .populate("createdBy", "username email")
    .populate("pins")
    .exec((err, board) => {
        if (err) return next(err);
        if (!board) return next({ message: "Could not find your board."});
        res.send(board);
    });
});

//POST: /boards
router.post("/", auth, (req,res, next) => {
    let newBoard = new Board(req.body);
    newBoard.createdBy = req["payload"]._id;
    newBoard.save((err, board) => {
        if (err) return next(err);
        User.update({ _id: req["payload"]._id }, { $push: { "boards": board._id } },(err, result) => {
            if (err) return next (err);
            res.send(board);
        });
    });
});

//PUT: /book/:id
router.put("/:_id", (req,res,next) => {

    Board.findOneAndUpdate({_id: req.params._id}, req.body, {new: true}, (err,result) => {
        if (err) return next (err);
        if (!result) return next ({ message: "Could not find and update the board."});
        res.send(result);
    });
});

//DELETE: /board/_id={{book_id}}
router.delete("/", (req, res, next) => {
    if (!req.query._id) return next({ status: 404, message: "Please include an ID "});
    Board.remove({_id: req.query._id }, (err, result) => {
        res.send({ message: "SUCCESSSS!YAAAY"});
    });
});

export = router;
