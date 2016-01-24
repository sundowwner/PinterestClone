"use strict";
var express = require("express");
var jwt = require("express-jwt");
var mongoose = require("mongoose");
var router = express.Router();
var User = mongoose.model("User");
var Board = mongoose.model("Board");
var Pin = mongoose.model("Pin");
var auth = jwt({
    secret: "SecretKey",
    userProperty: "payload"
});
router.post("/", auth, function (req, res, next) {
    Board.findOne({ _id: req.body.board }).exec(function (err, board) {
        if (err)
            return next(err);
        if (!board)
            return next({ status: 404, message: "Board could not be found." });
        req["board"] = board;
        next();
    });
});
router.post("/", function (req, res, next) {
    var pin = new Pin(req.body);
    pin.createdBy = req["payload"]._id;
    pin.createdByEmail = req["payload"].email;
    pin.createdByUsername = req["payload"].username;
    pin.save(function (err, c) {
        if (err)
            return next(err);
        if (!c)
            return next({ message: "Error saving pin." });
        req["board"].pins.push(c._id);
        req["board"].save();
        User.update({ _id: req["payload"]._id }, { $push: { pins: c._id } }, function (err, result) {
            if (err)
                return next(err);
            c.populate("createdBy", "email username", function (err, com) {
                res.send(c);
            });
        });
    });
});
router.delete("/:id", auth, function (req, res, next) {
    Pin.update({ _id: req.params.id }, { deleted: Date.now() }, function (err, result) {
        if (err)
            return next(err);
        res.send({ message: "Deleted the pin." });
    });
});
module.exports = router;
