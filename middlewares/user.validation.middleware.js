import { USER } from "../models/user.js";

const isFieldPresent = (field) => {
  return field !== undefined && field !== "";
};

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@gmail\.com$/;
  return emailRegex.test(email);
};

const isPhoneNumberValid = (phoneNumber) => {
  const phoneNumberRegex = /^\+380\d{9}$/;
  return phoneNumberRegex.test(phoneNumber);
};

const isPasswordValid = (password) => {
  return password.length >= 3;
};

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  if (!isFieldPresent(firstName) || !isFieldPresent(lastName) || !isFieldPresent(email) ||
      !isFieldPresent(phoneNumber) || !isFieldPresent(password)) {
    return res.status(400).json({ error: true, message: "All fields are required" });
  }

  if (id !== undefined) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  if (!isEmailValid(email)) {
    return res.status(400).json({ error: true, message: "Invalid email format" });
  }

  if (!isPhoneNumberValid(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format" });
  }

  if (!isPasswordValid(password)) {
    return res.status(400).json({ error: true, message: "Password should have at least 3 characters" });
  }
  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  const { id, firstName, lastName, email, phoneNumber, password } = req.body;

  const fields = { firstName, lastName, email, phoneNumber, password };
  const isAtLeastOneFieldPresent = Object.values(fields).some((field) => isFieldPresent(field));

  if (!isAtLeastOneFieldPresent) {
    return res.status(400).json({ error: true, message: "At least one field must be present" });
  }

  if (id !== undefined) {
    return res.status(400).json({ error: true, message: "Id should not be present" });
  }

  if (email !== undefined && !isEmailValid(email)) {
    return res.status(400).json({ error: true, message: "Invalid email format" });
  }

  if (phoneNumber !== undefined && !isPhoneNumberValid(phoneNumber)) {
    return res.status(400).json({ error: true, message: "Invalid phone number format" });
  }

  if (password !== undefined && !isPasswordValid(password)) {
    return res.status(400).json({ error: true, message: "Password should have at least 3 characters" });
  }
  next();
};

export { createUserValid, updateUserValid };
