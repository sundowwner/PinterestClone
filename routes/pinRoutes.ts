"use strict";
import express = require("express");
import jwt = require("express-jwt");
let mongoose = require("mongoose");

let router = express.Router();
let User = mongoose.model("User");
let Board = mongoose.model("Board");
let Pin = mongoose.model("Pin");

let auth = jwt ({
    secret: "SecretKey",
    userProperty: "payload"
});

//POST: /api/pins
router.post("/", auth, (req, res, next) => {
    Board.findOne({ _id: req.body.board }).exec((err, board) => {
        if (err) return next(err);
        if (!board) return next({ status: 404, message: "Board could not be found."});
        req["board"] = board;
        next();
    });
});

//POST: /api/pins -- Board Exists && User Logged In
router.post("/", (req,res, next) => {

    let pin = new Pin(req.body);
    pin.createdBy = req["payload"]._id;
    pin.createdByEmail = req["payload"].email;
    pin.createdByUsername = req["payload"].username;
    pin.save((err, c) => {
        if (err) return next(err);
        if (!c) return next({ message: "Error saving pin."});

        req["board"].pins.push(c._id);
        req["board"].save();

        User.update({ _id: req["payload"]._id }, { $push: { pins: c._id}}, (err, result) => {
            if (err) return next(err);
            c.populate("createdBy", "email username", (err, com) => {
                res.send(c);
            });
        });
    });
});

//DELETE: /api/pins/:id
router.delete("/:id", auth, (req,res,next) => {
    Pin.update({_id: req.params.id}, {deleted: Date.now() }, (err, result) => {
        if (err) return next(err);
        res.send({ message: "Deleted the pin."});
    });
});

export = router;
