//Creates the users table with validation and error handling
//=============================================================================================
module.exports = (sequelize,DataTypes)=>{
    const Users = sequelize.define('Users',{
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:{
                args:true,
                msg:'Sorry, this username is already in use. Please choose another.'
            },
            validate:{
                len:{
                    args:[1,50],
                    msg:'Username cannot be empty'
                }
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:{
                args:true,
                msg:'This email is already registered. Please use the login page to sign in.'
            },
            validate:{
                isEmail:{
                    args:true,
                    msg:'Please enter a valid email address.'
                }
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:{
                    args:[10],
                    msg:'Password must be atleast 10 characters long.'
                }
            }
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false,
            defaultValue: 'user'
        }
    });
    return Users;
};

// first_name:{
//             type: DataTypes.STRING,
//             allowNull:false,
//             validate:{
//                 len:{
//                     args:[1,50],
//                     msg:"First name cannot be empty."
//                 },
//                 isAlpha:{
//                     args:true,
//                     msg:"First name cannot contain special characters. Must be letters only."
//                 }
//             }
//         },
//         last_name:{
//             type: DataTypes.STRING,
//             allowNull:false,
//             validate:{
//                 len:{
//                     args:[1,50],
//                     msg:"Last name cannot be empty."
//                 },
//                 isAlpha:{
//                     args:true,
//                     msg:"Last name cannot contain special characters. Must be letters only."
//                 }
//             }
//         },