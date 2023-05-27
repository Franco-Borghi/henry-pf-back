const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define("users",{
        id:{
            type: DataTypes.STRING,
            primaryKey: true
        },
        firstName:{
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'El nombre tiene demasiados carácteres'
                }
            }      
        },
        lastName:{
            type: DataTypes.STRING(50),
            allowNull: true,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'El Apellido tiene demasiados carácteres'
                }
            }
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phoneNumber:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        role:{
            type: DataTypes.ENUM('admin', 'client'),
            defaultValue: 'client',
        }
    },{timestamps: false})
     
};