module.exports = function(sequelize, DataTypes) {
  var pets = sequelize.define("pets", {
      
   pet_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {len: [1,50]}
    },
   pet_type: {
    type: DataTypes.STRING,
    allowNull: false,
     validate: {len: [1,50]}
    },
   pet_breed: {
    type: DataTypes.STRING,
    allowNull: false,
     validate: {len: [1,100]}
    },
   pet_color: {
    type: DataTypes.STRING,
    allowNull: false,
     validate: {len: [1,50]}
    },
   license_no: {
    type: DataTypes.STRING,
     validate: {len: [1,25]}
    },
   microchip_no: {
    type: DataTypes.STRING,
     validate: {len: [1,25]}
    },
   insur_name: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
    },
   insur_id: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
    },
   insur_phone: {
    type: DataTypes.STRING,
     validate: {len: [2]}
    },
   pet_dob: {
    type: DataTypes.DATEONLY,
    },
   pet_dod: {
    type: DataTypes.DATEONLY,
    },
   pet_age: {
    type: DataTypes.STRING,
     validate: {len: [1]}
    },
   pet_sex: {
    type: DataTypes.STRING,
     validate: {len: [1]}
    },
    pet_image_url: {
      type: DataTypes.STRING,
      validate: {isUrl: true,
      len: [1,255]}
    },
   cond1: {
       type: DataTypes.STRING,
       validate: {len: [1,255]}
    },   
   cond2: {
    type: DataTypes.STRING,
     validate: {len: [1,255]}
    },
   cond3: {
    type: DataTypes.STRING,
     validate: {len: [1,255]}
    },
   med1: {
       type: DataTypes.STRING,
       validate: {len: [1,255]}
    },   
   med2: {
    type: DataTypes.STRING,
     validate: {len: [1,255]}
    },
   med3: {
    type: DataTypes.STRING,
     validate: {len: [1,255]}
    },
  vet1_name: {
    type: DataTypes.STRING,
     validate: {len: [1,255]}
  },
  vet1_specialty: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
  },
  vet1_address: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
  },
   vet1_city: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
  },
   vet1_state: {
    type: DataTypes.STRING,
     validate: {len: [2]}
  },
   vet1_zip: {
    type: DataTypes.STRING,
     validate: {len: [1,10]}
  },
   vet1_phone: {
    type: DataTypes.STRING,
     validate: {len: [1,15]}
  },
   vet1_email: {
    type: DataTypes.STRING,
     validate: {isEmail: true}
  },
   vet1_fax: {
    type: DataTypes.STRING,
     validate: {len: [1,15]}
  },
  vet2_name: {
    type: DataTypes.STRING,
     validate: {len: [1,255]}
  },
  vet2_specialty: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
  },
  vet2_address: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
  },
   vet2_city: {
    type: DataTypes.STRING,
     validate: {len: [1,100]}
  },
   vet2_state: {
    type: DataTypes.STRING,
     validate: {len: [2]}
  },
   vet2_zip: {
    type: DataTypes.STRING,
     validate: {len: [1,10]}
  },
   vet2_phone: {
    type: DataTypes.STRING,
     validate: {len: [1,15]}
  },
   vet2_email: {
    type: DataTypes.STRING,
     validate: {isEmail: true}
  },
   vet2_fax: {
    type: DataTypes.STRING,
     validate: {len: [1,15]}
  }
});

pets.associate = function(models) {
    // Using additional options like CASCADE etc for demonstration
    // Can also simply do Task.belongsTo(models.User);
    pets.belongsTo(models.owners, {
      foreignKey: {
        allowNull: true
      }
    });
  }

// Syncs with DB
 return pets;
};