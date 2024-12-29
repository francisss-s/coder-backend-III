import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHashUtil, verifyHashUtil } from "../utils/hash.util.js";
import { createTokenUtil, verifyTokenUtil } from "../utils/token.util.js";

import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import passport from "passport";
import usersManager from "../dao/mongo/managers/users.manager.js";
import { v4 as uuidv4 } from "uuid";

passport.use(
  "register",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: "email",
    },
    async (req, email, password, done) => {
      try {
        const one = await usersManager.readByEmail(email);
        if (one) {
          const info = { message: "USER ALREADY EXISTS", statusCode: 401 };
          return done(null, false, info);
        }
        // Hashear password
        const hashedPassword = createHashUtil(password);
        
        let regObj = {
          first_name: req.body.first_name,
          last_name:  req.body.last_name,
          email,
          age:        req.body.age,
          role:       req.body.role || "USER",
          password:   hashedPassword,
          // Generar verifyCode en cada registro
          verifyUser: false,
          verifyCode: uuidv4().split("-")[0] 
        };

        const user = await usersManager.create(regObj);

        // Generar token JWT, etc...
        const payload = { user_id: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });
        await usersManager.update(user._id, { isOnline: true });
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
        const user = await usersManager.readByEmail(email);
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
        await usersManager.update(user._id, { isOnline: true });
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
        const user = await usersManager.readById(user_id);
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
        const user = await usersManager.readById(user_id);
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
        await usersManager.update(user_id, { isOnline: false });
        // construiria un token que venza al instante
        return done(null, { user_id: null });
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;