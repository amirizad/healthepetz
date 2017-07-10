module.exports = function(sequelize, DataTypes) {
  var owners = sequelize.define("owners", {
    owner_fname: {
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
        len:{
            args:[1,50],
            msg:"First name cannot be empty."
        },
        isAlpha:{
            args:true,
            msg:"First name cannot contain special characters. Must be letters only."
        }
    }
  },
   owner_lname: {
    type: DataTypes.STRING,
    allowNull:false,
     validate:{
        len:{
            args:[1,50],
            msg:"Last name cannot be empty."
        },
        isAlpha:{
            args:true,
            msg:"Last name cannot contain special characters. Must be letters only."
        }
    }
  },
   owner_dob: {
    type: DataTypes.DATEONLY,
  },
   owner_sex: {
    type: DataTypes.STRING
  },
   address: {
    type: DataTypes.STRING
  },
   city: {
    type: DataTypes.STRING
  },
   state: {
    type: DataTypes.STRING
  },
   zip: {
    type: DataTypes.STRING
  },
   phone: {
    type: DataTypes.STRING
  },
   fax: {
    type: DataTypes.STRING
  }
});

owners.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    owners.belongsTo(models.Users, {
      foreignKey: {
        allowNull: true
      }
    });
  }

// Syncs with DB
 return owners;
};
