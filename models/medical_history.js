module.exports = function(sequelize, DataTypes) {
  var medical_history = sequelize.define("medical_history", {

    prov_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,255]}
    },
    cond1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,255]}
    },
    svc_dt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    total_billed_amt: {
        type: DataTypes.DECIMAL(11,2),
        allowNull: false,
        defaultValue: 0,
        validate: {isDecimal: true},
    },
    total_paid_amt: {
        type: DataTypes.DECIMAL(11,2),
        allowNull: false,
        defaultValue: 0,
        validate: {isDecimal: true}
    },
    notes: {
        type: DataTypes.STRING,
        //validate: {len: [1,500]}
    },
    doc_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {len: [1,50]}
    },
    doc_image_url: {
        type: DataTypes.STRING,
        //validate: {isUrl: true,
       // len: [1,255]}
    },
 
});

medical_history.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    medical_history.belongsTo(models.pets, {
      foreignKey: {
        allowNull: true
      }
    });
  }

// Syncs with DB
 return medical_history;
};