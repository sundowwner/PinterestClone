"use strict";
var express = require("express");
var jwt = require("express-jwt");
var mongoose = require("mongoose");
var router = express.Router();
var Board = mongoose.model("Board");
var User = mongoose.model("User");
var auth = jwt({
    userProperty: "payload",
    secret: process.env.JWT_SECRET
});
router.get("/", function (req, res, next) {
    Board.find({})
        .exec(function (err, boards) {
        if (err)
            return next(err);
        res.json(boards);
    });
});
router.get("/:id", function (req, res, next) {
    console.log(req.params.id);
    Board.findOne({ _id: req.params.id })
        .populate("createdBy", "username email")
        .populate("pins")
        .exec(function (err, board) {
        if (err)
            return next(err);
        if (!board)
            return next({ message: "Could not find your board." });
        res.send(board);
    });
});
router.post("/", auth, function (req, res, next) {
    var newBoard = new Board(req.body);
    newBoard.createdBy = req["payload"]._id;
    newBoard.save(function (err, board) {
        if (err)
            return next(err);
        User.update({ _id: req["payload"]._id }, { $push: { "boards": board._id } }, function (err, result) {
            if (err)
                return next(err);
            res.send(board);
        });
    });
});
router.put("/:_id", function (req, res, next) {
    Board.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }, function (err, result) {
        if (err)
            return next(err);
        if (!result)
            return next({ message: "Could not find and update the board." });
        res.send(result);
    });
});
router.delete("/", function (req, res, next) {
    if (!req.query._id)
        return next({ status: 404, message: "Please include an ID " });
    Board.remove({ _id: req.query._id }, function (err, result) {
        res.send({ message: "SUCCESSSS!YAAAY" });
    });
});
module.exports = router;
