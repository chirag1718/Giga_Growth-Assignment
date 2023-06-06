import User from "../model/User.js";
import { registerValidation, loginValidation } from "../userValidation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // register validation
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //  check if user email is already registered
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(409).send("Email already exists!");

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  try {
    const newUser = new User({
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    res.status(200).send({
      user: newUser._id,
      firstName: newUser.firstName,
      email: newUser.email,
    });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    const { error } = loginValidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    // Check if users email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(510).send("Email does not exists");

    // check if password is valid
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) return res.status(401).send("Invalid Password");
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_TOKEN
    );
    res.status(200).header("auth-token", token).send({
      token,
      user,
    });
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
};
