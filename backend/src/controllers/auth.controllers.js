import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../emails/email-handler.js";
import { ENV } from "../lib/env.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (request, response) => {
  const { fullName, email, password } = request.body;
  try {
    // check if all fields are filled
    if (!fullName || !email || !password) {
      return response.status(400).json({
        message: "All field are required",
      });
    }

    // check if password length is correct
    if (password.length < 6) {
      return response.status(400).json({
        message: "Bad request, Password must be atleast 6 characters long",
      });
    }

    // check if email entered is a vaild email: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({
        message: "Invalid email format",
      });
    }

    // Check if user already exists.
    const user = await User.findOne({ email });
    if (user) {
      return response.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash users password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // After all the checks, get the user ready
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // If user exists, first save the user then generate the token
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, response);

      // Send response to client;
      response.status(201).json({
        _id: savedUser._id,
        fullName: savedUser.fullName,
        email: savedUser.email,
        profilePic: savedUser.profilePic,
      });
      // Send welcome email
      /*
      try {
        await sendWelcomeEmail({
          email: savedUser.email,
          name: savedUser.fullName,
          clientUrl: ENV.CLIENT_URL,
        });
      } catch (error) {
        console.error("Error sending email", error);
        response.status(500).json({
          message: "Failed to send email",
        });
      }
      */
      sendWelcomeEmail(
        savedUser.email,
        savedUser.fullName,
        ENV.CLIENT_URL,
      ).catch((error) => {
        console.error("Failed to send welcome email", error);
      });
    } else {
      // Show proper error;
      response.status(400).json({
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.error("Error in Sign up Controller", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const login = async (request, response) => {
  const { email, password } = request.body;
  try {
    // check if all fields are provided.
    if (!email || !password) {
      return response.status(400).json({
        message: "All field are required",
      });
    }

    // check if user already exists
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      // Never tell if email is wrong or password is wrong, just tell that something is wrong
      return response.status(400).json({
        message: "Invalid Credentials",
      });
    }

    // Check if password is correct
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password,
    );
    if (!isPasswordCorrect)
      return response.status(400).json({
        message: "Invalid Credentials",
      });

    generateToken(foundUser._id, response);
    response.status(200).json({
      _id: foundUser._id,
      fullName: foundUser.fullName,
      email: foundUser.email,
      profilePic: foundUser.profilePic,
    });
  } catch (error) {
    console.error("Error in login controller", error);
    response.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = (_, response) => {
  response.cookie("jwt", "", { maxAge: 0 });
  response.status(200).json({ message: "User logged out successfully" });
};
