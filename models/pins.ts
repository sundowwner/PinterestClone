"use strict";
import mongoose = require("mongoose");

let PinSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    picture: { type: String, required: true, unique: true  },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdByEmail: String,
    createdByUsername: String
});

export let Pin = mongoose.model("Pin", PinSchema);
