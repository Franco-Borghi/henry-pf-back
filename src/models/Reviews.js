const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('reviews', {
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Explicitly defining the userId
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Explicitly defining the motorcycleId
    motorcycleId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, { timestamps: false });
};
