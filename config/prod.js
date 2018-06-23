// PROD
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleSecret: process.env.GOOGLE_SECRET,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  googleCallbackURI: 'https://lit-caverns-14892.herokuapp.com/auth/google/callback',
  stripePublishableKey: process.env.STRIPE_PUBLIC_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY
}
