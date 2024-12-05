import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import {
  create,
  readByEmail,
  readById,
  update,
} from "../data/mongo/managers/users.manager.js";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js";

import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import passport from "passport";

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        const one = await readByEmail(email);
        if (one) {
          const info = { message: "USER ALREADY EXISTS", statusCode: 401 };
          return done(null, false, info);
        }
        const hashedPassword = createHashUtil(password);
        
        let regObj = {
          "first_name": req.body.first_name,
          "last_name": req.body.last_name,
          "email": email,
          "age": req.body.age,
          "role": req.body.role || "USER",
          "password": hashedPassword
        }
        const user = await create(regObj);

        // Generar token JWT
        const payload = { user_id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        // Marcar usuario como conectado
        await update(user._id, { isOnline: true });

        // Adjuntar token al usuario para devolverlo
        user.token = token;

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await readByEmail(email);
        if (!user) {
          const info = { message: "USER NOT FOUND", statusCode: 401 };
          return done(null, false, info);
        }
        const passwordForm = password;
        const passwordDb = user.password;

        const verify = verifyHashUtil(passwordForm, passwordDb);
        if (!verify) {
          const info = { message: "INVALID CREDENTIALS", statusCode: 401 };
          return done(null, false, info);
        }
        const data = {
          user_id: user._id,
          role: user.role,
        };
        const token = createTokenUtil(data);
        user.token = token;
        await update(user._id, { isOnline: true });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "admin",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        //console.log(data);
        const { user_id, role } = data;
        if (role !== "ADMIN") {
          // const error = new Error("NOT AUTHORIZED")
          // error.statusCode = 403
          // return done(error)
          const info = { message: "NOT AUTHORIZE", statusCode: 403 };
          return done(null, false, info);
        }
        const user = await readById(user_id);
        return done(null, user);
      } catch (error) {}
    }
  )
);

passport.use(
  "current",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;

        // Busca al usuario en la base de datos
        const user = await readById(user_id);
        if (!user) {
          const info = { message: "USER NOT FOUND", statusCode: 404 };
          return done(null, false, info);
        }

        // Si el usuario existe, devuélvelo
        return done(null, user);
      } catch (error) {
        console.error("Error en la estrategia current:", error);
        return done(error, false);
      }
    }
  )
);

passport.use(
  "signout",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: process.env.SECRET_KEY,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        await update(user_id, { isOnline: false });
        // construiria un token que venza al instante
        return done(null, { user_id: null });
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;