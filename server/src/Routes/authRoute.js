"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authController_1 = require("../Controllers/authController");
var router = express_1.default.Router();
console.log(router);
router.post("/signUp", authController_1.signUp);
console.log("here4");
exports.default = router;
