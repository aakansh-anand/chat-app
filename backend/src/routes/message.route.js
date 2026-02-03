import express from "express";

const router = express.Router();

router.get("/send", (request, response) => {
  response.send("Message sent successfully");
});

export default router;
