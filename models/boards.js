"use strict";
var mongoose = require("mongoose");
var BoardSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    picture: { type: String, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin" }]
});
exports.Board = mongoose.model("Board", BoardSchema);
