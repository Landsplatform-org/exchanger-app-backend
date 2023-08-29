"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordValidation = exports.signUpValidation = void 0;
const express_validator_1 = require("express-validator");
// Username, email & password validation || валидация имени, почты и пароля
exports.signUpValidation = [
    (0, express_validator_1.check)("username", "Name is required").not().isEmpty(),
    (0, express_validator_1.check)("email", "Please enter a valid mail")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true }),
    (0, express_validator_1.check)("password", "Password is required").isLength({ min: 6 }),
];
exports.forgetPasswordValidation = [
    (0, express_validator_1.check)("email", "Please enter a valid mail")
        .isEmail()
        .normalizeEmail({ gmail_remove_dots: true }),
];
