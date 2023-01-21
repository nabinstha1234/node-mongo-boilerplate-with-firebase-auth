const cors = require('cors');
const vars = require('../config/vars');

module.exports = ({ app }) => {
  const origins = vars.origins;

  const corsOptions = {
    origin: origins,
    credentials: true,
  };

  app.use(cors(corsOptions));
};
