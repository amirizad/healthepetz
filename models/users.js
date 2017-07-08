module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
// Creates a "Chirp" model that matches up with DB
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   role: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// Syncs with DB
 return users;
};