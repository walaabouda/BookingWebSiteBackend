import express from "express";
import { UpdateUser, DeleteUser, GetUser, GetUsers } from "../Controllers/UserController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../Outils/Verify_Token.js";

const router = express.Router();

/*router.get("/checkauth", verifyToken, (req, res, next) => {
  res.send("Vous êtes authentifié");
});

router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("Login correct, vous pouvez supprimer");
});

router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
    res.send("You are a admin ,Login correct, vous pouvez supprimer");
  });

  */


// Update
router.put("/:id", verifyUser,UpdateUser);

// Delete
router.delete("/:id",verifyUser, DeleteUser);

// Get
router.get("/:id", verifyUser,GetUser);

// GetAll
router.get("/", verifyAdmin,GetUsers);

export default router;
