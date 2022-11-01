import express from "express";
import passport from "passport";

const authRouter = express.Router();

authRouter.get("/login/successful", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
    });
  }
});

authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: true,
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/login/failed",
  })
);

authRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      res.send(err);
    }
  });
  res.redirect("/");
});

export default authRouter;
