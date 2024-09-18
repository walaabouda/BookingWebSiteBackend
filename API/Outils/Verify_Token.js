import jwt from "jsonwebtoken";
import { createError } from "../Outils/Error.js";

// PREMIÈREMENT IL FAUT VÉRIFIER NOTRE AUTHENTIFICATION
export const verifyToken = (req, res, next) => {
  // PRENDRE NOTRE TOKEN DE NOTRE COOKIE
  const token = req.cookies.access_token;
  // LE CAS OÙ IL N'Y A PAS UN TOKEN
  if (!token) {
    return next(createError(401, "Vous n'êtes pas authentifié !"));
  }

  // SI CE USER EXISTE ALORS ON VÉRIFIE LE TOKEN
  jwt.verify(token, process.env.JWT, (err, user) => {
    // SI IL Y A UNE ERREUR ALORS LA VÉRIFICATION EST FAUSSE SINON ELLE EST VRAIE
    if (err) {
      return next(createError(403, "Le Token n'est pas validé !"));
    } else {
      req.user = user;
      next();
    }
  });
};

// APRÈS LA VÉRIFICATION DU TOKEN, IL FAUT VÉRIFIER QUE CETTE ID EST VALIDÉE ET QU'IL EST UN ADMIN
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user && (req.user.id === req.params.id || req.user.isAdmin)) {
      next();
    } else {
      return next(createError(403, "Vous n'êtes pas autorisé !"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        return next(createError(403, "Vous n'êtes pas autorisé !"));
      }
    });
  };