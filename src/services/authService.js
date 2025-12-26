import Utils from "../utils/commonFunctions.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import nodemailer from "nodemailer";
import path from "node:path";
import fs from "node:fs";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.FROM_EMAIL_ID,
    pass: process.env.EMAIL_SECURITY,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const AuthService = {
  login: async (req) => {
    const { emailId = null, password = null } = req.body;
    if (!emailId || !password)
      throw Utils.apiError("EmailId and Password are required", 400);
    const user = await User.fetchUserByEmailId(emailId);
    if (!user) throw Utils.apiError("Invalid EmailId", 403);
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw Utils.apiError("Invalid Password", 403);
    delete user.password;

    const accessToken = jwt.sign(
      {
        emailId: user.emailId,
        username: user.name,
        uid: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );
    const refreshToken = jwt.sign(
      {
        emailId: user.emailId,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    user.refreshToken = refreshToken;
    user.accessToken = accessToken;
    return user;
  },
  updateSecurity: async (req) => {
    const { oldPassword = null, newPassword = null } = req.body;
    if (!oldPassword || !newPassword)
      throw Utils.apiError("oldPassword and newPassword must be required", 400);
    const user = await User.fetchUser(req.params.id);
    if (!user) throw Utils.apiError("Invalid User", 404);
    const checkPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkPassword) throw Utils.apiError("Invalid Password", 403);
    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.BCRYPT_SALT)
    );
    await User.updateOne(
      "users",
      { _id: ObjectId.createFromHexString(req.params.id) },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    return true;
  },
  requestPasswordReset: async (req) => {
    const user = await User.fetchUserByEmailId(req.body.emailId);
    if (!user) throw Utils.apiError("Invalid EmailId", 403);
    const token = jwt.sign(
      { emailId: user.emailId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    const filePath = path.join(__template, "requestPasswordRest.ejs");
    const resetLink = `${process.env.CLIENT_URL}?token=${token}&userId=${user._id}`;
    user.link = resetLink;
    const template = ejs.compile(fs.readFileSync(filePath, "utf8"), {
      filename: filePath,
    })({
      user: user,
    });

    const mailOptions = {
      from: process.env.FROM_EMAIL_ID,
      to: "gopi3062.sss@gmail.com",
      subject: "Password Reset Request",
      html: template,
    };

    await transporter.sendMail(mailOptions);
    return resetLink;
  },
  resetPassword: async (req) => {
    const { userId = null, password = null, token = null } = req.body;
    if (!userId || !password || !token)
      throw Utils.apiError("UserId, Passworrd and Token must be required", 400);
    const user = await User.fetchUser(userId);
    if (!user) throw Utils.apiError("User doesn't Exists", 404);
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT)
    );
    const filePath = path.join(__template, "resetPassword.ejs");
    const template = ejs.compile(fs.readFileSync(filePath, "utf8"), {
      filename: filePath,
    })({
      user: user,
    });
    await User.updateOne(
      "users",
      {
        _id: user._id,
      },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );
    const mailOptions = {
      from: process.env.FROM_EMAIL_ID,
      to: "gopi3062.sss@gmail.com",
      subject: "Password Reset Successfully",
      html: template,
    };

    await transporter.sendMail(mailOptions);
    return true;
  },
};

export default AuthService;
