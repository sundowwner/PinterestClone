"use strict";
var mongoose = require("mongoose");
var PinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true, unique: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdByEmail: String,
    createdByUsername: String
});
exports.Pin = mongoose.model("Pin", PinSchema);
