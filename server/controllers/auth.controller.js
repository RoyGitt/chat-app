import { errorHander } from "../Utils/error.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

export const handleSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHander(422, "Please enter all the credentials"));
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(errorHander(404, "No user found!"));
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return next(errorHander(401, "Wrong credentials!"));
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
