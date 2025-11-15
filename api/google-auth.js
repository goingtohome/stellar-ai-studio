import querystring from "querystring";

export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = "https://stellar-ai-studio.vercel.app/api/google-auth";

  // إذا Google رجعات الكود
  if (req.query.code) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.end(`
      <h2>Login Successful 🎉</h2>
      <p>Authorization Code:</p>
      <pre>${req.query.code}</pre>
    `);
  }

  // المستخدم باقي ما سجّلش الدخول → ديرو redirect لـ Google
  const params = querystring.stringify({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile"
  });

  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

  return res.redirect(googleAuthURL);
}
