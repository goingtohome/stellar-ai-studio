import express from "express";

export default function handler(req, res) {
  const app = express();

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = "https://stellar-ai-studio.vercel.app/api/google-auth";

  // 1 — إذا Google رجّعات الكود
  if (req.query.code) {
    return res.send(`
      <h2>Login Successful 🎉</h2>
      <p>Authorization Code:</p>
      <pre>${req.query.code}</pre>
      <p>Copy this code and use it in your frontend.</p>
    `);
  }

  // 2 — إذا المستخدم مازال ما سجّلاش الدخول
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;

  return res.redirect(authUrl);
}
