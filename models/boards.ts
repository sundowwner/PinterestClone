"use strict";
import mongoose = require("mongoose");
let BoardSchema = new mongoose.Schema({

    name: { type: String, required: true, unique: true },
    picture: { type: String, unique: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin"}]
});


export let Board = mongoose.model("Board",BoardSchema);
