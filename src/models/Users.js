const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("users",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        first_name:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'El nombre tiene demasiados carácteres'
                }
            }   
            
        },
        last_name:{
            type: DataTypes.STRING(50),
            allowNull: false,
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
        phone_number:{
            type: DataTypes.INTIGER,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        active:{
            type: DataTypes.BOOLEAN,
        },
        role:{
            type: DataTypes.ENUM('admin', 'client'),
        }
    })
     
};