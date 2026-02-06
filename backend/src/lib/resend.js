import { Resend } from "resend";
import { ENV } from "./env.js";

// Create your resend object to grab the info about the send and then use the features of resend to send emails properly.
export const resendClient = new Resend(ENV.RESEND_API_KEY);

export const sender = {
  email: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME,
};
