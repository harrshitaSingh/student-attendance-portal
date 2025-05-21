"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var dotenv_1 = require("dotenv");
var authRoute_1 = require("./src/Routes/authRoute");
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/auth", authRoute_1.default);
app.listen(PORT, function () {
    console.log("Server running on http://localhost:".concat(PORT));
});
