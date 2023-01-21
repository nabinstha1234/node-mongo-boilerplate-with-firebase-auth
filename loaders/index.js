const corsLoader = require('./cors.loader');
const expressLoader = require('./express.loader');
const mongooseLoader = require('./mongoose.loader');
require('./event.loader');

module.exports = ({ app }) => {
  mongooseLoader();
  corsLoader({ app });
  expressLoader({ app });
};
