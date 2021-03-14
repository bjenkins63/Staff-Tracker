const sequelize = require('./config/connection');

sequelize.sync({ force: false }).then(() => {
  
});
