const { DataTypes, UUID } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('stock', {
        motorcycle_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
        },
        in_stock: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    });
};