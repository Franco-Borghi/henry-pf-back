const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    
    sequelize.define("users",{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        firstName:{
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: {
                    args: [0, 50],
                    msg: 'El nombre tiene demasiados carácteres'
                }
            }   
            
        },
        lastName:{
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
        phoneNumber:{
            type: DataTypes.INTEGER,
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
    },{timestamps: false})
     
};