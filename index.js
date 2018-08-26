const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const stripe = require("stripe");

require("./models/User"); // Has to be first
require("./models/Survey");
require("./models/Track");
require("./services/passport");

/* Connect to database, create app */
mongoose.connect(keys.mongoURI);
const app = express();

/* Use body parser to get data from requests */
app.use(bodyParser.json());

/* Set a 30 Day Login Cookie */
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

/* Set-up authentication */
app.use(passport.initialize());
app.use(passport.session());

/* Set the public key for billing */
// stripe.setPublishableKey(process.env.STRIPE_PUBLIC_KEY);

/* Set-Up Routes */
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);
require("./routes/trackRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up server stuff
  app.use(express.static("client/build"));

  // Express will serve up correct client stuff
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

/* Run Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
