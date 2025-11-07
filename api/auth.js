export default async function handler(req, res) {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;

  if (req.url.startsWith("/api/auth/login")) {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
    return res.writeHead(302, { Location: googleAuthURL }).end();
  }

  if (req.url.startsWith("/api/auth/callback/google")) {
    const url = new URL(req.url, `https://${req.headers.host}`);
    const code = url.searchParams.get("code");
    return res.end(`<h2>✅ Google returned code:</h2><pre>${code}</pre>`);
  }

  res.statusCode = 404;
  res.end("❌ Route not found");
}