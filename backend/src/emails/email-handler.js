import { resendClient, sender } from "../lib/resend.js";
import { welcomeEmailTemplate } from "./email-template.js";

export const sendWelcomeEmail = async ({ email, name, clientUrl }) => {
  if (!sender?.email || !sender?.name) {
    throw new Error("Email Sender configurations are missing");
  }
  if (!email) throw new Error("Recepient Email is required");
  if (!name) throw new Error("Recepient Name is required");
  if (!clientUrl) throw new Error("Client URL is required");

  const { data, error } = await resendClient.emails.send({
    from: `${sender.name} <${sender.email}>`,
    to: email,
    subject: "Welcome to chat app",
    html: welcomeEmailTemplate(name, clientUrl),
  });

  if (error) {
    console.error("Error sending email", error);
    throw new Error("Failed to send email");
  }

  console.log("Email sent successfully", data);
};
