module.exports = function(sequelize, DataTypes) {
  var vaccinations = sequelize.define("vaccinations", {

    vacc_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,255]}
    },
    last_vacc_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    next_vacc_dt: {
        type: DataTypes.DATEONLY,
    },
    vac_image_url: {
        type: DataTypes.STRING,
        validate: {isUrl: true,
        len: [1,255]}
    },
 
});

vaccinations.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    vaccinations.belongsTo(models.pets, {
      foreignKey: {
        allowNull: true
      }
    });
  }

// Syncs with DB
 return vaccinations;
};