import express from "express";

const router = express.Router();

router.get("/sign-up", (request, response) => {
  response.send("Sign up endpoint");
});

router.get("/sign-in", (request, response) => {
  response.send("Sign in endpoint");
});

router.get("/logout", (request, response) => {
  response.send("Logout endpoint");
});

export default router;
