import { check } from "express-validator";

// Username, email & password validation || валидация имени, почты и пароля
export const signUpValidation = [
  check("username", "Name is required").not().isEmpty(),
  check("email", "Please enter a valid mail")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
  check("password", "Password is required").isLength({ min: 6 }),
];

export const forgetPasswordValidation = [
  check("email", "Please enter a valid mail")
    .isEmail()
    .normalizeEmail({ gmail_remove_dots: true }),
];
