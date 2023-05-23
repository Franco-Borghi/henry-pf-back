const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
    sequelize.define('item', {
        chassisId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sold: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },{timestamps: false});
};
