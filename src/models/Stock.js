const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
    sequelize.define('stock', {
        chassisId: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        inStock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },{timestamps: false});
};
