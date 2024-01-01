import { errorHander } from "../Utils/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const handleSignUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(
      errorHander(422, "Please provide us with all the required information")
    );
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(409, "User already exits with the provided information");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await User({ username, email, password: hashedPassword });
    await newUser.save();
    const { password: pass, ...rest } = newUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};

export const handleSignIn = async (req, res) => {};
