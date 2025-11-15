import querystring from "querystring";

export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = "https://stellar-ai-studio.vercel.app/api/google-auth";

  // إذا Google رجعات الكود
  if (req.query.code) {

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: querystring.stringify({
        client_id: clientId,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri
      })
    });

    const tokenData = await tokenResponse.json();

    const userInfoResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      }
    );

    const user = await userInfoResponse.json();

    return res.redirect(
      `https://stellar-ai-studio.vercel.app?name=${user.name}&email=${user.email}&picture=${user.picture}`
    );
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
