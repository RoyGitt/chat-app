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
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      return next(errorHander(409, "Username already taken 🥲"));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(
        errorHander(409, "An account already exists with the provided email id")
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    const { password: pass, ...modifiedUser } = newUser._doc;

    res.status(201).json(modifiedUser);
  } catch (error) {
    next(error);
  }
};

export const handleSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHander(422, "Please enter all the credentials"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHander(404, "User not found!"));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(errorHander(401, "Wrong credentials!"));
    }
    const { password: pass, ...modifiedData } = user._doc;
    res.status(200).json(modifiedData);
  } catch (error) {
    next(error);
  }
};
