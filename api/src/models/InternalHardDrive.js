const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "InternalHardDrive",
    {
      name: {
        type: DataTypes.STRING,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      rating_count: {
        type: DataTypes.INTEGER,
      },
      price_usd: {
        type: DataTypes.FLOAT,
      },
      capacity: {
        type: DataTypes.STRING,
      },
      "price_/_gb": {
        type: DataTypes.STRING,
        default:null,
      },
      type: {
        type: DataTypes.STRING,
      },
      cache: {
        type: DataTypes.STRING,
      },
      form_factor: {
        type: DataTypes.STRING,
      },
      interface: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
    }
  );
};