require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_REDIRECT_URI || "https://stellar-ai-studio.vercel.app/api/auth/callback/google";

// Login route
app.get('/login', (req, res) => {
  const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile`;
  res.redirect(googleAuthURL);
});

// Google callback
app.get('/api/auth/callback/google', async (req, res) => {
  const code = req.query.code;
  if (!code) return res.send('❌ No code received from Google!');

  try {
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    const data = await tokenResponse.json();
    res.send(`<h2>✅ Logged in successfully!</h2><pre>${JSON.stringify(data, null, 2)}</pre>`);
  } catch (error) {
    console.error(error);
    res.send('⚠️ Error during Google login.');
  }
});

app.listen(3000, () => console.log('🚀 Auth server running at http://localhost:3000'));