const axios = require("axios");

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";

const getSender = () => {
  const fromValue =
    process.env.SMTP_FROM || "CallMedex <lumorasystems.pvt@gmail.com>";

  const cleanFrom = String(fromValue).trim();
  const match = cleanFrom.match(/^(.*?)\s*<(.+?)>$/);

  if (match) {
    return {
      name: match[1].trim() || "CallMedex",
      email: match[2].trim(),
    };
  }

  return {
    name: "CallMedex",
    email: cleanFrom,
  };
};

const normalizeTo = (to) => {
  if (!to) {
    throw new Error("Recipient email is required");
  }

  if (typeof to === "string") {
    return to
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
      .map((email) => ({ email }));
  }

  if (Array.isArray(to)) {
    return to.map((item) => {
      if (typeof item === "string") {
        return { email: item.trim() };
      }

      return {
        email: item.email,
        name: item.name,
      };
    });
  }

  if (typeof to === "object" && to.email) {
    return [
      {
        email: to.email,
        name: to.name,
      },
    ];
  }

  throw new Error("Invalid recipient format");
};

const sendMail = async ({ to, subject, html, text }) => {
  if (!process.env.BREVO_API_KEY) {
    throw new Error("BREVO_API_KEY is missing in environment variables");
  }

  const payload = {
    sender: getSender(),
    to: normalizeTo(to),
    subject,
    htmlContent: html || `<p>${text || ""}</p>`,
    textContent: text || "",
  };

  const response = await axios.post(BREVO_API_URL, payload, {
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY.trim(),
      "content-type": "application/json",
    },
    timeout: 30000,
  });

  return response.data;
};

module.exports = {
  sendMail,
};