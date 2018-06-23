// Decide where we are - prod or DEV

if(process.env.NODE_ENV === 'production') {
  // We are in production
  module.exports = require('./prod');
  
} else {
  // We are in development - return dev keys
  module.exports = require('./dev');
}
