import {BAD_REQUEST, NOT_FOUND, UNAUTHORIZED} from "../utils/errors/dictionary.error.js";

import CustomError from "../utils/errors/custom.error.js";
import dao from "../dao/index.factory.js";

const { UsersManager } = dao;

async function register(req, res, next) {
  try {
    if (!req.user || !req.user._id) {
      throw CustomError.create(BAD_REQUEST);
    }
    const { _id } = req.user;
    const message = "User Registered!";
    return res.status(201).json({ message, user_id: _id });
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    if (!req.user || !req.user.token) {
      throw CustomError.create(UNAUTHORIZED);
    }
    const { token } = req.user;
    const opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: true };
    const message = "User logged in!";
    return res.cookie("token", token, opts).status(200).json({ message });
  } catch (error) {
    next(error);
  }
}

function signout(req, res, next) {
  try {
    const message = "User signed out!";
    return res.clearCookie("token").status(200).json({ message });
  } catch (error) {
    next(error);
  }
}

async function online(req, res, next) {
  try {
    if (!req.session || !req.session.user_id) {
      throw CustomError.create(UNAUTHORIZED);
    }
    const one = await UsersManager.readById(req.session.user_id);
    if (!one) {
      throw CustomError.create(NOT_FOUND);
    }
    const message = `${one.email} is online`;
    return res.status(200).json({ online: true, message });
  } catch (error) {
    next(error);
  }
}

function google(req, res, next) {
  try {
    if (!req.token) {
      throw CustomError.create(UNAUTHORIZED);
    }
    return res.status(200).json({ message: "USER LOGGED IN", token: req.token });
  } catch (error) {
    next(error);
  }
}

async function onlineToken(req, res, next) {
  try {
    if (!req.user || !req.user.email) {
      throw CustomError.create(UNAUTHORIZED);
    }
    return res.status(200).json({
      message: `${req.user.email.toUpperCase()} IS ONLINE`,
      online: true,
    });
  } catch (error) {
    next(error);
  }
}

export { register, login, signout, online, onlineToken, google };
