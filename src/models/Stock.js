const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 
    sequelize.define('stock', {
        chassis_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        in_stock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },{timestamps: false});
};
